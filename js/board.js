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
        declarePriority(element);
    }
}

function filterProgress() {
    progress = allTasks.filter(t => t['status'] == 'progress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        const element = progress[i];
        document.getElementById('inProgress').innerHTML += newTaskHTML(element);
        checkBgColor(element);
        declarePriority(element);

    }
}

function filterFeedback() {
    feedback = allTasks.filter(t => t['status'] == 'feedback');

    document.getElementById('awaitingFeedback').innerHTML = '';

    for (let i = 0; i < feedback.length; i++) {
        const element = feedback[i];
        document.getElementById('awaitingFeedback').innerHTML += newTaskHTML(element);
        checkBgColor(element);
        declarePriority(element);

    }
}

function filterDone() {
    done = allTasks.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += newTaskHTML(element);
        checkBgColor(element);
        declarePriority(element);

    }
}


function startDragging(id) {
    currentDraggedElement = id;
}

function checkBgColor(element) {
    categoryBg = element['category'];

    document.getElementById(`cats${element['id']}`).classList.add(`${categoryBg}`);

}


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

function closeAddTask() {
    document.getElementById('addNewTask').classList.add('d-none');
    document.body.classList.remove('noScroll');
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
    document.body.classList.add('noScroll');
    let content = document.getElementById('addNewTask');
    content.innerHTML = '';

    content.innerHTML += /*html*/ `
    <div class="exitBtn" onclick="closeAddTask()"><img style="height:20px; cursor: pointer" src="../img/board_img/close.svg"></div>
    <div>
    <div class="addTaskContainer">
        <h1>Add Task</h1>
        <form id="form" onsubmit="submitTask(); return false">
            <div class="addTask">
                <div class="addTaskLeftSide">
                    <div class="titleToAssigned">
                        <div class="title">
                            <p>Title</p>
                            <input minlength="1" type="text" placeholder="Enter a title" id="headline" required>
                            <!-- added ID "headline"-->
                        </div>
                        <div class="description">
                            <p>Description</p>
                            <textarea required minlength="1" type="text" placeholder="Enter a Description"
                                id="desc"></textarea> <!-- added ID description-->
                        </div>

                        <div class="category" id="cat"></div>
                        <div class="categoryColors d-none" id="categoryColors"></div>

                        <div class="categoryAssigned" id="assigned"></div>

                    </div>
                </div>

                <div class="borderLine"></div>

                <div class="dateToButtons" id="dateButtons">

                    <div class="dueDate">
                        <p>Due date</p>
                        <input id="dueDate" type="date" required>
                    </div>

                    <div class="prio">
                        <p>Prio</p>
                        <div class="prioButtons" id="prioButtons"></div>
                    </div>

                    <div class="subtasksContent" id="subs"></div>

                    <div class="clearAndCreate">
                        <button type="button" class="clear" onclick="clearFields()">Clear<input class="cross"
                                type="checkbox"></button>
                        <button class="create">Create Task <img src="../../assets/img/add_task_img/hook.png"
                                alt=""></button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    `;
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
            checkBgColor(result);
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
            checkBgColor(result);
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
            checkBgColor(result);
            declarePriority(result);

        }
    }

}


function declarePriority(element) {
    let shownPriority = document.getElementById(`prio${element.id}`);
    shownPriority.innerHTML = '';

    if(element['prio'] == 'Medium') {
        shownPriority.innerHTML = `<img src="../img/board_img/prio-mid.png">`;
    }

    if(element['prio'] == 'Low') {
        shownPriority.innerHTML = `<img src="../img/board_img/prio-low.png">`;
    }

    if(element['prio'] == 'Urgent') {
        shownPriority.innerHTML = `<img src="../img/board_img/prio-high.png">`;
    }
}

/*function getAndPushTask() {
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
}*/
