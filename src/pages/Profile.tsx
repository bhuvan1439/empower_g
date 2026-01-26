import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Trash2, Plus, Clock, Shield } from 'lucide-react';
import FakeCall from '../features/Safety/FakeCall';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const [contacts, setContacts] = useState<{ name: string, phone: string }[]>([]);
    const [newContact, setNewContact] = useState({ name: '', phone: '' });
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        // Load contacts
        const saved = localStorage.getItem('emergency_contacts');
        if (saved) setContacts(JSON.parse(saved));

        // Load History
        /* 
        const loadHistory = async () => {
             // Mock history for now since we don't have real user filtering on mock reports yet
        }; 
        loadHistory();
        */
        setHistory([
            { id: 1, type: 'Harassment', location: 'Benz Circle', date: '2 hrs ago', status: 'Verified' },
            { id: 2, type: 'Poor Lighting', location: 'Near Park', date: '2 days ago', status: 'Pending' }
        ]);

    }, []);

    const addContact = () => {
        if (!newContact.name || !newContact.phone) return;
        const updated = [...contacts, newContact];
        setContacts(updated);
        localStorage.setItem('emergency_contacts', JSON.stringify(updated));
        setNewContact({ name: '', phone: '' });
    };

    const removeContact = (idx: number) => {
        const updated = contacts.filter((_, i) => i !== idx);
        setContacts(updated);
        localStorage.setItem('emergency_contacts', JSON.stringify(updated));
    };

    return (
        <div style={{ padding: '20px', paddingBottom: '100px', minHeight: '100vh', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0 }}>My Safety Hub</h1>
                {user?.photoURL && <img src={user.photoURL} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--primary)' }} />}
            </div>

            <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {user?.displayName ? user.displayName[0] : 'U'}
                </div>
                <div>
                    <h2 style={{ margin: '0 0 5px', fontSize: '1.2rem' }}>{user?.displayName || 'User'}</h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{user?.email}</p>
                    <button onClick={logout} style={{ background: 'none', border: 'none', color: 'var(--danger)', padding: 0, marginTop: '5px', cursor: 'pointer', fontSize: '0.85rem' }}>Sign Out</button>
                </div>
            </div>

            <FakeCall />

            <h3 style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={20} color="var(--success)" /> Emergency Contacts
            </h3>
            <div className="glass-panel" style={{ padding: '20px' }}>
                {contacts.map((c, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <div>
                            <strong>{c.name}</strong>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{c.phone}</div>
                        </div>
                        <button onClick={() => removeContact(idx)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}

                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                    <input
                        className="input-field"
                        placeholder="Name"
                        value={newContact.name}
                        onChange={e => setNewContact({ ...newContact, name: e.target.value })}
                        style={{ flex: 1 }}
                    />
                    <input
                        className="input-field"
                        placeholder="Phone"
                        value={newContact.phone}
                        onChange={e => setNewContact({ ...newContact, phone: e.target.value })}
                        style={{ flex: 1 }}
                    />
                    <button className="btn-primary" onClick={addContact} style={{ padding: '0.5rem' }}>
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            <h3 style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={20} color="var(--text-accent)" /> Recent Activity
            </h3>
            <div className="glass-panel" style={{ padding: '10px' }}>
                {history.map(h => (
                    <div key={h.id} style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontWeight: '600' }}>Reported: {h.type}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{h.location} • {h.date}</div>
                        </div>
                        <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', height: 'fit-content' }}>
                            {h.status}
                        </span>
                    </div>
                ))}
            </div>

            <Navigation />
        </div>
    );
};

export default Profile;
