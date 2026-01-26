import React, { useEffect } from 'react';
import { HOTSPOTS, SafetyLocation } from '../../services/mockData';

// Function to calculate distance (Haversine formula simplified or simple Euclidean for small area)
// Euclidean is fine for small city scale MVP
const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2)) * 111000; // rough meters
};

const GeofenceWatcher: React.FC = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const { latitude, longitude } = pos.coords;

                    const nearbyHighRisk = HOTSPOTS.find(h =>
                        h.riskLevel === 'High' &&
                        getDistance(latitude, longitude, h.lat, h.lng) < 200 // 200 meters radius
                    );

                    if (nearbyHighRisk) {
                        console.warn(`Entering High Risk Zone: ${nearbyHighRisk.name}`);
                    }
                }, (err) => {
                    // Ignore errors for background watcher
                });
            }
        }, 10000); // Check every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return null; // Invisible component
};

export default GeofenceWatcher;
