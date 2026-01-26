import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './features/Auth/Login';
import Home from './pages/Home';
import StatsDashboard from './features/Dashboard/StatsDashboard';
import ReportPage from './features/Reporting/ReportPage';
import Profile from './pages/Profile';
import SafetyTips from './features/Safety/SafetyTips';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="text-white">Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="app-container">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
                        <Route path="/report" element={
                            <ProtectedRoute>
                                <ReportPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <StatsDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/tips" element={
                            <ProtectedRoute>
                                <SafetyTips />
                            </ProtectedRoute>
                        } />
                        <Route path="/profile" element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
