function newTaskHTML(element) {
    return /*html*/`
        <div class="taskBoxes" draggable="true" ondragstart="startDragging(${element['id']})" onclick="openTask(${element['id']})">
        <div class="singleTask ${element.id}">
        <div id="cats${element['id']}" class="category1">${element['category']}</div>
        <div class="taskHeadline">${element['headline']}</div>
        <div class="taskDescription" style="min-height: 38.4px">${element['desc']}</div>
        
        <div class="progressbar">    
            <div class="progressbar-grey">
                <div id="progressbar-blue" class="progressbar-blue" style="width: 50%"></div>
            </div>
            <div id="done-counter">1/2 Done</div>
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
    <div class="category1 ${allTasks[element].category}">${allTasks[element].category}</div>
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
        <div>
        <div class="people" style="background: rgb(${contact[0]['bgcolor']})"; margin-left: 2px">${contact[0].name.split(' ').map(word => word[0]).join('').toUpperCase()}</div>
        </div>
        </div>
        <div id="edit-btn"><img src="../img/board_img/edit-btn.png"></div>
        </div> `;
}


function filterBoardHTML(result) {
    return `<div class="taskBoxes" draggable="true" ondragstart="startDragging(${result['id']})" onclick="openTask(${result['id']})">
<div class="singleTask ${result.id}">
<div id="cats${result['id']}" class="category1">${result['category']}</div>
<div class="taskHeadline">${result['headline']}</div>
<div class="taskDescription" style="min-height: 38.4px">${result['desc']}</div>
<div class="progressbar">    
            <div class="progressbar-grey">
                <div id="progressbar-blue" class="progressbar-blue" style="width: 50%"></div>
            </div>
            <div id="done-counter">1/2 Done</div>
        </div>
        <div class="peopleInvolvedPriority">
        <div class="peopleInvolved">
        <div class="people" style="background-color: rgb(${contact[0]['bgcolor']})">${contact[0].name.split(' ').map(word => word[0]).join('').toUpperCase()}</div>
        <div class="priority" id="prio${result.id}"><img src="../img/board_img/prio-high.png"></div>    
    </div>
    </div>
    </div>`;
}