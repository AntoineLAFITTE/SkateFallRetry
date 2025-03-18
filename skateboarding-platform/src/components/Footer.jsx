const Footer = () => {
  return (
      <footer style={styles.footer}>
          <div style={styles.icons}>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/instagram-icon.png" alt="Instagram" style={styles.icon} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/twitter-icon.png" alt="X (Twitter)" style={styles.icon} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/facebook-icon.png" alt="Facebook" style={styles.icon} />
              </a>
          </div>
      </footer>
  );
};

const styles = {
  footer: {
      textAlign: "center",
      padding: "20px",
      background: "#111",
      color: "white",
      borderTop: "2px solid #333",
  },
  icons: {
      display: "flex",
      justifyContent: "center",
      gap: "35px",
      marginTop: "10px",
  },
  icon: {
      width: "70px",
      height: "70px",
      borderRadius: "50%", // Makes icons round
      objectFit: "cover",  // Ensures the image fills the circle
      border: "2px solid white", // Optional: White border for clean look
      transition: "transform 0.2s",
  },
};

export default Footer;
