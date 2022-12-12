let letters = [];
  
let contacts = [];

async function render() {
    setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contact')) || [];
    sortArray();
    console.log(contacts);
    generateContactlist();
}

function sortArray(){
  letters.sort();
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i]['name'];
    contacts.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })   
  }
}


function submitContact() {
  let name = document.getElementById('AddName').value;
  let email = document.getElementById('AddEmail').value;
  let number = document.getElementById('AddNumber').value;
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);

  let test = {
      'name': name.charAt(0).toUpperCase() + name.slice(1),
      'email': email,
      'phone': number,
      'r': x,
      'g': y,
      'b': z
  };

  addUser(contacts, test);   
  sortArray();
  generateContactlist();

}

async function addUser(contact, test) {
  contact.push(test);
  await backend.setItem('contact', JSON.stringify(contact));
  console.log(contacts);
}



function generateContactlist() {
  letters = [];
  document.getElementById('contactList').innerHTML = '';
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    

    let firstLetter = contact['name'].charAt(0).toUpperCase();
    if(!letters.includes(firstLetter)) {
      
      letters.sort();
      letters.push(firstLetter);
      
      document.getElementById('contactList').innerHTML += /*html*/ `
      <div class="letterbox"  id="letterbox${firstLetter}">
      <div class="first-letter">
        <p>${firstLetter}</p>
      </div>
      <div class="between-line"><p></p></div>
        
    </div>
`; }
      if (firstLetter === contact['name'].charAt(0).toUpperCase()) {
        document.getElementById(`letterbox${firstLetter}`).innerHTML +=/*html*/ `
        <div class="contact" onclick="showSingleContact(${i})">
        <p class="beginner-letter" style="background: rgb(${contact['r']},${contact['b']},${contact['g']})">${contact['name'].split(' ').map(word => word[0]).join('').toUpperCase()}</p>
        <div class="contact-name-div">
          <div class="contact-name">${contact['name']}</div>
          <div  class="contact-email">${contact['email']}</div>
        </div>
        </div> `;

      }
  }  
}


function showSingleContact(i){       
        document.getElementById('containerRight').innerHTML = /*html*/ `
        <div class="headline">
        <h1>Contacts</h1>
        <div></div>
        <h3>Better with a Team</h3>
          </div>
    <div class="contact-information">
      <div class="contact-information-up">
        <div class="contact-icon">
          <div class="contact-icon-bg" style="background: rgb(${contacts[i]['r']},${contacts[i]['b']},${contacts[i]['g']}">
            <div>${contacts[i]['name'].split(' ').map(word => word[0]).join('')}</div>
          </div>
        </div>
        <div class="add-task">
          <div class="add-task-name">
            <div>${contacts[i]['name']} </div>
          </div>
          <div class="add-task-btn">
            <div class="add-task-btn-plus">
              <div><img src="/assets/img/contact-img/add_blue.png" alt="" srcset=""></div>
            </div>
            <div class="add-task-btn-text">Add Task</div>
          </div>
        </div>
      </div>
      <div class="contact-information-middle">
        <div class="contact-information-text"> Contact Information</div>
        <div class="edit-container">
          <div class="edit-container-left"> 
            <img src="/assets/img/contact-img/edit.png" alt="" srcset="">
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
        <div class="add-contact-btn" onclick="showNewContactContainer()">
        <div class="add-contact-text">New contact</div>
        <div>
          <div><img src="/assets/img/contact-img/add.icon.png" alt="" srcset=""></div>
        `;
        
}

function openEditContact(i){
  document.getElementById('lightboxEditContact').classList.remove('d-none');
  document.getElementById('lightboxEditContact').innerHTML = /*html*/ `
  <div class="lightbox-container">
        <div class="lightbox-container-left">
          <div><img src="/assets/img/menu-img/menu-logo.svg" alt=""></div>
          <h1>Edit Contact</h1>
          <p>Tasks are better with a team</p>
          <div class="underline"></div>
        </div>
        <div class="lightbox-container-right">
          <div class="lightbox-img">
            <div> <img src="/assets/img/contact-img/user-line.png" alt="" srcset=""></div>
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
            <div class="lightbox-btn">
              
              <button class="lightbox-btn-right" onclick="editContacts(${i})">Save</button>
            </div>
            
          </div>       
        </div>
      </div>
  `;
  EditInput(i);
}

function EditInput(i){
  document.getElementById('editName').value = `${contacts[i]['name']}`;
  document.getElementById('editEmail').value = `${contacts[i]['email']}`;
  document.getElementById('editNumber').value = `${contacts[i]['phone']}`;
}

function editContacts(i) {
  let name = document.getElementById('editName').value; 
  let email = document.getElementById('editEmail').value; 
  let number = document.getElementById('editNumber').value; 
  contacts.splice(i,1);
  let test = {
    'name': name.charAt(0).toUpperCase() + name.slice(1),
    'email': email,
    'phone': number,
  }
  addUser(contacts, test);   
  sortArray();
  generateContactlist();
}

function closeEditContact(){
  document.getElementById('lightboxEditContact').classList.add('d-none');
}




function showNewContactContainer() {
    document.getElementById('lightboxAddContact').classList.remove('d-none');
}

function HideNewContactContainer() {
    document.getElementById('lightboxAddContact').classList.add('d-none');
}









