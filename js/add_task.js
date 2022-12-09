/**
 * Using an empty array in order to test the function addTask
 * 
 * @param {Array} tasks - This array is used to store data from add_task.html
 */

let tasks = [];
let categorys = ['Sales', 'Backoffice'];

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
        <div class="categorysDropdownSelect">Select task category</div>
        <div class="categorysNewCategory"><a href="" class="newCategory">New Category</a></div>
        <div id="categorysOptions" class="categorysOptions"></div>
    `;
        renderCategorysOptions();
}


function renderCategorysOptions() {
    let options = document.getElementById('categorysOptions');

    for (let i = 0; i < categorys.length; i++) {
        const test = categorys[i];

        options.innerHTML += /*html*/`
        <a href="" class="categorysDropdown">${test}</a>
        `;
    }
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


function renderAssignedToOptions(){
    let names = document.getElementById('assignedToOptions');

    for (let i = 0; i < tasks[0]['id'].length; i++) {
        const test = tasks[0]['id'];

        names.innerHTML += /*html*/`
        <a href="" class="categorysDropdown">${test}</a>
        `;
    }
}


function setDate() {
    var date = new Date();
    const formatDate = (date) => { let formatted_date = (date.getDate() < 10 ? '0' : '') + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(); return formatted_date; }
    document.getElementById('dueDate').value = formatDate(date);
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