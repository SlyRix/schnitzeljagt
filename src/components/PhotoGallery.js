import React, { useState, useRef, useEffect } from 'react';
import PasswordModal from './PasswordModal';

const PhotoGallery = ({ photos, stationTitle, isPasswordUnlocked, onPasswordUnlock }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
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

        // Prüfe ob das gewählte Foto geschützt ist
        const selectedItem = photos[index];
        if (isProtected(selectedItem) && !isPasswordUnlocked) {
            setShowPasswordModal(true);
            return;
        }

        setCurrentIndex(index);
    };

    // Prüfe ob Item geschützt ist
    const isProtected = (item) => {
        if (!item) return false;
        return item.protected === true;
    };

    // Prüfe ob aktuelles Item ein Video ist
    const isVideo = (item) => {
        if (!item) return false;
        if (typeof item === 'string') {
            return item.toLowerCase().includes('.mp4') ||
                item.toLowerCase().includes('.mov') ||
                item.toLowerCase().includes('.webm');
        }
        return item && item.type === 'video';
    };

    // URL extrahieren (falls es ein Objekt ist)
    const getItemSrc = (item) => {
        if (!item) return '';
        return typeof item === 'string' ? item : (item.src || '');
    };

    // Handle protected content click
    const handleProtectedClick = () => {
        setShowPasswordModal(true);
    };

    // Handle password success
    const handlePasswordSuccess = () => {
        onPasswordUnlock();
    };

    // Auto-play Video wenn auf Video gewechselt wird
    useEffect(() => {
        if (videoRef.current &&
            photos &&
            photos[currentIndex] &&
            isVideo(photos[currentIndex]) &&
            (!isProtected(photos[currentIndex]) || isPasswordUnlocked)) {
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
    }, [currentIndex, photos, isPasswordUnlocked]);

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

    // Render protected placeholder
    const renderProtectedPlaceholder = (item) => {
        const itemIsVideo = isVideo(item);
        return (
            <div className="protected-content" onClick={handleProtectedClick}>
                <div className="protected-overlay">
                    <div className="protected-icon">🔐</div>
                    <div className="protected-text">
                        {itemIsVideo ? 'Geschütztes Video' : 'Geschütztes Foto'}
                    </div>
                    <div className="protected-hint">
                        Tippe um freizuschalten 💕
                    </div>
                </div>
                <div className="protected-blur">
                    {itemIsVideo ? (
                        <div className="video-placeholder">🎥</div>
                    ) : (
                        <div className="photo-placeholder-protected">📸</div>
                    )}
                </div>
            </div>
        );
    };

    // Nur ein Item (Foto oder Video)
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
        const singleIsProtected = isProtected(singleItem);

        return (
            <div className="photo-gallery-new">
                <div className="gallery-wrapper-new">
                    {singleIsProtected && !isPasswordUnlocked ? (
                        renderProtectedPlaceholder(singleItem)
                    ) : singleIsVideo ? (
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

                <PasswordModal
                    isOpen={showPasswordModal}
                    onClose={() => setShowPasswordModal(false)}
                    onSuccess={handlePasswordSuccess}
                />
            </div>
        );
    }

    // Aktuelles Item
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
    const currentIsProtected = isProtected(currentItem);

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
                {currentIsProtected && !isPasswordUnlocked ? (
                    renderProtectedPlaceholder(currentItem)
                ) : currentIsVideo ? (
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
                    {currentIsProtected && !isPasswordUnlocked ? '🔐' :
                        currentIsVideo ? '🎥' : '📸'} {currentIndex + 1} / {photos.length}
                </div>

                {/* Swipe-Hint */}
                <div className="swipe-hint-new">
                    ← Swipe →
                </div>
            </div>

            {/* Dots mit Video-Icons und Protected-Icons */}
            <div className="gallery-dots-new">
                {photos.map((item, index) => {
                    const dotIsVideo = isVideo(item);
                    const dotIsProtected = isProtected(item);
                    const isAccessible = !dotIsProtected || isPasswordUnlocked;

                    return (
                        <button
                            key={index}
                            className={`dot-new ${index === currentIndex ? 'active' : ''} 
                                       ${dotIsVideo ? 'video-dot' : ''} 
                                       ${dotIsProtected ? 'protected-dot' : ''}`}
                            onClick={() => goToPhoto(index)}
                            title={dotIsProtected && !isPasswordUnlocked ? 'Geschützt' :
                                dotIsVideo ? 'Video' : 'Foto'}
                        >
                            {dotIsProtected && !isPasswordUnlocked ? (
                                <span className="dot-icon">🔐</span>
                            ) : dotIsVideo ? (
                                <span className="dot-icon">🎥</span>
                            ) : null}
                        </button>
                    );
                })}
            </div>

            <PasswordModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
                onSuccess={handlePasswordSuccess}
            />
        </div>
    );
};

export default PhotoGallery;