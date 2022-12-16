let currentDraggedElement;
let categoryBg;
let todo;
let feedback;
let progress;
let done;
let allTasks;


async function initBoard() {
    setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    contacts = JSON.parse(backend.getItem('contact'))  || [];
    addId();
    filterStatus();
}

function filterStatus() {
    filterTodo();
    filterProgress();
    filterFeedback();
    filterDone();
}

async function addId() {
    let i = 0;
    await allTasks.map(n => {
        n['id'] = i;
        i++;
    });
}

function filterTodo() {

    todo = allTasks.filter(t => t['status'] == 'todo');

    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('todo').innerHTML += newTaskHTML(element);
        checkBgColor(element);
    }
}

function filterProgress() {
    progress = allTasks.filter(t => t['status'] == 'progress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        const element = progress[i];
        document.getElementById('inProgress').innerHTML += newTaskHTML(element);
        checkBgColor(element);
    }
}

function filterFeedback() {
    feedback = allTasks.filter(t => t['status'] == 'feedback');

    document.getElementById('awaitingFeedback').innerHTML = '';

    for (let i = 0; i < feedback.length; i++) {
        const element = feedback[i];
        document.getElementById('awaitingFeedback').innerHTML += newTaskHTML(element);
        checkBgColor(element);
    }
}

function filterDone() {
    done = allTasks.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += newTaskHTML(element);
        checkBgColor(element);
    }
}


function newTaskHTML(element) {
    return /*html*/`
        <div class="taskBoxes" draggable="true" ondragstart="startDragging(${element['id']})" onclick="openTask(${element['id']})">
        <div class="singleTask ${element.id}">
        <div id="category${element['id']}" class="category">${element['category']}</div>
        <div class="taskHeadline">${element['headline']}</div>
        <div class="taskDescription">${element['desc']}</div>
        
        <div class="progressbar">    
            <div class="progressbar-grey">
                <div id="progressbar-blue" class="progressbar-blue" style="width: 50%"></div>
            </div>
            <div id="done-counter">1/2 Done</div>
        </div>
                <div class="peopleInvolvedPriority">
            <div class="peopleInvolved">
            <div class="people" style="background: rgb(${contacts[0]['r']},${contacts[0]['b']},${contacts[0]['g']})">${contacts[0].name}</div>
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
    document.body.classList.remove('noScroll');

    document.getElementById('openTask').classList.add('d-none');

}

function openTask(element) {
    let openedTask = document.getElementById('openTask');
    openedTask.classList.remove('d-none');
    document.body.classList.add('noScroll');
    openedTask.innerHTML = openTaskHTML(element);

}


function openTaskHTML(element) {
    return `<div class="openTaskKicker">
    <div class="category ${allTasks[element].category}">${allTasks[element].category}</div>
    <div><img id="close" onclick="closeOpenTask()" src="../img/board_img/close.svg"></div>
    </div>
    <div id="openTaskHMobile">
            <h2>${allTasks[element].headline}</h2>
        </div>
        <div id="pMobile">
            <p id="openTaskDesc">${allTasks[element].desc}</p>
            <p><b>Due Date: </b>Monday</p>
            <p><b>Priority: </b>High</p>
        </div>
        <div id="assignedMobile">
        <p><b>Assigned to:</b></p>
        <div>
        <div class="people" style="background: rgb(${contacts[0]['r']},${contacts[0]['b']},${contacts[0]['g']}); margin-left: 2px">${contacts[0].name}</div>
        <p>Leo</p>
        </div>
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


async function moveTo(status) {
    allTasks[currentDraggedElement]['status'] = status;
    filterTodo();
    filterProgress();
    filterFeedback();
    filterDone();
    await backend.setItem('allTasks', JSON.stringify(allTasks));

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
    <form onsubmit="getAndPushTask(); addId(); return false;">
        <input id="headline" placeholder="headline">
        <input id="desc" placeholder="desc">
        <input id="status" placeholder="status">
        <select id="cat" placeholder="category">
            <option>Media</option>
            <option>Backoffice</option>
            <option>Marketing</option>
            <option>Design</option>
        </select>

        <button>Abschicken</button>
    </form>
    `;

}

function getAndPushTask() {
    let headline = document.getElementById('headline').value;
    let desc = document.getElementById('desc').value;
    let status = document.getElementById('status').value;
    let cat = document.getElementById('cat').value;

    let task = {
        'headline': headline,
        'desc': desc,
        'status': status,
        'category': cat,
    };



    addNewTask(task)

}


async function addNewTask(task) {
    allTasks.push(task);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    window.location.href = 'board.html';
}

async function deleteTasks() {
    await backend.deleteItem('allTasks');

}


function filterBoard() {
    filterBoardTodo();
    filterBoardProgress();
    filterBoardFeedback();
    filterBoardDone();
}


function filterBoardTodo() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();


    let filter = document.getElementById('todo');
    filter.innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        let headlines = todo[i]['headline'];
        let descriptions = todo[i]['desc'];

        if (headlines.toLowerCase().includes(search) || descriptions.toLowerCase().includes(search)) {
            let result = todo[i];

            filter.innerHTML += filterBoardHTML(result);
            checkBgColor(result);
        }
    }

}

function filterBoardProgress() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();


    let filter = document.getElementById('inProgress');
    filter.innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        let headlines = progress[i]['headline'];
        let descriptions = progress[i]['desc'];

        if (headlines.toLowerCase().includes(search) || descriptions.toLowerCase().includes(search)) {
            let result = progress[i];

            filter.innerHTML += filterBoardHTML(result);
            checkBgColor(result);
        }
    }

}


function filterBoardFeedback() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();


    let filter = document.getElementById('awaitingFeedback');
    filter.innerHTML = '';

    for (let i = 0; i < feedback.length; i++) {
        let headlines = feedback[i]['headline'];
        let descriptions = feedback[i]['desc'];

        if (headlines.toLowerCase().includes(search) || descriptions.toLowerCase().includes(search)) {
            let result = feedback[i];

            filter.innerHTML += filterBoardHTML(result);
            checkBgColor(result);
        }
    }

}

function filterBoardDone() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();


    let filter = document.getElementById('done');
    filter.innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        let headlines = done[i]['headline'];
        let descriptions = done[i]['desc'];

        if (headlines.toLowerCase().includes(search) || descriptions.toLowerCase().includes(search)) {
            let result = done[i];

            filter.innerHTML += filterBoardHTML(result);
            checkBgColor(result);
        }
    }

}

function filterBoardHTML(result) {
    return `<div class="taskBoxes" draggable="true" ondragstart="startDragging(${result['id']})" onclick="openTask(${result['id']})">
<div class="singleTask ${result.id}">
<div id="category${result['id']}" class="category">${result['category']}</div>
<div class="taskHeadline">${result['headline']}</div>
<div class="taskDescription">${result['desc']}</div>
<div class="progressbar">    
            <div class="progressbar-grey">
                <div id="progressbar-blue" class="progressbar-blue" style="width: 50%"></div>
            </div>
            <div id="done-counter">1/2 Done</div>
        </div>
<div class="peopleInvolvedPriority">
    <div class="peopleInvolved">
    <div class="people" style="background: rgb(${contacts[0]['r']},${contacts[0]['b']},${contacts[0]['g']})">${contacts[0].name}</div>
    </div>
    <div class="priority"></div>
    </div>
</div>
</div>`;
}


/* Contact:  */