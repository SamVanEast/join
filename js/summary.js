let allCategories = ['progress', 'feedback', 'todo', 'done'];
let allIds = ['tasks-in-progress', 'tasks-in-feedback', 'to-do-number', 'done-number'];
/**
 * Es wird aller HTML Content eingfügt
 */
async function summaryInit() {
    await loadAllTasks();
    tasksInBoard();
    renderSomeHtmlContent();
    // document.getElementById('urgent-info-number');
    // document.getElementById('date-of-urgent');
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
function renderSomeHtmlContent(){
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

