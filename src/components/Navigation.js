import React from 'react';

const Navigation = ({ station, onNavigate, isFinal = false }) => {
    return (
        <div className="navigation">
            {/*{station.prevStation && (*/}
            {/*    <button className="nav-button" onClick={() => onNavigate(station.prevStation)}>*/}
            {/*        ← Zurück*/}
            {/*    </button>*/}
            {/*)}*/}
            {station.nextStation && (
                <button className="nav-button" onClick={() => onNavigate(station.nextStation)}>
                    {station.nextStation === 'essen' ? 'Zum Finale! →' : 'Weiter! →'}
                </button>
            )}
            {isFinal && (
                <button className="nav-button" onClick={() => onNavigate('start')}>
                    Nochmal erleben ❤️
                </button>
            )}
        </div>
    );
};

export default Navigation;