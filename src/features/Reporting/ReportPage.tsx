import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, MapPin, Send } from 'lucide-react';

const ReportPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: 'Harassment',
        description: '',
        severity: 3,
        locationName: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [locationStatus, setLocationStatus] = useState('Detecting location...');
    const [coords, setCoords] = useState<{ lat: number, lng: number } | null>(null);

    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setCoords({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    });
                    setLocationStatus('Current Location Detected');
                },
                (err) => {
                    console.error(err);
                    setLocationStatus('Location access denied (Using default)');
                }
            );
        } else {
            setLocationStatus('Geolocation not supported');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // Use real coords if available, else random offset near Amaravati
            const lat = coords ? coords.lat : 16.5062 + (Math.random() - 0.5) * 0.02;
            const lng = coords ? coords.lng : 80.6480 + (Math.random() - 0.5) * 0.02;

            await addDoc(collection(db, "incidents"), {
                ...formData,
                lat,
                lng,
                riskLevel: formData.severity > 3 ? 'High' : (formData.severity > 1 ? 'Medium' : 'Safe'),
                timestamp: serverTimestamp(),
                peakTime: new Date().getHours() + ":00"
            });
            alert("Report Submitted! Thank you for making the community safer.");
            navigate('/');
        } catch (err) {
            console.error(err);
            alert("Error submitting report.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ padding: '20px', paddingBottom: '100px', minHeight: '100vh', boxSizing: 'border-box' }}>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle color="var(--danger)" />
                Report Incident
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>Help safe-guard your community by reporting unsafe areas.</p>

            <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '20px', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>

                <div>
                    <label>Incident Type</label>
                    <select
                        className="input-field"
                        value={formData.type}
                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                    >
                        <option>Harassment</option>
                        <option>Poor Lighting</option>
                        <option>Theft/Snatching</option>
                        <option>Stalking</option>
                        <option>Isolated Area</option>
                    </select>
                </div>

                <div>
                    <label>Severity (1-5)</label>
                    <input
                        type="range"
                        min="1" max="5"
                        className="input-field"
                        value={formData.severity}
                        onChange={e => setFormData({ ...formData, severity: parseInt(e.target.value) })}
                    />
                    <div style={{ textAlign: 'right', color: 'var(--text-accent)' }}>Level: {formData.severity}</div>
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        className="input-field"
                        rows={4}
                        placeholder="Describe what happened..."
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div>
                    <label>Location (Approx)</label>
                    <div className="input-field" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
                        <MapPin size={18} />
                        <span>{locationStatus}</span>
                    </div>
                </div>

                <div>
                    <label>Evidence (Optional)</label>
                    <div style={{ border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '10px', padding: '20px', textAlign: 'center', marginTop: '5px' }}>
                        <input type="file" id="evidence" style={{ display: 'none' }} />
                        <label htmlFor="evidence" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', color: 'var(--text-accent)' }}>
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%' }}>
                                <Send size={24} style={{ transform: 'rotate(-45deg)' }} />
                            </div>
                            <span>Tap to upload photo/video</span>
                        </label>
                    </div>
                </div>

                <button type="submit" disabled={submitting} className="btn-primary" style={{ marginTop: '10px' }}>
                    {submitting ? 'Submitting...' : <><Send size={18} /> Submit Report</>}
                </button>
            </form>

            <Navigation />
        </div>
    );
};

export default ReportPage;
