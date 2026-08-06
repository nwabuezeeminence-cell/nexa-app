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
  apiKey: "AIzaSyCwmks7xoBtDyOoZhe2pOCFCyia2HLd9DI",
  authDomain: "nexa-app-7163c.firebaseapp.com",
  databaseURL: "https://nexa-app-7163c-default-rtdb.firebaseio.com", // <- THIS LINE IS MOST IMPORTANT
  projectId: "nexa-app-7163c",
  storageBucket: "nexa-app-7163c.firebasestorage.app",
  messagingSenderId: "781173458855",
  appId: "1:781173458855:web:71bb5e6532898d20711882",
  measurementId: "G-KR4YENF8XR"
};  
