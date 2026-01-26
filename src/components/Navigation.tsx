import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, AlertTriangle, BarChart2, Shield, BookOpen } from 'lucide-react';

const Navigation: React.FC = () => {
    return (
        <nav className="glass-panel" style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '2rem',
            padding: '1rem 2rem',
            zIndex: 1000,
            borderRadius: '2rem'
        }}>
            <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' })}>
                <Map size={24} />
                <span style={{ fontSize: '0.75rem' }}>Map</span>
            </NavLink>
            <NavLink to="/report" style={({ isActive }) => ({ color: isActive ? 'var(--danger)' : 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' })}>
                <AlertTriangle size={24} />
                <span style={{ fontSize: '0.75rem' }}>Report</span>
            </NavLink>
            <NavLink to="/dashboard" style={({ isActive }) => ({ color: isActive ? 'var(--warning)' : 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' })}>
                <BarChart2 size={24} />
                <span style={{ fontSize: '0.75rem' }}>Stats</span>
            </NavLink>
            <NavLink to="/tips" style={({ isActive }) => ({ color: isActive ? 'var(--text-accent)' : 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' })}>
                <BookOpen size={24} />
                <span style={{ fontSize: '0.75rem' }}>Guide</span>
            </NavLink>
            <NavLink to="/profile" style={({ isActive }) => ({ color: isActive ? 'var(--success)' : 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' })}>
                <Shield size={24} />
                <span style={{ fontSize: '0.75rem' }}>Profile</span>
            </NavLink>
        </nav>
    );
};

export default Navigation;
