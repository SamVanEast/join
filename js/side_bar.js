let wichContent = '';
let isWelcomeAlready = false; //this is to prevent the Welcome page from being loaded multiple times
let welcomeIsShowing = false;
/**
 * Searches for the attribute w3-include-html to load a HtMl-template into it.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}
/**
 * Depending on which tab you click, the corresponding template is loaded
 * also the clicked tab will be given a different background color
 * @param {string} wichHtmlPage specifies which HTML-template has to be loaded by being part of the path
 */
async function loadContent(wichHtmlPage, statusBoard) {
    if (statusBoard !== undefined) {
        taskStatus = statusBoard;
    }
    if (welcomeIsShowing == false) {
        wichContent = wichHtmlPage;
        await loadBackend();
        removeDarkBlue();
        showHelpIcon();
        showContent();
        await includeHTML();
        whoToWelcome();
        wichOnloadFunction();
        closeLogOutButton();
    }
}
/**
 * should download the information about the user who has logged in, if you have logged in as guest an empty array should be loaded
 */
async function loadBackend() {
    setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
    await downloadFromServer();
    currentUser = JSON.parse(backend.getItem('currentUser')) || [];
}
/**
 * loads the content and if the page is too narrow a welcome content is loaded in front of it 
 */
function showContent() {
    let content = document.getElementById('content');
    if (window.innerWidth < 1440 && isWelcomeAlready == false) {
        document.getElementById('content').style = 'position: relative';
        loadWelcomeContent(content);
        document.getElementById('header-headline').style = '';
    } else {
        checkIFWichContentContacts();
        checkIFWichContentAddTasks();
        content.innerHTML = `<div w3-include-html="${wichContent}.html"></div>`;
        document.getElementById('header-headline').style = '';
        isWelcomeAlready = true;
    }
}
/**
 * loads the welcome page when loading side_bar.html
 * @param {id} content to get the div with the ID content
 */
async function loadWelcomeContent(content) {
    welcomeIsShowing = true;
    content.innerHTML = `<div w3-include-html="welcome.html"></div>`;
    content.innerHTML += `<div w3-include-html="summary.html"></div>`;
    document.getElementById('side-bar').style = 'overflow: hidden';
    setTimeout(() => {
        document.getElementById('welcome-responsive').classList.add('hide_welcome');
        document.getElementById('side-bar').style = '';
        welcomeIsShowing = false;
        isWelcomeAlready = true;
        setTimeout(() => {
            document.getElementById('content').style = '';  
        }, 100);
    }, 1500);
}
/**
 * when the content is loaded from contacts the header_headline should not be displayed anymore
 */
function checkIFWichContentContacts() {
    if (wichContent == 'contacts') {
        document.getElementById('header-headline').style = 'display: none';
    } else {
        document.getElementById('header-headline').style = '';
    }
}
/**
 * when the content of add_task is loaded, the div header-image should no longer be displayed
 */
function checkIFWichContentAddTasks() {
    if (wichContent == 'add_task' && window.innerWidth < 1060) {
        document.getElementById('header-image').style = 'display: none';
    } else {
        document.getElementById('header-image').style = '';
    }
}
/**
 * when width of the page changes, a function should be executed
 */
window.addEventListener('resize', () => {
    showHelpIcon();
    checkIFWichContentContacts();
    checkIFWichContentAddTasks();
})

/**
 * when the innerwidth to small is redirect to add_task.html
 */
window.addEventListener('resize', () => {
    if (window.innerWidth <= 400 && toAddTask) {
        loadContent('add_task', 'todo');
    }
})

/**
 * checks if the help icon should be displayed and if darkBlue should be added to one of the menu- tabs must be added
 */
function showHelpIcon() {
    let tab = document.getElementById(`tab-${wichContent}`);
    if (wichContent == 'help' || window.innerWidth < 1060) {
        document.getElementById('qoestion-mark-img').classList.add('d-none');
    } else {
        document.getElementById('qoestion-mark-img').classList.remove('d-none');
        if (wichContent !== 'welcome') {
            tab.classList.add('darkBlue');
        }
    }
}
/**
 * asks which content is loaded and then only the corresponding function is executed
 */
async function wichOnloadFunction() {
    if (wichContent == 'board') {
        initBoard();
    }
    if (wichContent == 'contacts') {
        initContacts();
    }
    if (wichContent == 'add_task') {
        initAddTask();
        toAddTask = false;
    }
    if (wichContent == 'summary') {
        initSummary();
    }
}
/**
 * It deletes from all tabs that could have this background-color.
 */
function removeDarkBlue() {
    document.getElementById('tab-summary').classList.remove('darkBlue');
    document.getElementById('tab-board').classList.remove('darkBlue');
    document.getElementById('tab-add_task').classList.remove('darkBlue');
    document.getElementById('tab-contacts').classList.remove('darkBlue');
    document.getElementById('tab-legal_notice').classList.remove('darkBlue');
}
/**
 * removes the divs in the menu below the logo, depending on how wide the site is display:none
 */
function showLogOutButton() {
    document.getElementById('log-out-area').style = '';
    if (window.innerWidth <= 1060) {
        document.getElementById('log-out-area-help').style = '';
        document.getElementById('log-out-area-legale_notice').style = '';
        document.getElementById('log-out-area-log-out').style = '';
    } else {
        document.getElementById('log-out-area-log-out').style = '';
    }

}
/**
 * adds display:none to the divs in the menu below the logo
 */
function closeLogOutButton() {
    document.getElementById('log-out-area').style = 'display: none';
    document.getElementById('log-out-area-help').style = 'display: none';
    document.getElementById('log-out-area-legale_notice').style = 'display: none';
    document.getElementById('log-out-area-log-out').style = 'display: none';
}
/**
 * makes sure that this div, which is clicked on, is not influenced by another function
 * @param {*} event 
 */
function save(event) {
    event.stopPropagation();
}
/**
 * is a query to know if you log in as guest or user
 */
function whoToWelcome() {
    if (wichContent == 'summary') {
        let welcome = document.getElementById('welcome');
        let welcomeResponsive = document.getElementById('welcome-responsive');
        if (currentUser.length > 0) {
            loadUser(welcome, welcomeResponsive);
        } else {
            loadGuest(welcome, welcomeResponsive);
        }
    }

}
/**
 * Invites the user greeting
 * @param {id} welcome the Id from the welcome div
 * @param {id} welcomeResponsive the Id from welcome-responsive div
 */
function loadUser(welcome, welcomeResponsive) {
    document.getElementById('profile-img').src = '../img/header-img/profile-img.png';
    welcome.innerHTML = `${htmlUser()}`;
    if (welcomeIsShowing == true) {
        welcomeResponsive.innerHTML = `${htmlUser()}`;
    }
}
/**
 * Invites the guest greeting
 * @param {id} welcome the Id from the welcome div
 * @param {id} welcomeResponsive the Id from welcome-responsive div
 */
function loadGuest(welcome, welcomeResponsive) {
    welcome.innerHTML = `${htmlGuest()}`;
    if (welcomeIsShowing == true) {
        welcomeResponsive.innerHTML = `${htmlGuest()}`;
    }
}
/**
 * 
 * @returns Gives the HTML content for the user 
 */
function htmlUser() {
    return `<span class="good_morning_responsive">Good morning,</span><br>
            <span class="account_name_responsive">${currentUser[0].name}</span>
            `;
}
/**
 * 
 * @returns Gives the HTML content for the guest
 */
function htmlGuest() {
    return `<span class="good_morning_responsive">Good morning,</span><br>
            <span class="account_name_responsive">Guest</span>
            `;
}
