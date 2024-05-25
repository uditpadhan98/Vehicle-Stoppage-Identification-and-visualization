import { useEffect, useState } from 'react';
import './App.css';
import MapComponent from './components/mapComponent';
import { processGPSData } from "./Utils/ProcessData";
import gpsData from "./data/gps_data.json";


function App() {
  const [thresholdTime, setThresholdTime] = useState();
  const [processedData, setProcessedData] = useState({
    path: [],
    stoppages: [],
  });

  useEffect(() => {
    const result = processGPSData(gpsData, thresholdTime);
    setProcessedData(result);
  }, [thresholdTime]);

  const handleThresholdTimeChange = (e) => {
    const newThresholdTime = parseInt(e.target.value);
    setThresholdTime(newThresholdTime);
  };

  return (
    <div>
      <div className="input_container">
        <input
          placeholder="Enter time in Minutes"
          type="number"
          value={thresholdTime}
          onChange={handleThresholdTimeChange}
        />
      </div>
      <MapComponent
        path={processedData.path}
        stoppages={processedData.stoppages}
      />
    </div>
  );
}

export default App;
