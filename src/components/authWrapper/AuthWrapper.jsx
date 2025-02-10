import React, { useState, useEffect } from 'react';
import './auth.css';

const AuthWrapper = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const SECRET_CODE = import.meta.env.VITE_ACCESS_CODE;

    useEffect(() => {
        if (!SECRET_CODE) {
            console.error('Variable de entorno NEXT_PUBLIC_ACCESS_CODE no definida');
            return;
        }
        const auth = localStorage.getItem('pdf_auth');
        if (auth === SECRET_CODE) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!SECRET_CODE) {
            setError('Error de configuración');
            return;
        }
        if (code === SECRET_CODE) {
            localStorage.setItem('pdf_auth', code);
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Código incorrecto. Prueba de nuevo');
        }
    };

    if (isAuthenticated) {
        return children;
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Acceso Restringido</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="auth-input"
                        placeholder="Introduce el código de acceso"
                        required
                    />
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="auth-button">
                        Acceder
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthWrapper;