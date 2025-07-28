import React from 'react';
import Navigation from './Navigation';
import PhotoGallery from './PhotoGallery';

const HeartIcon = () => (
    <span className="heart">❤️</span>
);

const FinalScreen = ({ station, onNavigate }) => {
    return (
        <div>
            <div className="station-header">
                <div className="station-number">{station.number}</div>
                <h2 className="station-title">{station.title} <HeartIcon /></h2>
            </div>

            <div className="final-screen">
                <h1 className="final-title">Herzlichen Glückwunsch!</h1>
                <div className="memory-text">
                    {station.memory.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index < station.memory.split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </div>

                <PhotoGallery photos={station.photos} stationTitle={station.title} />
            </div>

            <Navigation
                station={station}
                onNavigate={onNavigate}
                isFinal={true}
            />
        </div>
    );
};

export default FinalScreen;