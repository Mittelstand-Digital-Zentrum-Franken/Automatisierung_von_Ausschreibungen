import React, { useState } from 'react';
import './style/floorplan.css';
import './style/headline.css';
import download from './images/download.png'
import floorplan1 from './images/floorplan1.png'
import floorplan2 from './images/floorplan2.png'



function FloorPlan() {

  // Handle taps
  const [activeTab, setActiveTab] = useState('Grundriss');
  const [currentFloorplanIndex, setCurrentFloorplanIndex] = useState(0);

  // List of images
  const floorplans = [floorplan1, floorplan2];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Change images
  const handleNextFloorplan = () => {
    setCurrentFloorplanIndex((currentFloorplanIndex + 1) % floorplans.length);
  };
  
  const handlePreviousFloorplan = () => {
    setCurrentFloorplanIndex(
      (currentFloorplanIndex - 1 + floorplans.length) % floorplans.length
    );
  };


  return (
    <div className="contentcontainer">
      <div className="head">
        <div className='headline'>
          <h3 className='headlinetext'>Liste der Möbelstücke (Laut Grundriss)</h3>
          <div className='image-container'>
            <img src={download} alt="Downloadbutton" className='download' title='Download'/>
            <div className="hover-text">Klicke hier, um herunterzuladen</div> 
          </div>
        </div>
        <hr/>
      </div>

      <div className="tabs-container">
        <div
          onClick={() => handleTabClick('Grundriss')}
          className={`tab ${activeTab === 'Grundriss' ? 'active' : ''}`}
        >
          Grundriss
        </div>
        <div
          onClick={() => handleTabClick('Liste')}
          className={`tab ${activeTab === 'Liste' ? 'active' : ''}`}
        >
          Liste
        </div>
      </div>

      <div>
        {activeTab === 'Grundriss' && (
          <div className="floorplan-container">
            <button className="arrow-button" onClick={handlePreviousFloorplan}>
              ❮
            </button>
            <img
              src={floorplans[currentFloorplanIndex]}
              alt="Floorplan"
              className="floorplan"
              title="Grundriss"
            />
            <button className="arrow-button" onClick={handleNextFloorplan}>
              ❯
            </button>
          </div>
        )}
        
        {activeTab === 'Liste' && (
          <div>
            <h2>Liste</h2>
            <p>Hier wird die Liste angezeigt.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FloorPlan;
