import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import StationCard from './components/StationCard';
import FinalScreen from './components/FinalScreen';
import { stations } from './data/stations';

function App() {
  const [currentStation, setCurrentStation] = useState('start');
  const [isPasswordUnlocked, setIsPasswordUnlocked] = useState(false);

  // Get station from URL hash on component mount
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && stations[hash]) {
      setCurrentStation(hash);
    }
  }, []);

  // Update URL when station changes
  const navigateToStation = (stationId) => {
    setCurrentStation(stationId);
    window.location.hash = stationId;
    window.scrollTo(0, 0);
  };

  // Handle password unlock
  const handlePasswordUnlock = () => {
    setIsPasswordUnlocked(true);
  };

  const currentStationData = stations[currentStation];

  if (!currentStationData) {
    return <div className="container">Station nicht gefunden</div>;
  }

  return (
      <div className="container">
        <div className="station active">
          {currentStationData.isStart && (
              <StartScreen
                  station={currentStationData}
                  onNavigate={navigateToStation}
              />
          )}
          {currentStationData.isFinal && (
              <FinalScreen
                  station={currentStationData}
                  onNavigate={navigateToStation}
                  isPasswordUnlocked={isPasswordUnlocked}
                  onPasswordUnlock={handlePasswordUnlock}
              />
          )}
          {!currentStationData.isStart && !currentStationData.isFinal && (
              <StationCard
                  station={currentStationData}
                  stationKey={currentStation}
                  onNavigate={navigateToStation}
                  isPasswordUnlocked={isPasswordUnlocked}
                  onPasswordUnlock={handlePasswordUnlock}
              />
          )}
        </div>
      </div>
  );
}

export default App;