# UtCons Full Stack Application

A robust Role-Based Access Control (RBAC) web application built with a modern, decoupled full-stack architecture. This project features secure JWT-based authentication, distinct user roles (such as Admin, Editor, and Viewer), an interactive dashboard, and a seamless responsive user interface.

---

## 🚀 Features

- **Robust Authentication & Authorization**: Secure user login and registration utilizing JSON Web Tokens (JWT) and `bcryptjs` for password hashing.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions separated out into specific roles:
  - **Admin**: Full access. Can create, read, update, delete records, and manage all articles and users.
  - **Editor**: Can read, create, update, and manage their own articles.
  - **Viewer**: Read-only access to published content.
- **Modern User Interface**: A dynamic, animated frontend heavily utilizing Tailwind CSS for styling and Framer Motion for rich interactions.
- **Responsive Layout**: Designed to work flawlessly across devices, from desktops to smart-phones.
- **Decoupled Architecture**: Separate `Frontend` (React/Vite) and `Backend` (Node/Express) for high scalability and separation of concerns.

---

## 🛠️ Technology Stack

### Frontend (Client-Side)
Building a lightning-fast and responsive single-page application (SPA).
- **React.js (v19)**: Latest features for building user interfaces.
- **Vite**: Next-generation, lightning-fast frontend tooling and bundler.
- **React Router DOM (v7)**: Seamless layout rendering, client-side routing, and navigation logic.
- **Tailwind CSS (v4)**: Modern utility-first CSS framework for rapid and precise styling.
- **Framer Motion**: Production-ready animation library for React to power micro-interactions.
- **Axios**: Promised-based HTTP client for easily fetching communicating with the REST API.
- **jwt-decode**: Utility to easily decode JSON Web Tokens and extract payload on the client side.
- **Lucide React**: Beautiful, consistent icon pack used across the project layout.

### Backend (Server-Side)
A powerful REST API built to handle data securely and effectively.
- **Node.js**: Asynchronous, event-driven JavaScript runtime.
- **Express.js (v5)**: Fast, unopinionated, minimalist web framework used to configure API routes and middleware.
- **MongoDB & Mongoose**: Fast NoSQL database system paired with elegant object data modeling for schema validation.
- **JWT (jsonwebtoken)**: Issuance and verification of secure session tokens.
- **Bcrypt (bcryptjs)**: Cryptographic hashing algorithm to safely verify passwords before storage.
- **CORS & Dotenv**: Proper cross-origin policies and sensible environment variable configuration.

---

## 📂 Project Structure

```text
UtCons Full Stack/
├── Backend/                 # Node.js + Express API Backend
│   ├── .env                 # Backend environment variables
│   ├── index.js/server.js   # Application entry point
│   ├── seed.js              # Database seeding script
│   ├── package.json         # Backend dependencies & scripts
│   └── ...                  # Controllers, Models, Routes, Middlewares
│
├── Frontend/                # React.js + Vite Application
│   ├── src/                 # Client-side source code
│   ├── public/              # Static frontend assets
│   ├── index.html           # Main HTML document template
│   ├── package.json         # Frontend dependencies & scripts
│   └── ...                  # Components, Pages, Context, Hooks
│
└── README.md                # General project documentation
```

---

## 🔧 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Make sure you have installed the following:
- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance running or a MongoDB Atlas URI)

### 1. Setting up the Backend

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `/Backend` directory and define your necessary variables (For example):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. _(Optional)_ Seed the database with preliminary mock-data (Admins, Users, initial content):
   ```bash
   npm run seed
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Setting up the Frontend

Open a **new terminal tab/window**.

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the application locally:
   ```bash
   npm run dev
   ```
4. Access the web application at `http://localhost:5173` (or the port specified by Vite in the terminal). 

---

## 💡 Usage

- Depending on how the `.env` or `seed.js` sets up default credentials, attempt to log in using an Admin account or register your new user.
- Observe UI changes and different authorization privileges dynamically reflecting based on whether you act as an **Admin**, **Editor**, or **Viewer**.

---

*End of Documentation*
