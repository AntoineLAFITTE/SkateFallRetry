import React, { useState } from "react";

const Sidebar = ({ posts, onSelectPost }) => {
    const categories = ["Beginner", "Advanced", "Expert"];
    const [expandedCategory, setExpandedCategory] = useState(null);

    return (
        <div style={styles.sidebar}>
            <h2 style={styles.title}>Categories</h2>
            {categories.map((category) => (
                <div
                    key={category}
                    onMouseEnter={() => setExpandedCategory(category)}
                    onMouseLeave={() => setExpandedCategory(null)}
                    style={styles.category}
                >
                    <h3 style={styles.categoryTitle}>{category}</h3>
                    {expandedCategory === category && (
                        <ul style={styles.postList}>
                            {posts
                                .filter((post) => post.category === category)
                                .map((post) => (
                                    <li
                                        key={post.id}
                                        onClick={() => onSelectPost(post)}
                                        style={styles.postItem}
                                    >
                                        {post.title}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

// Side bar styles
const styles = {
    sidebar: {
        width: "300px",
        background: "#1a1a1a",
        padding: "20px",
        borderRight: "2px solid #333",
        height: "100vh",
        overflowY: "auto",
    },
    title: {
        color: "#ddd",
        textAlign: "center",
        fontSize: "1.5rem",
        marginBottom: "10px",
    },
    category: {
        marginBottom: "20px",
    },
    categoryTitle: {
        color: "#4CAF50",
        fontSize: "1.3rem",
        marginBottom: "5px",
    },
    postList: {
        listStyle: "none",
        padding: 0,
    },
    postItem: {
        cursor: "pointer",
        padding: "8px",
        color: "#bbb",
        borderBottom: "1px solid #333",
        transition: "background 0.3s",
    },
    postItemHover: {
        background: "#4CAF50",
        color: "white",
    },
};

export default Sidebar;
