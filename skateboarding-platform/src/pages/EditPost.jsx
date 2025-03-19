import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const EditPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Beginner");
    const [videoUrl, setVideoUrl] = useState("");  // ✅ New state for Video URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPost(data);
                setTitle(data.title);
                setContent(data.content);
                setCategory(data.category);
                setVideoUrl(data.video_url || "");  // ✅ Fetch existing video URL if available
            } else {
                alert("Error fetching post data.");
            }
        };

        fetchPost();
    }, [postId]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ title, content, category, video_url: videoUrl }), // ✅ Include video_url
        });

        if (response.ok) {
            alert("Post updated successfully!");
            navigate("/manage-posts");
        } else {
            alert("Error updating post.");
        }
    };

    return (
        <>
            <Header />
            <div style={styles.container}>
                <h2>Edit Your Post</h2>
                {post ? (
                    <form onSubmit={handleUpdate} style={styles.form}>
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

                        {/* ✅ New Video URL Input Field */}
                        <label style={styles.label}>Video URL (optional)</label>
                        <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://example.com/video.mp4"
                            style={styles.input}
                        />

                        <div style={styles.buttonContainer}>
                            <button type="submit" style={styles.button}>Update Post</button>
                            <button type="button" style={styles.cancelButton} onClick={() => navigate("/manage-posts")}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

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
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px",
    },
    button: {
        padding: "10px",
        fontSize: "1.2rem",
        background: "#4CAF50",  // Green (same as CreatePost)
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        flex: "1",
        marginRight: "10px",
    },
    cancelButton: {
        padding: "10px",
        fontSize: "1.2rem",
        background: "#D32F2F", // Red for cancel
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        flex: "1",
    },
};

export default EditPost;
