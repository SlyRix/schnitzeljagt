import React from 'react';

const StartScreen = ({ station, onNavigate }) => {
    return (
        <div className="start-screen">
            <div className="birthday-decoration">🎉 🎂 🎈</div>
            <div className="station-number">{station.number}</div>
            <h1 className="start-title">Happy Birthday Sivani! 🎉</h1>
            <div className="age-celebration">Du wirst 26! ✨</div>
            <p className="start-subtitle">{station.subtitle}</p>
            <div className="memory-text">
                <strong>Meine liebste Sivani,</strong>
                <br/><br/>
                heute nehme ich dich mit auf eine ganz besondere Geburtstagsreise durch unsere schönsten Erinnerungen. An jedem Ort wartet eine Geschichte auf dich, die uns beide lächeln lassen wird.
                <br/><br/>
                Du findest an jedem Ort einen QR-Code, der dich zur nächsten Station führt.
                <br/><br/>
                Bist du bereit für dein Geburtstags-Abenteuer 2025? 🚗💕
            </div>
            <div className="navigation">
                <button className="nav-button birthday-button" onClick={() => onNavigate('pingpong')}>
                    Let's go, Birthday Girl! 🎊
                </button>
            </div>
        </div>
    );
};

export default StartScreen;