# Role Based Access System - Frontend

A highly aesthetic, premium web application demonstrating Role-Based Access Control (RBAC) and ownership logic. This was built strictly following a modern React and Vite setup along with Tailwind CSS.

## Architecture & API Flow
- **Framework**: Vite + React
- **Styling**: Tailwind CSS V4 + Framer Motion (for premium micro-interactions) + Lucide React (for cohesive iconography)
- **State Management**: Context-based API (`AuthContext`) managing JWT sessions and decoding tokens dynamically.
- **Routing**: `react-router-dom` using nested `ProtectedRoute` wrappers to isolate areas based strictly on roles.

### API Flow
The application utilizes an encapsulated Axios instance that securely intercepts HTTP requests and appends the `Authorization: Bearer <jwt-token>` header across all authenticated actions. 
1. **POST /login**: Submits credentials, acquires JSON web token.
2. **GET /articles**: Fetches articles array to dynamically feed the dashboard cards.
3. **PATCH /articles/:id/publish**: Role dependent endpoint hit when users attempt to publish an article card.
4. **DELETE /articles/:id**: Role dependent endpoint utilizing browser `confirm` popups before triggering a payload to the backend.
5. **GET /logs**: Feeds the System Audit Log interface.

## Permission Handling & Ownership Logic
The permissions strictly enforce who can interact with what feature at both the UI and Backend levels:
- **UI Logic**: In `Dashboard.jsx`, the system identifies `user.role` extracted from the decoded JWT payload. We process whether `article.createdBy === user.id` in order to optionally render the `Delete` and `Publish` actions for Editor-level access, while hiding these completely from Viewer-level users. This achieves a highly sanitized UI.
- **Protected Routing**: Reattempting to access an unpermitted URL mapping like `/logs` will forcibly navigate lower level roles back to the homepage directory via standard `<Navigate>` components within `ProtectedRoute.js`.

## Setup Instructions
1. Check that the Node.js backend server (`UTCons` workspace) is actively streaming on `localhost:5000`.
2. Assuming `Node.js` is installed locally:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:5173` in a Chromium or Webkit browser.

## Testing & Demo Credentials
You can swap between three core user types manually to vet the Role-Based systems natively.
* **Admin**: `admin@test.com` / `123456`
* **Editor**: `editor@test.com` / `123456`
* **Viewer**: `viewer@test.com` / `123456`
