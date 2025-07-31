import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import StationCard from './components/StationCard';
import FinalScreen from './components/FinalScreen';
import { stations } from './data/stations';

function App() {
  const [currentStation, setCurrentStation] = useState('start');
  const [isPasswordUnlocked, setIsPasswordUnlocked] = useState(false);

  // Handle hash changes from URL (including QR code scans)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      console.log('Hash changed to:', hash); // Debug log

      if (hash && stations[hash]) {
        setCurrentStation(hash);
        window.scrollTo(0, 0);
      } else if (!hash) {
        // If no hash, go to start
        setCurrentStation('start');
      }
    };

    // Check hash on initial load
    handleHashChange();

    // Listen for hash changes (QR code scans, back/forward buttons, etc.)
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup event listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Update URL when station changes programmatically
  const navigateToStation = (stationId) => {
    if (stationId !== currentStation) {
      setCurrentStation(stationId);
      window.location.hash = stationId;
      window.scrollTo(0, 0);
    }
  };

  // Handle password unlock
  const handlePasswordUnlock = () => {
    setIsPasswordUnlocked(true);
  };

  const currentStationData = stations[currentStation];

  if (!currentStationData) {
    return (
        <div className="container">
          <div className="station">
            <h2>Station nicht gefunden 😕</h2>
            <p>Die angeforderte Station "{currentStation}" existiert nicht.</p>
            <button
                className="nav-button"
                onClick={() => navigateToStation('start')}
            >
              Zurück zum Start
            </button>
          </div>
        </div>
    );
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