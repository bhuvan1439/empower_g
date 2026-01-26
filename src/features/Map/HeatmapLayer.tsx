import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { HOTSPOTS } from '../../services/mockData';

// Standard Leaflet.heat is not installed, so we simulate a heatmap effect 
// using simple canvas circles (Leaflet.heat under the hood essentially)
// or just large blurry circles for MVP.

const HeatmapLayer: React.FC = () => {
    const map = useMap();

    useEffect(() => {
        const heatPoints = HOTSPOTS
            .filter(h => h.riskLevel === 'High' || h.riskLevel === 'Medium')
            .map(h => ({
                lat: h.lat,
                lng: h.lng,
                intensity: h.riskLevel === 'High' ? 1.0 : 0.5
            }));

        // Create a custom pane for "heatmap" so it sits under markers
        map.createPane('heatmapPane');
        map.getPane('heatmapPane')!.style.zIndex = '200';

        const circles: L.Circle[] = [];

        heatPoints.forEach(p => {
            const circle = L.circle([p.lat, p.lng], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.3,
                radius: 500, // 500 meters radius area influence
                pane: 'heatmapPane',
                stroke: false
            }).addTo(map);
            circles.push(circle);
        });

        // Cleanup
        return () => {
            circles.forEach(c => map.removeLayer(c));
        };
    }, [map]);

    return null;
};

export default HeatmapLayer;
