/**
 * Using an empty array in order to test the function addTask
 * 
 * @param {Array} tasks - This array is used to store data from add_task.html
 */

let tasks = [];
let subtask = [];
let categorys = ['Sales', 'Backoffice'];
let contactsTest = ['1', '2', '3', '4', '5'];
// load();


/**
 * Function that loads all the tasks 
 * 
 */

function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('all tasks');
    tasks = JSON.parse(allTasksAsString);
    console.log('Loaded all tasks: ', tasks);

    // load();
    renderSubtaskContent();
    renderCategoryContent();
}


function renderCategoryContent() {
    document.getElementById('categoryContent').innerHTML = /*html*/ `
        <p>Category</p>
        <div class="dropdown" id="dropdownCategory">
            <div class="categorysDropdownSelectHTML" id="selectTaskCategoryContent" onclick="renderCategorys()" required>Select task category</div>
        </div>
    `;
}


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


function renderCategorysOptions() {
    let options = document.getElementById('categorysOptions');

    for (let a = 0; a < categorys.length; a++) {
        const category = categorys[a];

        options.innerHTML += /*html*/`
        <span class="categorysDropdown">${category}</span>
        `;
    }
}


function addNewCategory() {
    document.getElementById('categorysDropdownSelect').classList.toggle('categorysDropdownSelect');
    document.getElementById('dropdownCategory').classList.remove('showAllCategorys');

    document.getElementById('categorysDropdownSelect').innerHTML = /*html*/`
        <div class="categoryContent">
            <input class="inputFieldSubtask" type="text" placeholder="New category name">
            <div class="subtaskImage">
                <img src="../../assets/img/add_task_img/cross.png" alt="" onclick="renderCategoryContent()">
                <div class="inputBorder"></div>
                <img src="../../assets/img/add_task_img/hookBlack.png" alt="">
            </div>
        </div>
    `;
}


function renderAssignedTo() {
    document.getElementById('dropdownAssignedTo').classList.toggle('showAllCategorys');
    document.getElementById('dropdownAssignedTo').classList.remove('categorysDropdownSelectHTML');

    let content = document.getElementById('dropdownAssignedTo');

    content.innerHTML = /*html*/ `
    <div class="categorysDropdownSelect">Select contacts to assign</div>
    <div id="assignedToOptions" class="categorysOptions"></div>
    `;
    renderAssignedToOptions();
}


function renderAssignedToOptions() {
    let names = document.getElementById('assignedToOptions');

    for (let b = 0; b < contactsTest.length; b++) {
        const contact = contactsTest[b];

        names.innerHTML += /*html*/`
        <span class="categorysDropdown">${contact}</span>
        `;
    }
}


function setDate() {
    var date = new Date();
    const formatDate = (date) => { let formatted_date = (date.getDate() < 10 ? '0' : '') + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(); return formatted_date; }
    document.getElementById('dueDate').value = formatDate(date);
}


function renderSubtaskContent() {
    document.getElementById('subtasksContent').innerHTML = /*html*/ `
        <p>Subtasks</p>
        <div class="inputSubtask" id="inputSubtask">
            <div class="subtaskRender" onclick="renderSubtask()">Add new subtask<img src="../img/add_task_img/plus.png" alt=""></div>
        </div>
        <div class="checkboxSubtask" id="newSubtask" required></div>
    `;

for (let i = 0; i < subtask.length; i++) {
    document.getElementById('newSubtask').innerHTML += /*html*/`
        <div class="newSubtasks">
            <input type="checkbox" required>
            <span>${subtask[i]}</span>
        </div>
    `;
}
}


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


function addSubtask() {
    let newSubtask = document.getElementById('inputFieldSubtask').value;

    subtask.push(newSubtask);

    renderSubtaskContent();
    // save();
}


// function save() {
//     let titleAsText = JSON.stringify(subtask);
//     localStorage.setItem('title', titleAsText);
// }


// function load() {
//     let titleAsText = localStorage.getItem('title');
// if (titleAsText){
//     subtask = JSON.parse(titleAsText);
// }
// }


function clearFields() {
    document.getElementById('form').reset();
}

/**
 * Function that gets all the values of the Add-Task-Page
 * and defines a Json called "task"
 */

function addTask() {
    let headline = document.getElementById('headline').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('dropdownCategory').value;
    let duedate = document.getElementById('dueDate').value;

    let task = {
        'id': '',
        'status': '',
        'category': category,
        'description': description,
        'duedate': duedate,
        'headline': headline,
        'involved': '',
        'priority': '',
        'status': 'todo',
        'subtasks': ''
    }

    tasks.push(task);
    let allTasksAsString = JSON.stringify(tasks);
    localStorage.setItem('all tasks', allTasksAsString);
}