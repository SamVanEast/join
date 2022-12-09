let task;
let currentDraggedElement;
let categoryBg;

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
        <div class="taskBoxes" draggable="true" ondragstart="startDragging(${element['id']})" onclick="openTask(${element['id']})">
        <div class="singleTask ${element.id}">
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
    <div class="exitBtn" onclick="closeAddTask()"><img style="height:20px" src="../img/board_img/close.svg"></div>
    <div class="addTaskContainer">
        <h1>Add Task</h1>
        <form action="" id="form">
            <div class="addTask">
                <div class="addTaskLeftSide">
                    <div class="titleToAssigned">
                        <div class="title" >
                            <p>Title</p>
                            <input required minlength="1" type="text" placeholder="Enter a title" id="headline"> <!-- added ID "headline"-->
                        </div>
                        <div class="description">
                            <p>Description</p>
                            <textarea required minlength="1" type="text" placeholder="Enter a Description" id="description"></textarea> <!-- added ID description-->
                        </div>
                        <div class="category">
                            <p>Category</p>
                            <div class="dropdown" id="dropdownCategory" onclick="renderCategorys()" required>Select task category</div>
                        </div>
                        <div class="categoryAssigned">
                            <p>Assigned to</p>
                            <div class="dropdown" required>Select contacts to assign</div>
                        </div>
                    </div>
                </div>

                <div class="borderLine"></div>

                <div class="dateToButtons">

                    <div class="dueDate">
                        <p>Due date</p>    
                            <input id="dueDate" placeholder="dd/mm/yyyy" type="text" onfocus="setDate()" required>
                    </div>

                    <div class="prio">
                        <p>Prio</p>
                        <div class="prioButtons">
                            <button type="button" class="urgentButton">Urgent <input class="urgent"
                                    type="checkbox"></button>
                            <button type="button" class="mediumButton">Medium <input class="medium"
                                    type="checkbox"></button>
                            <button type="button" class="lowButton">Low <input class="low" type="checkbox"></button>
                        </div>
                    </div>
                    <div class="subtasks">
                        <p>Subtasks</p>
                        <input class="inputSubtask" type="text" placeholder="Add new subtask" onfocus="value = 'Create new icons';" required>
                        <div class="checkboxSubtask" required>
                            <input type="checkbox" required>
                            <span>Subtask 1</span>
                        </div>
                    </div>
                    <div class="clearAndCreate">
                        <button type="button" class="clear" onclick="clearFields()">Clear <input class="cross"
                                type="checkbox"></button>
                        <button class="create" onclick="addTask()">Create Task <img src="../../assets/img/add_task_img/hook.png"
                                alt=""></button> <!-- added onclick function addTask -->
                    </div>
                </div>
            </div>
        </form>`
}
