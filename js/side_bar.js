let wichContent = '';
let isWelcomeAlready = false; //damit soll verhindert werden das die Welcome Seite mehrmals geladen wird
let welcomeIsShowing = false;
/**
 * Sucht nach dem Attribute w3-include-html um darin ein HtMl-template rein zu laden
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
 * Je nachdem auf welchem Reiter man klickt wird das entsprechende template geladen
 * ebenso wird dem angeklickten Reiter eine andere Background-color gegeben
 * @param {string} wichHtmlPage gibt an welches HTML-template geladen werden muss, indem es ein Teil des Pfads ist
 */
async function loadContent(wichHtmlPage) {//Den angeklickten Inhalt laden
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
 * soll die Information herrunter laden über den User der sich angemeldet hat, wenn man sich als Guest angemeldet hat soll ein leeres Array geladen werden
 */
async function loadBackend() {
    setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
    await downloadFromServer();
    currentUser = JSON.parse(backend.getItem('currentUser')) || [];
}
/**
 * lädt den content rein und wenn die Seite zu schmal ist wird noch ein Begrüßungscontent davor geladen 
 */
function showContent() {
    let content = document.getElementById('content');
    if (window.innerWidth < 1440 && isWelcomeAlready == false) {
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
 * ladet die Begrüßungsseite beim laden der side_bar.html
 * @param {id} content //to get the div with the ID content
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
        setTimeout(() => {//falls jmd die widht von der website ändert nicht immer wieder die animation von class= "hide_welcome" ausgeführt wird
            document.getElementById('welcome-responsive').classList.add('d-none');
        }, 500);
    }, 1500);
}
/**
 * wenn der content von contacts geladen wird soll die header_headline nicht mehr angezeigt werden
 */
function checkIFWichContentContacts() {
    if (wichContent == 'contacts') {
        document.getElementById('header-headline').style = 'display: none';
    } else {
        document.getElementById('header-headline').style = '';
    }
}
/**
 * wenn der content von add_task geladen wird, soll der div header-image nicht mehr angezeigt werden
 */
function checkIFWichContentAddTasks() {
    if (wichContent == 'add_task' && window.innerWidth < 1060) {
        document.getElementById('header-image').style = 'display: none';
    } else {
        document.getElementById('header-image').style = '';
    }
}
/**
 * wenn sich width vom der Seite ändert, soll eine Function ausgeführt werden
 */
window.addEventListener('resize', () => {
    showHelpIcon(); // meine funktion die ich ausführen möchte
    checkIFWichContentContacts();
    checkIFWichContentAddTasks();
})
/**
 * überpüft ob der Help-icon angezeigt werden soll und ob darkBlue einer der menü-Reiter hinzugefügt werden muss
 */
function showHelpIcon() {
    let tab = document.getElementById(`tab-${wichContent}`);
    if (wichContent == 'help' || window.innerWidth < 1060) {
        document.getElementById('qoestion-mark-img').classList.add('d-none');
    } else {
        document.getElementById('qoestion-mark-img').classList.remove('d-none');
        if (!wichContent == 'welcome') {
            tab.classList.add('darkBlue');
        }
    }
}
/**
 * frägt nach welcher content geladen ist und dann nur die dazu gehöhrige function ausgeführt wird
 */
async function wichOnloadFunction() {
    if (wichContent == 'board') {
        initBoard();
    }
    if (wichContent == 'contacts') {
        initContacts();
    }
    if (wichContent == 'add_task') {
        init();
    }
    if (wichContent == 'summary') {
        summaryInit();
    }
}
/**
 * Es löscht von allen Reitern die diese Background-color haben könnten, diese.
 */
function removeDarkBlue() {//Überrall den dunkleren Farbton löschen.
    document.getElementById('tab-summary').classList.remove('darkBlue');
    document.getElementById('tab-board').classList.remove('darkBlue');
    document.getElementById('tab-add_task').classList.remove('darkBlue');
    document.getElementById('tab-contacts').classList.remove('darkBlue');
    document.getElementById('tab-legal_notice').classList.remove('darkBlue');
}
/**
 * entfernt den divs im Menu unter dem Logo, jenachdem wie breit die Website ist display:none
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
 * fügt den divs im Menu unter dem Logo display:none hinzu
 */
function closeLogOutButton() {
    document.getElementById('log-out-area').style = 'display: none';
    document.getElementById('log-out-area-help').style = 'display: none';
    document.getElementById('log-out-area-legale_notice').style = 'display: none';
    document.getElementById('log-out-area-log-out').style = 'display: none';
}
/**
 * sorgt dafür das diese div aufwelche geklickt wird nicht von einer anderen function beeinflusst wird
 * @param {*} event 
 */
function save(event) {
    event.stopPropagation();
}
/**
 * ist eine Abfrage um zu wissen ob man sich als guest oder user einloggt
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
 * ladet die user Begrüßung
 * @param {*id} welcome Die Id vom welcome div
 * @param {*id} welcomeResponsive Die Id vom welcome-responsive div
 */
function loadUser(welcome, welcomeResponsive) {
    welcome.innerHTML = `${htmlUser()}`;
    if (welcomeIsShowing == true) {
        welcomeResponsive.innerHTML = `${htmlUser()}`;
    }
}
/**
 * ladet die guest Begrüßung
 * @param {id} welcome Die Id vom welcome div
 * @param {id} welcomeResponsive Die Id vom welcome-responsive div
 */
function loadGuest(welcome, welcomeResponsive) {
    welcome.innerHTML = `${htmlGuest()}`;
    if (welcomeIsShowing == true) {
        welcomeResponsive.innerHTML = `${htmlGuest()}`;
    }
}
/**
 * 
 * @returns Gibt den HTML content für den user 
 */
function htmlUser() {
    return `<span class="good_morning_responsive">Good morning,</span><br>
            <span class="account_name_responsive">${currentUser[0].name}</span>
            `;
}
/**
 * 
 * @returns Gibt den HTML content für den guest
 */
function htmlGuest() {
    return `<span class="good_morning_responsive">Good morning</span><br>
            `;
}
