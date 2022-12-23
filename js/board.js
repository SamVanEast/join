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
    contact = JSON.parse(backend.getItem('contact')) || [];
    console.log(allTasks, contact)
    addId();
    filterStatus();
}

function filterStatus() {
    filterTodo();
    filterProgress();
    filterFeedback();
    filterDone();
    checkProgressbar();
}

async function addId() {
    let i = 0;
    await allTasks.map(n => {
        n['id'] = i;
        i++;
    });
}

function checkProgressbar() {
    for (let i = 0; i < allTasks.length; i++) {
        const progbar = allTasks[i];
        if (progbar.subtask.length == 0) {
            document.getElementById(`progbar${progbar.id}`).innerHTML = '';
        }
    }
}



function filterTodo() {

    todo = allTasks.filter(t => t['status'] == 'todo');

    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('todo').innerHTML += newTaskHTML(element, i);
        
        for (let j = 0; j < element.assignedTo.length; j++) {
            const assigned = element.assignedTo[j];
            document.getElementById(`people${element.id}`).innerHTML += getPeopleHTML(assigned, i);
        }
        
        declarePriority(element);
    }
}



function filterProgress() {
    progress = allTasks.filter(t => t['status'] == 'progress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        const element = progress[i];
        document.getElementById('inProgress').innerHTML += newTaskHTML(element);

        for (let j = 0; j < element.assignedTo.length; j++) {
            const assigned = element.assignedTo[j];
            document.getElementById(`people${element.id}`).innerHTML += getPeopleHTML(assigned, i);
        }
        
        declarePriority(element);

    }
}

function filterFeedback() {
    feedback = allTasks.filter(t => t['status'] == 'feedback');

    document.getElementById('awaitingFeedback').innerHTML = '';

    for (let i = 0; i < feedback.length; i++) {
        const element = feedback[i];
        document.getElementById('awaitingFeedback').innerHTML += newTaskHTML(element);
        
        for (let j = 0; j < element.assignedTo.length; j++) {
            const assigned = element.assignedTo[j];
            document.getElementById(`people${element.id}`).innerHTML += getPeopleHTML(assigned, i);
        }
        
        declarePriority(element);
    }
}

function filterDone() {
    done = allTasks.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += newTaskHTML(element);
        
        for (let j = 0; j < element.assignedTo.length; j++) {
            const assigned = element.assignedTo[j];
            document.getElementById(`people${element.id}`).innerHTML += getPeopleHTML(assigned, i);
        }
        
        declarePriority(element);

    }
}


function startDragging(id) {
    currentDraggedElement = id;
}

/*function checkBgColor(element) {
    categoryBg = element['category'];

    document.getElementById(`cats${element['id']}`).classList.add(`${categoryBg}`);

}*/


function closeOpenTask() {
    document.body.classList.remove('noScroll');
    document.getElementById('openTask').classList.add('d-none');
    document.getElementById('addOpenTask').classList.remove('darker');

}


function openTask(element) {
    let openedTask = document.getElementById('openTask');
    openedTask.classList.remove('d-none');
    document.body.classList.add('noScroll');
    document.getElementById('addOpenTask').classList.add('darker');
    openedTask.innerHTML = openTaskHTML(element);
    changePriorityButton(element);

}

function changePriorityButton(element) {
    let thePrio = document.getElementById('prioOpenTask');
    if (allTasks[element].prio == 'Urgent') {
        thePrio.innerHTML += `<img style="padding-left: 10px" src="../img/add_task_img/urgentSelected.png">`;
        thePrio.classList.add('bgUrgent');
    }
    if (allTasks[element].prio == 'Medium') {
        thePrio.innerHTML += `<img style="padding-left: 10px" src="../img/add_task_img/mediumSelected.png">`;
        thePrio.classList.add('bgMedium');
    }
    if (allTasks[element].prio == 'Low') {
        thePrio.innerHTML += `<img style="padding-left: 10px" src="../img/add_task_img/lowSelected.png">`;
        thePrio.classList.add('bgLow');
    }
}

