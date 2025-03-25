import React, { useState, useEffect } from "react";

function DownloadModalText({ url, isOpen, onClose }) {
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    setDownloadUrl(url);
  }, [url]);

  if (!isOpen) return null;

  async function handleDownload() {
    if (!downloadUrl) {
      console.error("Kein Download-URL verfügbar.");
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = "technischer_vorbeschrieb.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download fehlgeschlagen:", error);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Download des <br />Technischen Vorbeschriebs</h2>
        <button className="load" onClick={handleDownload}>
          Download
        </button>
        <button onClick={onClose} className="load">
          Schließen
        </button>
      </div>
    </div>
  );
}

export default DownloadModalText;
