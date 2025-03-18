import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ManagePosts = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You need to be logged in.");
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://127.0.0.1:5000/api/posts/my-posts", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    alert("Error fetching posts.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchPosts();
    }, [navigate]);

    const handleDelete = async (postId) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this post?");
      if (!confirmDelete) return;

      try {
          const token = localStorage.getItem("token");
          const response = await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
              method: "DELETE",
              headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
          });

          if (response.ok) {
              alert("Post deleted successfully!");
              setPosts(posts.filter(post => post.id !== postId)); // Update UI after deletion
          } else {
              const errorData = await response.json();
              alert(`Error: ${errorData.error}`);
          }
      } catch (error) {
          console.error("Error deleting post:", error);
          alert("An error occurred while deleting the post.");
      }
    };

    const handleEdit = (postId) => {
        navigate(`/edit-post/${postId}`);
    };

    return (
        <>
            <Header />
            <div style={styles.container}>
                <h2>Manage Your Posts</h2>
                {posts.length === 0 ? (
                    <p>No posts found.</p>
                ) : (
                    <ul style={styles.postList}>
                        {posts.map((post) => (
                            <li key={post.id} style={styles.postItem}>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <div>
                                    <button onClick={() => handleEdit(post.id)} style={styles.editButton}>Edit</button>
                                    <button onClick={() => handleDelete(post.id)} style={styles.deleteButton}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

const styles = {
    container: {
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        background: "#1a1a1a",
        color: "white",
        borderRadius: "5px",
        textAlign: "center",
    },
    postList: {
        listStyleType: "none",
        padding: "0",
    },
    postItem: {
        background: "#222",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "5px",
    },
    editButton: {
        backgroundColor: "#008CBA", // Blue
        color: "white",
        padding: "8px 15px",
        borderRadius: "5px",
        marginRight: "10px",
        cursor: "pointer",
    },
    deleteButton: {
        backgroundColor: "#D32F2F", // Red
        color: "white",
        padding: "8px 15px",
        borderRadius: "5px",
        cursor: "pointer",
    }
};

export default ManagePosts;
