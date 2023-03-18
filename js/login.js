let allUser;
let currentUser;


/**
 * Falls auf dem Backend noch nicht currentUser besteht, einen hinzufügen
 */
async function loginInit() {
  setURL('https://samuel-haas.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  await backend.setItem('currentUser', JSON.stringify(currentUser));
}


async function render() {
  setURL('https://samuel-haas.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  allUser = JSON.parse(backend.getItem('allUser')) || [];
  loadLoginInfo();
}


function submitUser() {
  let name = document.getElementById('signupName').value;
  let email = document.getElementById('signupEmail').value;
  let password = document.getElementById('signupPassword').value;

  let user = {
    'name': name,
    'email': email,
    'password': password,
  };

  addUser(user);
  backToLogin();
}


/**
 * add User to backend
 * 
 * @param {string} users key 
 * @param {string} test array
 */
async function addUser(user) {
  allUser.push(user);
  await backend.setItem('allUser', JSON.stringify(allUser));
}


/** this function is for change an exist password
 * 
 * @param {number of array} i 
 */
function changePassword(i) {
  let lightboxReset = document.getElementById('lightboxReset');
  let newPassword = document.getElementById("newPassword").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword === confirmPassword) {
    allUser[i].password = newPassword;
    passwordChanged(lightboxReset);

  } else {
    alert("password are different");
  }
}


/**
 * confirm scrren that password changed
 */
function passwordChanged() {
  lightboxReset.classList.remove('d-none')
  setTimeout(() => {
    lightboxReset.classList.add('d-none');
    document.getElementById('reset').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
  }, 3000);
}


/**
 * show send email screen and shows the reset password screen
 */
function sendEmailtoChangePassword() {
  let inputEmail = document.getElementById("forgotEmail").value;
  for (let i = 0; i < allUser.length; i++) {
    const email = allUser[i]["email"];

    if (inputEmail === email) {
      lightboxEmail.classList.remove('d-none');
      setTimeout(() => {
        lightboxEmail.classList.add('d-none');
        hideForgotScreen();
        document.getElementById("reset").innerHTML = renderResetContainer(i);
      }, 3000); break;
    } else if (i == allUser.length - 1) {
      alert("This Email does not exist");
    }
  }
}


/**
 * This function is used to check if the password and email is correct
 *
 */
async function checkLogin() {
  let inputPassword = document.getElementById("loginPassword").value;
  let inputEmail = document.getElementById("loginEmail").value;

  for (let i = 0; i < allUser.length; i++) {
    const email = allUser[i]["email"];
    const password = allUser[i]["password"];

    if (email === inputEmail && password === inputPassword) {
      currentUser = [allUser[i]];
      await saveCurrentUser();
      saveLoginInfo();
      location.replace("../../assets/templates/side_bar.html");
    } else if (i === allUser.length - 1) {
      document.getElementById('loginWrong').innerHTML = 'Wrong email or password';
      clearWarn();
    }
  }
}


/**
 * clears the text from the warning
 */
function clearWarn() {
  setTimeout(() => {
    document.getElementById('loginWrong').innerHTML = '&nbsp';
  }, 5000);
}


/**
 * lädt die Information über den User hoch, der sich gerade angemeldet hat 
 */
async function saveCurrentUser() {
  await backend.setItem('currentUser', JSON.stringify(currentUser));
}


/**
 * falls man sich als Guest anmeldet, soll die alten Information überschrieben werden 
 */
async function saveCurrentUserAsGuest() {
  currentUser = [];
  await backend.setItem('currentUser', JSON.stringify(currentUser));
  location.href = '../../assets/templates/side_bar.html';
}


function openSignUp() {
  document.getElementById("signUp").classList.remove("d-none");
  document.getElementById("login").classList.add("d-none");
  document.getElementById("reset").classList.add("d-none");
  document.getElementById("forgot").classList.add("d-none");
}


function backToLogin() {
  document.getElementById("signUp").classList.add("d-none");
  document.getElementById("forgot").classList.add("d-none");
  document.getElementById("reset").classList.add("d-none");
  document.getElementById("login").classList.remove("d-none");
}


function showForgotScreen() {
  document.getElementById("forgot").classList.remove("d-none");
  document.getElementById("login").classList.add("d-none");
  document.getElementById("signUp").classList.add("d-none");
}


function hideForgotScreen() {
  document.getElementById('lightboxEmail').classList.add('d-none');
  document.getElementById("forgot").classList.add("d-none");
  document.getElementById("reset").classList.remove('d-none');
}

/**
 * save the login Information in the local Storage
 */
function saveLoginInfo() {
  let email = document.getElementById('loginEmail');
  let password = document.getElementById('loginPassword');
  let rememberMe = document.getElementById('remember').checked;
  localStorage.setItem('rememberMe', rememberMe);

  if (rememberMe) {
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value);
  }
}

/**
 * load the saved login Information
 */
function loadLoginInfo() {
  let email = document.getElementById('loginEmail');
  let password = document.getElementById('loginPassword');
  let rememberMe = localStorage.getItem('rememberMe');

  if (rememberMe == 'true') {
    email.value = localStorage.getItem('email')
    password.value = localStorage.getItem('password')
    document.getElementById('remember').checked = true;
  } else {
    email.value.length = 0;
    password.value.length = 0;
    document.getElementById('remember').checked = false;
  }
}