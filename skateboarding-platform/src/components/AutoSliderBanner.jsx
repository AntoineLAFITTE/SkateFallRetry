"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const images = [
  "https://64.media.tumblr.com/db8472cfbb89a155148003b053d5f3de/4d6d987e0cee7307-8e/s400x225/158142e8e876044a6191733a02f6ee5ac1643b58.gif",
  "https://i.pinimg.com/originals/14/f4/35/14f435eaaf8d107cca5055ce150eaf47.gif",
]

export function AutoSliderBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate();  // Initialize navigation

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleGetStartedClick = () => {
    navigate("/register");  // Redirect user to Register page
  };

  const handleLoginClick = () => {
    navigate("/login");  // Redirect to Login page
  };

  const handleShopClick = () => {
    const productSection = document.getElementById("product-section")
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="banner">
      {images.map((src, index) => (
        <div key={src} className={`banner-image ${index === currentIndex ? "active" : "inactive"}`}>
          <img
            src={src || "/placeholder.svg"}
            alt={`Banner ${index + 1}`}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
      ))}
      <div className="banner-overlay">
      <h1 className="header-title">Skate Fall Retry</h1>
        <p className="banner-subtitle">Elevate Your Skateboarding to the next level</p>
        <div style={styles.buttonContainer}>
        <button onClick={handleGetStartedClick} className="button button-outline button-lg">
          Get Started !
        </button>
        <button onClick={handleLoginClick} style={styles.loginButton}>
            Login
          </button>
          </div>
      </div>
    </div>
  )
}

const styles = {
  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  loginButton: {
    padding: "10px 20px",
    fontSize: "1.125rem",
    borderRadius: "5px",
    backgroundColor: "#ffffff",
    color: "#000000",  // Black text (so it's visible!)
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};
