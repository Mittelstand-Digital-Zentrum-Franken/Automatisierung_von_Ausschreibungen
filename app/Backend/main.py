from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
import io
import os
from fastapi.encoders import jsonable_encoder
import pandas as pd
from typing import Dict
from openpyxl import Workbook
import fitz

from mengengeruest import (read_excel_file,
                           select_data, 
                           extract_information_through_positionnumbers,
                           neutraliz_blocks,
                           create_cost_estimate_intern,
                           create_cost_estimate_extern,
                           excel_export_tender_intern,
                           excel_export_tender_extern
)

from technischer_Vorbeschrieb import (process_pdf,
                                      get_summary,
                                      create_document
)

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define folders
UPLOAD_FOLDER = "uploads"
DOWNLOAD_FOLDER = "downloads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

# Except datatypes
ALLOWED_EXTENSIONS = {
    "mengengeruest": {"xls"},
    "text": {"pdf"},
}

def allowed_file(filename: str, category: str) -> bool:
    if category not in ALLOWED_EXTENSIONS:
        raise ValueError(f"Unbekannte Kategorie: {category}")
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS[category]


# Prepare Excel data for table
@app.post("/process_mengengeruest/")
async def process_excel(file: UploadFile = File(...)):
    if not allowed_file(file.filename, category="mengengeruest"):
        raise HTTPException(status_code=400, detail="Ungültiger Dateityp!")

    file_location = os.path.join(UPLOAD_FOLDER, file.filename)
    
    try:
        with open(file_location, "wb") as buffer:
            buffer.write(await file.read())
            #print(f"Datei {file.filename} gespeichert bei {file_location}")

        df_upload = read_excel_file(file_location)
        selected_data = select_data(df_upload)
        blocks = extract_information_through_positionnumbers(selected_data)
        block_neutral = neutraliz_blocks(blocks)
        # print(blocks[0].keys())
        # print(blocks[0])
        # print(f"neutralisierung fertig {block_1}")

        # return JSONResponse(content={"result": jsonable_encoder({"result": blocks})}, status_code=200)
        return JSONResponse(content={"result": jsonable_encoder({"result": block_neutral})}, status_code=200)   
    
    except Exception as e:
        print(f"Fehler bei der Verarbeitung der Datei: {e}")
        raise HTTPException(status_code=500, detail=f"Fehler bei der Verarbeitung der Excel-Datei: {str(e)}")


# Export excel data intern tender
@app.post("/excel_download_internal/")
async def download_excel_internal(data: Dict):
    try:
        # Data Preperation
        intern = create_cost_estimate_intern(data["result"])
        export_intern = excel_export_tender_intern(intern)

        # Check file format and sent back
        if isinstance(export_intern, io.BytesIO):
            export_intern.seek(0)

            return StreamingResponse(
                export_intern,
                media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                headers={"Content-Disposition": "attachment; filename=cost_estimate_intern.xlsx"}
            )
        else:
            raise HTTPException(status_code=500, detail="Die Excel-Datei wurde nicht korrekt erstellt.")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Fehler beim Erstellen der Datei: {str(e)}")


# Export ecxel data extern tender
@app.post("/excel_download_external/")
async def download_excel_external(data: Dict):
    try:
        # Data Preperation
        extern = create_cost_estimate_extern(data["result"])
        export_extern = excel_export_tender_extern(extern)

        # Check file format and sent back
        if isinstance(export_extern, io.BytesIO):
            export_extern.seek(0)

            return StreamingResponse(
                export_extern,
                media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                headers={"Content-Disposition": "attachment; filename=cost_estimate_extern.xlsx"}
            )
        else:
            raise HTTPException(status_code=500, detail="Die Excel-Datei wurde nicht korrekt erstellt.")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Fehler beim Erstellen der Datei: {str(e)}")


# Prepare Word data for output
@app.post("/process_technischer_vorbeschrieb/")
async def process_text(file: UploadFile = File(...)):
    if not allowed_file(file.filename, category="text"):
        raise HTTPException(status_code=400, detail="Ungültiger Dateityp!")

    file_location = os.path.join(UPLOAD_FOLDER, file.filename)
    
    try:
        with open(file_location, "wb") as buffer:
            buffer.write(await file.read())
            #print(f"Datei {file.filename} gespeichert bei {file_location}")

        # input text for the formular
        massnahmennummer = "test"
        vergabenummer = "2024000185"
        massnahme = "Möbelierung des Gebäudes Freyeslebenstr. 1 für die Zentrale Universitätsverwaltung der FAU"
        leistung = "Lose Möbelierung ZUV LOS 2"
        positionsnummer = "2.3"
        introduction = 'Das anzubietende Highbacksofa-System soll durch seine große Produktfamilie viele Nutzungsmöglichkeiten bieten, die von Rückzug, über offene und dynamische Zonierungen für Mittelzonen, abbildbaren Raumstrukturen, bis hin zu eleganten und bequemen Kommunikationsbereichen reichen. '
        hint = 'Die angegebenen „ca.“ Maße und Werte sind Richtwerte, geringfügige Abweichungen bis maximal +/- 5%, die die Beschaffenheit und Funktion nicht beeinträchtigen, sind zulässig. Größere Abweichungen führen zum Ausschluss des Angebotes. Nicht abweichen dürfen die Außenmaße, die ohne „ca. Angaben“ vorgegeben werden.'
        #image = 'Data\picture.png'
        pdf_upload = process_pdf(file_location)
        print("upload sucessfull")
        furniture, summary = get_summary(document_data=pdf_upload)
        print("summary sucessfull")
        doc = create_document(massnahmennummer=massnahmennummer,
                              vergabenummer=vergabenummer,
                              massnahme=massnahme,
                              leistung=leistung,
                              produkt=furniture,
                              positionsnummer=positionsnummer,
                              introduction=introduction,
                              hint=hint,
                              #image=image,
                              output_path="technischer_vorbeschrieb.docx",
                              bulletpoints_dict=summary
                            )
        print("template finisch")

        # Check file format and sent back
        if isinstance(doc, io.BytesIO):
            doc.seek(0)

            return StreamingResponse(
                doc,
                media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                headers={"Content-Disposition": "attachment; filename=technischer_vorbeschrieb.docx"}
            )
        else:
            raise HTTPException(status_code=500, detail="Die Word-Datei wurde nicht korrekt erstellt.")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Fehler beim Erstellen der Datei: {str(e)}")
