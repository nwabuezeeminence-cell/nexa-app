# NEXA 💜

**NEXA** is a digital services web application with real-time chat, user authentication, and a modern dark UI.

Built for mobile first and deployed with GitHub Pages + Firebase.

## ✨ Features
- **User Auth**: Email/Password Login & Sign Up with Firebase
- **Real-time Chat**: Instant messaging between users
- **Dark Theme**: Clean, mobile-first responsive design
- **Auto Login**: If you're already logged in, it skips to chat
- **Fast Deploy**: Works on GitHub Pages, Netlify, or any static host

## 🛠 Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Firebase Auth + Realtime Database
- **Hosting**: GitHub Pages

## 🚀 How to Deploy

1.  **Clone/Upload Files**
    Upload all files from this repo to GitHub.

2.  **Add Firebase Config**
    Open `firebase.js` and paste your Firebase project keys:
    ```javascript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      databaseURL: "YOUR_DATABASE_URL",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
