```mermaid
erDiagram
    USER {
        int id PK
        string username "Unique, Not Null"
        string password_hash "Not Null"
    }

    POST {
        int id PK
        string title "Not Null"
        string content "Not Null"
        int user_id FK
    }

    COMMENT {
        int id PK
        string content "Not Null"
        int post_id FK
        int user_id FK
    }

    VIDEO {
        int id PK
        string url "Not Null"
        int post_id FK
    }

    USER ||--o{ POST : "creates"
    USER ||--o{ COMMENT : "writes"
    POST ||--o{ COMMENT : "has"
    POST ||--o{ VIDEO : "may have"
