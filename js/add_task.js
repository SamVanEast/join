/**
 * Alle benötigten globalen Variablen mit Ihren Arrays
 * 
 *
 */
let categoryColors = ['#FF65FF', '#00DBC1', '#83A5FF', '#FF0000'];
let newCategoryColors = ['#FF65FF', '#00DBC1', '#83A5FF', '#FF0000', '#00D700', '#FF8200', '#F700C4', '#0039FF'];
let categorys = ['Media', 'Backoffice', 'Marketing', 'Design'];
let colorFromCategory = '#000000';
let selectedColor = '#000000'; // Standardfarbe für neue Kategorien
let contact;
let bgcolor;
let prios = ['Urgent', 'Medium', 'Low'];
let allPrios = [];
let selectedPriority = "";
let checkedPrios = [];
let allSubtasks = [];
let checkedSubtasks = [];


/**
 * Funktion, die alle Aufgaben lädt
 * 
 */
async function initAddTask() {
    setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    contact = JSON.parse(backend.getItem('contact')) || [];
    console.log(allTasks);
    console.log(contact);

    renderCategoryContent();
    renderAssignedToContent();
    renderPrioButtons();
    renderSubtaskContent();
}


/**
 * Funktion, die den Kategorie-Inhalt anzeigt
 * 
 */
function renderCategoryContent() {
    document.getElementById('cat').innerHTML = /*html*/ `
         <p>Category</p>
         <div class="dropdown" id="dropdownCategory">
             <div class="categorysDropdownSelectHTML" id="selectTaskCategoryContent" onclick="renderCategorys()">Select task category</div>
         </div>
     `;
    document.getElementById('categoryColors').classList.add('d-none');
    document.getElementById('categoryColors').classList.remove('categoryColors');
}


/**
 * Funktion, die den Kategorie-Grundaufbau anzeigt
 * 
 */
function renderCategorys() {
    document.getElementById('dropdownCategory').classList.toggle('showAllCategorys');
    document.getElementById('dropdownCategory').classList.remove('categorysDropdownSelectHTML');

    let content = document.getElementById('dropdownCategory');

    content.innerHTML = /*html*/ `
         <div class="categorysDropdownSelect" id="categorysDropdownSelect" onclick="renderCategoryContent()">Select task category</div>
         <div class="categorysNewCategory" onclick="addNewCategory()"><span class="newCategory">New category</span></div>
         <div id="categorysOptions" class="categorysOptions"></div>
     `;
    renderCategorysOptions();
}


/**
 * Funktion, die die verschiedenen Kategorie-Optionen anzeigt
 * 
 */
function renderCategorysOptions() {
    let options = document.getElementById('categorysOptions');

    for (let a = 0; a < categorys.length; a++) {
        const category = categorys[a];
        const hexString = categoryColors[a % categoryColors.length];

        options.innerHTML += /*html*/`
        <span class="categorysDropdown" onclick="renderSelectedCategory('${category}', '${hexString}'), declareColorFromCategory('${hexString}')">
          ${category}
          <div class="colorDotCategorys" style="background-color: ${hexString};"></div>
        </span>
      `;
    }
}


/**
 * Funktion, die eine neue Kategorie hinzufügt
 * 
 */
function addNewCategory() {
    document.getElementById('categorysDropdownSelect').classList.toggle('categorysDropdownSelect');
    document.getElementById('dropdownCategory').classList.remove('showAllCategorys');

    document.getElementById('categorysDropdownSelect').innerHTML = /*html*/`
         <div class="categoryContent">
             <input class="inputFieldSubtask" id="inputFieldCategory" type="text" placeholder="New category name" onclick="event.stopPropagation()">
             <div class="subtaskImage">
                 <img src="../../assets/img/add_task_img/cross.png" onclick="renderCategoryContent()">
                 <div class="inputBorder"></div>
                 <img src="../../assets/img/add_task_img/hookBlack.png" onclick="pushNewCategory()">
             </div>
         </div>
     `;
    renderCategoryColors();
}


/**
 * Funktion, die die neuen möglichen Farben für eine neue Kategorie anzeigt
 * 
 */
