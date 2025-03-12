const HeaderLanding = () => {
  return (
      <header style={styles.header}>
          <img src="/assets/SkateFallRetryLogo-Photoroom.png" alt="SFR Logo" style={styles.logoImage} />
      </header>
  );
};

const styles = {
    header: {
        display: "flex",
        justifyContent: "center",  // Center the title and logo
        alignItems: "center",
        padding: "15px 0px",
        background: "#111",
        borderBottom: "2px solid #333",
        color: "white",
        justifyContent: "center",
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: "1000",
    },
    logoImage: {
        width: "100px",  // Adjust size of the logo
        height: "100px",
        objectFit: "contain",
    },
    logo: {
        fontSize: "1.8rem",
        fontWeight: "bold",
    },
};

export default HeaderLanding;
