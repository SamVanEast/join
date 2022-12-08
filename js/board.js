let task; 
let currentDraggedElement;


async function init() {
    await getTasks();
    
}

async function getTasks() {
    let url = `https://gruppe-390.developerakademie.net/smallest_backend_ever/database.json`;
    let response = await fetch(url);
    task = await response.json();
    console.log(task);
    filterTodo();
    filterProgress();
    filterFeedback();
    filterDone();
    
}

function filterTodo() {

    let todo = task.filter(t => t['status'] == 'todo');

    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('todo').innerHTML += newTaskHTML(element);
        checkBgColor(element);
    }
}

function filterProgress() {
    let progress = task.filter(t => t['status'] == 'progress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        const element = progress[i];
        document.getElementById('inProgress').innerHTML += newTaskHTML(element);
        checkBgColor(element);
    }
}

function filterFeedback() {
    let feedback = task.filter(t => t['status'] == 'feedback');

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
        <div class="taskBoxes" draggable="true" ondragstart="startDragging(${element['id']})">
        <div class="singleTask">
        <div id="category${element['id']}" class="category">${element['category']}</div>
        <div class="taskHeadline">${element['headline']}</div>
        <div class="taskDescription">${element['description']}</div>
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
    let categoryBg = element['category'];

    document.getElementById(`category${element['id']}`).classList.add(`${categoryBg}`);

}

/**
 * 
 */

function closeOpenTask() {
    document.getElementById('openTask').classList.add('d-none');

}

function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(status){
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
    
}
