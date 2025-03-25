import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import DownloadModalText from './DownloadMoalText';
import Mammoth from "mammoth";
import './style/headline.css';
import './style/textgeneration.css';
import download from './images/download.png';

function TextGeneration({ pdfUrl }) {

  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wordText, setWordText] = useState("");

  useEffect(() => {
    setData(pdfUrl);
    
    if (pdfUrl) {
      fetch(pdfUrl)
        .then((response) => response.arrayBuffer())
        .then((buffer) => Mammoth.convertToHtml({ arrayBuffer: buffer }))
        .then((result) => setWordText(result.value))
        .catch((err) => console.error("Fehler beim Laden der Datei:", err));
    }
  }, [pdfUrl]);

  return (
    <div id="textcontainer" className="contentcontainer">

      <div className="head">
        <div className='headline'>
          <h3 className='headlinetext'>Technischer Vorbeschrieb</h3>
          <div className='image-container'>

            <DownloadModalText url={data} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <img src={download} alt="Downloadbutton" className='download' title='Download'
            onClick={() => setIsModalOpen(true)}/>
            <div className="hover-text">Klicke hier, um herunterzuladen</div> 
          </div>
        </div>
        <hr/>
      </div>
      
      <div>
        {wordText ? (
          <div className="word-content" dangerouslySetInnerHTML={{ __html: wordText }} />
        ) : (
          "Lade Dokument..."
        )}
      </div>


    </div>
  );
}

TextGeneration.propTypes = {
  result: PropTypes.object,
};

export default TextGeneration;
