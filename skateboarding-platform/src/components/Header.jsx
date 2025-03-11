import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/"); // Redirect to login page
    };

    return (
        <header style={styles.header}>
            <h1 style={styles.logo}>SkateFallRetry</h1>
            <h1 className="header-title">Skate Fall Retry</h1> {/* Custom font applied */}
            <nav style={styles.nav}>
                <Link to="/home" style={styles.link}>Home</Link>
                <Link to="/create-post" style={styles.createPostButton}>Create Post</Link>
                <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#111",
        borderBottom: "2px solid #333",
        color: "white",
        position: "sticky",
        top: "0",
        zIndex: "1000",
    },
    logo: {
        fontSize: "1.8rem",
        fontWeight: "bold",
    },
    nav: {
        display: "flex",
        gap: "20px",
    },
    link: {
        color: "#ddd",
        textDecoration: "none",
        fontSize: "1.2rem",
        transition: "color 0.3s",
    },
    createPostButton: {
        backgroundColor: "#4CAF50", // Green
        color: "white",
        padding: "8px 15px",
        fontSize: "1rem",
        borderRadius: "5px",
        textDecoration: "none",
        transition: "background 0.3s",
    },
    logoutButton: {
        backgroundColor: "#D32F2F", // Red
        color: "white",
        padding: "8px 15px",
        fontSize: "1rem",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background 0.3s",
    }
};

export default Header;
