/**
 * Using an empty array in order to test the function addTask
 * 
 * @param {Array} tasks - This array is used to store data from add_task.html
 */

let contact;
let categorys = ['Media', 'Backoffice', 'Marketing', 'Design'];
let subtask = [];


/**
 * Function that loads all the tasks 
 * 
 */

 async function initAddTask() {
    setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    contact = JSON.parse(backend.getItem('contact'))  || [];
    console.log(allTasks);
    console.log(contact);

    renderCategoryContent();
    renderAssignedToContent();
    renderSubtaskContent();
}


function renderCategoryContent() {
    document.getElementById('cat').innerHTML = /*html*/ `
         <p>Category</p>
         <div class="dropdown" id="dropdownCategory">
             <div class="categorysDropdownSelectHTML" id="selectTaskCategoryContent" onclick="renderCategorys()">Select task category</div>
         </div>
     `;
}


function renderCategorys() {
    document.getElementById('dropdownCategory').classList.toggle('showAllCategorys');
    document.getElementById('dropdownCategory').classList.remove('categorysDropdownSelectHTML');

    let content = document.getElementById('dropdownCategory');

    content.innerHTML = /*html*/ `
         <div class="categorysDropdownSelect" id="categorysDropdownSelect" onclick="renderCategoryContent()">Select task category</div>
         <div class="categorysNewCategory" onclick="addNewCategory()"><span class="newCategory">New category</span></div>
         <div id="categorysOptions" class="categorysOptions"></div>
     `;
    renderCategorysOptions();
}


function renderCategorysOptions() {
    let options = document.getElementById('categorysOptions');

    for (let a = 0; a < categorys.length; a++) {
        const category = categorys[a];

        options.innerHTML += /*html*/`
         <span class="categorysDropdown" onclick="renderSelectedCategory('${category}')">${category}</span>
         `;
    }
}


function addNewCategory() {
    document.getElementById('categorysDropdownSelect').classList.toggle('categorysDropdownSelect');
    document.getElementById('dropdownCategory').classList.remove('showAllCategorys');

    document.getElementById('categorysDropdownSelect').innerHTML = /*html*/`
         <div class="categoryContent">
             <input class="inputFieldSubtask" type="text" placeholder="New category name" onclick="event.stopPropagation()">
             <div class="subtaskImage">
                 <img src="../../assets/img/add_task_img/cross.png" alt="" onclick="renderCategoryContent()">
                 <div class="inputBorder"></div>
                 <img src="../../assets/img/add_task_img/hookBlack.png" alt="">
             </div>
         </div>
     `;
}


function renderSelectedCategory(category) {
    document.getElementById('dropdownCategory').innerHTML = /*html*/`
         <div class="categorysDropdownSelect" onclick="event.stopPropagation(), renderCategorys()">${category}</div>
         `;

    document.getElementById('dropdownCategory').classList.remove('showAllCategorys');
}


function renderAssignedToContent() {
    document.getElementById('assigned').innerHTML = /*html*/ `
        <p>Assigned to</p>
        <div class="dropdown" id="dropdownAssignedTo">
            <div class="categorysDropdownSelectHTML" id="dropdownAssignedTo" onclick="renderAssignedTo()">Select contacts to assign</div>
        </div>`;
}


function renderAssignedTo() {
    document.getElementById('dropdownAssignedTo').classList.toggle('showAllCategorys');
    document.getElementById('dropdownAssignedTo').classList.remove('categorysDropdownSelectHTML');

    let content = document.getElementById('dropdownAssignedTo');

    content.innerHTML = /*html*/ `
     <div class="categorysDropdownSelect" id="assignedTo" onclick="renderAssignedToContent()">Select contacts to assign</div>
     <div id="assignedToOptions" class="categorysOptions"></div>
     `;
    renderAssignedToOptions();
}


function renderAssignedToOptions() {
    let names = document.getElementById('assignedToOptions');

    for (let b = 0; b < contact.length; b++) {
        const contacts = contact[b]['name'];

        names.innerHTML += /*html*/`
         <span class="categorysDropdown" onclick="renderSelectedAssignedTo('${contacts}')">${contacts}</span>
         `;
    }
}


function renderSelectedAssignedTo(contact) {
    document.getElementById('dropdownAssignedTo').innerHTML = /*html*/`
         <div class="categorysDropdownSelect" onclick="renderAssignedTo()">${contact}</div>
         `;

    document.getElementById('dropdownAssignedTo').classList.remove('showAllCategorys');
}


function setDate() {
    var date = new Date();
    const formatDate = (date) => { let formatted_date = (date.getDate() < 10 ? '0' : '') + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(); return formatted_date; }
    document.getElementById('dueDate').value = formatDate(date);
}


function renderSubtaskContent() {
    document.getElementById('subs').innerHTML = /*html*/ `
         <p>Subtasks</p>
         <div class="inputSubtask" id="inputSubtask">
             <div class="subtaskRender" onclick="renderSubtask()">Add new subtask<img src="../img/add_task_img/plus.png" alt=""></div>
         </div>
         <div class="checkboxSubtask" id="newSubtask" required></div>
     `;

    for (let i = 0; i < subtask.length; i++) {
        document.getElementById('newSubtask').innerHTML += /*html*/`
         <div class="newSubtasks">
             <input type="checkbox" required>
             <span id="selectedSubtask">${subtask[i]}</span>
         </div>
     `;
    }
}


function renderSubtask() {
    document.getElementById('inputSubtask').classList.remove('inputSubtask');

    let subtaskContent = document.getElementById('inputSubtask');
    subtaskContent.innerHTML = /*html*/ `
     <div class="inputSubtask">
         <input class="inputFieldSubtask" id="inputFieldSubtask" type="text" placeholder="Add new subtask">
         <div class="subtaskImage">
             <img src="../../assets/img/add_task_img/cross.png" alt="" onclick="renderSubtaskContent()">
             <div class="inputBorder"></div>
             <img src="../../assets/img/add_task_img/hookBlack.png" alt="" onclick="addSubtask()">
         </div>
     </div>
     `;

    document.getElementById('inputFieldSubtask').value = '';
}


function addSubtask() {
    let newSubtask = document.getElementById('inputFieldSubtask').value;

    subtask.push(newSubtask);

    renderSubtaskContent();
}


function clearFields() {
    document.getElementById('form').reset();
    renderCategoryContent();
    renderAssignedToContent();
}


function submitTask() {
    let headline = document.getElementById('headline').value;
    let desc = document.getElementById('desc').value;
    let cat = document.getElementById('cat').value;
    let assigned = document.getElementById('assigned').value;
    let dueDate = document.getElementById('dueDate').value;
    // let prio = document.getElementById('prio').value;
    //let subtask = document.getElementById('selectedSubtask').value;

    let task = {
        'headline': headline,
        'desc': desc,
        'status': 'todo',
        'category': 'Media',
        // 'assignedTo': assigned,
        // 'dueDate': dueDate,
        // 'prio': prio,
        'subtask': subtask,
    };

    addThisTask(task);
    clearForm();
}


async function addThisTask(task) {
    allTasks.push(task);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    console.log(allTasks);
    
}

function clearForm() {
    document.getElementById("form").reset();
}