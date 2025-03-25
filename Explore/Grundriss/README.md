<a id="readme-top"></a>
# Auslesen und Zählen der Möbel im Grundriss

Ziel dieser Analyse ist es die Möbelstücke sowie deren Stückzahlen aus dem Grundriss zu extrahieren. Bislang wurde dieser Prozessschritt in der Regel manuell durchgeführt: Die Pläne wurden ausgedruckt, die einzelnen Produkte händisch gezählt und in eine Liste übertragen. Dieses Vorgehen ist jedoch äußerst zeitaufwändig und fehleranfällig.

<p align="center">
  <img src="Stückzahlen_Prozess.png" alt="Floorplan" width="1000">
</p>

<br>
<p align="right">(<a href="README.md">back to main</a>)</p>

## Überblick

Im Rahmen einer explorativen Auseinandersetzung mit dieser Problemstellung wurden insgesamt vier verschiedene Ansätze identifiziert, wie die Stückzahlen effizienter aus dem vorliegenden Grundriss extrahiert werden könnten.

1. <a href="#Vernwendung-eines-Pretraind-Model">Verwendung eines Pretraind Models aus dem Bereich der künstlichen Intelligenz</a>
2. <a href="#Auslesen-der-Metadaten">Auslesen der Metadaten aus dem dxf Dateiformat</a>
3. <a href="#Verwendung-der-AutoCAD-SDKs">Abruf der Metadaten aus dem Backend von AutoCAD über eine API Schnittstelle</a>

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Vernwendung-eines-Pretraind-Model -->
## 1. Vernwendung eines Pretraind Model

 > *Ein pretrained Modell ist ein Machine Learning Modell, das bereits auf umfangreichen Datensätzen vortrainiert wurde.*

Der Prozess zur Erfassung von Stückzahlen lässt sich in zwei Hauptteilbereiche unterteilen:

- **Erkennung und Klassifizierung von Möbelstücken** durch Object-Detection-Algorithmen.
- **Texterkennung und -zuordnung** durch OCR-Algorithmen.

Hierbei ist es wichtig, dass der Grundriss im **PNG-Format** vorliegen, da **Object-Detection-Algorithmen** speziell für Bilddaten entwickelt wurden. Sollte der Grundriss im **PDF-Format** vorliegen, ist eine <a href="https://pypi.org/project/pdf2image/">**programmierte Konvertierung**</a> in ein unterstütztes Bildformat möglich.


### Erkennung und Klassifizierung der Möbelstücke mithilfe von YOLO
> <a href="https://yolov8.com/">**YOLO (You Only Look Once)**</a> ist ein leistungsstarker Object-Detection-Algorithmus, der durch seine Fähigkeit, Objekte in einem einzigen Durchlauf zu erkennen, eine schnelle und präzise Echtzeit-Analyse ermöglicht, was ihn besonders effizient für Anwendungen mit hohem Geschwindigkeitsbedarf macht.


### Optimierung der Ergebnisse durch SAHI
> <a href="https://github.com/obss/sahi">**SAHI (Slicing Aided Hyper Inference)**</a>  ist eine Technik zur Optimierung der Objekterkennung, bei der Bilder in kleinere Abschnitte unterteilt werden, um die Genauigkeit bei der Analyse von großformatigen und hochauflösenden Bildern zu verbessern, indem die Objekte in jedem Abschnitt einzeln erkannt und anschließend zusammengeführt werden.


### Erkennen der Text im Bild mit OCR
> <a href="https://github.com/tesseract-ocr/tesseract">**OCR (Optical Character Recognition)**</a>  ist eine Technologie zur Texterkennung aus Bildern, die es ermöglicht, gedruckte oder handschriftliche Zeichen in maschinenlesbaren Text umzuwandeln, wodurch wertvolle Informationen aus Bildern, wie Grundrissen, extrahiert und weiterverarbeitet werden können.