function renderCategoryColors() {
    // Entferne d-none Klasse von categoryColors und füge categoryColors Klasse hinzu
    document.getElementById('categoryColors').classList.remove('d-none');
    document.getElementById('categoryColors').classList.add('categoryColors');

    document.getElementById('categoryColors').innerHTML = ``;

    // Durchlaufe alle neuen Kategoriefarben
    for (let g = 0; g < newCategoryColors.length; g++) {
        const newColor = newCategoryColors[g];

        // Füge jede Kategoriefarbe dem categoryColors Element hinzu
        document.getElementById('categoryColors').innerHTML += /*html*/ `
          <div class="colorDot" id="colorDot" style="background-color: ${newColor};" onclick="selectColor('${newColor}')"></div>
        `;
    }

    // Füge Klick-Event-Listener dem categoryColors Element hinzu
    document.getElementById('categoryColors').addEventListener('click', function (event) {
        // Hole alle Farbpunkte
        var colorDots = document.querySelectorAll('.colorDot');

        // Durchlaufe alle Farbpunkte und setze den Transformationsmaßstab auf 1
        for (var i = 0; i < colorDots.length; i++) {
            colorDots[i].style.transform = 'scale(1)';
        }

        // Setze den Transformationsmaßstab des angeklickten Elements auf 1,1
        event.target.style.transform = 'scale(1.3)';
    });
}


/**
 * Fügt die neue Kategorie zu dem Array hinzu und setzt die Farbe für die Kategorie.
 * 
 */
function pushNewCategory() {
    let newCategory = document.getElementById('inputFieldCategory').value;

    // Push the new category and its color to the categorys and categoryColors arrays
    categorys.push(newCategory);
    categoryColors.push(selectedColor);
    // Setzt das Eingabefeld und die Auswahlmöglichkeiten für die Farben zurück
    document.getElementById('categorysDropdownSelect').classList.remove('categorysDropdownSelect');
    document.getElementById('categoryColors').classList.add('d-none');
    document.getElementById('categoryColors').innerHTML = '';
    selectedColor = '#000000'; // Setzt die Standardfarbe zurück

    // Rendert die neuen Kategorien
    renderCategorysOptions();
}


/**
 * Funktion, die die ausgewählte Kategorie anzeigt
 * 
 * @param {string} category
 * @param {string} hexString
 */
function renderSelectedCategory(category, hexString) {
    const colorObject = convertHexToRgb(hexString);
    const colorString = `rgb(${colorObject[0]}, ${colorObject[1]}, ${colorObject[2]})`;

    document.getElementById('dropdownCategory').innerHTML = /*html*/`
      <div class="categorysDropdownSelect" id="selectedCategory" onclick="renderCategorys()">${category}<div class="colorDotCategorys" style="background-color: ${colorString};"></div></div>
    `;

    categoryColors.push(colorFromCategory);
    document.getElementById('dropdownCategory').classList.remove('showAllCategorys');
    colorFromCategory = '#000000';
}


/**
 * Setzt die ausgewählte Farbe für eine neue Kategorie.
 * @param {string} color - Der Hexcode der ausgewählten Farbe.
 */
function selectColor(color) {
    selectedColor = color;
}


/**
 * Setzt die ausgewählte Farbe für die ausgewählte Kategorie.
 * @param {string} colorCategory - Der Hexcode der ausgewählten Farbe.
 */
function declareColorFromCategory(colorCategory) {
    colorFromCategory = colorCategory;
}


/**
 * Konvertiert eine Hexadezimalzeichenfolge in ein Array von Rot-, Grün- und Blauwerten.
 *
 * @param {string} hexString - Die Hexadezimalzeichenfolge, die konvertiert werden soll.
 * @returns {number[]} Das Array mit den Rot-, Grün- und Blauwerten.
 */
function convertHexToRgb(hexString) {
    // Extrahiere den Rotwert aus der Hexadezimalzeichenfolge
    let r = parseInt(hexString.slice(1, 3), 16);
    // Extrahiere den Grünwert aus der Hexadezimalzeichenfolge
    let g = parseInt(hexString.slice(3, 5), 16);
    // Extrahiere den Blauwert aus der Hexadezimalzeichenfolge
    let b = parseInt(hexString.slice(5, 7), 16);

    // Gib das Array mit den Rot-, Grün- und Blauwerten zurück
    return [r, g, b];
}


/**
 * Funktion, die den Kontakte-Inhalt anzeigt
 * 
 */
function renderAssignedToContent() {
    document.getElementById('assigned').innerHTML = /*html*/ `
        <p>Assigned to</p>
        <div class="dropdown" id="dropdownAssignedTo">
            <div class="categorysDropdownSelectHTML" id="dropdownAssignedTo" onclick="renderAssignedTo()">Select contacts to assign</div>
        </div>`;
}


/**
 * Funktion, die den Kontakte-Grundaufbau anzeigt
 * 
 */
function renderAssignedTo() {
    document.getElementById('dropdownAssignedTo').classList.toggle('showAllCategorys');
    document.getElementById('dropdownAssignedTo').classList.remove('categorysDropdownSelectHTML');

    let content = document.getElementById('dropdownAssignedTo');

    content.innerHTML = /*html*/ `
     <div class="categorysDropdownSelect" id="assignedTo" onclick="renderAssignedToContent()">Select contacts to assign</div>
     <div id="assignedToOptions" class="categorysOptions"></div>
     `;
    renderAssignedToOptions();
}


