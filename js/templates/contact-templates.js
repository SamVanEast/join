function generateLetterbox(firstLetter){
    return /*html*/ `
    <div class="letterbox"  id="letterbox${firstLetter}">
    <div class="first-letter">
      <p>${firstLetter}</p>
    </div>
    <div class="between-line"><p></p></div>       
  </div>
`; 
}

function generateContactinConttaclist(i, contact) {
    return /*html*/ `
    <div class="contact" onclick="showSingleContact(${i})">
        <p class="beginner-letter" style="background: rgb(${contact['bgcolor']})">${contact['name'].split(' ').map(word => word[0]).join('').toUpperCase()}</p>
        <div class="contact-name-div">
        <div class="contact-name">${contact['name']}</div>
        <div  class="contact-email">${contact['email']}</div>
    </div>
    </div>
    `;
}

function showSingleContactTemplate(i) {
    return /*html*/ `
    <div class="headline">
    <h1>Contacts</h1>
    <div></div>
    <h3>Better with a Team</h3>
      </div>
<div class="contact-information">
  <div class="contact-information-up">
    <div class="contact-icon">
      <div class="contact-icon-bg" style="background: rgb(${contacts[i]['bgcolor']})">
        <div>${contacts[i]['name'].split(' ').map(word => word[0]).join('').toUpperCase()}</div>
      </div>
    </div>
    <div class="add-task">
      <div class="add-task-name" >
        <div>${contacts[i]['name']} </div>
      </div>
      <div class="add-task-btn" onclick="addNewTask()">
        <div class="add-task-btn-plus">
          <div><img src="../../assets/img/contact-img/add_blue.png" alt="" srcset=""></div>
        </div>
        <div class="add-task-btn-text">Add Task</div>
      </div>
    </div>
  </div>
  <div class="contact-information-middle">
    <div class="contact-information-text"> Contact Information</div>
    <div class="edit-container" onclick="openEditContact(${i})">
      <div class="edit-container-left"> 
        <img src="../../assets/img/contact-img/edit.png" alt="" srcset="">
      </div>
      <div class="edit-contact" >Edit Contact</div>
    </div>
  </div>
  <div class="contact-information-down">
    <div class="contact-information-fr102">
      <div class="contact-information-fr102-email">Email</div>
      <div class="contact-information-fr102-text">${contacts[i]['email']}</div>
    </div>
    <div class="contact-information-fr103">
      <div class="contact-information-fr103-phone">Phone</div>
      <div class="contact-information-fr103-number">${contacts[i]['phone']}</div>
    </div>
  </div>
  </div>
    </div>
    <div class="add-contact-btn" onclick="showNewContactContainer()">
    <div class="add-contact-text">New contact</div>
    <div>
      <div><img src="../../assets/img/contact-img/add.icon.png" alt="" srcset=""></div>
    `;
}

function showSingleContactMobileTemplate(i) {
    return /*html*/`
    <div class="mobile-headline">
      <div class="headline">
        <p>Kanban Project Management Tools</p>    
        <h1>Contacts</h1>        
        <h3>Better with a Team</h3>
        <div></div>
      </div>
      <div class="mobile-back">
        <img src="../../assets/img/contact-img/arrow-left-line.png" alt="" onclick="hideMobileContacts()">
      </div>
    </div>
<div class="contact-information">
<div class="contact-information-up">
  <div class="contact-icon">
    <div class="contact-icon-bg" style="background: rgb(${contacts[i]['bgcolor']})">
      <div>${contacts[i]['name'].split(' ').map(word => word[0]).join('')}</div>
    </div>
  </div>
  <div class="add-task">
    <div class="add-task-name">
      <div>${contacts[i]['name']} </div>
    </div>
    <div class="add-task-btn" onclick="addNewTask()">
      <div class="add-task-btn-plus">
        <div><img src="../../assets/img/contact-img/add_blue.png" alt="" srcset=""></div>
      </div>
      <div class="add-task-btn-text">Add Task</div>
    </div>
  </div>
</div>
<div class="contact-information-middle">
  <div class="contact-information-text"> Contact Information</div>
  <div class="edit-container">
    <div class="edit-container-left"> 
      <img src="../../assets/img/contact-img/edit.png" alt="" srcset="">
    </div>
    <div class="edit-contact" onclick="openEditContact(${i})">Edit Contact</div>
  </div>
</div>
<div class="contact-information-down">
  <div class="contact-information-fr102">
    <div class="contact-information-fr102-email">Email</div>
    <div class="contact-information-fr102-text">${contacts[i]['email']}</div>
  </div>
  <div class="contact-information-fr103">
    <div class="contact-information-fr103-phone">Phone</div>
    <div class="contact-information-fr103-number">${contacts[i]['phone']}</div>
  </div>
</div>
</div>

  </div>
  <div class="edit-contact-mobile" onclick="openEditContact(${i})">
    <div><img src="../../assets/img/contact-img/edit-mobile.png" alt="" srcset=""></div>
  </div>   
    `;
}

function showEditContact(i) {
    return /*html*/ `
    <div class="lightbox-container">
          <div class="lightbox-container-left">
            <div class="contact-close-mobile d-none">
              <div class="lightbox-input-pos-close-mobile" onclick="closeEditContact()">X</div>
            </div>
            <div><img src="../../assets/img/menu-img/menu-logo.svg" alt=""></div>
            <h1>Edit Contact</h1>
            <p>Tasks are better with a team</p>
            <div class="underline"></div>
          </div>
          <div class="lightbox-container-right">
            <div class="lightbox-img-edit">
            <div class="contact-icon">
                <div class="contact-icon-bg" style="background: rgb(${contacts[i]['bgcolor']})">
                    <div>${contacts[i]['name'].split(' ').map(word => word[0]).join('').toUpperCase()}</div>
                </div>
            </div>
            </div>
            <div class="lightbox-input-pos">
              <div>
                <div onclick="closeEditContact()" class="lightbox-input-pos-close">X</div>
                <form class="lightbox-input-pos-close-form"  action="">
                <input id="editName" required id="AddName" placeholder="" type="text">
                <input id="editEmail" required id="AddEmail" placeholder="${contacts[i]['email']}" type="email">
                <input id="editNumber" required id="AddNumber" placeholder="${contacts[i]['phone']}" type="text">
              </div>
            </form>
              <div class="lightbox-btn-edit">
                
                <button class="lightbox-btn-right-edit" onclick="editContacts(${i})">Save</button>
              </div>
              
            </div>       
          </div>
        </div>
    `;
}