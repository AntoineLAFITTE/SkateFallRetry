# SkateFallRetry Class Diagram

```mermaid
classDiagram
    class User {
        - id: UUID
        - username: String
        - email: String
        - password: String
        + register()
        + login()
        + updateProfile()
    }

    class Post {
        - id: UUID
        - title: String
        - description: String
        - videoUrl: String
        - createdAt: Date
        - updatedAt: Date
        + createPost()
        + editPost()
        + deletePost()
    }

    class Comment {
        - id: UUID
        - content: String
        - createdAt: Date
        - updatedAt: Date
        + addComment()
        + editComment()
        + deleteComment()
    }

    class VideoStorage {
        + uploadVideo(file)
        + deleteVideo(videoUrl)
    }

    class Database {
        + save(entity)
        + update(entity)
        + delete(entity)
        + findById(id)
    }

    User "1" --> "*" Post : creates
    Post "1" --> "*" Comment : has
    Post "0..1" --> "1" VideoStorage : may store
    User "1" --> "*" Comment : writes
    Database <|-- User
    Database <|-- Post
    Database <|-- Comment
