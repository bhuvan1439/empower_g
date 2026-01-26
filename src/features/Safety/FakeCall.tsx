import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Video } from 'lucide-react';

const FakeCall: React.FC = () => {
    const [active, setActive] = useState(false);
    const [incoming, setIncoming] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let timeout: any;
        if (timer > 0) {
            timeout = setTimeout(() => {
                setIncoming(true);
                setTimer(0);
            }, timer * 1000);
        }
        return () => clearTimeout(timeout);
    }, [timer]);

    const startCall = (delay: number) => {
        setTimer(delay);
    };

    if (incoming) {
        return (
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                background: '#000',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '60px 20px',
                color: 'white',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8))'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '100px', height: '100px', background: '#333', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                        D
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'normal', margin: '0' }}>Dad</h1>
                    <p style={{ opacity: 0.7, marginTop: '10px' }}>Mobile</p>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={() => setIncoming(false)} style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                            <ClockIcon />
                        </button>
                        <span>Remind Me</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={() => setIncoming(false)} style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                            <MessageIcon />
                        </button>
                        <span>Message</span>
                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={() => setIncoming(false)} style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ef4444', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <PhoneOff size={32} />
                        </button>
                        <p style={{ marginTop: '10px' }}>Decline</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={() => setActive(true)} style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#22c55e', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', animation: 'bounce 1s infinite' }}>
                            <Phone size={32} />
                        </button>
                        <p style={{ marginTop: '10px' }}>Accept</p>
                    </div>
                </div>
                <style>{`
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                `}</style>
            </div>
        );
    }

    if (active) {
        return (
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                background: '#1a1a1a',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '60px 20px',
                color: 'white'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'normal', margin: '0' }}>Dad</h1>
                    <p style={{ color: '#22c55e', marginTop: '10px' }}>00:04</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px' }}>
                    <CircleButton icon={<Video />} label="FaceTime" />
                    <CircleButton icon={<MuteIcon />} label="Mute" />
                    <CircleButton icon={<KeypadIcon />} label="Keypad" />
                    <CircleButton icon={<SpeakerIcon />} label="Speaker" />
                    <CircleButton icon={<AddCallIcon />} label="Add Call" />
                    <CircleButton icon={<ContactsIcon />} label="Contacts" />
                </div>

                <button onClick={() => { setActive(false); setIncoming(false); }} style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ef4444', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <PhoneOff size={32} />
                </button>
            </div>
        );
    }

    return (
        <div className="glass-panel" style={{ padding: '20px', marginTop: '20px' }}>
            <h3>Fake Call Tool</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Trigger a realistic incoming call to exit uncomfortable situations.</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button className="btn-primary" onClick={() => startCall(2)} style={{ flex: 1, fontSize: '0.9rem' }}>Now (2s)</button>
                <button className="btn-primary" onClick={() => startCall(10)} style={{ flex: 1, fontSize: '0.9rem', background: 'var(--bg-secondary)', border: '1px solid var(--text-secondary)' }}>10s</button>
                <button className="btn-primary" onClick={() => startCall(60)} style={{ flex: 1, fontSize: '0.9rem', background: 'var(--bg-secondary)', border: '1px solid var(--text-secondary)' }}>1m</button>
            </div>
        </div>
    );
};

// Simple Icons mainly for visual filler
const CircleButton = ({ icon, label }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
        </div>
        <span style={{ fontSize: '0.8rem' }}>{label}</span>
    </div>
);
const ClockIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const MessageIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>;
const MuteIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>;
const KeypadIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const SpeakerIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;
const AddCallIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>;
const ContactsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;

export default FakeCall;