function closeAddTask() {
    document.getElementById('addNewTask').classList.add('d-none');
    document.body.classList.remove('noScroll');
    document.getElementById('addOpenTask').classList.remove('darker');

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

function addNewTask() {
    document.getElementById('addNewTask').classList.remove('d-none');
    document.body.classList.add('noScroll');
    document.getElementById('addOpenTask').classList.add('darker');
    let content = document.getElementById('addNewTask');
    content.innerHTML = '';

    content.innerHTML += addNewTaskHTML();
    renderCategoryContent();
    renderAssignedToContent();
    renderPrioButtons();
    renderSubtaskContent();
}

async function deleteTasks() {
    await backend.deleteItem('allTasks');

}


function filterBoard() {
    filterBoardTodo();
    filterBoardProgress();
    filterBoardFeedback();
    filterBoardDone();
    /*checkProgressbar();*/
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
            /*checkBgColor(element);*/
            declarePriority(result);
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
        let desc = progress[i]['desc'];

        if (headlines.toLowerCase().includes(search) || desc.toLowerCase().includes(search)) {
            let result = progress[i];

            filter.innerHTML += filterBoardHTML(result);
            /*checkBgColor(element);*/
            declarePriority(result);

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
            /*checkBgColor(element);*/
            declarePriority(result);

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
            /*checkBgColor(element);*/
            declarePriority(result);

        }
    }

}


function declarePriority(element) {
    let shownPriority = document.getElementById(`prio${element.id}`);
    shownPriority.innerHTML = '';

    if (element['prio'] == 'Medium') {
        shownPriority.innerHTML = `<img src="../img/board_img/prio-mid.png">`;
    }

    if (element['prio'] == 'Low') {
        shownPriority.innerHTML = `<img src="../img/board_img/prio-low.png">`;
    }

    if (element['prio'] == 'Urgent') {
        shownPriority.innerHTML = `<img src="../img/board_img/prio-high.png">`;
    }
}


function editTask(element) {
    let getStuff = document.getElementById('openTask');
    getStuff.innerHTML = '';
    getStuff.innerHTML += `
    <div class="editScreen">
        <div class="editHeadlineClose">
            <h1>Edit Task</h1>
            <div onclick="closeEditFunction()" class="lightbox-input-pos-close"><img style="height:20px; cursor: pointer" src="../img/board_img/close.svg"></div>
        </div>
    <div>
        <form id="form"  onsubmit="editTasks()" return false">
        <div class="title">
            <p>Title</p>
            <input id="editHeadline" minlength="1" type="text" placeholder="" required>
        </div>    
        <div class="description">
            <p>Description</p>
            <textarea required minlength="1" type="text" placeholder="" id="editDesc"></textarea>
        </div>
        <div class="dueDate">
            <p>Due date</p>
            <input id="editDueDate" type="date" required>
        </div>
        <div class="prio">
            <p>Prio</p>
            <div class="prioButtons" id="prioButtons"></div>
        </div>
        <div class="categoryAssigned" id="assigned"></div>
        <div class="ok-btn">
    <img src="../img/board_img/ok-button.png">
    </form>
    </div>
    
    </div>
    </div>
    `
    editInput(element);
    renderPrioButtons();
    renderAssignedToContent();
    checkButtonUrgency(element);

}

function editInput(element) {
    document.getElementById('editHeadline').value = `${allTasks[element].headline}`;
    document.getElementById('editDesc').value = `${allTasks[element].desc}`;
    document.getElementById('editDueDate').value = `${allTasks[element].dueDate}`;
}


function checkButtonUrgency(element) {
    if (allTasks[element].prio == 'Medium') {
        document.getElementById('mediumButton').classList.add('mediumButtonFocused');
    }

    if (allTasks[element].prio == 'Urgent') {
        document.getElementById('urgentButton').classList.add('urgentButtonFocused');
    }

    if (allTasks[element].prio == 'Low') {
        document.getElementById('lowButton').classList.add('lowButtonFocused');
    }
}

function closeEditFunction() {
    document.getElementById('openTask').classList.add('d-none');
    document.body.classList.remove('noScroll');
    document.getElementById('openTask').classList.remove('darker');
    closeAddTask();
    loadContent('board');
}

function bgColorRandom() {
    let x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    result = `${x},` + `${y},` + `${z}`;
    console.log(result)
}

function editTasks() {
    let headline = document.getElementById('editHeadline').value;
    let desc = document.getElementById('editDesc').value;
    let dueDate = document.getElementById('editDueDate').value;
    randomBgColor();
    allTasks.splice(i, 1);
    let task = {
        'headline': headline,
        'desc': desc,
        'dueDate': dueDate
    }
    changeTask(task);
}

async function changeTask(task) {
    // Task zu der Liste aller Tasks hinzufügen
    allTasks.push(task);
    // allTasks.push({bgcolor: bgcolor});
    // Liste aller Tasks auf dem Server speichern
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    console.log(allTasks);
}

