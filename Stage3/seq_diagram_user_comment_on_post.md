```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Writes a comment & submits
    Frontend->>Backend: Send POST request to add comment
    Backend->>Database: Store comment linked to post
    Database-->>Backend: Confirm comment saved
    Backend-->>Frontend: Return success response
    Frontend-->>User: Display new comment
