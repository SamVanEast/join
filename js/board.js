let currentDraggedElement;
let categoryBg;
let todo;
let feedback;
let progress;
let done;
let allTasks;
let checkedSubtasksBoard;
let toAddTask = false;
let timer;
let timeIsup = false;
let editTaskStatus = false;
let currentTask;

/**
 * 
 * Initializes the board, adds an ID to resp. tasks and renders the board
 */

async function initBoard() {
    await downloadServer();
    await addId();
    filterStatus();
}


/**
 * 
 * Downloads JSON with tasks and contacts from server
 */

async function downloadServer() {
    setURL('https://thomas-wagner.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    contact = JSON.parse(backend.getItem('contact')) || [];
}


/**
 * 
 * Distributes the tasks to their resp. states und checks whether the progressbar 
 * should be displayed
 */

function filterStatus() {
    filterTodo();
    filterProgress();
    filterFeedback();
    filterDone();
    checkProgressbar();
}


/**
 * Adds an ID to the tasks and pushes them into the JSON
 */

async function addId() {
    let i = 0;
    await allTasks.map(n => {
        n['id'] = i;
        i++;
    });
    await backend.setItem('allTasks', JSON.stringify(allTasks));
}


/**
 * 
 * Checks if a progressbar should be displayed (Yes if there are subtasks)
 * 
 */

function checkProgressbar() {
    for (let i = 0; i < allTasks.length; i++) {
        const progbar = allTasks[i];
        const progbarId = document.getElementById(`progbar${i}`)
        if (progbar['subtask'][0].sub.length == 0 && progbarId !== null) {
            document.getElementById(`progbar${i}`).innerHTML = '';
        }
        if (progbar['subtask'][0].sub.length > 0 && progbarId !== null) {
            checkProgressPercentage(progbar, i);
        }
    }
}


/**
 * 
 * Calculates the percentage of how many subtasks have been done already
 * @param {string} progs gets the subtasks from JSON
 * @param {*} i iterates through IDs of elements
 */

function checkProgressPercentage(progs, i) {
    let percent = progs.subtask[0].idInputCheckbox.length / progs.subtask[0].sub.length;
    percent = percent * 100;
    document.getElementById(`progbar${i}`).innerHTML = `<div class="progressbar-grey">
        <div id="progressbar-blue" class="progressbar-blue" style="width: ${percent}%"></div>
    </div>
    <div id="done-counter${i}">${progs.subtask[0].idInputCheckbox.length}/${progs.subtask[0].sub.length} Done</div>`;
}


/**
 * Initiates dragging
 * @param {number} id Gets the ID of the current dragged element
 */

function startDragging(id) {
    currentDraggedElement = id;
}

/**
 *  Checks whether board is displayed on desktop or mobile 
 * @param {number} element ID of the task to be opened
 */
function checkMobileTrue(element) {
    let check = false;
    if (ifCheckMobile()) {
        check = true;
    }
    if (!check) {
        openTask(element);
    }
}


function ifCheckMobile() {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))
}

/**
 * Opens the full task on clicking the resp. one in the board
 * @param {number} element ID of the task to be opened
 */

async function openTask(element) {
    let openedTask = document.getElementById('openTask');
    document.getElementById('addOpenTask').classList.remove('d-none');
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


/**
 * checks if there are subtasks to be displayed in task view
 * @param {number} element ID of the task to be checked
 */

async function checkSubtasks(element) {
    let subs = document.getElementById('changeSubs');
    if (allTasks[element]['subtask'].length > 0 && allTasks[element]['subtask'][0].sub.length > 0) {
        for (let i = 0; i < allTasks[element]['subtask'][0].sub.length; i++) {
            const sub = allTasks[element]['subtask'][0].sub;
            subs.innerHTML += /*html*/ `<div id="testSubtask"><input type="checkbox" id="subtasks${i}" value="${i}" name="${allTasks[element]['subtask'][i]}"><span style="padding-left: 12px;">${sub[i]}</span></input></div>`;
        }
    } else {
        subs.innerHTML = 'No Subtasks';
    }
    await addSubtasksChecked(element);
}


/**
 * Shows subtasks that are aleady checked (i.e. done)
 * @param {number} idTask adds an ID to the task
 */

async function addSubtasksChecked(idTask) {
    await downloadServer();
    if (allTasks[idTask].subtask[0].idInputCheckbox.length > 0) {
        for (let i = 0; i < allTasks[idTask].subtask[0].idInputCheckbox.length; i++) {
            document.getElementById(allTasks[idTask].subtask[0].idInputCheckbox[i]).checked = true;
        }
    }
}


/**
 * Changes the style of the button according to its urgency
 * @param {number} element all elements of JSON 'allTasks'
 */
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


/**
 * closes the 'openTask' view.
 * @param {number} idTask ID of the task
 */

async function closeOpenTask(idTask) {
    document.getElementById('addOpenTask').classList.add('d-none');
    document.body.classList.remove('noScroll');
    document.getElementById('openTask').classList.add('d-none');
    document.getElementById('addOpenTask').classList.remove('darker');

    await saveSubtasksChecked(idTask);
    filterStatus();
    filterBoard();
}

// document.addEventListener('mouseup', function (e) {
//     let container = document.getElementById('openTask');
//     let container2 = document.getElementById('addNewTask')
//     if (container) {
//         if (!container.contains(e.target) && !container2.contains(e.target)) {
//             closeOpenTask();
//             closeAddTask();
//         }
//     }
// });

/**
 *  saves checked subtasks and pushes them in JSON
 * @param {number} idTask ID of the task
 */
async function saveSubtasksChecked(idTask) {
    if (allTasks[idTask]) {
        let idInputCheckbox = allTasks[idTask].subtask[0].idInputCheckbox;

        idInputCheckbox.length = 0;
        let subtasks = document.querySelectorAll('#changeSubs input[type="checkbox"]');
        checkedSubtasksBoard = [...subtasks].filter(s => s.checked);
        for (let i = 0; i < checkedSubtasksBoard.length; i++) {
            idInputCheckbox.push(checkedSubtasksBoard[i].id);
        }
        await backend.setItem('allTasks', JSON.stringify(allTasks));
    }
}
/**
 * closes the view of 'addTask'
 * 
 */
function closeAddTask() {
    document.getElementById('addOpenTask').classList.add('d-none');
    document.getElementById('addNewTask').classList.add('d-none');
    document.body.classList.remove('noScroll');
    document.getElementById('addOpenTask').classList.remove('darker');

}



/**
 * Allows dropping a task
 * @param {string} ev Event
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * changes the status of a task element after drop and pushes it to JSON
 * @param {string} status the status after a task element has been dropped
 */
async function moveTo(status) {
    allTasks[currentDraggedElement]['status'] = status;
    filterStatus();
    await backend.setItem('allTasks', JSON.stringify(allTasks));
}


/**
 * displays where elements can be dropped
 * @param {number} id ID of status
 */
function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}


