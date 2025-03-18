import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import CreatePost from "./pages/CreatePost.jsx";
import ManagePosts from "./pages/ManagePosts.jsx";
import EditPost from "./pages/EditPost";
import LandingPage from './pages/LandingPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />  {/* Set Landing Page as Default */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/manage-posts" element={<ManagePosts />} />
                <Route path="/edit-post/:postId" element={<EditPost />} />
                {/* Add more routes here later */}
            </Routes>
        </Router>
    </React.StrictMode>
);
