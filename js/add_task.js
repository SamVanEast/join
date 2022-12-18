/**
 * Alle benötigten globalen Variablen mit Ihren Arrays
 * 
 *
 */
let contact;
let categoryColors = ['#FF65FF', '#00DBC1', '#83A5FF', '#FF0000'];
let newCategoryColors = ['#FF65FF', '#00DBC1', '#83A5FF', '#FF0000', '#00D700', '#FF8200', '#F700C4', '#0039FF']; 
let categorys = ['Media', 'Backoffice', 'Marketing', 'Design'];
let selectedColor = '#000000'; // Default color for new categories
let prios = ['Urgent', 'Medium', 'Low'];
let allPrios = [];
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
        const colorObject = convertHexToRgb(hexString);

        options.innerHTML += /*html*/`
        <span class="categorysDropdown" onclick="renderSelectedCategory('${category}', '${hexString}')">
          ${category}
          <div class="colorDot" style="background-color: ${hexString};"></div>
        </span>
      `;
    }
}


function selectColor(color) {
    selectedColor = color;
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
    document.getElementById('categoryColors').classList.remove('d-none');
    document.getElementById('categoryColors').classList.add('categoryColors');
  
    for (let g = 0; g < newCategoryColors.length; g++) {
      const newColor = newCategoryColors[g];
  
      document.getElementById('categoryColors').innerHTML += /*html*/ `
            <div class="colorDot" id="colorDot" style="background-color: ${newColor};" onclick="selectColor('${newColor}')"></div>
      `;
    }
  }


/**
 * Funktion, die eine neue Kategorie zum Array hinzufügt
 * 
 */
function pushNewCategory() {
    let newCategory = document.getElementById('inputFieldCategory').value;
  
    // Push the new category and its color to the categorys and categoryColors arrays
    categorys.push(newCategory);
    categoryColors.push(selectedColor);
  }


/**
 * Funktion, die die ausgewählte Kategorie anzeigt
 * 
 * @param {string} category
 * @param {string} color
 */
function renderSelectedCategory(category, hexString) {
    const colorObject = convertHexToRgb(hexString);
    const colorString = `rgb(${colorObject[0]}, ${colorObject[1]}, ${colorObject[2]})`;

    document.getElementById('dropdownCategory').innerHTML = /*html*/`
      <div class="categorysDropdownSelect" id="selectedCategory" onclick="renderCategorys()">
        ${category}
        <div class="colorDot" style="background-color: ${colorString};"></div>
      </div>
    `;

    document.getElementById('dropdownCategory').classList.remove('showAllCategorys');
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

        names.innerHTML += /*html*/`
         <div class="contactOptions div-container" id="div-container" onclick="checkContactCheckbox()"><span class="categorysDropdown" onclick="checkContactCheckbox()">${contacts}</span><input id="checkbox-input" type="checkbox" name="${contacts}"></div>
         `;
    }
}


/**
 * Funktion, die auf alle "div-container"-Elemente hört und bei Klick die zugehörige Checkbox auswählt
 */
function checkContactCheckbox() {

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
}


/**
 * Funktion, die die Prioritäts-Buttons anzeigt
 */
function renderPrioButtons() {
    document.getElementById('prioButtons').innerHTML = /*html*/`
      <button type="button" class="urgentButton">Urgent<input class="urgent" id="urgent" type="checkbox" value="Urgent" name="Urgent"></button>
      <button type="button" class="mediumButton">Medium<input class="medium" id="medium" type="checkbox" value="Medium" name="Medium"></button>
      <button type="button" class="lowButton">Low<input class="low" id="low" type="checkbox" value="Low" name="Low"></button>
    `;

    // Alle Button-Elemente auswählen
    const buttons = document.querySelectorAll('#prioButtons button');

    // Für jedes Button-Element einen Event-Listener hinzufügen
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            // Checkbox-Element auswählen und deren "checked"-Eigenschaft auf "true" setzen
            const checkbox = button.querySelector('input[type="checkbox"]');
            checkbox.checked = true;
        });
    });
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
             <input type="checkbox" id="checkboxSubtask" value="${allSubtasks[i]}" name="${allSubtasks[i]}">
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
    renderCategoryContent();
    renderAssignedToContent();
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

    // Alle Checkboxen für die Prioritäten auswählen
    const prioCheckboxes = document.querySelectorAll('#prioButtons input[type="checkbox"]');
    // Alle ausgewählten Prioritäten aus den Checkboxen filtern
    const allPrios = [...prioCheckboxes].filter(cb => cb.checked);
    // Namen der ausgewählten Prioritäten aus den Checkboxen auslesen
    const checkedPrios = allPrios.map(cb => cb.name);
    // Falls mehr als eine Priorität ausgewählt wurde, die Liste auf ein Element verkürzen
    if (checkedPrios.length > 1) {
        checkedPrios.length = 1;
    }

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
        'assignedTo': checkedNames,
        'dueDate': dueDate,
        'prio': checkedPrios,
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
}


/**
 * Funktion, die eine Task zu der Liste aller Tasks hinzufügt und auf dem Server speichert
 * 
 * @param {Object} task - Task, die hinzugefügt werden soll
 */
async function addThisTask(task) {
    // Task zu der Liste aller Tasks hinzufügen
    allTasks.push(task);
    // Liste aller Tasks auf dem Server speichern
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    console.log(allTasks);
}


/**
 * Funktion, die das Formular zurücksetzt
 */
function clearForm() {
    document.getElementById("form").reset();
}