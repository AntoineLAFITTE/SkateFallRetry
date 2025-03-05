import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useState([]);
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
            const response = await fetch("http://127.0.0.1:5000/api/posts", {
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

    return (
        <div>
            <h1>Welcome to SkateFallRetry !</h1>
            <h2>All Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
