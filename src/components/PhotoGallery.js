import React, { useState, useRef, useEffect } from 'react';
import PasswordModal from './PasswordModal';

const PhotoGallery = ({ photos, stationTitle, isPasswordUnlocked, onPasswordUnlock }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // Loading States
    const [imageLoadStates, setImageLoadStates] = useState({});
    const [imageErrors, setImageErrors] = useState({});

    // NEU: Video-Orientierung States
    const [videoOrientations, setVideoOrientations] = useState({});

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

    // NEU: Video Metadata laden und Orientierung bestimmen
    const handleVideoLoadedMetadata = (index) => {
        const video = videoRef.current;
        if (video) {
            const isPortrait = video.videoHeight > video.videoWidth;
            const aspectRatio = video.videoWidth / video.videoHeight;

            setVideoOrientations(prev => ({
                ...prev,
                [index]: {
                    isPortrait,
                    aspectRatio,
                    width: video.videoWidth,
                    height: video.videoHeight
                }
            }));

            // Container-Klasse dynamisch setzen
            if (containerRef.current) {
                if (isPortrait) {
                    containerRef.current.classList.add('portrait-mode');
                    containerRef.current.classList.remove('landscape-mode');
                } else {
                    containerRef.current.classList.add('landscape-mode');
                    containerRef.current.classList.remove('portrait-mode');
                }
            }

            console.log(`Video ${index}: ${video.videoWidth}x${video.videoHeight}, Portrait: ${isPortrait}`);
        }
    };

    // Bild Loading Funktionen
    const handleImageLoad = (index) => {
        setImageLoadStates(prev => ({
            ...prev,
            [index]: 'loaded'
        }));
        setImageErrors(prev => ({
            ...prev,
            [index]: false
        }));
    };

    const handleImageError = (index) => {
        console.error(`Fehler beim Laden von Bild ${index}`);
        setImageLoadStates(prev => ({
            ...prev,
            [index]: 'error'
        }));
        setImageErrors(prev => ({
            ...prev,
            [index]: true
        }));
    };

    const handleImageLoadStart = (index) => {
        setImageLoadStates(prev => ({
            ...prev,
            [index]: 'loading'
        }));
    };

    // RETRY FUNKTION
    const retryImageLoad = (index) => {
        setImageLoadStates(prev => ({
            ...prev,
            [index]: 'loading'
        }));
        setImageErrors(prev => ({
            ...prev,
            [index]: false
        }));

        const img = new Image();
        const item = photos[index];
        const src = getItemSrc(item);
        img.src = `${src}?t=${Date.now()}`;

        img.onload = () => handleImageLoad(index);
        img.onerror = () => handleImageError(index);
    };

    // Navigation Funktionen
    const getDotContainerClass = (photoCount) => {
        if (photoCount > 15) return 'gallery-dots-scrollable';
        if (photoCount > 8) return 'gallery-dots-new many-dots';
        return 'gallery-dots-new';
    };

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

    const jumpToFirst = () => {
        if (!photos || photos.length === 0) return;
        const firstItem = photos[0];
        if (isProtected(firstItem) && !isPasswordUnlocked) {
            setShowPasswordModal(true);
            return;
        }
        setCurrentIndex(0);
    };

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

        const selectedItem = photos[index];
        if (isProtected(selectedItem) && !isPasswordUnlocked) {
            setShowPasswordModal(true);
            return;
        }

        setCurrentIndex(index);
    };

    // Utility Funktionen
    const isProtected = (item) => {
        if (!item) return false;
        return item.protected === true;
    };

    const isVideo = (item) => {
        if (!item) return false;
        if (typeof item === 'string') {
            return item.toLowerCase().includes('.mp4') ||
                item.toLowerCase().includes('.mov') ||
                item.toLowerCase().includes('.webm');
        }
        return item && item.type === 'video';
    };

    const getItemSrc = (item) => {
        if (!item) return '';
        return typeof item === 'string' ? item : (item.src || '');
    };

    const handleProtectedClick = () => {
        setShowPasswordModal(true);
    };

    const handlePasswordSuccess = () => {
        onPasswordUnlock();
    };

    // PRELOADING EFFECT
    useEffect(() => {
        if (!photos || photos.length <= 1) return;

        const preloadImages = () => {
            const indicesToPreload = [
                (currentIndex + 1) % photos.length,
                (currentIndex - 1 + photos.length) % photos.length
            ];

            indicesToPreload.forEach(index => {
                const item = photos[index];
                if (!item || isVideo(item) || (isProtected(item) && !isPasswordUnlocked)) return;

                const src = getItemSrc(item);
                if (src && !imageLoadStates[index]) {
                    const img = new Image();
                    img.onload = () => handleImageLoad(index);
                    img.onerror = () => handleImageError(index);
                    img.src = src;
                    handleImageLoadStart(index);
                }
            });
        };

        const timeoutId = setTimeout(preloadImages, 100);
        return () => clearTimeout(timeoutId);
    }, [currentIndex, photos, isPasswordUnlocked, imageLoadStates]);

    // Auto-Scroll zu aktivem Dot
    useEffect(() => {
        if (photos && photos.length > 15) {
            scrollToActiveDot(dotsRef, currentIndex, photos.length);
        }
    }, [currentIndex, photos]);

    // VERBESSERTES VIDEO AUTOPLAY
    useEffect(() => {
        if (videoRef.current &&
            photos &&
            photos[currentIndex] &&
            isVideo(photos[currentIndex]) &&
            (!isProtected(photos[currentIndex]) || isPasswordUnlocked)) {

            const video = videoRef.current;

            const playVideo = async () => {
                try {
                    // Warte kurz damit das Video richtig geladen ist
                    await new Promise(resolve => setTimeout(resolve, 100));

                    video.muted = false;
                    await video.play();
                } catch (error) {
                    console.log('Autoplay mit Ton wurde blockiert:', error);
                    try {
                        if (video) {
                            video.muted = true;
                            await video.play();
                        }
                    } catch (muteError) {
                        console.log('Auch stummer Autoplay wurde blockiert:', muteError);
                    }
                }
            };

            playVideo();
        }
    }, [currentIndex, photos, isPasswordUnlocked]);

    // Container-Orientierung Effect
    useEffect(() => {
        if (containerRef.current && photos && photos[currentIndex]) {
            const currentItem = photos[currentIndex];
            const currentIsVideo = isVideo(currentItem);

            if (currentIsVideo && videoOrientations[currentIndex]) {
                const orientation = videoOrientations[currentIndex];
                if (orientation.isPortrait) {
                    containerRef.current.classList.add('portrait-mode');
                    containerRef.current.classList.remove('landscape-mode');
                } else {
                    containerRef.current.classList.add('landscape-mode');
                    containerRef.current.classList.remove('portrait-mode');
                }
            } else {
                // Für Bilder Standard-Klasse
                containerRef.current.classList.remove('portrait-mode', 'landscape-mode');
            }
        }
    }, [currentIndex, videoOrientations, photos]);

    // Touch/Mouse Events
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsSwiping(true);
    };

    const handleTouchEnd = (e) => {
        if (!isSwiping) return;

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const minSwipeDistance = 50;

        if (diff > minSwipeDistance) {
            nextPhoto();
        } else if (diff < -minSwipeDistance) {
            prevPhoto();
        }

        setIsSwiping(false);
    };

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

    // UI Components
    const LoadingSpinner = () => (
        <div className="image-loading-container">
            <div className="image-loading-spinner">
                <div className="spinner"></div>
                <div className="loading-text">Lädt...</div>
            </div>
        </div>
    );

    const ImageError = ({ index, onRetry }) => (
        <div className="image-error-container">
            <div className="image-error-content">
                <div className="error-icon">⚠️</div>
                <div className="error-text">Bild konnte nicht geladen werden</div>
                <button className="retry-button" onClick={() => onRetry(index)}>
                    🔄 Nochmal versuchen
                </button>
            </div>
        </div>
    );

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

    // VERBESSERTES VIDEO RENDERING
    const renderVideo = (item, index) => {
        const src = getItemSrc(item);
        const orientation = videoOrientations[index];

        return (
            <video
                ref={videoRef}
                src={src}
                className="gallery-image-new gallery-video-new"
                controls
                playsInline
                loop
                preload="metadata"
                key={`${currentIndex}-${src}`}
                onLoadedMetadata={() => handleVideoLoadedMetadata(index)}
                data-orientation={orientation?.isPortrait ? 'portrait' : 'landscape'}
                style={{
                    ...(orientation?.isPortrait && {
                        maxHeight: '80vh',
                        maxWidth: '100%',
                        width: 'auto',
                        height: 'auto'
                    })
                }}
            />
        );
    };

    // Render Dots
    const renderDots = () => {
        if (!photos || photos.length <= 1) return null;

        const photoCount = photos.length;
        const dotContainerClass = getDotContainerClass(photoCount);

        if (photoCount > 20) {
            return (
                <div className="gallery-navigation">
                    <button className="jump-btn" onClick={jumpToFirst} title="Zum ersten Bild">⇤</button>
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
                    <button className="jump-btn" onClick={jumpToLast} title="Zum letzten Bild">⇥</button>
                </div>
            );
        }

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

    // Single Item Rendering
    if (photos.length === 1) {
        const singleItem = photos[0];
        if (!singleItem) {
            return <div className="photo-placeholder">📸 Foto wird geladen...</div>;
        }

        const itemSrc = getItemSrc(singleItem);
        const singleIsVideo = isVideo(singleItem);
        const singleIsProtected = isProtected(singleItem);
        const loadState = imageLoadStates[0];
        const hasError = imageErrors[0];

        return (
            <div className="photo-gallery-new">
                <div className="gallery-wrapper-new" ref={containerRef}>
                    {singleIsProtected && !isPasswordUnlocked ? (
                        renderProtectedPlaceholder(singleItem)
                    ) : singleIsVideo ? (
                        renderVideo(singleItem, 0)
                    ) : hasError ? (
                        <ImageError index={0} onRetry={retryImageLoad} />
                    ) : (
                        <div className="image-container">
                            {loadState === 'loading' && <LoadingSpinner />}
                            <img
                                src={itemSrc}
                                alt={`${stationTitle} - Foto`}
                                className={`gallery-image-new ${loadState === 'loading' ? 'loading' : ''}`}
                                draggable={false}
                                onLoadStart={() => handleImageLoadStart(0)}
                                onLoad={() => handleImageLoad(0)}
                                onError={() => handleImageError(0)}
                            />
                        </div>
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

    // Main Gallery Rendering
    const currentItem = photos && photos[currentIndex] ? photos[currentIndex] : null;
    if (!currentItem) {
        return <div className="photo-placeholder">📸 Foto wird geladen...</div>;
    }

    const currentIsVideo = isVideo(currentItem);
    const currentSrc = getItemSrc(currentItem);
    const currentIsProtected = isProtected(currentItem);
    const currentLoadState = imageLoadStates[currentIndex];
    const currentHasError = imageErrors[currentIndex];

    return (
        <div className="photo-gallery-new">
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
                    renderVideo(currentItem, currentIndex)
                ) : currentHasError ? (
                    <ImageError index={currentIndex} onRetry={retryImageLoad} />
                ) : (
                    <div className="image-container">
                        {currentLoadState === 'loading' && <LoadingSpinner />}
                        <img
                            src={currentSrc}
                            alt={`${stationTitle} - ${currentIsVideo ? 'Video' : 'Foto'} ${currentIndex + 1}`}
                            className={`gallery-image-new ${currentLoadState === 'loading' ? 'loading' : ''}`}
                            draggable={false}
                            onLoadStart={() => handleImageLoadStart(currentIndex)}
                            onLoad={() => handleImageLoad(currentIndex)}
                            onError={() => handleImageError(currentIndex)}
                        />
                    </div>
                )}

                <button className="arrow-btn-new prev-arrow-new" onClick={prevPhoto}>←</button>
                <button className="arrow-btn-new next-arrow-new" onClick={nextPhoto}>→</button>

                <div className="photo-counter-new">
                    {currentIsProtected && !isPasswordUnlocked ? '🔐' :
                        currentIsVideo ? '🎥' : '📸'} {currentIndex + 1} / {photos.length}
                </div>

                <div className="swipe-hint-new">← Swipe →</div>
            </div>

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