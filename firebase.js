import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN_HERE",
  databaseURL: "PASTE_YOUR_DATABASE_URL_HERE",
  projectId: "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "PASTE_YOUR_APP_ID_HERE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Auto redirect if logged in
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes("index.html")) {
    window.location.href = "chat.html";
  }
});

// Login
document.getElementById("login-btn")?.addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "chat.html")
    .catch(err => document.getElementById("login-error").innerText = err.message);
});

// Signup
document.getElementById("signup-btn")?.addEventListener("click", () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "chat.html")
    .catch(err => document.getElementById("signup-error").innerText = err.message);
});

// Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "index.html");
});
