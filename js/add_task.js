function myFunction() {
    console.log('Ready!');
}

/**
 * Using an empty array in order to test the function addTask
 */

let tasks = [];

/**
 * Function that loads all the tasks 
 */

function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('all tasks');
    tasks = JSON.parse(allTasksAsString);
    console.log('Loaded all tasks: ', tasks);
}

function renderCategorys(){
    document.getElementById('dropdownCategory').classList.add('showAllCategorys');

    let content = document.getElementById('dropdownCategory');

    content.innerHTML = /*html*/ `
    <div>Select task category</div>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <div>test</div>`;
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