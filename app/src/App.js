import React, { useState } from 'react';
import Slidebar from './componence/slidebar.jsx';
import FloorPlan from './componence/floorplan.jsx';
import Amounts from './componence/amounts.jsx';
import TextGeneration from './componence/textgeneration.jsx';
import './index.css'
import { useEffect } from 'react';

function App() {
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (result !== null) {
      console.log("Result wurde gesetzt:", result);
    }
  }, [result]);

  const [pdfUrl, setPdfUrl] = useState(null);
  useEffect(() => {
    if (pdfUrl !== null) {
      console.log("pdfUrl wurde gesetzt:", pdfUrl);
    }
  }, [pdfUrl]);

  return (
    <div className="App">
      <Slidebar setResult={setResult} setPdfUrl={setPdfUrl} />
      <div className="content">
        <div className="column">
          <FloorPlan />
          <Amounts result={result} />
        </div>
        <div className="column">
          <TextGeneration pdfUrl={pdfUrl} />
        </div>
      </div>
    </div>
  );
}

export default App;
