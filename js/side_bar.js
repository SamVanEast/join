let wichContent = '';
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
    wichContent = wichHtmlPage;
    setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
    removeDarkBlue();
    showHelpIcon();
    await showContent();
    await includeHTML();
    wichOnloadFunction();
}

async function showContent(){
    let content = document.getElementById('content');
    if (window.innerWidth < 1440) {
        wichContent = 'welcome';
        content.innerHTML = `<div w3-include-html="${wichContent}.html"></div>`;
        wichContent = 'summary'
        setTimeout(() => {
            content.innerHTML = `<div w3-include-html="${wichContent}.html"></div>`;
            includeHTML();
        }, 1500);

    }else{
        content.innerHTML = `<div w3-include-html="${wichContent}.html"></div>`;
    }
}
/**
 * wenn sich width vom der Seite ändert, soll eine Function ausgeführt werden
 */
window.addEventListener('resize', () => {
    showHelpIcon(); // meine funktion die ich ausführen möchte
})
/**
 * überpüft ob der Help-icon angezeigt werden soll und ob darkBlue einer der menü-Reiter hinzugefügt werden muss
 */
function showHelpIcon(){
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
        init();
    }
    if (wichContent == 'contacts') {
        render();
    }
    if (wichContent == 'add_task') {
        loadAllTasks();
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
 * entfernt dem log out button die class d-none 
 */
function showLogOutButton() {
    document.getElementById('log-out').classList.remove('d-none');
}
/**
 * fügt dem log out buttton die Class d-none hinzu
 */
function closeLogOutButton() {
    document.getElementById('log-out').classList.add('d-none');
}
/**
 * sorgt dafür das diese div aufwelche geklickt wird nicht von einer anderen function beeinflusst wird
 * @param {*} event 
 */
function save(event) {
    event.stopPropagation();
}


