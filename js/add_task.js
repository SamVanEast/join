/**
 * All required global variables with their arrays
 * 
 *
 */
let categoryColors = ['#FF65FF', '#00DBC1', '#83A5FF', '#FF0000'];
let newCategoryColors = ['#FF65FF', '#00DBC1', '#83A5FF', '#FF0000', '#00D700', '#FF8200', '#F700C4', '#0039FF'];
let categorys = ['Media', 'Backoffice', 'Marketing', 'Design'];
let colorFromCategory = '#000000';
let selectedColor = '#000000';
let contact;
let bgContactColor = [];
let prios = ['Urgent', 'Medium', 'Low'];
let allPrios = [];
let selectedPriority = "";
let checkedPrios = [];
let allSubtasks = [];
let checkedSubtasks = [];


/**
 * Function that loads all tasks
 * 
 */
async function initAddTask() {
    setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    contact = JSON.parse(backend.getItem('contact')) || [];

    renderCategoryContent();
    renderAssignedToContent();
    renderPrioButtons();
    renderSubtaskContent();
}


/**
 * Function that displays the category content
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
    colorFromCategory = '#000000';
}


/**
 * Function that displays the basic category structure
 * 
 */
function renderCategorys() {
    document.getElementById('dropdownCategory').classList.toggle('showAllCategorys');
    document.getElementById('dropdownCategory').classList.remove('categorysDropdownSelectHTML');
    document.getElementById('dropdownCategory').style.border = "1px solid #D1D1D1";

    let content = document.getElementById('dropdownCategory');

    content.innerHTML = /*html*/ `
         <div class="categorysDropdownSelect" id="categorysDropdownSelect" onclick="renderCategoryContent()">Select task category</div>
         <div class="categorysNewCategory" onclick="addNewCategory()"><span class="newCategory">New category</span></div>
         <div id="categorysOptions" class="categorysOptions"></div>
     `;
    renderCategorysOptions();
}


/**
 * Function that displays the different category options
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
 * Function that adds a new category
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
 * Function that displays the new possible colors for a new category
 * 
 */
function renderCategoryColors() {
    document.getElementById('categoryColors').classList.remove('d-none');
    document.getElementById('categoryColors').classList.add('categoryColors');

    document.getElementById('categoryColors').innerHTML = ``;

    for (let g = 0; g < newCategoryColors.length; g++) {
        const newColor = newCategoryColors[g];

        document.getElementById('categoryColors').innerHTML += /*html*/ `
            <div class="colorDot" id="colorDot" style="background-color: ${newColor};" onclick="selectColor('${newColor}')">
    <div class="colorDotTransform"></div>
  </div>

        `;
    }
    addClickEventForColorDot();
}


/**
 * Adds a click event listener to each element in the colorDots NodeList.
 * When an element is clicked, the function scales up the element and increases its opacity,
 * while resetting the transform and opacity of all other elements in the NodeList.
 *
 * @param {Event} event - The click event object.
 */
function addClickEventForColorDot(){
    let colorDots = document.querySelectorAll('.colorDot');
    for (let i = 0; i < colorDots.length; i++) {
        colorDots[i].addEventListener('click', function (event) {
            for (let i = 0; i < colorDots.length; i++) {
                colorDots[i].style.transform = 'scale(1)';
                colorDots[i].style.opacity = '0.6';
            }
            event.target.style.transform = 'scale(1.3)';
            event.target.style.opacity = '1.0';
        });
    }
}


/**
 * Adds the new category to the array and sets the color for the category
 * 
 */
function pushNewCategory() {
    let newCategory = document.getElementById('inputFieldCategory').value;

    categorys.push(newCategory);
    categoryColors.push(selectedColor);

    document.getElementById('categorysDropdownSelect').classList.remove('categorysDropdownSelect');
    document.getElementById('categoryColors').classList.add('d-none');
    document.getElementById('categoryColors').innerHTML = '';

    renderCategorysOptions();
}


/**
 * Function that displays the selected category
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
 * Sets the selected color for a new category
 * @param {string} color
 */
function selectColor(color) {
    selectedColor = color;
}