/**
 * Funktion, die die verschiedenen Kontakte-Optionen anzeigt
 * 
 */
function renderAssignedToOptions() {
    let names = document.getElementById('assignedToOptions');

    for (let b = 0; b < contact.length; b++) {
        const contacts = contact[b]['name'];
        const bgcolor = contact[b]['bgcolor'];

        names.innerHTML += /*html*/`
            <div class="contactOptions div-container" id="div-container" onclick="checkContactCheckbox('${bgcolor}')">
                <span class="categorysDropdown" onclick="checkContactCheckbox('${bgcolor}')">${contacts}</span>
                <input id="checkbox-input" type="checkbox" name="${contacts}">
            </div>
        `;
    }
}


/**
 * Funktion, die auf alle "div-container"-Elemente hört und bei Klick die zugehörige Checkbox auswählt
 */
function checkContactCheckbox(bgcolor) {

    // Alle "div-container"-Elemente auswählen
    const divContainers = document.querySelectorAll('.div-container');

    // Für jedes "div-container"-Element einen Event-Listener hinzufügen
    divContainers.forEach(divContainer => {
        divContainer.addEventListener('click', () => {
            // Checkbox-Element auswählen und deren "checked"-Eigenschaft auf "true" setzen
            const checkboxInput = divContainer.querySelector('#assigned input[type="checkbox"]');
            checkboxInput.checked = !checkboxInput.checked;
        });
    });
    window.bgcolor = bgcolor;
}


/**
 * Fügt oder entfernt CSS-Klassen von HTML-Buttons, abhängig davon, ob sie geklickt werden oder nicht.
 * Wenn ein Button geklickt wird, wird zunächst die CSS-Klasse "urgentButtonFocused", "mediumButtonFocused" oder "lowButtonFocused" von allen Buttons entfernt.
 * Dann wird der geklickte Button mit der Klasse "urgentButtonFocused", "mediumButtonFocused" oder "lowButtonFocused" versehen, je nachdem, welcher Button geklickt wurde.
 * Der Name des ausgewählten Prioritätsniveaus wird anschließend in der Variablen "selectedPriority" gespeichert.
 *
 * @param {Event} event - Das Event-Objekt, das beim Klicken des Buttons ausgelöst wird.
 */
function toggleButtonFocus(event) {
    const button = event.target;
    const buttonId = button.id;

    // Entfernt die Fokusklasse von allen Buttons
    document.querySelectorAll('.urgentButton').forEach(b => b.classList.remove('urgentButtonFocused', 'mediumButtonFocused', 'lowButtonFocused'));

    // Fügt die Fokusklasse dem angeklickten Button hinzu
    button.classList.add(`${buttonId}Focused`);

    // Speichert den Namen der ausgewählten Priorität
    selectedPriority = button.name;
}


/**
 * Generiert HTML-Code für drei Buttons und fügt ihn in das Element mit der ID "prioButtons" ein.
 * Jeder Button hat einen Namen ("Urgent", "Medium" oder "Low"), eine CSS-Klasse ("urgentButton", "mediumButton" oder "lowButton") und eine ID ("urgentButton", "mediumButton" oder "lowButton").
 * Wenn ein Button geklickt wird, wird die Funktion "toggleButtonFocus" aufgerufen und das "event"-Objekt übergeben.
 * Jeder Button enthält auch ein Bild, das beim Klicken des Buttons ebenfalls die Funktion "toggleButtonFocus" aufruft.
 */
function renderPrioButtons() {
    document.getElementById('prioButtons').innerHTML = /*html*/`
      <button type="button" name="Urgent" class="urgentButton" id="urgentButton" onclick="toggleButtonFocus(event)">Urgent<img src="../../assets/img/add_task_img/urgent.png" class="urgent" id="urgent" onclick="toggleButtonFocus(event)"></button>
      <button type="button" name="Medium" class="urgentButton" id="mediumButton" onclick="toggleButtonFocus(event)">Medium<img src="../../assets/img/add_task_img/medium.png" class="medium" id="medium" onclick="toggleButtonFocus(event)"></button>
      <button type="button" name="Low" class="urgentButton" id="lowButton" onclick="toggleButtonFocus(event)">Low<img src="../../assets/img/add_task_img/low.png" class="low" id="low" onclick="toggleButtonFocus(event)"></button>
    `;
}


/**
 * Funktion, die den Unteraufgaben-Inhalt anzeigt
 * 
 */
