import React from 'react';
import { Send } from 'lucide-react';

const ShareLocationButton: React.FC = () => {

    const handleShare = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
                const message = `Hey, I'm sharing my live location with you: ${mapsLink}`;
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }, (error) => {
                alert("Could not fetch location.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <button
            onClick={handleShare}
            style={{
                position: 'fixed',
                bottom: '180px', // Placed above SOS button
                right: '25px',
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'var(--primary)', // Blue/Primary color
                border: '3px solid rgba(59, 130, 246, 0.3)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                zIndex: 999,
                cursor: 'pointer',
            }}
            title="Share Live Location"
        >
            <Send size={24} fill="white" style={{ marginLeft: '-2px', marginTop: '2px' }} />
        </button>
    );
};

export default ShareLocationButton;
