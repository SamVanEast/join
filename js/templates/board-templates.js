function newTaskHTML(element) {
    return /*html*/`
        <div class="taskBoxes" draggable="true" ondragstart="startDragging(${element['id']})" onclick="openTask(${element['id']})">
        <div class="singleTask ${element.id}" id="singleTask ${element.id}">
        <div id="cats${element['id']}" class="category1" style="background-color: ${element.color}">${element['category']}</div>
        <div class="taskHeadline">${element['headline']}</div>
        <div class="taskDescription" style="min-height: 38.4px">${element['desc']}</div>
        
        <div class="progressbar" id="progbar${element.id}">    
            <div class="progressbar-grey">
                <div id="progressbar-blue" class="progressbar-blue" style="width: 2%"></div>
            </div>
            <div id="done-counter">0/${element.subtask.length} Done</div>
        </div>
                <div class="peopleInvolvedPriority">
            <div class="peopleInvolved">
            <div class="people" id="people${element.id}" style="background-color: rgb(${contact[0]['bgcolor']})">${contact[0].name.split(' ').map(word => word[0]).join('').toUpperCase()}</div>
            <div class="priority" id="prio${element.id}"><img src="../img/board_img/prio-high.png"></div>    
        </div>
        </div>
        </div>`;

}


function openTaskHTML(element) {
    return `<div class="openTaskKicker">
    <div class="category2 ${allTasks[element].category}">${allTasks[element].category}</div>
    <div><img id="close" onclick="closeOpenTask()" src="../img/board_img/close.svg"></div>
    </div>
    <div id="openTaskHMobile">
            <h2>${allTasks[element].headline}</h2>
        </div>
        <div id="pMobile">
            <p id="openTaskDesc">${allTasks[element].desc}</p>
            <p><b>Due Date: </b>${allTasks[element].dueDate}</p>
            <p><b>Priority: </b>${allTasks[element].prio}</p>
        </div>
        <div id="assignedMobile">
        <p><b>Assigned to:</b></p>
        <div class="circleAndName">
        <div class="people" style="background: rgb(${contact[0]['bgcolor']})"; margin-left: 2px">${allTasks[element].assignedTo[0].split(' ').map(word => word[0]).join('').toUpperCase()}</div>
        <div class="personsName">${allTasks[element].assignedTo[0]}</div>
        </div>
        </div>
        <div id="edit-btn" onclick="editTask(${element})"><img src="../img/board_img/edit-btn.png"></div>
        </div> `;
}


function filterBoardHTML(result) {
    return `<div class="taskBoxes" draggable="true" ondragstart="startDragging(${result['id']})" onclick="openTask(${result['id']})">
<div class="singleTask ${result.id}">
<div id="cats${result['id']}" class="category1" style="background-color: ${result.color}">${result['category']}</div>
<div class="taskHeadline">${result['headline']}</div>
<div class="taskDescription" style="min-height: 38.4px">${result['desc']}</div>
<div class="progressbar" id="progbar${result.id}">
            <div class="progressbar-grey">
                <div id="progressbar-blue" class="progressbar-blue" style="width: 50%"></div>
            </div>
            <div id="done-counter">0/${result.subtask.length} Done</div>
        </div>
        <div class="peopleInvolvedPriority">
        <div class="peopleInvolved">
        <div class="people" style="background-color: rgb(${contact[0]['bgcolor']})">${contact[0].name.split(' ').map(word => word[0]).join('').toUpperCase()}</div>
        <div class="priority" id="prio${result.id}"><img src="../img/board_img/prio-high.png"></div>    
    </div>
    </div>
    </div>`;
}


function addNewTaskHTML() {
    return /*html*/ `
    <div class="exitBtn" onclick="closeAddTask()"><img style="height:20px; cursor: pointer" src="../img/board_img/close.svg"></div>
    <div class="addTaskContainer">
        <h1>Add Task</h1>
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