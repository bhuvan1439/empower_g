export interface SafetyLocation {
    id: string;
    name: string;
    lat: number;
    lng: number;
    riskLevel: 'High' | 'Medium' | 'Safe' | 'SafeStop'; // Added 'SafeStop'
    type: string;
    description: string;
    incidents: number;
    peakTime: string; // e.g., "18:00-21:00"
}

export const AMARAVATI_CENTER: [number, number] = [16.5062, 80.6480]; // Vijayawada/Amaravati region

export const HOTSPOTS: SafetyLocation[] = [
    {
        id: '1',
        name: 'Benz Circle Area',
        lat: 16.4971,
        lng: 80.6520,
        riskLevel: 'High',
        type: 'Harassment',
        description: 'Frequent reports of catcalling near the bus stop.',
        incidents: 12,
        peakTime: '18:00-22:00'
    },
    {
        id: '2',
        name: 'PN Bus Station (Back Gate)',
        lat: 16.5088,
        lng: 80.6105,
        riskLevel: 'Medium',
        type: 'Poor Lighting',
        description: 'Street lights often malfunction here.',
        incidents: 5,
        peakTime: '20:00-05:00'
    },
    {
        id: '3',
        name: 'MG Road Shopping District',
        lat: 16.5020,
        lng: 80.6400,
        riskLevel: 'Safe',
        type: 'Public Space',
        description: 'High police visibility and well-lit.',
        incidents: 0,
        peakTime: ''
    },
    {
        id: '4',
        name: 'Kanaka Durga Temple Road',
        lat: 16.5146,
        lng: 80.6055,
        riskLevel: 'Medium',
        type: 'Isolated',
        description: 'Can be isolated late at night.',
        incidents: 3,
        peakTime: '22:00-04:00'
    },
    // New Public Transport & Safe Stops
    {
        id: '5',
        name: 'Vijayawada Railway Station',
        lat: 16.5170,
        lng: 80.6200,
        riskLevel: 'SafeStop',
        type: 'Transport Hub',
        description: '24/7 RPF Police Post and Safe Waiting Room.',
        incidents: 0,
        peakTime: ''
    },
    {
        id: '6',
        name: 'City Bus Terminal',
        lat: 16.5120,
        lng: 80.6150,
        riskLevel: 'Medium',
        type: 'Transport Hub',
        description: 'Crowded during day, poorly lit corners at night.',
        incidents: 4,
        peakTime: '21:00-06:00'
    },
    {
        id: '7',
        name: 'SHE Team Kiosk - Lenin Center',
        lat: 16.5090,
        lng: 80.6300,
        riskLevel: 'SafeStop',
        type: 'Safe Zone',
        description: 'Manned police help desk for women.',
        incidents: 0,
        peakTime: ''
    },
    {
        id: '8',
        name: 'Apollo Pharmacy 24/7',
        lat: 16.5000,
        lng: 80.6450,
        riskLevel: 'SafeStop',
        type: 'Safe Zone',
        description: 'Well-lit area with staff available 24/7.',
        incidents: 0,
        peakTime: ''
    }
];
