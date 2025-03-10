import { AutoSliderBanner } from "../components/AutoSliderBanner";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div style={styles.container}>
            <AutoSliderBanner />
            <div style={styles.content}>
                <h2>Welcome to SkateFallRetry</h2>
                <p>Your ultimate platform for skateboarding tutorials, tricks, and community discussions.</p>
                <div style={styles.buttonContainer}>
                    <Link to="/register">
                        <button style={styles.button}>Get Started</button>
                    </Link>
                    <Link to="/login">
                        <button style={styles.buttonOutline}>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// Landing Page Styles
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        background: "#121212",
        height: "100vh",
        paddingTop: "20px",
    },
    content: {
        marginTop: "50px",
        padding: "20px",
        maxWidth: "600px",
    },
    buttonContainer: {
        display: "flex",
        gap: "15px",
        marginTop: "20px",
        justifyContent: "center",
    },
    button: {
        padding: "10px 20px",
        fontSize: "1.2rem",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "background 0.3s",
    },
    buttonOutline: {
        padding: "10px 20px",
        fontSize: "1.2rem",
        backgroundColor: "transparent",
        color: "#4CAF50",
        border: "2px solid #4CAF50",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "background 0.3s",
    },
};

export default LandingPage;
