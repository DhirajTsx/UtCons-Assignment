# Role-Based Access System (Backend)

This is the backend implementation for a Role-Based Access System. It manages users, articles, and audit logs with robust authentication, role-based controls, and specific ownership conditions.

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd "neww UTCons"
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory (already provided in your zip/local) and ensure it has:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=supersecret
   PORT=5001
   ```

4. **Seed the Database (Optional but recommended):**
   ```bash
   npm run seed
   ```
   *This command will populate the database with dummy Users (Admin, Editor, Viewer).*

5. **Run the Server:**
   - **Development mode:** `npm run dev`
   - **Production mode:** `npm run start`

The server will be accessible at: `http://localhost:5001`

---

## 🏗️ Architecture Explanation

The repository follows a clean **MVC (Model-View-Controller)** pattern.
- **Models (`/models`)**: Defines the Mongoose schemas for User, Article, and AuditLog.
- **Controllers (`/controllers`)**: Contains the business logic for all operations (Auth, Articles, Logs).
- **Routes (`/routes`)**: Maps Express router endpoints to their corresponding Controller functions.
- **Middleware (`/middleware`)**: Handles JWT authentication verification and role extraction (`authMiddleware.js`).
- **Utils (`/utils`)**: Helper functions like JWT token generator and centralized Audit Logger.

This modular structure ensures separation of concerns, high code readability, and easy scalability.

---

## 🔄 API Flow Explanation

1. **Authentication:** A user sends login credentials to `/api/auth/login`. If valid, the server generates a JWT containing the user's `id` and `role`. 
2. **Accessing Routes:** The frontend attaches this JWT in the `Authorization` header (`Bearer <token>`).
3. **Middleware Verification:** The `protect` middleware verifies the token and attaches the decoded user details to the `req.user` object.
4. **Controller Logic:** The controller checks `req.user.role` (and ownership conditionals) to determine what data to return or what action is permitted.
5. **Audit Logging:** If an article is created, published, or deleted, the controller dynamically writes an entry into the `AuditLog` collection through the `logAction` utility.

---

## 🛡️ Explanation of Permission Handling

The system defines 3 strict roles: **Admin**, **Editor**, and **Viewer**.
Permissions are checked inside the controller logic using `req.user.role`:
- **Admin**: Has overarching control. Can get all logs, read any draft, delete any article, and publish any article.
- **Editor**: Can create articles. However, they are restricted from publishing or deleting articles that don't belong to them. They can view all articles but only their own audit logs.
- **Viewer**: Read-only privileges limited strictly to `published` articles.

If a requirement is not met, the API instantly rejects the request with a `403 Forbidden` standard HTTP error.

---

## 🔑 Explanation of Ownership Logic

Ownership is tied to the `createdBy` field on the `Article` model. 
When an Editor creates an article, `req.user.id` is automatically linked to the `createdBy` property. 

When an Editor attempts to modify (Publish or Delete) or access a Draft article, the system explicitly compares the article's `createdBy` ID against the incoming authenticated `req.user.id`. 
```javascript
if (req.user.role !== "admin" && article.createdBy.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Forbidden" });
}
```
This ensures Editors operate entirely within their own sandbox, while Admins mathematically bypass this block.

---

## 📡 Complete API Documentation

Base URL for local development: `http://localhost:5001/api`

### 1. Authentication APIs

- **Login**
  - **URL:** `/auth/login`
  - **Method:** `POST`
  - **Auth Required:** No
  - **Body:** `{ "email": "admin@example.com", "password": "password123" }`

### 2. Articles APIs (Requires Authorization Header)

- **Create Article**
  - **URL:** `/articles/`
  - **Method:** `POST`
  - **Roles:** Admin, Editor
  - **Logic:** Defaults to "draft". Sets `createdBy` to current user. Logs action.
  
- **Get All Articles**
  - **URL:** `/articles/`
  - **Method:** `GET`
  - **Logic:** Admin/Editor sees all. Viewer sees only "published".

- **Get Article by ID**
  - **URL:** `/articles/:id`
  - **Method:** `GET`
  - **Logic:** If draft, only accessible by the owner or Admin.

- **Publish Article**
  - **URL:** `/articles/:id/publish`
  - **Method:** `PATCH`
  - **Roles:** Admin (any), Editor (only their own).
  
- **Delete Article**
  - **URL:** `/articles/:id`
  - **Method:** `DELETE`
  - **Roles:** Admin (any), Editor (only their own).

### 3. Audit Logs APIs (Requires Authorization Header)

- **Get Logs**
  - **URL:** `/logs/`
  - **Method:** `GET`
  - **Logic:** Admin views all logs. Editors view only their logs. Viewers cannot access.
