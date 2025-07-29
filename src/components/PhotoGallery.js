import React, { useState, useRef, useEffect } from 'react';
import PasswordModal from './PasswordModal';

const PhotoGallery = ({ photos, stationTitle, isPasswordUnlocked, onPasswordUnlock }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const dotsRef = useRef(null);

    // Fallback wenn keine Fotos/Videos
    if (!photos || photos.length === 0) {
        return (
            <div className="photo-placeholder">
                📸 Hier deine Fotos/Videos einfügen
            </div>
        );
    }

    // Funktion um zu entscheiden, welche Dot-Darstellung verwendet wird
    const getDotContainerClass = (photoCount) => {
        if (photoCount > 15) return 'gallery-dots-scrollable';
        if (photoCount > 8) return 'gallery-dots-new many-dots';
        return 'gallery-dots-new';
    };

    // Funktion um den aktiven Dot in den sichtbaren Bereich zu scrollen
    const scrollToActiveDot = (containerRef, currentIndex, photoCount) => {
        if (photoCount <= 15) return;

        const container = containerRef.current;
        if (!container) return;

        const dots = container.children;
        const activeDot = dots[currentIndex];

        if (activeDot) {
            activeDot.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    };

    const nextPhoto = () => {
        if (!photos || photos.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % photos.length);
    };

    const prevPhoto = () => {
        if (!photos || photos.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    // Jump to first photo
    const jumpToFirst = () => {
        if (!photos || photos.length === 0) return;
        const firstItem = photos[0];
        if (isProtected(firstItem) && !isPasswordUnlocked) {
            setShowPasswordModal(true);
            return;
        }
        setCurrentIndex(0);
    };

    // Jump to last photo
    const jumpToLast = () => {
        if (!photos || photos.length === 0) return;
        const lastIndex = photos.length - 1;
        const lastItem = photos[lastIndex];
        if (isProtected(lastItem) && !isPasswordUnlocked) {
            setShowPasswordModal(true);
            return;
        }
        setCurrentIndex(lastIndex);
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

    // Auto-Scroll zu aktivem Dot
    useEffect(() => {
        if (photos && photos.length > 15) {
            scrollToActiveDot(dotsRef, currentIndex, photos.length);
        }
    }, [currentIndex, photos]);

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

    // Render Dots mit verbesserter Logik - OHNE Nummerierung
    const renderDots = () => {
        if (!photos || photos.length <= 1) return null;

        const photoCount = photos.length;
        const dotContainerClass = getDotContainerClass(photoCount);

        // Für sehr viele Bilder: Kompakte Navigation OHNE Counter
        if (photoCount > 20) {
            return (
                <div className="gallery-navigation">
                    {/* Jump to first button */}
                    <button
                        className="jump-btn"
                        onClick={jumpToFirst}
                        title="Zum ersten Bild"
                    >
                        ⇤
                    </button>

                    {/* Zentrale Dots - nur 5 um das aktuelle herum */}
                    <div className="navigation-dots">
                        {photos.slice(Math.max(0, currentIndex - 2), Math.min(photos.length, currentIndex + 3)).map((item, relativeIndex) => {
                            const actualIndex = Math.max(0, currentIndex - 2) + relativeIndex;
                            const dotIsVideo = isVideo(item);
                            const dotIsProtected = isProtected(item);

                            return (
                                <button
                                    key={actualIndex}
                                    className={`dot-new ${actualIndex === currentIndex ? 'active' : ''} 
                                               ${dotIsVideo ? 'video-dot' : ''} 
                                               ${dotIsProtected ? 'protected-dot' : ''}`}
                                    onClick={() => goToPhoto(actualIndex)}
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

                    {/* Jump to last button */}
                    <button
                        className="jump-btn"
                        onClick={jumpToLast}
                        title="Zum letzten Bild"
                    >
                        ⇥
                    </button>
                </div>
            );
        }

        // Standard Dots für normale Anzahl
        return (
            <div className={dotContainerClass} ref={dotsRef}>
                {photos.map((item, index) => {
                    const dotIsVideo = isVideo(item);
                    const dotIsProtected = isProtected(item);

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

                {/* Counter mit Icon - BLEIBT oben rechts */}
                <div className="photo-counter-new">
                    {currentIsProtected && !isPasswordUnlocked ? '🔐' :
                        currentIsVideo ? '🎥' : '📸'} {currentIndex + 1} / {photos.length}
                </div>

                {/* Swipe-Hint */}
                <div className="swipe-hint-new">
                    ← Swipe →
                </div>
            </div>

            {/* Verbesserte Dots - OHNE zusätzliche Nummerierung */}
            {renderDots()}

            <PasswordModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
                onSuccess={handlePasswordSuccess}
            />
        </div>
    );
};

export default PhotoGallery;