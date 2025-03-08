import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PostDetails from "../components/PostDetails";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/"); // Redirect to login if not authenticated
        } else {
            fetchPosts(token);
        }
    }, []);

    const fetchPosts = async (token) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/posts/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    //  Ensure comments are initialized properly when selecting a post
    const handleSelectPost = (post) => {
        setSelectedPost({
            ...post,
            comments: post.comments || [],  // Ensure comments are initialized to an empty array if null
        });
    };

    const handleAddComment = async (text) => {
        if (!selectedPost) return;

        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:5000/api/comments/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: text, post_id: selectedPost.id })
        });

        if (response.ok) {
            setSelectedPost({
                ...selectedPost,
                comments: [...selectedPost.comments, { user: 'You', text }]
            });
        }
    };

    return (
        <>
            <Header /> {/* Include the header at the top */}
            <div style={{ display: 'flex', background: '#121212', height: '100vh', color: 'white' }}>
                <Sidebar posts={posts} onSelectPost={handleSelectPost} /> {/* Use handleSelectPost instead of setSelectedPost */}
                <PostDetails post={selectedPost} onAddComment={handleAddComment} />
            </div>
        </>
    );
};

export default Home;
