let user = [
  {
    name: "leo",
    email: "leo@gmx.de",
    password: "nardo",
  },

  {
    name: "leon",
    email: "leonardo@gmx.de",
    password: "nardo1",
  },

  {
    name: "Samuel",
    email: "samuel@1",
    password: "samuel",
  }
];
let currentUser = [];
/**
 * Falls auf dem Backend noch nicht currentUser besteht, einen hinzufügen
 */
async function loginInit() {
  setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
  await downloadFromServer();
  await backend.setItem('currentUser', JSON.stringify(currentUser));
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
    user[i].password = newPassword;
    passwordChanged(lightboxReset);

  } else {
    alert("password are different");
  }
}

function passwordChanged() {
  console.log('password changed');
  lightboxReset.classList.remove('d-none')
  setTimeout(() => {
    lightboxReset.classList.add('d-none');
    document.getElementById('reset').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
  }, 3000);
}

function SendEmailtoChangePassword() {
  let inputEmail = document.getElementById("forgotEmail").value;
  let lightboxEmail = document.getElementById('lightboxEmail');
  for (let i = 0; i < user.length; i++) {
    const email = user[i]["email"];

    if (inputEmail === email) {
      lightboxEmail.classList.remove('d-none');
      setTimeout(() => {
        lightboxEmail.classList.add('d-none');
        document.getElementById("forgot").classList.add("d-none");
        document.getElementById("reset").classList.remove('d-none');
        document.getElementById("reset").innerHTML += /*html*/ `
        <div class="container-signup-reset" >
            
          <div id="containerReset" class="container-signup-middle-reset">

              <div class="go-back-reset-container">
                <img onclick="backToLogin()" class="go-back-reset" src="/assets/img/login-img/Vector.png" alt="">
              </div>  
              <div class="container-up-reset">
                  <h1>Reset your password</h1>
                  <div class="underline-login"> </div>
                  <p>Change your account password</p>
              </div>

              <form class="container-input-reset" action="" onsubmit="changePassword(${i}); return false;">
                  <input required type="password" placeholder="New password" id="newPassword" />
                  <input required type="password" placeholder="Confirm password" id="confirmPassword" />
                  <div class="container-button-signup">
                      <button class="login-button">Continue</button>
                  </div>
              </form>
          </div>
        </div>
            `;
      }, 3000); break;
    } else {


      alert("This Email does not exist");
    }
  }
}

function createNewUser() {
  let name = document.getElementById("signupName").value;
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;
  user.push({ 'name': name, 'email': email, 'password': password });
  alert("you created a new User");
  console.log(user);
}

/**
 * This function is used to check if the password and email is correct
 *
 *
 */
async function checkLogin() {
  let inputPassword = document.getElementById("loginPassword").value;
  let inputEmail = document.getElementById("loginEmail").value;
  console.log(inputPassword, inputEmail);

  for (let i = 0; i < user.length; i++) {
    const element = user[i];
    const email = user[i]["email"];
    const password = user[i]["password"];

    if (email === inputEmail && password === inputPassword) {
      currentUser = [user[i]];
      await saveCurrentUser();
      location.replace("/assets/templates/side_bar.html");
    } else {
      console.log("wrong password");
    }
  }
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
async function saveCurrentUserAsGuest(){
  currentUser = [];
  await backend.setItem('currentUser', JSON.stringify(currentUser));
  location.href='/assets/templates/side_bar.html';
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
