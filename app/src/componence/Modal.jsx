import React from 'react';

function Modal({ isOpen, files, errors, dropzoneProps, onUpload, onClose }) {
  if (!isOpen) return null;

  const fileTypes = ['excel', 'pdf', 'dxf'];

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Dateien auswählen</h2>
        <div className="dropzone-container">
          {fileTypes.map((type) => (
            <div key={type} className="dropzone">
              <div {...dropzoneProps[type].getRootProps()}>
                <input {...dropzoneProps[type].getInputProps()} />
                <p className="title-upload">{type.toUpperCase()}</p>
                {files[type] ? <p className="file-name">{files[type].name}</p> : <p>Datei hierher ziehen...</p>}
                {errors[type] && <p className="error">{errors[type]}</p>}
              </div>
              <button onClick={() => onUpload(type)} className="load">Hochladen</button>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="load">Schließen</button>
      </div>
    </div>
  );
}

export default Modal;
