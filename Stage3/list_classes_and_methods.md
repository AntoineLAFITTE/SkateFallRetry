# 📌 Class Overview: Attributes & Methods

## 1️⃣ User Class (`models/user.py`)
🔹 Represents a user in the system who can create posts and comments.

### Attributes
| **Attribute** | **Type** | **Description** |
|--------------|---------|----------------|
| `id` | `int (PK)` | Unique identifier for the user. |
| `username` | `string(150)` | Unique username. |
| `password_hash` | `string(150)` | Hashed password for authentication. |

### Methods
| **Method** | **Purpose** |
|-----------|------------|
| `set_password(password)` | Hashes the password before storing. |
| `check_password(password)` | Checks if a password matches the stored hash. |
| `create_user(username, password)` | Creates and saves a new user in the database. |
| `update_username(new_username)` | Updates the user's username. |
| `delete_user()` | Deletes the user along with their posts and comments. |

---

## 2️⃣ Post Class (`models/post.py`)
🔹 Represents a post created by a user, which may or may not include a video.

### Attributes
| **Attribute** | **Type** | **Description** |
|--------------|---------|----------------|
| `id` | `int (PK)` | Unique identifier for the post. |
| `title` | `string(255)` | Title of the post. |
| `content` | `text` | Content/body of the post. |
| `user_id` | `int (FK)` | Foreign key referencing `User.id`. |

### Methods
| **Method** | **Purpose** |
|-----------|------------|
| `create_post(title, content, user_id)` | Creates and saves a new post. |
| `update_post(title=None, content=None)` | Updates the post’s title and/or content. |
| `delete_post()` | Deletes the post along with associated comments and videos. |

---

## 3️⃣ Comment Class (`models/comment.py`)
🔹 Represents a comment made by a user on a post.

### Attributes
| **Attribute** | **Type** | **Description** |
|--------------|---------|----------------|
| `id` | `int (PK)` | Unique identifier for the comment. |
| `content` | `text` | Content of the comment. |
| `post_id` | `int (FK)` | Foreign key referencing `Post.id`. |
| `user_id` | `int (FK)` | Foreign key referencing `User.id`. |

### Methods
| **Method** | **Purpose** |
|-----------|------------|
| `create_comment(content, user_id, post_id)` | Creates and saves a new comment. |
| `update_comment(content)` | Updates the content of the comment. |
| `delete_comment()` | Deletes the comment from the database. |
| `get_comments_by_post(post_id)` | Retrieves all comments associated with a specific post. |

---

## 4️⃣ Video Class (`models/video.py`)
🔹 Represents an optional video linked to a post.

### Attributes
| **Attribute** | **Type** | **Description** |
|--------------|---------|----------------|
| `id` | `int (PK)` | Unique identifier for the video. |
| `url` | `string(500)` | URL of the video. |
| `post_id` | `int (FK)` | Foreign key referencing `Post.id`. |

### Methods
| **Method** | **Purpose** |
|-----------|------------|
| `create_video(url, post_id)` | Creates and saves a new video entry. |
| `update_video(url)` | Updates the video URL. |
| `delete_video()` | Deletes the video from the database. |
| `get_video_by_post(post_id)` | Retrieves the video associated with a specific post. |
