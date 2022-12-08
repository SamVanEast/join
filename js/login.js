
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