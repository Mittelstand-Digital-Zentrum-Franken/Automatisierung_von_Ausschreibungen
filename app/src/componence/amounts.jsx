import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import DownloadModalAmount from './DownloadMoalAmount';
import './style/headline.css';
import download from './images/download.png'
import Table from "./table";

function Amounts({ result }) {

  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setData(result);
  }, [result]);

  return (
    <div className="contentcontainer">

      <div className="head">
        <div className='headline'>
          <h3 className='headlinetext'>Mengengerüst</h3>
          <div className='image-container'>

            <DownloadModalAmount data={data} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <img src={download} alt="Downloadbutton" className='download' title='Download'
            onClick={() => setIsModalOpen(true)}/>
            <div className="hover-text">Klicke hier, um herunterzuladen</div> 
          </div>
        </div>
        <hr/>
      </div>
      
      <div className="scroll-container">
        {data ? <Table data={data} /> : <p></p>}
      </div>

    </div>
  );
}

Amounts.propTypes = {
  result: PropTypes.object,
};

export default Amounts;