/**
 * Sets the selected color for the selected category
 * @param {string} colorCategory
 */
function declareColorFromCategory(colorCategory) {
    colorFromCategory = colorCategory;
}


/**
 * Converts a hexadecimal string into an array of red, green and blue values
 *
 * @param {string} hexString
 * @returns {number[]}
 */
function convertHexToRgb(hexString) {
    let r = parseInt(hexString.slice(1, 3), 16);
    let g = parseInt(hexString.slice(3, 5), 16);
    let b = parseInt(hexString.slice(5, 7), 16);

    return [r, g, b];
}


/**
 * Function that displays the contacts content
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
 * Function that displays the contacts basic structure
 * 
 */
function renderAssignedTo() {
    document.getElementById('dropdownAssignedTo').classList.toggle('showAllCategorys');
    document.getElementById('dropdownAssignedTo').classList.remove('categorysDropdownSelectHTML');
    document.getElementById('dropdownAssignedTo').style.border = "1px solid #D1D1D1";

    let content = document.getElementById('dropdownAssignedTo');

    content.innerHTML = /*html*/ `
     <div class="categorysDropdownSelect" id="assignedTo" onclick="renderAssignedToContent()">Select contacts to assign</div>
     <div id="assignedToOptions" class="categorysOptions"></div>
     `;
    renderAssignedToOptions();
}


/**
 * Function that displays the different contacts options
 * 
 */
function renderAssignedToOptions() {
    let names = document.getElementById('assignedToOptions');

    for (let b = 0; b < contact.length; b++) {
        const contacts = contact[b]['name'];
        const contactColor = contact[b]['bgcolor'];

        names.innerHTML += /*html*/`
        <div class="contactOptions div-container" id="div-container" onclick="checkContactCheckbox(event, '${contactColor}')">
          <span class="categorysDropdown">${contacts}</span>
          <input id="checkbox-input" type="checkbox" name="${contacts}">
        </div>
      `;
    }
}


/**
 * Function that listens for all "div-container" elements and selects the associated checkbox when clicked
 */
function checkContactCheckbox(event, contactColor) {
    const checkboxInput = event.currentTarget.querySelector('#checkbox-input');

    checkboxInput.checked = !checkboxInput.checked;

    if (checkboxInput.checked && bgContactColor.indexOf(contactColor) === -1) {
        bgContactColor.push(contactColor);
    } else if (!checkboxInput.checked && bgContactColor.indexOf(contactColor) !== -1) {
        bgContactColor.splice(bgContactColor.indexOf(contactColor), 1);
    }
}


/**
 * Generates HTML code for three buttons and inserts it into the element with ID "prioButtons"
 * Each button has a name ("Urgent", "Medium" or "Low"), a CSS class ("urgentButton", "mediumButton" or "lowButton") and an ID ("urgentButton", "mediumButton" or "lowButton")
 * When a button is clicked, the "toggleButtonFocus" function is called and the "event" object is passed
 * Each button also contains an image that also calls the "toggleButtonFocus" function when the button is clicked
 */
function renderPrioButtons() {
    selectedPriority = "";

    document.getElementById('prioButtons').innerHTML = /*html*/`
      <button type="button" name="Urgent" class="urgentButton" id="urgentButton" onclick="toggleButtonFocus(event)">Urgent<img src="../../assets/img/add_task_img/urgent.png" class="urgent" id="urgent" onclick="toggleButtonFocus(event)"></button>
      <button type="button" name="Medium" class="urgentButton" id="mediumButton" onclick="toggleButtonFocus(event)">Medium<img src="../../assets/img/add_task_img/medium.png" class="medium" id="medium" onclick="toggleButtonFocus(event)"></button>
      <button type="button" name="Low" class="urgentButton" id="lowButton" onclick="toggleButtonFocus(event)">Low<img src="../../assets/img/add_task_img/low.png" class="low" id="low" onclick="toggleButtonFocus(event)"></button>
    `;
}


