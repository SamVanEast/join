let user = [
    {
        "name":"leo",
        "email":"leo@gmx.de",
        "password":"nardo"
    },

    {
        "name":"leon",
        "email":"leo@gmx.de",
        "password":"nardo1"
    }
]


function createNewUser(){
    let name = document.getElementById('signupName').value;
    let email = document.getElementById('signupEmail').value;
    let password = document.getElementById('signupPassword').value;
    user.push({'name':name, 'email':email, 'password':password});
    alert('you created a new User');
    console.log(user);
}

/**
 * This function is used to check if the password and email is correct
 * 
 * 
 */
function checkLogin() {
 
    let inputPassword = document.getElementById('loginPassword').value;
    let inputEmail = document.getElementById('loginEmail').value;
    console.log(inputPassword, inputEmail);

    for (let i = 0; i < user.length; i++) {
        const element = user[i];
        const email = user[i]['email'];
        const password = user[i]['password'];
        
    
    if(email === inputEmail && password === inputPassword){
        console.log('LOGIN');
        location.replace('/assets/templates/side_bar.html');
    }
    else {
        console.log('wrong password');
    }
}
    
}

function openSignUp(){
    document.getElementById('signUp').classList.remove('d-none');
    document.getElementById('login').classList.add('d-none');
}

function backToLogin(){
    document.getElementById('signUp').classList.add('d-none');
    document.getElementById('forgot').classList.add('d-none');
    document.getElementById('reset').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
}

function showForgotScreen() {
    document.getElementById('forgot').classList.remove('d-none');
    document.getElementById('login').classList.add('d-none');
}