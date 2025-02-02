```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Enter username & password
    Frontend->>Backend: Send login request (POST /login)
    Backend->>Database: Validate user credentials
    Database-->>Backend: Return user data (if valid)
    Backend-->>Frontend: Return success/failure response
    Frontend-->>User: Display login success or error