Der Ansatz wurde nicht weiterverfolgt, da OCR Schwierigkeiten bei der Erkennung komplexer oder unklarer Zeichnungen hat und YOLO bei der Identifikation kleiner oder dicht gruppierter Objekte an seine Grenzen stößt, trotz der Optimierung durch SAHI. Zudem erfordert das Finetuning des Modells einen qualitativ hochwertigen, annotierten Trainingsdatensatz, was mit einem hohen Labelingaufwand verbunden ist.

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Auslesen-der-Metadaten -->
## Auslesen der Metadaten

 Um in der Explorationsphase einen ersten Einblick in die Metadaten zu erhalten, wurde der Grundriss zunächst im DXF-Format exportiert, anschließend in Python eingelesen und analysiert. 


> Das <a href="#(https://www.mr-beam.org/blogs/news/was-ist-eine-dxf-datei?srsltid=AfmBOoqbNT6jm_9h0TOV4TvnnVFnEbf8UkseTSB-9TqvOsgEyTjqRW4s)">**DXF-Format** (Drawing Exchange Format)</a> zeichnet sich durch seine **plattformunabhängige Struktur** aus, die den Austausch von 2D- und 3D-Konstruktionsdaten zwischen verschiedenen CAD-Programmen erleichtert.
Neben geometrischen Daten wie Linien, Kreisen und Polygonen enthält das DXF-Format auch **Metadaten**, die Informationen zu weiteren **Attributen** umfassen.

Mithhilfe der <a href="(https://ezdxf.readthedocs.io/en/stable/))">**ezdxf** Library</a> können auf einfache Weise geometrische und metadatenbasierte Informationen aus DXF-Dateien extrahiert werden, um so die Möbelstücke und deren Anzahl zu ermitteln.


```python
  # Instalatoin
    %pip install ezdxf
```
    


<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Verwendung-der-AutoCAD-SDKs -->
## Verwendung der AutoCAD SDKs

Da die Erstellung der Grundrisse mit <a href="#(https://www.autodesk.com/de/products/autocad/overview?term=1-YEAR&tab=subscription&plc=ACDIST)">**AutoCAD**</a> erfolgt, bietet sich eine einfachere und weniger fehleranfällige Alternative zu den zuvor genannten Optionen an. Statt auf KI-basierte Methoden zurückzugreifen, können die <a href="https://pypi.org/project/pyautocad/">**Python-SDKs von AutoCAD**</a>  genutzt werden, um Metadaten direkt aus den AutoCAD-Dateien auszulesen. Diese Vorgehensweise ermöglicht eine präzise und effiziente Erfassung der Möbelstückbezeichnungen und Stückzahlen mit geringerem Aufwand und reduziertem Fehlerrisiko, da die Daten direkt aus dem Backend über einen Datenbankabruf ausgelesen werden und nicht erst von einer KI ermittelt werden müssen.

```python
# Instalation und Import
%pip install pyautocad
from pyautocad import Autocad, APoint

# AutoCAD-Anwendung initialisieren
acad = Autocad(create_if_not_exists=True)
print(f"AutoCAD Version: {acad.app.Name}")

```

Nach der Instalation und der Initialisierung können die Objekte abgefragt werden. Mehr findet sich hierzu in der <a href="https://pyautocad.readthedocs.io/en/latest/">**Dokumentation von pyautocad**</a>. In Bezug auf dieses Digitalisierungsprojekt, wären diese Methoden für die Implementierung von Bedeutung:

```python
# Aktives Dokument (die geöffnete Zeichnung) abrufen
doc = acad.doc

# Durch alle Objekte in der Zeichnung gehen und Informationen abrufen
for obj in acad.iter_objects():
    # Gefundene Objekte anzeigen
    print(f"Objekt gefunden: {obj.ObjectName}")
    # Den Layer des Objekts ausgeben
    print(f"Das Objekt befindet sich in Layer: {obj.Layer}")
```


