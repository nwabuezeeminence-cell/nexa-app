// firebase.js - CLEAN VERSION
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  reload
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { 
  getFirestore, doc, setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwmks7xoBtDyOoZhe2pOCFCyia2HLd9DI",
  authDomain: "nexa-app-7163c.firebaseapp.com",
  databaseURL: "https://nexa-app-7163c-default-rtdb.firebaseio.com",
  projectId: "nexa-app-7163c",
  storageBucket: "nexa-app-7163c.firebasestorage.app",
  messagingSenderId: "781173458855",
  appId: "1:781173458855:web:71bb5e6532898d20711882",
  measurementId: "G-KR4YENF8XR"
};

const app = initializeApp(firebaseConfig);

// PUT EVERYTHING ON WINDOW SO OTHER FILES CAN USE IT
window.auth = getAuth(app);
window.db = getFirestore(app);
window.storage = getStorage(app);

window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.onAuthStateChanged = onAuthStateChanged;
window.updateProfile = updateProfile;
window.sendEmailVerification = sendEmailVerification;
window.reload = reload;

window.doc = doc;
window.setDoc = setDoc;
window.ref = ref;
window.uploadBytes = uploadBytes;
window.getDownloadURL = getDownloadURL;

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
