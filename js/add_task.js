function myFunction() {
    console.log('Ready!');
}


function renderCategorys(){
    document.getElementById('dropdownCategory').classList.add('showAllCategorys');

    let content = document.getElementById('dropdownCategory');

    content.innerHTML = /*html*/ `
    <div>Select task category</div>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <div>test</div>`;
}


function setDate() {
    var date = new Date();
    const formatDate = (date) => { let formatted_date = (date.getDate() < 10 ? '0' : '') + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(); return formatted_date; }
    document.getElementById('dueDate').value = formatDate(date);
}


function clearFields() {
    document.getElementById('form').reset();
}

/**
 * Function that gets all the values of the Add-Task-Page
 */

function addTask() {
    let headline = document.getElementById('headline').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('dropdownCategory').value;
    
    console.log(headline, description, category);
}