/**
 * removes highlight of dropping area
 * @param {number} id ID of status 
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}


/**
 * opens "add task" view (more than 400px) or loads add_task.html if screen is smaller than 400px
 * @param {string} status one of the four possible states
 */
function addNewTask(status) {
    taskStatus = status;
    if (window.innerWidth >= 400) {
        document.getElementById('openTask').innerHTML = '';
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
    } else {
        loadContent('add_task', taskStatus);
    }
    toAddTask = true;
}


/**
 * filters the board when using the searchbar
 */
function filterBoard() {
    checkProgressbar();
    filterBoardTodo();
    filterBoardProgress();
    filterBoardFeedback();
    filterBoardDone();
}


/**
 *Changes the style of the button according to its urgency
 * @param {number} element all elements of JSON 'allTasks'
 */

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


/**
 * fills boxes with resp. values
 * @param {number} element all elements of JSON 'allTasks'
 */
function editInput(element) {
    document.getElementById('editHeadline').value = `${allTasks[element].headline}`;
    document.getElementById('editDesc').value = `${allTasks[element].desc}`;
    document.getElementById('editDueDate').value = `${allTasks[element].dueDate}`;
}


/**
 * opens the view edit task
 * @param {*} idTask ID of the task
 */

async function editTask(idTask) {
    await saveSubtasksChecked(idTask);
    editTaskStatus = true;
    currentTask = idTask;
    let getStuff = document.getElementById('openTask');
    getStuff.innerHTML = '';
    getStuff.innerHTML += editTaskHTML(idTask);
    editInput(idTask);
    renderPrioButtons();
    renderAssignedToContent();
    checkButtonUrgency(idTask);
    addStyleForEditMode();
    renderAssignedTo();
    if (editTaskStatus) {
        addUserToAssignedTo();
    }
}


async function deleteSelectedTask(idTask) {
    currentTask = idTask;
    allTasks.splice(idTask, 1);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    loadContent('board', 'todo');
    filterStatus();
    filterBoard();
    closeAddTask();

}

/**
 * displays all users that have already been assigned to the resp. task
 */

function addUserToAssignedTo() {
    for (let i = 0; i < allTasks[currentTask].assignedTo.length; i++) {
        let name = allTasks[currentTask].assignedTo[i];
        let InputField = document.querySelectorAll(`#assignedToOptions input[name="${name}"]`);
        InputField[0].checked = true;
    }

}


/**
 * Gets changed input from input fields; saves them in an array.
 * @param {number} element ID of the elements in JSON
 */

async function editTasks(element) {
    saveChecked();
    editTaskStatus = false;
    let headline = document.getElementById('editHeadline').value;
    let desc = document.getElementById('editDesc').value;
    let dueDate = document.getElementById('editDueDate').value;
    let cat = allTasks[element].category;
    let status = allTasks[element].status;
    let subs = allTasks[element].subtask;
    let prio = selectedPriority;

    let color = allTasks[element].color;
    let bgcolor = bgContactColor;

    const contactCheckboxes = document.querySelectorAll('#assigned input[type="checkbox"]');
    const checkedContacts = [...contactCheckboxes].filter(cb => cb.checked);
    const checkedNames = checkedContacts.map(cb => cb.name);

    allTasks.splice(element, 1);
    let task = {
        'headline': headline,
        'desc': desc,
        'id': element,
        'status': status,
        'category': cat,
        'dueDate': dueDate,
        'subtask': subs,
        'color': color,
        'bgcolor': bgcolor,
        'assignedTo': checkedNames,
        'prio': prio


    };

    await changeTask(task);
    closeEditFunction();
}


