import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/index.css';

const Login: React.FC = () => {
    const { signInWithGoogle, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'radial-gradient(circle at top right, #6366f1 0%, transparent 40%), radial-gradient(circle at bottom left, #ec4899 0%, transparent 40%)'
        }}>
            <div className="glass-panel animate-enter" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>EMPOWER_G</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Safety in your hands</p>

                <button
                    onClick={signInWithGoogle}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem', background: '#fff', color: '#333' }}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" style={{ width: '20px', height: '20px' }} />
                    Sign in with Google
                </button>

                <div style={{ margin: '1.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    OR
                </div>

                {/* Placeholder for Email/Pass if needed later */}
                <input type="email" placeholder="Email" className="input-field" style={{ marginBottom: '1rem' }} />
                <input type="password" placeholder="Password" className="input-field" style={{ marginBottom: '1rem' }} />
                <button className="btn-primary" style={{ width: '100%' }}>Login</button>
            </div>
        </div>
    );
};

export default Login;
