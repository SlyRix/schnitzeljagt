import React from 'react';

const StartScreen = ({ station, onNavigate }) => {
    return (
        <div className="start-screen">
            <div className="station-number">{station.number}</div>
            <h1 className="start-title">{station.title}</h1>
            <p className="start-subtitle">{station.subtitle}</p>
            <div className="memory-text">
                Heute nehme ich dich mit auf eine ganz besondere Rundfahrt. An jedem Ort wartet eine Erinnerung auf dich, die uns beide lächeln lassen wird.
                <br/><br/>
                Du findest an jedem Ort einen QR-Code, der dich zur nächsten Station führt. Bist du bereit für unser Abenteuer?
            </div>
            <div className="navigation">
                <button className="nav-button" onClick={() => onNavigate('pingpong')}>
                    Los geht's! 🚗
                </button>
            </div>
        </div>
    );
};

export default StartScreen;