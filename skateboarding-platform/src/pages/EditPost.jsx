import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const EditPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Beginner");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            setPost(data);
            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
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
            body: JSON.stringify({ title, content, category }),
        });

        if (response.ok) {
            alert("Post updated successfully!");
            navigate("/manage-posts"); // Redirect to manage page
        } else {
            alert("Error updating post.");
        }
    };

    return (
        <>
            <Header />
            <div style={styles.container}>
                <h2>Edit Post</h2>
                {post ? (
                    <form onSubmit={handleUpdate} style={styles.form}>
                        <label>Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

                        <label>Content</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />

                        <label>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Beginner">Beginner</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                        </select>

                        <button type="submit">Update Post</button>
                    </form>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

const styles = {
    container: { textAlign: "center", marginTop: "50px" },
    form: { display: "flex", flexDirection: "column", gap: "10px", width: "300px", margin: "auto" },
};

export default EditPost;
