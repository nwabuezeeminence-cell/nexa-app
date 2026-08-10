// forgot-password.js
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth();
const resetBtn = document.getElementById('resetBtn');
const resetEmail = document.getElementById('resetEmail');
const backToLogin = document.getElementById('backToLogin');

resetBtn.onclick = async () => {
  const email = resetEmail.value.trim();

  if(!email) {
    alert("Please enter your email");
    return;
  }

  if(!email.includes('@')) {
    alert("Please enter a valid email");
    return;
  }

  resetBtn.disabled = true;
  resetBtn.textContent = "Sending...";

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent! Check your inbox.");
    window.location.href = "login.html";
  } catch(error) {
    alert("Error: " + error.message);
    resetBtn.disabled = false;
    resetBtn.textContent = "Send Reset Link";
  }
}

backToLogin.onclick = () => {
  window.location.href = "login.html";
}

