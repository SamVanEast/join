function renderResetContainer(i) {
    return /*html*/ `
    <div class="container-signup-reset" >
        
      <div id="containerReset" class="container-signup-middle-reset">

          <div class="go-back-reset-container">
            <img onclick="backToLogin()" id="goBackReset" class="go-back-reset" src="/assets/img/login-img/Vector.png" alt="">
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
}