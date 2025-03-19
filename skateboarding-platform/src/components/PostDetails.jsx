import React, { useState } from "react";

const PostDetails = ({ post, onAddComment }) => {
    const [comment, setComment] = useState("");

    if (!post) return (
      <div style={styles.placeholder}>
          <h1 className="header-title">Skate Fall Retry</h1>
          <br></br>
          <h2>
              SkateFallRetry is the ultimate platform for skateboarding enthusiasts.
              Whether you're a beginner learning your first ollie, an advanced skater perfecting kickflips,
              or an expert pushing the limits with technical tricks, our community-driven space has something for everyone.
          </h2>
          <h2>
              Explore step-by-step trick tutorials, engage with the community,
              share your knowledge with fellow skaters. Stay updated with the latest trends,
              Browse Categories with new tricks and tips, posted by our members every day.
          </h2>
          <h2>
              Thanks for joining us, you can now connect with passionate skaters, and take your skateboarding to the next level!
          </h2>
          <br></br>
          <h2>
              Follow us on social media 🔥
          </h2>
          <div style={styles.socialIcons}>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/instagram-icon.png" alt="Instagram" style={styles.icon} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/twitter-icon.png" alt="Twitter/X" style={styles.icon} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/facebook-icon.png" alt="Facebook" style={styles.icon} />
            </a>
        </div>
      </div>
  );

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

            {/* Video Handling */}
            {post.video_url && (
                post.video_url.includes("youtube.com") ? (
                    <iframe
                        width="100%"
                        height="400px"
                        src={post.video_url.replace("watch?v=", "embed/")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={styles.video}
                    ></iframe>
                ) : (
                    <video controls style={styles.video}>
                        <source src={post.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )
            )}

            {/* Display Username Before Comments */}
            <h3 style={styles.postedBy}>
                <strong>Posted by</strong> {post.username || "Unknown User"}
            </h3>


            <h3>Comments :</h3>
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
        color: "white",
        textAlign: "center",
        padding: "20px 20px",
        fontSize: "0.85rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "900px",
        margin: "0 auto",
        lineHeight: "1.15",
  },
    socialIcons: {
        display: "flex",
        gap: "35px",
        marginTop: "10px",
        justifyContent: "center",
  },
  icon: {
        width: "70px",
        height: "70px",
        borderRadius: "50%", // Makes icons round
        objectFit: "cover",  // Ensures the image fills the circle
        border: "2px solid white", // Optional: White border for clean look
        transition: "opacity 0.3s",
        cursor: "pointer",
  },
  iconHover: {
      opacity: "0.7",
  },
};

export default PostDetails;
