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
];

function changePassword(i) {
  newPassword = document.getElementById("newPassword").value;
  confirmPassword = document.getElementById("confirmPassword").value;
  console.log(i);

  if (newPassword === confirmPassword) {
    user[i]["password"] = [];
    user[i].push({ password: confirmPassword });
    console.log(user);
  } else {
    alert("password are different");
  }
}

function SendEmailtoChangePassword() {
  let inputEmail = document.getElementById("forgotEmail").value;

  for (let i = 0; i < user.length; i++) {
    const email = user[i]["email"];

    if (inputEmail === email) {
      alert("An Email has been send to you");
      document.getElementById("forgot").classList.add("d-none");
      document.getElementById("containerReset").innerHTML = /*html*/ `
        <div class="container-signup" id="reset">
            <div>
                <img class="signup-logo" src="/assets/img/contact-img/logo.png" alt="" srcset="" />
            </div>
            <div id="containerReset" class="container-signup-middle-reset">

            <div class="container-up">
                <img onclick="backToLogin()" class="go-back-reset" src="/assets/img/login-img/Vector.png" alt="">
                <h1>Reset your password</h1>
                <div class="underline-login"> </div>
                <p>Change your account password</p>
            </div>

            <form class="container-input" action="" onsubmit="changePassword(i); return false;">
                <input required type="password" placeholder="New password" id="newPassword" />
                <input required type="password" placeholder="Confirm password" id="confirmPassword" />
                <div class="container-button-signup">
                    <button class="login-button">Continue</button>
                </div>
            </form>
        </div>
            `;
    } else {
      console.log("wrong Email");
    }
  }
}

function createNewUser() {
  let name = document.getElementById("signupName").value;
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;
  user.push({ name: name, email: email, password: password });
  alert("you created a new User");
  console.log(user);
}

/**
 * This function is used to check if the password and email is correct
 *
 *
 */
function checkLogin() {
  let inputPassword = document.getElementById("loginPassword").value;
  let inputEmail = document.getElementById("loginEmail").value;
  console.log(inputPassword, inputEmail);

  for (let i = 0; i < user.length; i++) {
    const element = user[i];
    const email = user[i]["email"];
    const password = user[i]["password"];

    if (email === inputEmail && password === inputPassword) {
      location.replace("/assets/templates/side_bar.html");
    } else {
      console.log("wrong password");
    }
  }
}

function openSignUp() {
  document.getElementById("signUp").classList.remove("d-none");
  document.getElementById("login").classList.add("d-none");
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
}
