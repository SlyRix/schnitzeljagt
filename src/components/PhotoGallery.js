import React, { useState, useRef, useEffect } from 'react';

const PhotoGallery = ({ photos, stationTitle }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const containerRef = useRef(null);
    const videoRef = useRef(null);

    // Fallback wenn keine Fotos/Videos
    if (!photos || photos.length === 0) {
        return (
            <div className="photo-placeholder">
                📸 Hier deine Fotos/Videos einfügen
            </div>
        );
    }

    const nextPhoto = () => {
        if (!photos || photos.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % photos.length);
    };

    const prevPhoto = () => {
        if (!photos || photos.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    const goToPhoto = (index) => {
        if (!photos || index < 0 || index >= photos.length) return;
        setCurrentIndex(index);
    };

    // Prüfe ob aktuelles Item ein Video ist
    const isVideo = (item) => {
        if (!item) return false; // Null-Check hinzugefügt
        if (typeof item === 'string') {
            return item.toLowerCase().includes('.mp4') ||
                item.toLowerCase().includes('.mov') ||
                item.toLowerCase().includes('.webm');
        }
        return item && item.type === 'video'; // Zusätzlicher Null-Check
    };

    // URL extrahieren (falls es ein Objekt ist)
    const getItemSrc = (item) => {
        if (!item) return ''; // Null-Check hinzugefügt
        return typeof item === 'string' ? item : (item.src || '');
    };

    // Auto-play Video wenn auf Video gewechselt wird
    useEffect(() => {
        if (videoRef.current &&
            photos &&
            photos[currentIndex] &&
            isVideo(photos[currentIndex])) {
            // Versuche Video mit Ton zu starten
            videoRef.current.muted = false;
            videoRef.current.play().catch((error) => {
                // Falls autoplay mit Ton blockiert wird, versuche es stumm
                console.log('Autoplay mit Ton wurde blockiert:', error);
                if (videoRef.current) {
                    videoRef.current.muted = true;
                    videoRef.current.play().catch(() => {
                        console.log('Auch stummer Autoplay wurde blockiert');
                    });
                }
            });
        }
    }, [currentIndex, photos]);

    // Touch Start
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsSwiping(true);
    };

    // Touch End
    const handleTouchEnd = (e) => {
        if (!isSwiping) return;

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const minSwipeDistance = 50;

        if (diff > minSwipeDistance) {
            nextPhoto(); // Swipe links = nächstes
        } else if (diff < -minSwipeDistance) {
            prevPhoto(); // Swipe rechts = vorheriges
        }

        setIsSwiping(false);
    };

    // Mouse Events für Desktop
    const handleMouseDown = (e) => {
        setStartX(e.clientX);
        setIsSwiping(true);
    };

    const handleMouseUp = (e) => {
        if (!isSwiping) return;

        const endX = e.clientX;
        const diff = startX - endX;
        const minSwipeDistance = 50;

        if (diff > minSwipeDistance) {
            nextPhoto();
        } else if (diff < -minSwipeDistance) {
            prevPhoto();
        }

        setIsSwiping(false);
    };

    // Nur ein Item (Foto oder Video) - mit Null-Check
    if (photos.length === 1) {
        const singleItem = photos[0];
        if (!singleItem) {
            return (
                <div className="photo-placeholder">
                    📸 Foto wird geladen...
                </div>
            );
        }

        const itemSrc = getItemSrc(singleItem);
        const singleIsVideo = isVideo(singleItem);

        return (
            <div className="photo-gallery-new">
                <div className="gallery-wrapper-new">
                    {singleIsVideo ? (
                        <video
                            ref={videoRef}
                            src={itemSrc}
                            className="gallery-image-new gallery-video-new"
                            controls
                            playsInline
                            autoPlay
                            loop
                            key={currentIndex}
                        />
                    ) : (
                        <img
                            src={itemSrc}
                            alt={`${stationTitle} - Foto`}
                            className="gallery-image-new"
                            draggable={false}
                        />
                    )}
                </div>
            </div>
        );
    }

    // Aktuelles Item - mit Null-Check
    const currentItem = photos && photos[currentIndex] ? photos[currentIndex] : null;
    if (!currentItem) {
        return (
            <div className="photo-placeholder">
                📸 Foto wird geladen...
            </div>
        );
    }

    const currentIsVideo = isVideo(currentItem);
    const currentSrc = getItemSrc(currentItem);

    return (
        <div className="photo-gallery-new">
            {/* Haupt-Galerie */}
            <div
                ref={containerRef}
                className="gallery-wrapper-new swipeable"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                {currentIsVideo ? (
                    <video
                        ref={videoRef}
                        src={currentSrc}
                        className="gallery-image-new gallery-video-new"
                        controls
                        playsInline
                        loop
                        key={currentIndex}
                    />
                ) : (
                    <img
                        src={currentSrc}
                        alt={`${stationTitle} - ${currentIsVideo ? 'Video' : 'Foto'} ${currentIndex + 1}`}
                        className="gallery-image-new"
                        draggable={false}
                    />
                )}

                {/* Pfeil-Buttons */}
                <button
                    className="arrow-btn-new prev-arrow-new"
                    onClick={prevPhoto}
                >
                    ←
                </button>
                <button
                    className="arrow-btn-new next-arrow-new"
                    onClick={nextPhoto}
                >
                    →
                </button>

                {/* Counter mit Icon */}
                <div className="photo-counter-new">
                    {currentIsVideo ? '🎥' : '📸'} {currentIndex + 1} / {photos.length}
                </div>

                {/* Swipe-Hint */}
                <div className="swipe-hint-new">
                    ← Swipe →
                </div>
            </div>

            {/* Dots mit Video-Icons */}
            <div className="gallery-dots-new">
                {photos.map((item, index) => (
                    <button
                        key={index}
                        className={`dot-new ${index === currentIndex ? 'active' : ''} ${isVideo(item) ? 'video-dot' : ''}`}
                        onClick={() => goToPhoto(index)}
                        title={isVideo(item) ? 'Video' : 'Foto'}
                    >
                        {isVideo(item) && <span className="dot-icon">🎥</span>}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;