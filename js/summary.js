let allCategories = ['progress', 'feedback', 'todo', 'done'];
let allIds = ['tasks-in-progress', 'tasks-in-feedback', 'to-do-number', 'done-number'];
const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/**
 * Es wird aller HTML Content eingfügt
 */
async function summaryInit() {
    await loadAllTasks();
    tasksInBoard();
    renderSomeHtmlContent();
    renderUregentNumber();
    renderUpcomingDeadline();
}
/**
 * Alle Tasks in im board sind werden ins Array allTasks geladen welches in der board.js definiert ist 
 */
async function loadAllTasks() {
    setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}
/**
 * alle vorhandenen Tasks werden reingladen
 */
function tasksInBoard() {
    document.getElementById('tasks-in-board').innerHTML = `${allTasks.length}`;
}
/**
 * der Content von allen im Array allCategories werden geladen
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
 * gibt an wie viele tasks als urgent deklariert sind 
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
 * Vergleicht welches task Datum mit urgent zu erst kommt
 */
function renderUpcomingDeadline() {
    let upcomingDeadline = '';
    for (let i = 0; i < allTasks.length; i++) {
        let prioUrgent = allTasks[i].prio == 'Urgent';
        if (upcomingDeadline.split('-').join("") > allTasks[i].dueDate.split('-').join("") && prioUrgent || upcomingDeadline == '' && prioUrgent) {
            upcomingDeadline = allTasks[i].dueDate;
        }
    }
    checkUpcomingDeadline(upcomingDeadline);
}
/**
 * kontroliert ob ein urgent existiert und ladet entweder No Urgent oder das neu vormartierte Datum ins HTML
 * @param {string} upcomingDeadline aktuelles Datum von der frühesten Deadline
 */
function checkUpcomingDeadline(upcomingDeadline){
    let dateOfUrgent = document.getElementById('date-of-urgent');
    if (upcomingDeadline == '') {
        upcomingDeadline = 'No Urgent';
        dateOfUrgent.innerHTML = `${upcomingDeadline}`;
    }
    if (!upcomingDeadline == '' && !upcomingDeadline == undefined) {
        let year = upcomingDeadline.substr(0, 4);
        let month = allMonths[upcomingDeadline.substr(5, 2) -1]
        let day = upcomingDeadline.substr(-2, 2)
        dateOfUrgent.innerHTML = `${month + ' ' + day + ', ' + year}`;
    }
}