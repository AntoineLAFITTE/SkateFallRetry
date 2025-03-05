import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Used to navigate to other pages

    const handleLogin = async (event) => {
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.access_token); // Store token
            alert('Login Successful');
            navigate('/home');  // Redirect to the Home page
        } else {
            alert(data.error || 'Login failed');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={styles.form}>
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
                <button type="submit" style={styles.button}>Login</button>
                <button type="button" style={styles.registerButton} onClick={() => navigate('/register')}>
                    Register
                </button>
            </form>
        </div>
    );
};

// Simple CSS-in-JS styles
const styles = {
    container: { textAlign: 'center', marginTop: '50px' },
    form: { display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' },
    input: { margin: '10px 0', padding: '10px', fontSize: '16px' },
    button: { padding: '10px', backgroundColor: '#4CAF50', color: 'white', fontSize: '16px', border: 'none' },
    registerButton: { padding: '10px', backgroundColor: '#008CBA', color: 'white', fontSize: '16px', border: 'none', marginTop: '10px' }
};

export default Login;
