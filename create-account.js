// create-account.js
let currentStep = 1;
const totalSteps = 9;
let formData = {};
let selectedGender = '';
let pfpFile = null;
let verificationCodeGenerated = "123456"; // temp OTP

const steps = document.querySelectorAll('.step');
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');
const stepTitle = document.getElementById('stepTitle');
const stepSubtitle = document.getElementById('stepSubtitle');

const stepInfo = [
  {t: "Name", s: "Step 1 of 9"},
  {t: "Username", s: "Step 2 of 9"},
  {t: "Phone Number", s: "Step 3 of 9"},
  {t: "Email", s: "Step 4 of 9"},
  {t: "Date of Birth", s: "Step 5 of 9"},
  {t: "Gender", s: "Step 6 of 9"},
  {t: "Profile Photo", s: "Step 7 of 9"},
  {t: "Verification", s: "Step 8 of 9"},
  {t: "Password", s: "Step 9 of 9"}
];

// Gender buttons
document.querySelectorAll('.gender-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedGender = btn.dataset.gender;
  }
});

// PFP preview + Upload to Firebase Storage
document.getElementById('pfpUpload').onchange = async (e) => {
  pfpFile = e.target.files[0];
  if(pfpFile) {
    const reader = new FileReader();
    reader.onload = (e) => document.getElementById('pfpPreview').src = e.target.result;
    reader.readAsDataURL(pfpFile);
  }
}

// Resend code
document.getElementById('resendBtn').onclick = () => {
  alert("Code resent: " + verificationCodeGenerated); // temp
}

function showStep(n) {
  steps.forEach((step, i) => step.style.display = i === n-1? 'block' : 'none');
  stepTitle.textContent = stepInfo[n-1].t;
  stepSubtitle.textContent = stepInfo[n-1].s;
  backBtn.style.display = n === 1? 'none' : 'block';
  nextBtn.textContent = n === totalSteps? 'Create Account' : 'Next';
}

function validateStep() {
  if(currentStep === 1) return document.getElementById('firstName').value && document.getElementById('lastName').value;
  if(currentStep === 2) return document.getElementById('username').value.length >= 3;
  if(currentStep === 3) return document.getElementById('phone').value.length >= 10;
  if(currentStep === 4) return document.getElementById('email').value.includes('@');
  if(currentStep === 5) return document.getElementById('dob').value!== '';
  if(currentStep === 6) return selectedGender!== '';
  if(currentStep === 7) return true; // optional
  if(currentStep === 8) return document.getElementById('verificationCode').value === verificationCodeGenerated;
  if(currentStep === 9) {
    const p1 = document.getElementById('password').value;
    const p2 = document.getElementById('confirmPassword').value;
    if(p1!== p2) { alert("Passwords don't match"); return false; }
    return p1.length >= 6;
  }
  return true;
}

function saveStepData() {
  if(currentStep === 1) {
    formData.firstName = document.getElementById('firstName').value;
    formData.lastName = document.getElementById('lastName').value;
  }
  if(currentStep === 2) formData.username = document.getElementById('username').value;
  if(currentStep === 3) formData.phone = document.getElementById('phone').value;
  if(currentStep === 4) formData.email = document.getElementById('email').value;
  if(currentStep === 5) formData.dob = document.getElementById('dob').value;
  if(currentStep === 6) formData.gender = selectedGender;
  if(currentStep === 7) formData.pfpFile = pfpFile;
  if(currentStep === 9) formData.password = document.getElementById('password').value;
}

async function uploadPFP(uid, file) {
  if(!file) return "";
  const storageRef = window.ref(window.storage, `profilePics/${uid}`);
  await window.uploadBytes(storageRef, file);
  const url = await window.getDownloadURL(storageRef);
  return url;
}

async function createAccount() {
  try {
    const userCredential = await window.createUserWithEmailAndPassword(window.auth, formData.email, formData.password);
    const user = userCredential.user;

    // Upload PFP
    const pfpURL = await uploadPFP(user.uid, formData.pfpFile);

    // Update profile name + photo
    await window.updateProfile(user, {
      displayName: formData.firstName + " " + formData.lastName,
      photoURL: pfpURL
    });

    // Save to Firestore
    await window.setDoc(window.doc(window.db, "users", user.uid), {
      uid: user.uid,
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      phone: formData.phone,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      photoURL: pfpURL,
      createdAt: new Date()
    });

    await window.sendEmailVerification(user);
    alert("Account Created! Verification email sent.");
    window.location.href = "home.html";

  } catch(error) {
    alert("Error: " + error.message);
    console.error(error);
    nextBtn.disabled = false;
    nextBtn.textContent = 'Create Account';
  }
}

nextBtn.onclick = async () => {
  if(!validateStep()) {
    if(currentStep === 8) alert("Incorrect verification code");
    else alert("Please complete this step correctly");
    return;
  }
  saveStepData();

  if(currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  } else {
    nextBtn.disabled = true;
    nextBtn.textContent = "Creating...";
    await createAccount();
  }
}

backBtn.onclick = () => {
  if(currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

showStep(1);
