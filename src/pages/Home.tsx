import React, { useState } from 'react';
import SafetyMap from '../features/Map/SafetyMap';
import Navigation from '../components/Navigation';
import { Search } from 'lucide-react';
import SOSButton from '../features/Safety/SOSButton';
import ShareLocationButton from '../features/Safety/ShareLocationButton';
import RouteFinder from '../features/Routing/RouteFinder';
import GeofenceWatcher from '../features/Safety/GeofenceWatcher';

const Home: React.FC = () => {
    const [showRouteFinder, setShowRouteFinder] = useState(false);

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            {/* Search Overlay */}
            {!showRouteFinder && (
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    right: '20px',
                    zIndex: 1000
                }}>
                    <div
                        className="glass-panel"
                        style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}
                        onClick={() => setShowRouteFinder(true)}
                    >
                        <Search color="var(--text-secondary)" />
                        <input
                            type="text"
                            placeholder="Where to? (Tap to find safe route)"
                            readOnly
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                width: '100%',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>
            )}

            {showRouteFinder && <RouteFinder onClose={() => setShowRouteFinder(false)} />}

            <SafetyMap />
            <SOSButton />
            <ShareLocationButton />
            <GeofenceWatcher />
            <Navigation />
        </div>
    );
};

export default Home;
