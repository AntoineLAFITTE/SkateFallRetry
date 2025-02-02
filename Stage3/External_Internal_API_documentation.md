# 📌 External and Internal API Documentation

---

## **1️⃣ External APIs Used**
Here are the **external APIs** that the project will use:

| **API Name** | **Purpose** | **Reason for Choice** | **Example Usage** |
|-------------|------------|-------------------------|------------------|
| **Cloudinary API(MVP)** | Image & Video Upload | Secure and scalable media storage | Uploading and retrieving user uploaded videos for posts |
| **Google OAuth API(Optional)** | User Authentication | Secure and widely used authentication method | Allow users to sign in using Google credentials |
| **YouTube Data API(Optional)** | Embed and Fetch Videos | Access to millions of skateboarding videos | Fetch and display skateboarding content |

---

## **2️⃣ Internal API (Project API)**
**RESTful API endpoints** for handling **users, posts, comments, and videos**.

---

### User API Endpoints
| **Endpoint** | **Method** | **Input Format** | **Output Format** | **Description** |
|-------------|-----------|------------------|------------------|----------------|
| `/api/users/register` | `POST` | `{ "username": "user", "password": "pass" }` | `{ "message": "User created", "user_id": 1 }` | Register a new user |
| `/api/users/login` | `POST` | `{ "username": "user", "password": "pass" }` | `{ "token": "JWT_TOKEN" }` | Log in a user & return JWT token |
| `/api/users/<user_id>` | `DELETE` | `None` | `{ "message": "User deleted" }` | Delete user and all associated data |

---

### Post API Endpoints
| **Endpoint** | **Method** | **Input Format** | **Output Format** | **Description** |
|-------------|-----------|------------------|------------------|----------------|
| `/api/posts` | `POST` | `{ "title": "Skate Trick", "content": "Any skate trick", "video_url": "http://..." }` | `{ "message": "Post created", "post_id": 1 }` | Create a new post |
| `/api/posts/<post_id>` | `PUT` | `{ "title": "Updated Title", "content": "Updated content" }` | `{ "message": "Post updated" }` | Update an existing post |
| `/api/posts/<post_id>` | `DELETE` | `None` | `{ "message": "Post deleted" }` | Delete a post along with its comments & video |
| `/api/posts` | `GET` | `None` | `[ { "id": 1, "title": "Trick", "content": "Details" } ]` | Get all posts |

---

### Comment API Endpoints
| **Endpoint** | **Method** | **Input Format** | **Output Format** | **Description** |
|-------------|-----------|------------------|------------------|----------------|
| `/api/comments` | `POST` | `{ "content": "Nice trick!", "post_id": 1 }` | `{ "message": "Comment created", "comment_id": 1 }` | Create a new comment |
| `/api/comments/<comment_id>` | `PUT` | `{ "content": "Updated comment" }` | `{ "message": "Comment updated" }` | Update an existing comment |
| `/api/comments/<comment_id>` | `DELETE` | `None` | `{ "message": "Comment deleted" }` | Delete a comment |

---

### Video API Endpoints
| **Endpoint** | **Method** | **Input Format** | **Output Format** | **Description** |
|-------------|-----------|------------------|------------------|----------------|
| `/api/videos` | `POST` | `{ "url": "http://video.mp4", "post_id": 1 }` | `{ "message": "Video uploaded", "video_id": 1 }` | Upload a video for a post |
| `/api/videos/<video_id>` | `PUT` | `{ "url": "http://newvideo.mp4" }` | `{ "message": "Video updated" }` | Update a video URL |
| `/api/videos/<video_id>` | `DELETE` | `None` | `{ "message": "Video deleted" }` | Delete a video |
