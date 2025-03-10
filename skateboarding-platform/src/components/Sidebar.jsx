"use client"

import { useState } from "react"
import "./Sidebar.css" // We'll create this CSS file next

const Sidebar = ({ posts, onSelectPost }) => {
  const categories = ["Beginner", "Advanced", "Expert"]
  const [expandedCategory, setExpandedCategory] = useState(null)

  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(category)
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Categories</h2>
      </div>

      <div className="sidebar-content">
        {categories.map((category) => (
          <div key={category} className="sidebar-category">
            <div
              className={`category-header ${expandedCategory === category ? "active" : ""}`}
              onClick={() => toggleCategory(category)}
            >
              <h3 className="category-title">{category}</h3>
              <span className="category-icon">{expandedCategory === category ? "−" : "+"}</span>
            </div>

            <div className={`post-list-container ${expandedCategory === category ? "expanded" : ""}`}>
              <ul className="post-list">
                {posts
                  .filter((post) => post.category === category)
                  .map((post) => (
                    <li key={post.id} onClick={() => onSelectPost(post)} className="post-item">
                      {post.title}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
