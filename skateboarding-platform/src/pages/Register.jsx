import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful, please log in.');
            navigate('/'); // Redirect to login page
        } else {
            alert(data.error || 'Registration failed');
        }
    };

    return (
        <div style={styles.container}>
            <h1 className="header-title">Register</h1>
            <form onSubmit={handleRegister} style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Register</button>
                <button type="button" style={styles.loginButton} onClick={() => navigate('/login')}>
                    Back to Login
                </button>
            </form>
        </div>
    );
};

// Simple CSS-in-JS styles
const styles = {
    container: { textAlign: 'center', marginTop: '50px', paddingTop: '115px' },
    form: { display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' },
    input: { margin: '10px 0', padding: '10px', fontSize: '16px' },
    button: { padding: '10px', backgroundColor: '#4CAF50', color: 'white', fontSize: '16px', border: 'none' },
    loginButton: { padding: '10px', backgroundColor: '#008CBA', color: 'white', fontSize: '16px', border: 'none', marginTop: '10px' }
};

export default Register;
