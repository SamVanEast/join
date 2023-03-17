function newTaskHTML(element) {
    return /*html*/`
        <div class="taskBoxes" id="taskBoxes${element['id']}" draggable="true" ondragstart="startDragging(${element['id']})" ontouchstart="touchstart(${element.id})" ontouchend="touchend(${element.id})" onclick="checkMobileTrue(${element.id})">
        <div class="singleTask ${element.id}" id="singleTask ${element.id}">
        <div id="cats${element['id']}" class="category1" style="background-color: ${element.color}">${element['category']}</div>
        <div class="taskHeadline">${element['headline']}</div>
        <div class="taskDescription" style="min-height: 38.4px">${element['desc']}</div>
        
        <div class="progressbar" id="progbar${element.id}">    
            <div class="progressbar-grey">
                <div id="progressbar-blue${element.id}" class="progressbar-blue" style="width: 2%"></div>
            </div>
            <div id="done-counter${element.id}">${element.subtask[0].idInputCheckbox.length}/${element.subtask[0].sub.length} Done</div>
        </div>
        <div class="peopleInvolvedPriority">
            <div class="peopleInvolved">
            <div class="alignPeople" id="people${element.id}"></div>
            <div class="priority" id="prio${element.id}"><img src="../img/board_img/prio-high.png"></div>    
        </div>
        </div>
        </div>`;

}


function getPeopleHTML(assigned, bgcolor) {
    return `<div class="people" style="background-color: rgb(${bgcolor})">${assigned.split(' ').map(word => word[0]).join('').toUpperCase()}</div>`;
}


function getMoreHTML(userCount, element) {
    return `<div class="people" style="background-color: rgb(0,0,0,0.9)">+${element.assignedTo.length - 3}</div>`;
}

function openTaskHTML(element) {
    return `<div class="openTaskKicker">
    <div class="category2 ${allTasks[element].category}" style="background-color: ${allTasks[element].color}">${allTasks[element].category}</div>
    <div class="trash-and-close">
    <div id="delete-btn" onclick="deleteSelectedTask(${element})"><img src="../img/board_img/trash.svg"></div>
    <img id="close" onclick="closeOpenTask(${element})" src="../img/board_img/close.svg">
    </div>
    </div>
    <div id="openTaskHMobile">
            <h2>${allTasks[element].headline}</h2>
        </div>
        <div id="pMobile">
            <p id="openTaskDesc">${allTasks[element].desc}</p>
            <p><b>Due Date: </b>${allTasks[element].dueDate}</p>
            <div style="display: flex; align-items: center"><span style="padding-right: 10px"><b>Priority: </b></span><span id="prioOpenTask">${allTasks[element].prio}</span></div>
            <div id="theSubs${element}" class="selectedSubs">
            <p><span><b>Subtasks: </b></span></p>
            <p id="changeSubs"></p>
            </div>
            </div>
        <div id="assignedMobile">
        <p><b>Assigned to:</b></p>
        <div class="circleAndName" id="circleAndNames">
        </div>
        </div>
        <div id="edit-btn" onclick="editTask(${element})"><img src="../img/board_img/edit-btn.png"></div>
        
        </div> `;
}

function addNewTaskHTML() {
    return /*html*/ `
    <div class="addTaskContainer">
        <div class="addTaskMobile">
            <h1>Add Task</h1>
            <div class="exitBtn" onclick="closeAddTask()"><img style="height:20px; cursor: pointer" src="../img/board_img/close.svg"></div>
        </div>
        <form id="form" onsubmit="submitTask(); return false">
            <div class="addTask">
                <div class="addTaskLeftSide">
                    <div class="titleToAssigned">
                        <div class="title">
                            <p>Title</p>
                            <input minlength="1" type="text" placeholder="Enter a title" id="headline" required>
                        </div>
                        <div class="description">
                            <p>Description</p>
                            <textarea required minlength="1" type="text" placeholder="Enter a Description"
                                id="desc"></textarea> 
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
                        <button class="create"><img src="../../assets/img/add_task_img/hook.png"
                                alt=""></button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    `;
}

function editTaskHTML(element) {
    return `
    <div class="editScreen">
        <div class="editHeadlineClose">
            <h1>Edit Task</h1>
            <div onclick="closeEditFunction()" class="lightbox-input-pos-close"><img
                    style="height:20px; cursor: pointer" src="../img/board_img/close.svg"></div>
        </div>
        <div>
            <form onsubmit="editTasks(${element}); return false;">
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
                <button class="ok-btn"><img src="../img/board_img/ok-button.png" alt=""></button>

            </form>
        </div>
    </div>
    `;
}

function openMoveToPoppupMobileHTML() {
    return `
    <div id="popup-to-move-task-mobile" class="popup_to_move_task_mobile" ontouchstart="save(event); closeMoveToPoppupMobile()">
        <div class="popup_to_move_task_mobile_selections">
            <div>Move to</div>
            <span ontouchstart="save(event); moveTo('todo')">To do</span>
            <span ontouchstart="save(event); moveTo('progress')">In Progress</span>
            <span ontouchstart="save(event); moveTo('feedback')">Feedback</span>
            <span ontouchstart="save(event); moveTo('done')">Done</span>
        </div>
    </div>`;
}