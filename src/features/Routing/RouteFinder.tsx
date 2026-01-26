import React, { useState } from 'react';
import { findRoutes, NODES } from './AStarAlgorithm';
import { Navigation, Shield, Clock } from 'lucide-react';
import RouteInstructions from './RouteInstructions';

interface RouteOption {
    path: any[]; // Array of nodes
    distance: number;
    time: number;
    safetyScore: number;
    type: string;
}

const RouteFinder: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [start, setStart] = useState('Benz Circle');
    const [end, setEnd] = useState('Bus Station');
    const [routes, setRoutes] = useState<any>(null);
    const [selectedRoute, setSelectedRoute] = useState<any>(null);

    const handleSearch = () => {
        const result = findRoutes(start, end);
        setRoutes(result);
        setSelectedRoute(null);
    };

    return (
        <>
            <div className="glass-panel animate-enter" style={{
                position: 'absolute',
                top: '80px',
                left: '20px',
                right: '20px',
                padding: '20px',
                zIndex: 999,
                maxHeight: '60vh',
                overflowY: 'auto'
            }}>
                <h3 style={{ margin: '0 0 15px', display: 'flex', justifyContent: 'space-between' }}>
                    Find Safe Route
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem' }}>&times;</button>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <select className="input-field" value={start} onChange={e => setStart(e.target.value)}>
                        {Object.keys(NODES).map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>to</div>
                    <select className="input-field" value={end} onChange={e => setEnd(e.target.value)}>
                        {Object.keys(NODES).map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <button className="btn-primary" onClick={handleSearch}>Find Routes</button>
                </div>

                {routes && (
                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

                        {/* Safest Card */}
                        <div
                            onClick={() => setSelectedRoute(routes.safest)}
                            style={{
                                background: 'rgba(16, 185, 129, 0.2)',
                                border: '1px solid var(--success)',
                                borderRadius: '10px',
                                padding: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong style={{ color: 'var(--success)' }}>Safest Route</strong>
                                <span style={{ fontSize: '0.8rem', background: 'var(--success)', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>Recommended</span>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', marginTop: '10px', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Shield size={14} /> {routes.safest.safetyScore}% Safe</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} /> {routes.safest.time} min</div>
                            </div>
                        </div>

                        {/* Fastest Card */}
                        <div
                            onClick={() => setSelectedRoute(routes.fastest)}
                            style={{
                                background: 'rgba(239, 68, 68, 0.2)',
                                border: '1px solid var(--danger)',
                                borderRadius: '10px',
                                padding: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong style={{ color: 'var(--danger)' }}>Fastest Route</strong>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', marginTop: '10px', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Shield size={14} /> {routes.fastest.safetyScore}% Safe</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} /> {routes.fastest.time} min</div>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {selectedRoute && (
                <RouteInstructions
                    route={selectedRoute}
                    onClose={() => setSelectedRoute(null)}
                />
            )}
        </>
    );
};

export default RouteFinder;
