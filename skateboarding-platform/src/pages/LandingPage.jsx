import { AutoSliderBanner } from "../components/AutoSliderBanner";
import HeaderLanding from "../components/HeaderLanding";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
      <>
          <HeaderLanding />  {/* Header OUTSIDE the container */}
          <div style={styles.container}>
              <AutoSliderBanner />
              <div style={styles.content}>
                  <h2>Welcome to SkateFallRetry</h2>
                  <p>
                      SkateFallRetry is the ultimate platform for skateboarding enthusiasts.
                      Whether you're a beginner learning your first ollie, an advanced skater perfecting kickflips,
                      or an expert pushing the limits with technical tricks, our community-driven space has something for everyone.
                  </p>
                  <p>
                      Explore step-by-step trick tutorials, engage in community discussions,
                      and share your own progress with fellow skaters. Stay updated with the latest trends,
                      gear reviews, and competitions in the skateboarding world.
                  </p>
                  <p>
                      Join us to improve your skills, connect with passionate skaters, and take your skateboarding to the next level!
                  </p>
              </div>
          </div>
      </>
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
        height: "150vh",
        /* position: "static",*/
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
