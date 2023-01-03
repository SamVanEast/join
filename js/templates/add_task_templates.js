function showCategoryContentHTML(){ 
    return /*html*/ `
         <p>Category</p>
         <div class="dropdown" id="dropdownCategory">
             <div class="categorysDropdownSelectHTML" id="selectTaskCategoryContent" onclick="renderCategorys()">Select task category</div>
         </div>
     `;
}


function showCategorysHTML(){
    return /*html*/ `
        <div class="categorysDropdownSelect" id="categorysDropdownSelect" onclick="renderCategoryContent()">Select task category</div>
        <div class="categorysNewCategory" onclick="addNewCategory()">
            <span class="newCategory">New category</span>
        </div>
        <div id="categorysOptions" class="categorysOptions"></div>
     `;
}


function showCategorysOptionsHTML(category, hexString){
    return /*html*/`
        <span class="categorysDropdown" onclick="renderSelectedCategory('${category}', '${hexString}'), declareColorFromCategory('${hexString}')">
        ${category}
            <div class="colorDotCategorys" style="background-color: ${hexString};"></div>
        </span>
    `;
}


function showAddNewCategoryHTML(){
    return /*html*/`
        <div class="categoryContent" onclick="save(event)">
            <input class="inputFieldSubtask" id="inputFieldCategory" type="text" placeholder="New category name">
            <div class="subtaskImage">
                <img src="../../assets/img/add_task_img/cross.png" onclick="renderCategoryContent()">
                <div class="inputBorder"></div>
                <img src="../../assets/img/add_task_img/hookBlack.png" onclick="pushNewCategory()">
            </div>
        </div>
    `;
}


function showCategoryColorsHTML(newColor){
    return /*html*/ `
        <div class="colorDot" id="colorDot" style="background-color: ${newColor};" onclick="selectColor('${newColor}')">
            <div class="colorDotTransform"></div>
        </div>
    `;
}


function showSelectedCategoryHTML(category, colorString){
    return /*html*/`
        <div class="categorysDropdownSelect" id="selectedCategory" onclick="renderCategorys()">
        ${category}
            <div class="colorDotCategorys" style="background-color: ${colorString};"></div>
        </div>
    `;
}


function showAssignedToContentHTML(){
    return /*html*/ `
        <p>Assigned to</p>
        <div class="dropdown" id="dropdownAssignedTo">
            <div class="categorysDropdownSelectHTML" id="dropdownAssignedTo" onclick="renderAssignedTo()">Select contacts to assign</div>
        </div>
    `;
}


function showAssignedToHTML(){
    return /*html*/ `
        <div class="categorysDropdownSelect" id="assignedTo" onclick="renderAssignedToContent()">Select contacts to assign</div>
        <div id="assignedToOptions" class="categorysOptions"></div>
    `;
}


function showAssignedToOptionsHTML(b, contacts, contactColor){
    return /*html*/`
        <div class="contactOptions div-container" id="div-container">
            <label for="checkbox-input${b}" onclick="checkContactCheckbox('${b}', event, '${contactColor}'); saveChecked()">
                <span class="categorysDropdown">${contacts}</span>
                <input id="checkbox-input${b}" type="checkbox" name="${contacts}">
            </label>
        </div>
    `;
}


function showPrioButtonsHTML(){
    return /*html*/`
        <button type="button" name="Urgent" class="urgentButton" id="urgentButton" onclick="toggleButtonFocus(event)">
        Urgent
            <img src="../../assets/img/add_task_img/urgent.png" class="urgent" id="urgent" onclick="toggleButtonFocus(event)">
        </button>

        <button type="button" name="Medium" class="urgentButton" id="mediumButton" onclick="toggleButtonFocus(event)">
        Medium
            <img src="../../assets/img/add_task_img/medium.png" class="medium" id="medium" onclick="toggleButtonFocus(event)">
        </button>

        <button type="button" name="Low" class="urgentButton" id="lowButton" onclick="toggleButtonFocus(event)">
        Low
            <img src="../../assets/img/add_task_img/low.png" class="low" id="low" onclick="toggleButtonFocus(event)">
        </button>
    `;
}


function showSubtaskContentHTML(){
    return /*html*/ `
        <p>Subtasks</p>
        <div class="inputSubtask" id="inputSubtask">
            <div class="subtaskRender" onclick="renderSubtask()">
            Add new subtask
                <img src="../img/add_task_img/plus.png" alt="">
            </div>
        </div>
        <div class="checkboxSubtask" id="newSubtask" required></div>
    `;
}


function showSubtaskHTML(){
    return /*html*/ `
        <div class="inputSubtask">
            <input class="inputFieldSubtask" id="inputFieldSubtask" type="text" placeholder="Add new subtask">
            <div class="subtaskImage">
                <img src="../../assets/img/add_task_img/cross.png" alt="" onclick="renderSubtaskContent()">
                <div class="inputBorder"></div>
                <img src="../../assets/img/add_task_img/hookBlack.png" alt="" onclick="addSubtask()">
            </div>
        </div>
    `;
}