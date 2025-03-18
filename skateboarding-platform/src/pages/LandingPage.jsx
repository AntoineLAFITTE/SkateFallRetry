import { AutoSliderBanner } from "../components/AutoSliderBanner";
import HeaderLanding from "../components/HeaderLanding";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
      <>
          <HeaderLanding />  {/* Header OUTSIDE the container */}
          <div style={styles.container}>
              <AutoSliderBanner />
              <div style={styles.content}>
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
                      Browse Categories with new tricks and tips, posted by our members everyday.
                  </h2>
                  <h2>
                      Join us to improve your skills, connect with passionate skaters, and take your skateboarding to the next level!
                  </h2>
                  <br></br>
                  <h2>
                      Follow us on social media 🔥
                  </h2>
              </div>
          </div>
          <Footer />
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
        height: "170vh",
        /* position: "static",*/
    },
    content: {
        marginTop: "50px",
        padding: "0px",
        maxWidth: "800px",
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
