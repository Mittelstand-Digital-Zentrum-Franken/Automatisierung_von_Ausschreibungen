import React from "react";
import PropTypes from "prop-types";
import "./style/modal.css";
import './style/slidebar.css';

function NewTableModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;
  const tableData = data?.result && Array.isArray(data.result) ? data.result : [];

  return (
    <div className="neutral-container">
        <div className="modal-overlay">
        <div className="modal-content">
            <h3>Neutralisierte Wörter</h3>
            <table>
            <thead>
                <tr>
                <th>Erkannte Wörter</th>
                <th>Ersetzt durch</th>
                </tr>
            </thead>
            <tbody>
                {tableData.length > 0 ? (
                    Array.from(new Set(  
                    tableData.flatMap((item) => 
                        Array.isArray(item.neutralise) 
                        ? item.neutralise.flatMap(word => word.split(", "))
                        : item.neutralise.split(", ")
                    )
                    )).map((word, index) => (
                    <tr key={index}>
                        <td>{word}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td>Keine Daten verfügbar</td>
                    </tr>
                )}
            </tbody>


            </table>
            <button onClick={onClose} className="load">Schließen</button>
        </div>
        </div>
    </div>
  );
}

NewTableModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewTableModal;
