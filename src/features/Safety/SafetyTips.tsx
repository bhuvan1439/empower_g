import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import { Shield, BookOpen, UserX, Smartphone, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

interface TipCategory {
    id: string;
    title: string;
    icon: React.ReactNode;
    tips: string[];
    action: string;
}

const SAFETY_DATA: TipCategory[] = [
    {
        id: '1',
        title: 'Facing Harassment',
        icon: <UserX size={24} color="#ef4444" />,
        tips: [
            "Don't ignore it if you feel unsafe. Respond loudly to attract attention.",
            "Move towards a crowded area or a shop immediately.",
            "Dial 100 or use the SOS button on this app.",
            "Record audio/video if safe to do so for evidence."
        ],
        action: "Call Helpline"
    },
    {
        id: '2',
        title: 'Safe Travel',
        icon: <Smartphone size={24} color="#3b82f6" />,
        tips: [
            "Share your live location with trusted contacts before getting into a cab/auto.",
            "Check the child lock status before closing the door.",
            "If the driver deviates from the route, call home immediately and speak loudly.",
            "Take a photo of the number plate."
        ],
        action: "Share Location"
    },
    {
        id: '3',
        title: 'Stalking',
        icon: <AlertTriangle size={24} color="#f59e0b" />,
        tips: [
            "Change your daily routine and timings instantly.",
            "Do not engage or negotiate with the stalker.",
            "Inform parents, friends, and local police.",
            "Keep a log of all incidents (time, place, description)."
        ],
        action: "Report Incident"
    },
    {
        id: '4',
        title: 'Digital Safety',
        icon: <Shield size={24} color="#8b5cf6" />,
        tips: [
            "Block and report harassers immediately on social media.",
            "Do not delete messages/comments; screenshot them for cyber cell evidence.",
            "Enable 2-Factor Authentication on all accounts.",
            "Review privacy settings to limit who can see your location/photos."
        ],
        action: "Cyber Cell"
    }
];

const SafetyTips: React.FC = () => {
    const [expanded, setExpanded] = useState<string | null>(null);

    const toggle = (id: string) => {
        setExpanded(expanded === id ? null : id);
    };

    const handleAction = (action: string) => {
        switch (action) {
            case "Call Helpline":
                window.open("tel:1091"); // Women's Helpline
                break;
            case "Share Location":
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(pos => {
                        const link = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
                        window.open(`https://wa.me/?text=I am travelling safe. Track me here: ${encodeURIComponent(link)}`, '_blank');
                    });
                } else {
                    alert("Location not enabled");
                }
                break;
            case "Report Incident":
                window.location.href = "/report";
                break;
            case "Cyber Cell":
                window.open("https://cybercrime.gov.in", "_blank");
                break;
        }
    };

    return (
        <div style={{ padding: '20px', paddingBottom: '100px', minHeight: '100vh', boxSizing: 'border-box' }}>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BookOpen color="var(--primary)" />
                Safety Guide
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>Expert advice on handling difficult situations.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                {SAFETY_DATA.map(category => (
                    <div
                        key={category.id}
                        className="glass-panel"
                        style={{ padding: '0', overflow: 'hidden', transition: 'all 0.3s ease' }}
                    >
                        <div
                            onClick={() => toggle(category.id)}
                            style={{
                                padding: '20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                background: expanded === category.id ? 'rgba(255,255,255,0.05)' : 'transparent'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%' }}>
                                    {category.icon}
                                </div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{category.title}</h3>
                            </div>
                            {expanded === category.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>

                        {expanded === category.id && (
                            <div style={{ padding: '0 20px 20px 20px', animation: 'fadeIn 0.3s' }}>
                                <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    {category.tips.map((tip, idx) => (
                                        <li key={idx} style={{ marginBottom: '10px' }}>{tip}</li>
                                    ))}
                                </ul>
                                <button
                                    className="btn-primary"
                                    onClick={() => handleAction(category.action)}
                                    style={{ marginTop: '10px', width: '100%', fontSize: '0.9rem' }}
                                >
                                    {category.action}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Navigation />
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default SafetyTips;
