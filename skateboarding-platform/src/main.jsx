import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'; //  create this next
import Home from './pages/Home.jsx';
import TestTailwind from './pages/TestTailwind';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/test-tailwind" element={<TestTailwind />} />
                {/* Add more routes here later */}
            </Routes>
        </Router>
    </React.StrictMode>
);
