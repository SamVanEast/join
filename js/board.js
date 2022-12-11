let currentDraggedElement;
let categoryBg;


let testz = [];

async function init() {
    setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
    await downloadFromServer();
    testz = JSON.parse(backend.getItem('testz')) || [];

}

async function getTasks() {
    let url = `https://gruppe-390.developerakademie.net/smallest_backend_ever/`;
    let response = await fetch(url);
    task = await response.json();
    console.log(task);
    filterTodo();
    filterProgress();
    filterFeedback();
    filterDone();
}

function filterTodo() {

    let todo = testz.filter(t => t['status'] == 'todo');

    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('todo').innerHTML += newTaskHTML(element);
        checkBgColor(element);
    }
}

function filterProgress() {
    let progress = testz.filter(t => t['status'] == 'progress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        const element = progress[i];
        document.getElementById('inProgress').innerHTML += newTaskHTML(element);
        checkBgColor(element);
    }
}

function filterFeedback() {
    let feedback = testz.filter(t => t['status'] == 'feedback');

    document.getElementById('awaitingFeedback').innerHTML = '';

    for (let i = 0; i < feedback.length; i++) {
        const element = feedback[i];
        document.getElementById('awaitingFeedback').innerHTML += newTaskHTML(element);
        checkBgColor(element);
    }
}

function filterDone() {
    let done = task.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += newTaskHTML(element);
        checkBgColor(element);
    }
}

function newTaskHTML(element) {
    return `
        <div class="taskBoxes" draggable="true" ondragstart="startDragging(${element['id']})" onclick="openTask(${element['id']})">
        <div class="singleTask ${element.id}">
        <div id="category${element['id']}" class="category">${element['category']}</div>
        <div class="taskHeadline">${element['headline']}</div>
        <div class="taskDescription">${element['desc']}</div>
        <div class="progressBar">
            <div class="progress">progressbar</div>
            <div class="progressText">x/x Done</div>
        </div>
        <div class="peopleInvolvedPriority">
            <div class="peopleInvolved">
                <div class="people">SM</div>
                <div class="people">SH</div>
                <div class="people">TW</div>
                <div class="people">LD</div>
            </div>
            <div class="priority"></div>
            </div>
        </div>
        </div>`;

}


function startDragging(id) {
    currentDraggedElement = id;
}

function checkBgColor(element) {
    categoryBg = element['category'];

    document.getElementById(`category${element['id']}`).classList.add(`${categoryBg}`);


}

/**
 * 
 */

function closeOpenTask() {
    document.getElementById('openTask').classList.add('d-none');

}

function openTask(element) {
    let openedTask = document.getElementById('openTask');
    openedTask.classList.remove('d-none');
    openedTask.innerHTML = openTaskHTML(element);

}


function openTaskHTML(element) {
    return `<div class="openTaskKicker">
    <div class="category ${task[element].category}">${task[element].category}</div>
    <div><img id="close" onclick="closeOpenTask()" src="../img/board_img/close.svg"></div>
    </div>
    <div>
            <h2>${task[element].headline}</h2>
        </div>
        <div>
            <p id="openTaskDesc">${task[element].description}</p>
            <p><b>Due Date: </b>Monday</p>
            <p><b>Priority: </b>High</p>
        </div>
        <div>
            <p>Name 1</p>
            <p>Name 2</p>
            <p>Name 3</p>
            <p>Name 4</p>
        </div>
        <div id="edit-btn"><img src="../img/board_img/edit-btn.png"></div>
        </div> `;
}

function closeAddTask() {
    document.getElementById('addNewTask').classList.add('d-none');
}

function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(status) {
    task[currentDraggedElement]['status'] = status;
    filterTodo();
    filterProgress();
    filterFeedback();
    filterDone();
}

function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}

function addTask() {
    document.getElementById('addNewTask').classList.remove('d-none');
    let content = document.getElementById('addNewTask');
    content.innerHTML = '';

    content.innerHTML += /*html*/ `
    <div class="exitBtn" onclick="closeAddTask()"><img style="height:20px; cursor: pointer" src="../img/board_img/close.svg"></div>
    <div style="display: flex; flex-direction: column; width: 25%;">
    <input id="headline" placeholder="headline">
    <input id="desc" placeholder="desc">
    <input id="status" placeholder="status">
    <select id="cat" placeholder="category">
        <option>Media</option>
        <option>Backoffice</option>
        <option>Marketing</option>
        <option>Design</option>
    </select>

    <button onclick="submitTask()">Abschicken</button>
    `;
}

function submitTask() {
    let headline = document.getElementById('headline').value;
    let desc = document.getElementById('desc').value;
    let status = document.getElementById('status').value;
    let cat = document.getElementById('cat').value;

    let test = {
        'headline': headline,
        'desc': desc,
        'status': status,
        'category': cat,
        'status': 'feedback'
    };

    addUser(testz, test)    

}

async function addUser(testz, test) {
    testz.push(test);
    await backend.setItem('testz', JSON.stringify(testz));
}


/*
[{
    "id": 0,
    "status": "todo",
    "category": "Design",
    "headline": "Join fertigstellen",
    "description": "Bis Weihnachten das Projekt fertigstellen",
    "involved": "",
    "duedate": "",
    "priority": "",
    "subtasks": ""
},
{
    "id": 1,
    "status": "progress",
    "category": "Marketing",
    "headline": "Projekt bewerben",
    "description": "Spread the word: Insta, TikTok, Myspace etc.",
    "involved": "",
    "duedate": "",
    "priority": "",
    "subtasks": ""
},
{
    "id": 2,
    "status": "feedback",
    "category": "Media",
    "headline": "Currywurst",
    "description": "Artikel über die Herkunft des Kraftriegels.",
    "involved": "",
    "duedate": "",
    "priority": "",
    "subtasks": ""
},
{
    "id": 3,
    "status": "done",
    "category": "Backoffice",
    "headline": "Steuern hinterziehen",
    "description": "Mit Uli H. und Alice S. kurzschließen",
    "involved": "",
    "duedate": "",
    "priority": "",
    "subtasks": ""
}]; */