/**
 * Using an empty array in order to test the function addTask
 * 
 * @param {Array} tasks - This array is used to store data from add_task.html
 */

let tasks = [];
let categorys = ['Sales', 'Backoffice'];
let contactsTest = ['1', '2', '3', '4', '5'];

/**
 * Function that loads all the tasks 
 * 
 */

function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('all tasks');
    tasks = JSON.parse(allTasksAsString);
    console.log('Loaded all tasks: ', tasks);
}


function renderCategorys() {
    document.getElementById('dropdownCategory').classList.toggle('showAllCategorys');
    document.getElementById('dropdownCategory').classList.remove('categorysDropdownSelectHTML');

    let content = document.getElementById('dropdownCategory');

    content.innerHTML = /*html*/ `
        <div class="categorysDropdownSelect" id="test2">Select task category</div>
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
    let sumo = document.getElementById('test2');
    sumo.innerHTML = /*html*/`
    <div class="categorysDropdownSelect">Sele</div>
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


function renderSubtask() {
    document.getElementById('inputSubtask').classList.remove('inputSubtask');

    document.getElementById('inputSubtask').innerHTML = /*html*/ `
    <div class="inputSubtask">
        <input class="inputFieldSubtask" type="text" placeholder="Add new subtask">
        <div class="subtaskImage">
            <img src="../../assets/img/add_task_img/cross.png" alt="">
            <div class="inputBorder"></div>
            <img src="../../assets/img/add_task_img/hookBlack.png" alt="">
        </div>
    </div>
    `;
}


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