let user = [
    {
        "name":"leo",
        "email":"leo@gmx.de",
        "password":"nardo"
    }
]


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

function checkLogin() {
    let email = user[0]['email'];
    let password = user[0]['password'];
    let inputPassword = document.getElementById('loginPassword').value;
    let inputEmail = document.getElementById('loginEmail').value;
    console.log(email, password);
    console.log(inputPassword, inputEmail);

    if(email === inputEmail && password === inputPassword){
        console.log('LOGIN');
        location.replace('/assets/templates/side_bar.html');
    }
    else {
        console.log('WRONG!');
    }
    
}