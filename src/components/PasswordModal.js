import React, { useState } from 'react';

const PasswordModal = ({ isOpen, onClose, onSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Hier kannst du das Passwort ändern
    const CORRECT_PASSWORD = 'sivani26'; // Ändere das zu deinem gewünschten Passwort

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Kleine Verzögerung für UX
        setTimeout(() => {
            if (password === CORRECT_PASSWORD) {
                onSuccess();
                onClose();
                setPassword('');
            } else {
                setError('Falsches Passwort! Versuch es nochmal 🔐');
            }
            setIsLoading(false);
        }, 500);
    };

    const handleClose = () => {
        setPassword('');
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="password-modal-overlay">
            <div className="password-modal">
                <div className="password-modal-header">
                    <h3>🔐 Private Erinnerungen</h3>
                    <button className="close-btn" onClick={handleClose}>×</button>
                </div>

                <div className="password-modal-content">
                    <p>Diese Bilder sind nur für deine Augen bestimmt 👀💕</p>
                    <p>Gib das Passwort ein, das ich dir gegeben habe:</p>

                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Passwort eingeben..."
                            className="password-input"
                            autoFocus
                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                        />

                        {error && <div className="password-error">{error}</div>}

                        <div className="password-modal-buttons">
                            <button
                                onClick={handleClose}
                                className="btn-cancel"
                            >
                                Abbrechen
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!password || isLoading}
                                className="btn-unlock"
                            >
                                {isLoading ? '🔓 Prüfe...' : '🔓 Freischalten'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordModal;