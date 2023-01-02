let allCategories = ['progress', 'feedback', 'todo', 'done'];
let allIds = ['tasks-in-progress', 'tasks-in-feedback', 'to-do-number', 'done-number'];
const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/**
 * All HTML content is inserted
 */
async function initSummary() {
    await loadAllTasks();
    tasksInBoard();
    renderSomeHtmlContent();
    renderUregentNumber();
    renderUpcomingDeadline();
}
/**
 * All tasks in the board are loaded into the array allTasks which is defined in board.js 
 */
async function loadAllTasks() {
    setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}
/**
 * all existing tasks are reloaded
 */
function tasksInBoard() {
    document.getElementById('tasks-in-board').innerHTML = `${allTasks.length}`;
}
/**
 * the content of all categories in the array allCategories will be loaded
 */
function renderSomeHtmlContent() {
    for (let i = 0; i < allCategories.length; i++) {
        let currentNumber = 0;
        for (let j = 0; j < allTasks.length; j++) {
            if (allTasks[j].status == allCategories[i]) {
                currentNumber++;
            }
        }
        document.getElementById(allIds[i]).innerHTML = `${currentNumber}`;
    }
}
/**
 * indicates how many tasks are declared as urgent 
 */
function renderUregentNumber() {
    let currentNumber = 0;
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].prio == 'Urgent') {
            currentNumber++;
        }
    }
    document.getElementById('urgent-info-number').innerHTML = `${currentNumber}`;
}
/**
 *  Compares which task date with urgent comes first
 */
function renderUpcomingDeadline() {
    let upcomingDeadline = '';
    for (let i = 0; i < allTasks.length; i++) {
        let prioUrgent = allTasks[i].prio == 'Urgent';
        if (conditionEarliestDate(upcomingDeadline, prioUrgent, i)) {
            upcomingDeadline = allTasks[i].dueDate;
        }
    }
    checkUpcomingDeadline(upcomingDeadline);
}
/**
 * 
 * @param {String} upcomingDeadline current date
 * @param {Boolean} prioUrgent is it a task with prio 'urgent'.
 * @returns if the date without minus sign is greater than the current date or none exists yet 
 */
function conditionEarliestDate(upcomingDeadline, prioUrgent, i){
    return upcomingDeadline.split('-').join("") > allTasks[i].dueDate.split('-').join("") && prioUrgent || upcomingDeadline == '' && prioUrgent
}
/**
 * checks if an urgent exists and loads either No Urgent or the reformatted date into the HTML
 * @param {string} upcomingDeadline current date from the earliest deadline
 */
function checkUpcomingDeadline(upcomingDeadline){
    let dateOfUrgent = document.getElementById('date-of-urgent');
    if (upcomingDeadline == '') {
        upcomingDeadline = 'Nothing Urgent';
        dateOfUrgent.innerHTML = `${upcomingDeadline}`;
    }
    if (upcomingDeadline !== '' && upcomingDeadline !== 'Nothing Urgent') {
        let year = upcomingDeadline.substr(0, 4);
        let month = allMonths[upcomingDeadline.substr(5, 2) -1]
        let day = upcomingDeadline.substr(-2, 2)
        dateOfUrgent.innerHTML = `${month + ' ' + day + ', ' + year}`;
    }
}