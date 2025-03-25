import React from "react";
import { endpoints } from '../apiConfig';

function DownloadModalAmount({ data, isOpen, onClose }) {
  if (!isOpen) return null;

  // Download function
  async function handleDownload(type) {
    const url = endpoints[`excel_download_${type}`];

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Herunterladen der Datei");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = type === "internal" ? "cost_estimate_intern.xlsx" : "cost_estimate_extern.xlsx";
      document.body.appendChild(a);

      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
      
    } catch (error) {
      console.error("Download fehlgeschlagen:", error);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Download Optionen</h2>
        <button className="load" onClick={() => handleDownload("internal")}>
          Download Intern
        </button>
        <button className="load" onClick={() => handleDownload("external")}>
          Download Extern
        </button>
        <button onClick={onClose} className="load">
          Schließen
        </button>
      </div>
    </div>
  );
}

export default DownloadModalAmount;
