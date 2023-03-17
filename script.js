setURL('https://samuel-haas.developerakademie.net/smallest_backend_ever');
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