/**
 * adds CSS for edit view
 */

function addStyleForEditMode() {
    document.getElementById('prioButtons').style = 'justify-content: space-between;';
    document.getElementById('editDueDate').style = 'box-sizing: border-box; height: 51px ;width: 100%;';
    document.getElementById('editDesc').style = 'box-sizing: border-box; height: 119px ;width: 100%;';
    document.getElementById('editHeadline').style = 'box-sizing: border-box; height: 51px ;width: 100%;';
}


/**
 * deletes CSS for edit view
 */

function deleteStyleForEditMode() {
    document.getElementById('prioButtons').style = '';
    document.getElementById('editDueDate').style = '';
    document.getElementById('editDesc').style = '';
    document.getElementById('editHeadline').style = '';
}


/**
 * Pushes edited information to backend
 * @param {Array} task Array with stored information of edit task
 */

async function changeTask(task) {
    allTasks.push(task);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
}


/**
 * Changes the style of the button according to its urgency
 * @param {number} element all elements of JSON 'allTasks'
 */

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


/**
 * closes edit view
 */

function closeEditFunction() {
    editTaskStatus = false;
    document.getElementById('openTask').classList.add('d-none');
    document.body.classList.remove('noScroll');
    document.getElementById('openTask').classList.remove('darker');
    deleteStyleForEditMode();
    closeAddTask();
    filterStatus();
    filterBoard();
}


/**
 * 
 * Filters board on load
 */

function filterTodo() {

    todo = allTasks.filter(t => t['status'] == 'todo');

    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('todo').innerHTML += newTaskHTML(element);

        redernTask(element);
        declarePriority(element);
    }
}


function filterProgress() {
    progress = allTasks.filter(t => t['status'] == 'progress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        const element = progress[i];
        document.getElementById('inProgress').innerHTML += newTaskHTML(element);

        redernTask(element);
        declarePriority(element);

    }
}


function filterFeedback() {
    feedback = allTasks.filter(t => t['status'] == 'feedback');

    document.getElementById('awaitingFeedback').innerHTML = '';

    for (let i = 0; i < feedback.length; i++) {
        const element = feedback[i];
        document.getElementById('awaitingFeedback').innerHTML += newTaskHTML(element);

        redernTask(element);
        declarePriority(element);
    }
}


function filterDone() {
    done = allTasks.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];

        document.getElementById('done').innerHTML += newTaskHTML(element);

        redernTask(element);
        declarePriority(element);

    }
}


/**
 * 
 * Filters the board after search
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

            filter.innerHTML += newTaskHTML(result);

            redernTask(result);
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

            filter.innerHTML += newTaskHTML(result);
            /*checkBgColor(element);*/
            redernTask(result);
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

            filter.innerHTML += newTaskHTML(result);
            /*checkBgColor(element);*/
            redernTask(result);
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

            filter.innerHTML += newTaskHTML(result);

            /*checkBgColor(element);*/
            redernTask(result);
            declarePriority(result);
        }
    }
}


/**
 * checks how many users are assigned for a task; at more than 3, a black circle
 * is displayed
 * @param {number} element all elements of JSON 'allTasks'
 */

function redernTask(element) {
    startDragging(element.id);
    let userCount = 0;
    for (let j = 0; j < element.assignedTo.length; j++) {
        const assigned = element.assignedTo[j];
        const bgcolor = element.bgcolor[j];
        userCount++;
        if (userCount < 4) {
            document.getElementById(`people${element.id}`).innerHTML += getPeopleHTML(assigned, bgcolor);
        } else {
            document.getElementById(`people${element.id}`).innerHTML += getMoreHTML(userCount, element);
            break;
        }
    }
    checkProgressbar();
}


/**
 * checks how long task is touched on mobile
 * @param {number} id ID of the task
 */
function touchstart(id) {
    timer = setTimeout(() => onlongtouch(id), 200);
}


/**
 * checks if touch on mobile has ended
 * @param {number} id ID of the task
 */
function touchend(id) {

    if (timer && !timeIsup) {
        clearTimeout(timer);
        openTask(id);
    }
    setTimeout(() => timeIsup = false, 250)
}


/**
 * action that is performed if mobile display is touched long enough
 * @param {number} id ID of the task
 */
function onlongtouch(id) {
    timeIsup = true;
    openMoveToPoppupMobile(id);
}


/**
 * opens container that allows shifting tasks between states on mobile devices
 * @param {number} id ID of the task
 */
function openMoveToPoppupMobile(id) {
    let task = document.getElementById('taskBoxes' + id);
    currentDraggedElement = id;
    task.innerHTML += openMoveToPoppupMobileHTML();
}


/**
 * filters board after performing a change in status on mobile devices
 */
function closeMoveToPoppupMobile() {
    filterStatus();
    filterBoard();
}

