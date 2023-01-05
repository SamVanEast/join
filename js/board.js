let currentDraggedElement;
let categoryBg;
let todo;
let feedback;
let progress;
let done;
let allTasks;
let checkedSubtasksBoard;


async function initBoard() {
    await downloadServer();
    console.log(allTasks, contact)
    addId();
    filterStatus();
}

async function downloadServer() {
    setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    contact = JSON.parse(backend.getItem('contact')) || [];
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
        if (progbar['subtask'].length == 0) {
            document.getElementById(`progbar${progbar.id}`).innerHTML = '';
        }
    }
}


function startDragging(id) {
    currentDraggedElement = id;
}


async function openTask(element) {
    document.getElementById('addOpenTask').classList.remove('d-none');
    let openedTask = document.getElementById('openTask');
    openedTask.classList.remove('d-none');
    document.body.classList.add('noScroll');
    document.getElementById('addOpenTask').classList.add('darker');
    openedTask.innerHTML = openTaskHTML(element);
    document.getElementById(`circleAndNames`).innerHTML = '';

    for (let i = 0; i < allTasks[element]['assignedTo'].length; i++) {
        const people = allTasks[element]['assignedTo'][i];
        const colors = allTasks[element]['bgcolor'][i];

        document.getElementById(`circleAndNames`).innerHTML += `<div style="display: flex; align-items: center; margin-bottom: 5px">
            <div class="people" style="background: rgb(${colors}); margin-left: 2px">${people.split(' ').map(word => word[0]).join('').toUpperCase()}</div>
        <div class="personsName">${people}</div></div>`;

    }

    changePriorityButton(element);
    await checkSubtasks(element);
}


async function checkSubtasks(element) {
    let subs = document.getElementById('changeSubs');
    if (allTasks[element]['subtask'].length > 0) {
        for (let i = 0; i < allTasks[element]['subtask'][0].sub.length; i++) {
            const sub = allTasks[element]['subtask'][0].sub;
            subs.innerHTML += /*html*/ `<div id="testSubtask"><input type="checkbox" id="subtasks${i}" value="${i}" name="${allTasks[element]['subtask'][i]}"><span style="padding-left: 12px;">${sub[i]}</span></input></div>`;
        }
    }
    await addSubtasksChecked(element);
}

async function addSubtasksChecked(idTask) {
    await downloadServer();
    if (allTasks[idTask].subtask[0].inputCheckbox.length > 0) {
        for (let i = 0; i < allTasks[idTask].subtask[0].inputCheckbox.length; i++) {
            // document.getElementById(allTasks[idTask].subtask[0].inputCheckbox[i].id).checked;
        }
    }
}

function pushCheckedSubtask() {
    const allSubtasks = document.querySelectorAll('#testSubtask input[type="checkbox"]');
    const checkedSubtasks = [...allSubtasks].filter(cb => cb.checked);
    const checkedSubtask = checkedSubtasks.map(cb => cb.name);
    checkedSubtasksTest.push(checkedSubtask);
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

async function closeOpenTask(idTask) {
    document.getElementById('addOpenTask').classList.add('d-none');
    document.body.classList.remove('noScroll');
    document.getElementById('openTask').classList.add('d-none');
    document.getElementById('addOpenTask').classList.remove('darker');
    // pushCheckedSubtask();
    await saveSubtasksChecked(idTask);
}

async function saveSubtasksChecked(idTask) {
    let subtasks = document.querySelectorAll('#changeSubs input[type="checkbox"]');
    checkedSubtasksBoard = [...subtasks].filter(s => s.checked);
    allTasks[idTask].subtask[0].inputCheckbox = checkedSubtasksBoard;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
}


function closeAddTask() {
    document.getElementById('addOpenTask').classList.add('d-none');
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
    checkProgressbar();
    await backend.setItem('allTasks', JSON.stringify(allTasks));

}


function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}


function addNewTask() {
    document.getElementById('addOpenTask').classList.remove('d-none');
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
    await backend.deleteItem('testJSONCheckedSubtasks');
}


function filterBoard() {
    filterBoardTodo();
    filterBoardProgress();
    filterBoardFeedback();
    filterBoardDone();
    checkProgressbar();
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

function editInput(element) {
    document.getElementById('editHeadline').value = `${allTasks[element].headline}`;
    document.getElementById('editDesc').value = `${allTasks[element].desc}`;
    document.getElementById('editDueDate').value = `${allTasks[element].dueDate}`;
}


function editTask(element) {
    let getStuff = document.getElementById('openTask');
    getStuff.innerHTML = '';
    getStuff.innerHTML += editTaskHTML(element);
    editInput(element);
    renderPrioButtons();
    renderAssignedToContent();
    checkButtonUrgency(element);

}


async function editTasks(element) {
    let headline = document.getElementById('editHeadline').value;
    let desc = document.getElementById('editDesc').value;
    let dueDate = document.getElementById('editDueDate').value;
    let cat = allTasks[element].category;
    let status = allTasks[element].status;
    let subs = allTasks[element].subtask;

    let color = allTasks[element].color;
    let bgcolor = allTasks[element].bgcolor;

    const contactCheckboxes = document.querySelectorAll('#assigned input[type="checkbox"]');
    const checkedContacts = [...contactCheckboxes].filter(cb => cb.checked);
    const checkedNames = checkedContacts.map(cb => cb.name);

    allTasks.splice(element, 1);
    let task = {
        'headline': headline,
        'desc': desc,
        'status': status,
        'category': cat,
        'dueDate': dueDate,
        'subtask': subs,
        'color': color,
        'bgcolor': bgcolor,
        'assignedTo': checkedNames,
        'prio': selectedPriority


    };

    await changeTask(task);
    loadContent('board');
}


async function changeTask(task) {
    allTasks.push(task);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    console.log();
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


async function addCheckedSubtask() {
    // await backend.setItem('testJSONCheckedSubtasks', JSON.stringify(checkedSubtasksTest));
    // console.log(checkedSubtasksTest);
}


/**
 * 
 * Filters the Board on load
 * 
 */

function filterTodo() {

    todo = allTasks.filter(t => t['status'] == 'todo');

    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('todo').innerHTML += newTaskHTML(element, i);

        for (let j = 0; j < element.assignedTo.length; j++) {
            const assigned = element.assignedTo[j];
            const bgcolor = element.bgcolor[j];
            document.getElementById(`people${element.id}`).innerHTML += getPeopleHTML(assigned, bgcolor);
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
            const bgcolor = element.bgcolor[j];

            document.getElementById(`people${element.id}`).innerHTML += getPeopleHTML(assigned, bgcolor);
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
            const bgcolor = element.bgcolor[j];

            document.getElementById(`people${element.id}`).innerHTML += getPeopleHTML(assigned, bgcolor);
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
            const bgcolor = element.bgcolor[j];
            document.getElementById(`people${element.id}`).innerHTML += getPeopleHTML(assigned, bgcolor);
        }

        declarePriority(element);

    }
}

/**
 * 
 * Filters the board after search
 * 
 */

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