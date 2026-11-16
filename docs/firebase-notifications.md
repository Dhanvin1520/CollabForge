# Firebase chat notifications

Optional Firebase Cloud Messaging (FCM) integration for the existing public chat rooms.
The application still works without Firebase configuration; notification controls stay hidden.
Firebase does not replace MongoDB or JWT authentication.

## Configure

1. Create a Firebase project and register a web application. Enable the FCM Registration API if required by Firebase, and generate a Web Push certificate (public VAPID key) in Cloud Messaging settings.
2. Set these **frontend** environment variables in Vercel (or a local `.env`), then rebuild:

```dotenv
VITE_FIREBASE_API_KEY=your-public-web-api-key
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-web-app-id
VITE_FIREBASE_VAPID_KEY=your-public-vapid-key
```

3. Configure a Firebase Admin service account on **Render/backend only**:

```dotenv
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Never commit the service-account JSON/private key or prefix Admin secrets with `VITE_`.
Use the same Firebase project on frontend and backend. Deploy over HTTPS (localhost is allowed for development).
The public service worker loads the pinned Firebase compat SDK from Google's CDN. Its query string contains only public Firebase web configuration.

## Behavior

- Signed-in users click **Notify me about this room** in Chat. Guests cannot subscribe.
- One browser token subscribes to one public room at a time; selecting another room requires opting in there.
- Only successfully persisted messages from authenticated senders trigger notifications. The sender's own subscriptions are excluded.
- Messages contain generic text, never chat contents or names. Foreground users already see messages via Socket.io; FCM displays background notifications only.
- Notification tags use the persisted message ID. Clicking opens the app in the appropriate chat room.
- Disabling alerts and signing out remove/revoke the browser subscription. Permanent invalid-token errors remove server records. Inactive records expire after 30 days; re-enable notifications to renew them.
- Guest sends and database fallback/replay messages do not produce push alerts. This avoids duplicate notifications on persistence retries.
- Delivery is best effort, without a durable push retry queue. This implementation is for the two existing public rooms; private rooms would need explicit membership checks.

## Verification

```bash
npm run build
cd backend
node --test tests/notifications.test.js
```

These tests cover input validation, invalid-token cleanup selection, disabled configuration, JWT enforcement and ownership scoping with mocked database writes. They do not prove live Firebase delivery.

Before describing the feature as deployed/tested end to end:
1. Configure Firebase and deploy both services.
2. Sign in as user A and enable alerts for NST Commons. Background the tab.
3. Sign in as user B in another browser and send a message to NST Commons. A should receive one generic notification; B should not receive their own alert.
4. Verify no alert for another room, guest sends or while A's app is foregrounded.
5. Click the notification and verify the correct chat room opens.
6. Disable alerts or sign out as A; send another message as B and verify no further alert.
7. Check permission denied, unsupported browser and missing backend credentials display a useful error without breaking chat.
