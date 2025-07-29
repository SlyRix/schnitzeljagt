import React from 'react';
import Navigation from './Navigation';
import PhotoGallery from './PhotoGallery';

const HeartIcon = () => (
    <span className="heart">💕</span>
);

const FinalScreen = ({ station, onNavigate, isPasswordUnlocked, onPasswordUnlock }) => {
    return (
        <div>
            <div className="station-header">
                <div className="birthday-decoration">🎊 🎂 🎈 🎁 🎉</div>
                <div className="station-number">{station.number}</div>
                <h2 className="station-title">{station.title} <HeartIcon /></h2>
            </div>

            <div className="final-screen">
                <h1 className="final-title">🎉 Mission erfüllt! 🎉</h1>
                <div className="birthday-message">
                    <div className="big-age">2️⃣6️⃣</div>
                    <div className="birthday-wishes">
                        Alles Liebe zum Geburtstag, Sivani! ✨
                    </div>
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

                <div className="birthday-footer">
                    <div className="celebration-text">
                        🎂 Sivani's 26. Geburtstag 2025 🎂
                    </div>
                    <div className="love-message">
                        Eine Reise durch unsere Erinnerungen 💕
                    </div>
                </div>
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