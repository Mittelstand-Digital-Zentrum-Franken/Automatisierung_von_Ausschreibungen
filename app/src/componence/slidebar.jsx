import React, { useState } from 'react';
import './style/slidebar.css';
import logo from './images/logo.png';
import InputField from './input';
import Modal from './Modal';
import { CreateDropzoneProps } from './dropzoneConfig';
import { endpoints } from '../apiConfig';


function Slidebar({ setResult, setPdfUrl }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState({excel: null, pdf: null, dxf: null});
  const [errors, setErrors] = useState({excel: '', pdf: '', dxf: ''});

  // Handle toggle
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  // Wrong file format
  const onDrop = (type) => (acceptedFiles, rejectedFiles) => {
    setErrors((prev) => ({ ...prev, [type]: rejectedFiles.length ? `Ungültiges Format! ${type.toUpperCase()} erwartet.` : '' }));
    if (acceptedFiles.length) setFiles((prev) => ({ ...prev, [type]: acceptedFiles[0] }));
  };
  
  const handleFileUpload = async (fileType) => {
    const file = files[fileType];
    if (!file) return alert(`Bitte eine ${fileType.toUpperCase()}-Datei auswählen!`);
  
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const response = await fetch(endpoints[fileType], { method: "POST", body: formData });
  
      if (!response.ok) throw new Error(`Fehler beim Upload der ${fileType}`);
  
      // Response
      if (fileType === 'excel') {
        const data = await response.json();
        setResult(data.result || "Kein Ergebnis erhalten.");
      }
      else if (fileType === 'pdf') {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        alert("pdf im frontend angekommen")
        // Beispiel: PDF im Browser anzeigen
        // const link = document.createElement('a');
        // link.href = url;
        // link.target = '_blank';  // Öffnet das PDF in einem neuen Tab
        // link.click();
      } 
    } catch (error) {
      console.error(error);
      alert(`Fehler beim Hochladen der ${fileType.toUpperCase()}-Datei.`);
    }
  };
  
  // Dropzone
  const dropzoneProps = ['excel', 'pdf', 'dxf'].reduce((acc, type) => ({
    ...acc,
    [type]: CreateDropzoneProps(type, onDrop),
  }), {});


  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <img src={logo} className="logo" alt="Logo" />
      <button onClick={toggleSidebar} className="toggle-button">
        {isOpen ? '❮' : '❯'}
      </button>

      {isOpen && (
        <div className="menu-content">
          <h2 className='project-title'>Projekt</h2>
          <hr className='project-hr' />
          <div className="project-info">
            <InputField label="Kunde" id="customer" value="Musterman" />
            <InputField label="Kundennummer" id="customerId" value="12345" />
            <InputField label="Auftragsnummer" id="orderNumber" value="6789" />
            <InputField label="Vergabenummer" id="contractNumber" value="XXXXX" />
          </div>

          <button className="load" onClick={toggleModal}>
            Dateien auswählen
          </button>
          <Modal
            isOpen={isModalOpen}
            files={files}
            errors={errors}
            dropzoneProps={dropzoneProps}
            onUpload={handleFileUpload}
            onClose={toggleModal}
          />

          <button className="load">Weblink</button>

        </div>
      )}
    </div>
  );
}

export default Slidebar;
