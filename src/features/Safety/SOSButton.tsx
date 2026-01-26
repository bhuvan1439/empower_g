import React, { useState } from 'react';
import { Phone } from 'lucide-react';

const SOSButton: React.FC = () => {
    const [sending, setSending] = useState(false);

    const handleSOS = () => {
        setSending(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
                const message = `SOS! I am in danger. My location: ${mapsLink}`;
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
                setSending(false);
            }, (error: any) => {
                alert("Could not fetch location. Calling 100.");
                window.open("tel:100");
                setSending(false);
            });
        } else {
            window.open("tel:100");
        }
    };

    return (
        <button
            onClick={handleSOS}
            style={{
                position: 'fixed',
                bottom: '100px',
                right: '20px',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                border: '4px solid rgba(239, 68, 68, 0.3)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(239, 68, 68, 0.5)',
                zIndex: 1000,
                cursor: 'pointer',
                animation: 'pulse 2s infinite'
            }}
        >
            <Phone size={28} fill="white" />
            <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>
        </button>
    );
};

export default SOSButton;
