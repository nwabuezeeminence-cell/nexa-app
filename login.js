// login.js
const loginBtn = document.getElementById('loginBtn');
const loginInput = document.getElementById('loginInput');
const loginPassword = document.getElementById('loginPassword');

async function getEmailFromInput(input) {
  // If it's already an email
  if(input.includes('@')) return input;

  // Check if it's username
  // NOTE: For this to work you need to add Firestore query.
  // Since we didn't import getDocs, let's keep it simple: Email only for now
  // We can add username/phone login later
  return input; // temp: assume email
}

loginBtn.onclick = async () => {
  const input = loginInput.value.trim();
  const password = loginPassword.value;

  if(!input ||!password) {
    alert("Please fill all fields");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";

  try {
    const email = await getEmailFromInput(input);
    await window.signInWithEmailAndPassword(window.auth, email, password);
    alert("Login Successful!");
    window.location.href = "home.html";

  } catch(error) {
    alert("Login Failed: " + error.message);
    loginBtn.disabled = false;
    loginBtn.textContent = "Login";
  }
}
