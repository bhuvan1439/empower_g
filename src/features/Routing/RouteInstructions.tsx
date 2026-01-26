import React from 'react';
import { Navigation } from 'lucide-react';

interface InstructionsProps {
    route: any; // Ideally types from AStarAlgorithm
    onClose: () => void;
}

const RouteInstructions: React.FC<InstructionsProps> = ({ route, onClose }) => {
    // Mocking instructions since our graph doesn't have street names fully mapped
    const steps = [
        "Head north on Benz Circle towards MG Road.",
        "Pass the SHE Team Kiosk (Safe Stop) on left.",
        "Continue straight for 800m. Keep left.",
        "Enter Safe Zone: MG Road Shopping District.",
        "Turn right towards the Bus Station entrance.",
        "Arrive at destination."
    ];

    return (
        <div className="glass-panel animate-enter" style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '40vh',
            background: '#1e293b',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            padding: '20px',
            zIndex: 1002,
            boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
            overflowY: 'auto'
        }}>
            <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', margin: '0 auto 15px' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0 }}>Turn-by-Turn</h3>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)' }}>Close</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {steps.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '24px', height: '24px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                                {idx + 1}
                            </div>
                            {idx < steps.length - 1 && <div style={{ width: '2px', background: 'rgba(255,255,255,0.1)', flex: 1, margin: '5px 0' }}></div>}
                        </div>
                        <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{step}</p>
                    </div>
                ))}
            </div>

            <button className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                <Navigation size={18} /> Start Navigation
            </button>
        </div>
    );
};

export default RouteInstructions;
