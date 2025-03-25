import React from 'react';

function DropzoneField({ label, getRootProps, getInputProps, file, error, onUpload }) {
  return (
    <div className="dropzone">
      <div {...getRootProps()}>
        <p className="title-upload">{label}</p>
        <input {...getInputProps()} />
        {file ? <p className="file-name">{file.name}</p> : <p>Ziehe eine Datei hierher oder klicke, um eine auszuwählen</p>}
        {error && <p className="error">{error}</p>}
      </div>
      <div className="button-container">
        <button onClick={onUpload} className="load">Hochladen</button>
      </div>
    </div>
  );
}

export default DropzoneField;
