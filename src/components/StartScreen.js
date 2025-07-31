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
                <strong>My Little Pingu 🐧,</strong>
                <br/><br/>
                hüt nimmi dich mit uf en Geburtstagsreis, wo mir zämme üsi schönschi Erinnerige teilet. Jedem Ort wartet e Gschicht uf dich, wo eus beide zum Lächeln bringt.
                <br/><br/>
                A jedi Station wartet e QR-Code uf dich, wo dich zum nächschte Ort fühert.
                <br/><br/>
                <strong>Bisch ready für din Geburtstags-Abentür? 🚗💕</strong>
            </div>

            <div className="hint-section">
                <div className="hint-title">🔍 Dini erschti Mission:</div>
                <p>Dini Ersti Station isch üse Pingpong-Platz, wo mer zämme glacht hand und mad weg gloffe sind.🙈</p>
                <div className="qr-instruction">
                    Finde den ersten QR-Code dort und scanne ihn! 🏓🕵️‍♀️
                </div>
            </div>

            <div className="navigation">

            </div>
        </div>
    );
};

export default StartScreen;