/**
 * Adds or removes CSS classes from HTML buttons depending on whether they are clicked or not
 * When a button is clicked, first the CSS class "urgentButtonFocused", "mediumButtonFocused" or "lowButtonFocused" is removed from all buttons
 * Then the clicked button is given the class "urgentButtonFocused", "mediumButtonFocused" or "lowButtonFocused" depending on which button was clicked
 * The name of the selected priority level is then stored in the variable "selectedPriority"
 *
 * @param {Event} event
 */
function toggleButtonFocus(event) {
    document.getElementById('prioButtons').style.border = "unset";
    const button = event.target;
    const buttonId = button.id;

    document.querySelectorAll('.urgentButton').forEach(b => b.classList.remove('urgentButtonFocused', 'mediumButtonFocused', 'lowButtonFocused'));

    button.classList.add(`${buttonId}Focused`);

    selectedPriority = button.name;
}


/**
 * Function that displays the subtask content
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
 * Function that displays the basic structure for the input field of new subtasks
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
 * Function that adds a new subtask to the array
 * 
 */
function addSubtask() {
    let newSubtask = document.getElementById('inputFieldSubtask').value;

    allSubtasks.push(newSubtask);

    renderSubtaskContent();
}


/**
 * Function that clears all fields
 * 
 */
function clearFields() {
    document.getElementById('form').reset();
    allSubtasks.length = 0;
    bgContactColor.length = 0;
    renderSubtaskContent();
    renderCategoryContent();
    renderAssignedToContent();
    renderPrioButtons();
}


/**
 * Function to check the form before it is submitted
 * 
 * The function first checks the value of the variable "colorFromCategory". If the value of the variable is "#000000", an error message is displayed in the console and the border of the element with the ID "dropdownCategory" is set to red
 * Then the length of the array "bgContactColor" is checked. If the length is less than 1, an error message is displayed in the console and the border of the element with the ID "dropdownAssignedTo" is set red
 * Lastly, the value of the "selectedPriority" variable is checked. If the value is empty, an error message is displayed in the console and the border of the element with the ID "prioButtons" is set to red
 * If all conditions are not met, the "submitTask" function is called and "true" is returned. Otherwise "false" is returned
 */
function checkForm() {
    if (colorFromCategory == '#000000') {
        document.getElementById('dropdownCategory').style.border = "1px solid red";
        return false;
    }
    if (bgContactColor.length < 1) {
        document.getElementById('dropdownAssignedTo').style.border = "1px solid red";
        return false;
    }
    if (selectedPriority == "") {
        document.getElementById('prioButtons').style.border = "1px solid red";
        return false;
    }
    submitTask();
    return true;
}


/**
 * Function that collects and saves the task data when submitting the form
 */
async function submitTask() {
    let headline = document.getElementById('headline').value;
    let desc = document.getElementById('desc').value;
    let cat = document.getElementById('selectedCategory').innerText;

    const contactCheckboxes = document.querySelectorAll('#assigned input[type="checkbox"]');
    const checkedContacts = [...contactCheckboxes].filter(cb => cb.checked);
    const checkedNames = checkedContacts.map(cb => cb.name);

    let dueDate = document.getElementById('dueDate').value;

    const allSubtasks = document.querySelectorAll('#newSubtask input[type="checkbox"]');
    const checkedSubtasks = [...allSubtasks].filter(cb => cb.checked);
    const checkedSubtask = checkedSubtasks.map(cb => cb.name);

    let task = {
        'headline': headline,
        'desc': desc,
        'status': 'todo',
        'category': cat,
        'color': colorFromCategory,
        'bgcolor': bgContactColor,
        'assignedTo': checkedNames,
        'dueDate': dueDate,
        'prio': selectedPriority,
        'subtask': checkedSubtask,
    };

    await addThisTask(task);
    clearForm();
    renderCategoryContent();
    renderAssignedToContent();
    renderPrioButtons();
    loadContent('board');
}


/**
 * Function that adds a task to the list of all tasks and saves it on the server
 * 
 * @param {Object} task
 */
async function addThisTask(task) {
    allTasks.push(task);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
}


/**
 * Function that resets the form
 */
function clearForm() {
    document.getElementById("form").reset();
    allSubtasks.length = 0;
    bgContactColor.length = 0;
    renderSubtaskContent();
}