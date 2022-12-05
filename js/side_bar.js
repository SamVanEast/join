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

function loadContent(wichContent){//Den angeklickten Inhalt laden
    let content = document.getElementById('content');
    let tab = document.getElementById(`tab-${wichContent}`);

    content.innerHTML = `<div w3-include-html="${wichContent}.html"></div>`;
    removeDarkBlue();
    tab.classList.add('darkBlue');
    includeHTML();
}

function removeDarkBlue(){//Überrall den dunkleren Farbton löschen.
    document.getElementById('tab-summary').classList.remove('darkBlue');
    document.getElementById('tab-board').classList.remove('darkBlue');
    document.getElementById('tab-add_task').classList.remove('darkBlue');
    document.getElementById('tab-contacts').classList.remove('darkBlue');
    document.getElementById('tab-legal_notice').classList.remove('darkBlue');
}