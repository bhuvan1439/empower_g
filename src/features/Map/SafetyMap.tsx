import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { HOTSPOTS, AMARAVATI_CENTER, SafetyLocation } from '../../services/mockData';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import HeatmapLayer from './HeatmapLayer';
import { Layers, Crosshair } from 'lucide-react';

// @ts-ignore
import markerIcon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = new Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Component to handle map actions like plotting user location
const MapController: React.FC<{ centerUser: boolean, setCenterUser: (v: boolean) => void }> = ({ centerUser, setCenterUser }) => {
    const map = useMap();

    useEffect(() => {
        if (centerUser) {
            map.locate().on("locationfound", function (e) {
                map.flyTo(e.latlng, map.getZoom());
                // Ideally add a marker for user location distinct from others
                setCenterUser(false);
            });
        }
    }, [centerUser, map, setCenterUser]);

    return null;
}

const SafetyMap: React.FC = () => {
    const [reports, setReports] = useState<SafetyLocation[]>(HOTSPOTS);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [centerUser, setCenterUser] = useState(false);

    useEffect(() => {
        // Real-time listener for user reports
        const unsubscribe = onSnapshot(collection(db, "incidents"), (snapshot) => {
            const newReports = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as SafetyLocation[];

            setReports((prev) => {
                return [...HOTSPOTS, ...newReports];
            });
        });
        return () => unsubscribe();
    }, []);

    const getMarkerColor = (risk: string) => {
        switch (risk) {
            case 'High': return 'red';
            case 'Medium': return 'orange';
            case 'Safe': return 'green';
            case 'SafeStop': return '#8b5cf6'; // Purple for safe stops
            default: return 'blue';
        }
    };

    return (
        <div style={{ height: '100vh', width: '100%', zIndex: 0, position: 'relative' }}>

            {/* Controls Container */}
            <div style={{ position: 'absolute', top: '80px', right: '10px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Heatmap Toggle */}
                <button
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    title="Toggle Heatmap"
                    style={{
                        background: showHeatmap ? 'var(--primary)' : 'white',
                        color: showHeatmap ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        cursor: 'pointer'
                    }}
                >
                    <Layers size={20} />
                </button>

                {/* Locate Me */}
                <button
                    onClick={() => setCenterUser(true)}
                    title="Locate Me"
                    style={{
                        background: 'white',
                        color: 'black',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        cursor: 'pointer'
                    }}
                >
                    <Crosshair size={20} />
                </button>
            </div>

            <MapContainer center={AMARAVATI_CENTER} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController centerUser={centerUser} setCenterUser={setCenterUser} />

                {showHeatmap ? <HeatmapLayer /> : null}

                {reports.map((loc) => (
                    <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={DefaultIcon}>
                        <Popup>
                            <div style={{ minWidth: '150px' }}>
                                <h3 style={{ margin: '0 0 5px', color: '#1e293b' }}>{loc.name}</h3>
                                <span className="badge" style={{
                                    background: getMarkerColor(loc.riskLevel),
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    fontSize: '0.8rem'
                                }}>
                                    {loc.riskLevel === 'SafeStop' ? 'Safe Stop' : `${loc.riskLevel} Risk`}
                                </span>
                                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#475569' }}>{loc.description}</p>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                    <strong>Type:</strong> {loc.type}<br />
                                    <strong>Time:</strong> {loc.peakTime || 'All Day'}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default SafetyMap;
