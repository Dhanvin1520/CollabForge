# CollabForge Backend

Node.js, Express, MongoDB and Socket.io services for the CollabForge collaboration workspace.

## Local setup

Use Node.js 22 or later for the current Firebase Admin dependency. From this directory:

```bash
npm install
```

Create `.env` with:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/collabforge
JWT_SECRET=replace-with-a-long-random-secret
PORT=5000
FRONTEND_URL=http://localhost:5173
```

Run `npm run dev` for development or `node server.js` to start the server directly.

## Services

- JWT authentication and password hashing.
- User-scoped task, note and coding-practice APIs.
- Socket.io community chat and WebRTC signaling.
- Optional Firebase Cloud Messaging registration and delivery.

Health endpoint: `GET /api/health`.

## Firebase

See [notification setup](../docs/firebase-notifications.md). Set Firebase Admin credentials only in backend environment variables. The app can run without Firebase; notification registration stays disabled until configured.

Run notification tests from this directory:

```bash
node --test tests/notifications.test.js
```

## Hosting

On Render, use `backend` as the root directory, `npm install` as the build command and `node server.js` as the start command. Configure MongoDB, JWT and frontend origin settings in the host environment.

The repository includes Docker configuration. Existing service names and deployed URLs may retain legacy names; the product name is CollabForge.
