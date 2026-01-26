import React from 'react';
import Navigation from '../../components/Navigation';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { HOTSPOTS } from '../../services/mockData';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

const StatsDashboard: React.FC = () => {

    // Mock calculations based on HOTSPOTS for MVP visualization
    const highRiskCount = HOTSPOTS.filter(h => h.riskLevel === 'High').length;

    // Charts Data
    const dataDoughnut = {
        labels: ['High Risk', 'Medium Risk', 'Safe Zones'],
        datasets: [{
            label: '# of Areas',
            data: [highRiskCount, 4, 1],
            backgroundColor: ['rgba(239, 68, 68, 0.6)', 'rgba(245, 158, 11, 0.6)', 'rgba(16, 185, 129, 0.6)'],
            borderColor: ['rgba(239, 68, 68, 1)', 'rgba(245, 158, 11, 1)', 'rgba(16, 185, 129, 1)'],
            borderWidth: 1,
        }],
    };

    const dataBar = {
        labels: ['6-9 PM', '9-12 PM', '12-3 AM', '3-6 AM'],
        datasets: [{
            label: 'Incidents by Time',
            data: [12, 19, 3, 5],
            backgroundColor: 'rgba(99, 102, 241, 0.5)',
        }],
    };

    const dataLine = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Reports Filed',
            data: [2, 5, 3, 8, 4, 1, 6],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.3
        }]
    };

    return (
        <div style={{ padding: '20px', paddingBottom: '100px', minHeight: '100vh' }}>
            <h1>Safety Impact Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div className="glass-panel" style={{ padding: '15px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', margin: '0', color: 'var(--danger)' }}>{highRiskCount}</h2>
                    <p style={{ margin: '0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>High Risk Zones</p>
                </div>
                <div className="glass-panel" style={{ padding: '15px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', margin: '0', color: 'var(--success)' }}>14</h2>
                    <p style={{ margin: '0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Safe Routes Taken</p>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
                <h3>Recent Trend (7 Days)</h3>
                <Line data={dataLine} />
            </div>

            <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
                <h3>Peak Unsafe Hours</h3>
                <Bar data={dataBar} />
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
                <h3>Risk Distribution</h3>
                <div style={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
                    <Doughnut data={dataDoughnut} />
                </div>
            </div>

            <Navigation />
        </div>
    );
};

export default StatsDashboard;
