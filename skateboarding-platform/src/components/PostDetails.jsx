import React, { useState } from "react";

const PostDetails = ({ post, onAddComment }) => {
    const [comment, setComment] = useState("");

    if (!post) return <div style={styles.placeholder}>Select a post to view details</div>;

    const handleCommentSubmit = () => {
        if (comment.trim() !== "") {
            onAddComment(comment);
            setComment(""); // Clear input after submitting
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>{post.title}</h2>
            <p style={styles.content}>{post.content}</p>
            {post.video_url && <video controls src={post.video_url} style={styles.video} />}

            <h3>Comments</h3>
            {post.comments && post.comments.length > 0 ? (
                <ul style={styles.commentList}>
                    {post.comments.map((comment, index) => (
                        <li key={index} style={styles.comment}>
                            <strong>{comment.user || "Unknown User"}</strong>: {comment.text}
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ color: "#aaa" }}>No comments yet.</p>
            )}

            {/* Comment Input */}
            <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
                style={styles.commentInput}
            />
            <button onClick={handleCommentSubmit} style={styles.commentButton}>
                Submit
            </button>
        </div>
    );
};

//  Post display Styles
const styles = {
    container: {
        flex: 1,
        padding: "20px",
        color: "white",
    },
    title: {
        fontSize: "2rem",
        borderBottom: "2px solid #4CAF50",
        paddingBottom: "10px",
        marginBottom: "20px",
    },
    content: {
        fontSize: "1.2rem",
        marginBottom: "20px",
    },
    video: {
        width: "100%",
        maxHeight: "400px",
        borderRadius: "5px",
        marginBottom: "20px",
    },
    commentList: {
        listStyle: "none",
        padding: 0,
    },
    comment: {
        background: "#1a1a1a",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
    },
    commentInput: {
        width: "100%",
        padding: "10px",
        marginTop: "10px",
        fontSize: "1rem",
        borderRadius: "5px",
        background: "#222",
        color: "white",
        border: "1px solid #444",
    },
    commentButton: {
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
        borderRadius: "5px",
        transition: "background 0.3s",
    },
    commentButtonHover: {
        backgroundColor: "#45A049",
    },
    placeholder: {
        color: "#aaa",
        textAlign: "center",
        paddingTop: "50px",
        fontSize: "1.5rem",
    },
};

export default PostDetails;
