export interface Node {
    id: string;
    lat: number;
    lng: number;
}

export interface Edge {
    from: string;
    to: string;
    distance: number; // meters
    safetyScore: number; // 0-100, 100 is safest
}

export const NODES: Record<string, Node> = {
    'Benz Circle': { id: 'Benz Circle', lat: 16.4971, lng: 80.6520 },
    'Bus Station': { id: 'Bus Station', lat: 16.5088, lng: 80.6105 },
    'MG Road': { id: 'MG Road', lat: 16.5020, lng: 80.6400 },
    'Temple': { id: 'Temple', lat: 16.5146, lng: 80.6055 },
    'Secretariat': { id: 'Secretariat', lat: 16.5200, lng: 80.5900 },
    'Police Station': { id: 'Police Station', lat: 16.5050, lng: 80.6250 }
};

export const EDGES: Edge[] = [
    { from: 'Benz Circle', to: 'MG Road', distance: 1500, safetyScore: 90 },
    { from: 'MG Road', to: 'Police Station', distance: 2000, safetyScore: 85 },
    { from: 'Police Station', to: 'Bus Station', distance: 1000, safetyScore: 60 },
    { from: 'Bus Station', to: 'Temple', distance: 800, safetyScore: 50 }, // Crowded but theft prone
    { from: 'Benz Circle', to: 'Temple', distance: 4000, safetyScore: 70 }, // Longer but safer
    { from: 'Temple', to: 'Secretariat', distance: 1200, safetyScore: 95 },
    // Reverse edges (assuming updated graph for simplicity or directed)
];

// Simple Priority Queue would be needed for true A*, but for small graph Dijkstra is fine.
// We will return 3 distinct paths for MVP simulation if start/end match known nodes.

export const findRoutes = (startId: string, endId: string) => {
    // This is a simulation of the output of the A* algorithm
    // In a real app, this runs the actual graph traversal.

    // Returning Mock Paths tailored to the demo story
    const path1 = [NODES['Benz Circle'], NODES['MG Road'], NODES['Police Station'], NODES['Bus Station']];
    const path2 = [NODES['Benz Circle'], NODES['Temple'], NODES['Bus Station']]; // Direct but maybe unsafe?

    return {
        safest: {
            path: path1,
            distance: 4.5,
            time: 25,
            safetyScore: 92,
            type: 'Safest'
        },
        fastest: {
            path: path2,
            distance: 3.2,
            time: 15,
            safetyScore: 65,
            type: 'Fastest'
        },
        balanced: {
            path: path1, // Sometimes balanced == safest
            distance: 4.5,
            time: 25,
            safetyScore: 92,
            type: 'Balanced'
        }
    };
};
