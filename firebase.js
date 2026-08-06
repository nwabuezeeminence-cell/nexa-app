import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwmks7xoBtDyOoZhe2pOCFCyia2HLd9DI",
  authDomain: "nexa-app-7163c.firebaseapp.com",
  projectId: "nexa-app-7163c",
  storageBucket: "nexa-app-7163c.firebasestorage.app",
  messagingSenderId: "781173458855",
  appId: "1:781173458855:web:71bb5e6532898d20711882",
  measurementId: "G-KR4YENF8XR"
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
