import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Beginner");
    const [videoUrl, setVideoUrl] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You need to be logged in to create a post.");
            navigate("/");
            return;
        }

        const postData = { title, content, category };
        if (videoUrl.trim() !== "") {
            postData.video_url = videoUrl; // Add video URL if provided
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                alert("Post created successfully!");
                navigate("/home"); // Redirect back to home page
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <div style={styles.container}>
                <h2>Create a New Post</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <label style={styles.label}>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        style={styles.textarea}
                    />

                    <label style={styles.label}>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={styles.input}
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                    </select>

                    <label style={styles.label}>Video URL (optional)</label>
                    <input
                        type="text"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://example.com/video.mp4"
                        style={styles.input}
                    />

                    <button type="submit" style={styles.button}>
                        Create Post
                    </button>
                </form>
            </div>
        </>
    );
};

//  Styling
const styles = {
    container: {
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        background: "#1a1a1a",
        color: "white",
        borderRadius: "5px",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    label: {
        fontSize: "1.2rem",
        textAlign: "left",
    },
    input: {
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "5px",
        background: "#222",
        color: "white",
        border: "1px solid #444",
    },
    textarea: {
        height: "100px",
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "5px",
        background: "#222",
        color: "white",
        border: "1px solid #444",
    },
    button: {
        padding: "10px",
        fontSize: "1.2rem",
        background: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
    },
};

export default CreatePost;
