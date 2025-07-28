import React, { useState } from 'react';

const PhotoGallery = ({ photos, stationTitle }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!photos || photos.length === 0) {
        return (
            <div className="photo-placeholder">
                📸 Hier deine Fotos einfügen
            </div>
        );
    }

    const nextPhoto = () => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
    };

    const prevPhoto = () => {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    const goToPhoto = (index) => {
        setCurrentIndex(index);
    };

    // Wenn nur ein Foto, zeige es einfach ohne Swipe-Funktionalität
    if (photos.length === 1) {
        return (
            <div className="photo-gallery single">
                <img
                    src={photos[0]}
                    alt={`${stationTitle} - Foto`}
                    className="gallery-image"
                />
            </div>
        );
    }

    return (
        <div className="photo-gallery">
            <div className="gallery-container">
                <button className="gallery-nav prev" onClick={prevPhoto}>
                    ←
                </button>

                <div className="gallery-main">
                    <img
                        src={photos[currentIndex]}
                        alt={`${stationTitle} - Foto ${currentIndex + 1}`}
                        className="gallery-image"
                    />

                    {/* Photo counter */}
                    <div className="photo-counter">
                        {currentIndex + 1} / {photos.length}
                    </div>
                </div>

                <button className="gallery-nav next" onClick={nextPhoto}>
                    →
                </button>
            </div>

            {/* Dots indicator */}
            <div className="gallery-dots">
                {photos.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToPhoto(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;