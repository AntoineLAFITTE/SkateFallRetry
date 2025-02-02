### **1️⃣ Sequence Diagram: User Logs In**
```markdown
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

---

### **2️⃣ Sequence Diagram: User Creates a Post**
```markdown
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

---

### **3️⃣ Sequence Diagram: User Comments on a Post**
```markdown
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
