import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.logo}>SkateFallRetry</h1>
            <nav style={styles.nav}>
                <Link to="/home" style={styles.link}>Home</Link>
                <Link to="/create-post" style={styles.link}>Create Post</Link>
                <Link to="/" onClick={() => localStorage.removeItem("token")} style={styles.link}>Logout</Link>
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
    linkHover: {
        color: "#4CAF50",
    }
};

export default Header;
