import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/"); // Redirect to login page
    };

    return (
      <header style={styles.header}>
          <Link to="/home">  {/* Clicking the logo sends user to home */}
              <img
                  src="/assets/SkateFallRetryLogo-Photoroom.png"
                  alt="SFR Logo"
                  style={styles.logoImage}
              />
          </Link>
            <h1 className="header-title">Skate Fall Retry</h1> {/* Custom font applied */}
            <nav style={styles.nav}>
                <Link to="/manage-posts" style={styles.manageButton}>Manage</Link>
                <Link to="/create-post" style={styles.createPostButton}>+ New Post</Link>
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
    logoImage: {
      width: "125px", // Adjust size of the logo
      height: "125px",
      objectFit: "contain",
      cursor: "pointer",
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
        fontSize: "1.125rem",
        borderRadius: "5px",
        textDecoration: "none",
        transition: "background 0.3s",
    },
    logoutButton: {
        backgroundColor: "#D32F2F", // Red
        color: "white",
        padding: "8px 15px",
        fontSize: "1.125rem",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background 0.3s",
    },
    manageButton: {
      backgroundColor: "#008CBA", // Blue
      color: "white",
      padding: "8px 15px",
      fontSize: "1.125rem",
      borderRadius: "5px",
      marginRight: "1px",
      cursor: "pointer",
      textDecoration: "none",
    }
};

export default Header;
