import React from 'react';
import PhotoGallery from './PhotoGallery';
import Navigation from './Navigation';
const DEV_MODE = false;

const HeartIcon = () => (
    <span
        className="heart"
        onClick={(e) => {
            e.target.style.animation = 'none';
            setTimeout(() => {
                e.target.style.animation = 'heartbeat 0.5s ease-in-out 3';
            }, 10);
        }}
    >
        💕
    </span>
);

const StationCard = ({ station, stationKey, onNavigate, isPasswordUnlocked, onPasswordUnlock }) => {
    return (
        <div>
            <div className="station-header">
                <div className="station-number">{station.number}</div>
                <h2 className="station-title">{station.title} <HeartIcon /></h2>
            </div>

            <div className="memory-text">
                {station.memory.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        {index < station.memory.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ))}
            </div>

            <PhotoGallery
                photos={station.photos}
                stationTitle={station.title}
                isPasswordUnlocked={isPasswordUnlocked}
                onPasswordUnlock={onPasswordUnlock}
            />

            {station.hint && (
                <div className="hint-section">
                    <div className="hint-title">🔍 Hinweis zum nächsten Ort:</div>
                    <p>{station.hint}</p>
                    <div className="qr-instruction">
                        Löse das Rätsel und finde den nächsten QR-Code! 🕵️‍♀️
                    </div>
                </div>
            )}

            {/* DEV NAVIGATION - Kommentiere diese Zeile aus für Production */}
            {DEV_MODE && <Navigation station={station} onNavigate={onNavigate} />}
        </div>
    );
};

export default StationCard;