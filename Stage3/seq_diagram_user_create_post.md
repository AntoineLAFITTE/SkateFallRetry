```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Enters post details & submits
    Frontend->>Backend: Send POST request to create post
    Backend->>Database: Store post in posts table
    Database-->>Backend: Confirm post saved
    Backend-->>Frontend: Return success response
    Frontend-->>User: Display success message