function renderSubtaskContent() {
    document.getElementById('subs').innerHTML = /*html*/ `
         <p>Subtasks</p>
         <div class="inputSubtask" id="inputSubtask">
             <div class="subtaskRender" onclick="renderSubtask()">Add new subtask<img src="../img/add_task_img/plus.png" alt=""></div>
         </div>
         <div class="checkboxSubtask" id="newSubtask" required></div>
     `;

    for (let i = 0; i < allSubtasks.length; i++) {
        document.getElementById('newSubtask').innerHTML += /*html*/`
         <div class="newSubtasks" id="newSubtasks">
             <input type="checkbox" id="checkboxSubtask" value="${allSubtasks[i]}" name="${allSubtasks[i]}" checked>
             <span id="selectedSubtask">${allSubtasks[i]}</span>
         </div>
     `;
    }
}


/**
 * Funktion, die den Grundaufbau für das Inputfeld neuer Unteraufgaben anzeigt
 * 
 */
function renderSubtask() {
    document.getElementById('inputSubtask').classList.remove('inputSubtask');

    let subtaskContent = document.getElementById('inputSubtask');
    subtaskContent.innerHTML = /*html*/ `
     <div class="inputSubtask">
         <input class="inputFieldSubtask" id="inputFieldSubtask" type="text" placeholder="Add new subtask">
         <div class="subtaskImage">
             <img src="../../assets/img/add_task_img/cross.png" alt="" onclick="renderSubtaskContent()">
             <div class="inputBorder"></div>
             <img src="../../assets/img/add_task_img/hookBlack.png" alt="" onclick="addSubtask()">
         </div>
     </div>
     `;

    document.getElementById('inputFieldSubtask').value = '';
}


/**
 * Funktion, die eine neue Unteraufgabe zum Array hinzufügt
 * 
 */
function addSubtask() {
    let newSubtask = document.getElementById('inputFieldSubtask').value;

    allSubtasks.push(newSubtask);

    renderSubtaskContent();
}


/**
 * Funktion, die alle Felder leert
 * 
 */
function clearFields() {
    document.getElementById('form').reset();
    allSubtasks.length = 0;
    renderSubtaskContent();
    renderCategoryContent();
    renderAssignedToContent();
    renderPrioButtons();
}


/**
 * Funktion, die beim Absenden des Formulars die Task-Daten sammelt und speichert
 */
function submitTask() {
    // Headline, Beschreibung, Kategorie und Kontakte aus den entsprechenden Formularfeldern auslesen
    let headline = document.getElementById('headline').value;
    let desc = document.getElementById('desc').value;
    let cat = document.getElementById('selectedCategory').innerText;

    // Alle Checkboxen für die Kontakte auswählen
    const contactCheckboxes = document.querySelectorAll('#assigned input[type="checkbox"]');
    // Alle ausgewählten Kontakte aus den Checkboxen filtern
    const checkedContacts = [...contactCheckboxes].filter(cb => cb.checked);
    // Namen der ausgewählten Kontakte aus den Checkboxen auslesen
    const checkedNames = checkedContacts.map(cb => cb.name);

    // Fälligkeitsdatum aus dem Formularfeld auslesen
    let dueDate = document.getElementById('dueDate').value;

    // Alle Checkboxen für die Subtasks auswählen
    const allSubtasks = document.querySelectorAll('#newSubtask input[type="checkbox"]');
    // Alle ausgewählten Subtasks aus den Checkboxen filtern
    const checkedSubtasks = [...allSubtasks].filter(cb => cb.checked);
    // Namen der ausgewählten Subtasks aus den Checkboxen auslesen
    const checkedSubtask = checkedSubtasks.map(cb => cb.name);

    // Neue Task mit den ausgelesenen Werten erstellen
    let task = {
        'headline': headline,
        'desc': desc,
        'status': 'todo',
        'category': cat,
        'color': colorFromCategory,
        'assignedTo': checkedNames,
        'bgcolor': bgcolor,
        'dueDate': dueDate,
        'prio': selectedPriority,
        'subtask': checkedSubtask,
    };

    // Task zu der Liste aller Tasks hinzufügen und auf dem Server speichern
    addThisTask(task);
    // Formular zurücksetzen
    clearForm();
    // Kategorie-Auswahl auf den Standardwert zurücksetzen
    renderCategoryContent();
    // Kontakte auf den Standardwert zurücksetzen
    renderAssignedToContent();
    renderPrioButtons();
}


/**
 * Funktion, die eine Task zu der Liste aller Tasks hinzufügt und auf dem Server speichert
 * 
 * @param {Object} task - Task, die hinzugefügt werden soll
 */
async function addThisTask(task) {
    // Task zu der Liste aller Tasks hinzufügen
    allTasks.push(task);
    // allTasks.push({bgcolor: bgcolor});
    // Liste aller Tasks auf dem Server speichern
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    console.log(allTasks);
}


/**
 * Funktion, die das Formular zurücksetzt
 */
function clearForm() {
    document.getElementById("form").reset();
    allSubtasks.length = 0;
    renderSubtaskContent();
}