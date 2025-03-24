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
                  <h1>
                      Features 🔥
                  </h1>
                  <div style={styles.featuresSection}>
                  {/* Feature 1 */}
                  <div style={styles.feature}>
                    <h2>Create a Post</h2>
                    <img src="/assets/create-post.png" alt="Create Post Screenshot" style={styles.featureImage} />
                    <h3>Share your best tricks, tips, and videos with the community in just a few clicks.</h3>
                  </div>

                  {/* Vertical Line */}
                  <div style={styles.verticalLine}></div>

                  {/* Feature 2 */}
                  <div style={styles.feature}>
                    <h2>Manage your Posts</h2>
                    <img src="/assets/manage-post.png" alt="Manage Post Screenshot" style={styles.featureImage} />
                    <h3>Edit or delete your posts anytime to keep your profile clean and updated.</h3>
                  </div>

                  {/* Vertical Line */}
                  <div style={styles.verticalLine}></div>

                  {/* Feature 3 */}
                  <div style={styles.feature}>
                    <h2>Comment on Posts</h2>
                    <img src="/assets/comment-post.png" alt="Comment on Post Screenshot" style={styles.featureImage} />
                    <h3>Engage with other skaters by sharing feedback and joining conversations.</h3>
                  </div>
                </div>
              </div>
          </div>
          <h2 style={{ textAlign: "center", marginTop: "60px", marginBottom: "60px" }}>
              Follow us on our socials 🔥
          </h2>
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
        height: "215vh",
        /* position: "static",*/
    },
    content: {
        marginTop: "50px",
        padding: "0px",
        maxWidth: "1200px",
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
    featuresSection: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "20px",
      marginTop: "60px",
      padding: "20px",
      background: "#1e1e1e",
      borderRadius: "8px",
    },
    feature: {
      flex: "1",
      textAlign: "center",
      padding: "0 10px",
    },
    featureImage: {
      width: "100%",
      maxWidth: "500px",
      height: "auto",
      borderRadius: "8px",
      marginBottom: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
    },
    verticalLine: {
      width: "2px",
      background: "white",
      height: "400px",
      alignSelf: "center",
    },
};

export default LandingPage;
