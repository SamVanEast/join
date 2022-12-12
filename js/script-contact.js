let letters = [];
  
let contacts = [
    {
        "name":"Anton Mayer",
        "email":"antom@gmail.com",
        "phonenumber":"+491111111"
    },

    {
        "name":"Anja Schulz",
        "email":"schulz@hotmail.com",
        "phonenumber":"+495423411"
    },

    {
        "name":"Bendedikt Ziegler",
        "email":"benedikt@gmail.com",
        "phonenumber":"+498023471"
    },
];

let contact = [];

async function init() {
    setURL('https://gruppe-390.developerakademie.net/smallest_backend_ever/');
    await downloadFromServer();
    contact = JSON.parse(backend.getItem('contact')) || [];

}

function submitTask() {


  let test = {
      'name': 'leo',
      'email': 'jdshflja',
      'phone': '43214312'
  };

  addUser(contact, test);   

}

async function addUser(contact, test) {
  contact.push(test);
  await backend.setItem('contact', JSON.stringify(contact));
}





function render(){
    init();
    generateContactlist();
}

function generateContactlist() {
  letters = [];
  document.getElementById('contactList').innerHTML = '';
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    

    let firstLetter = contact['name'].charAt(0).toUpperCase();
    if(!letters.includes(firstLetter)) {
      letters.push(firstLetter);
      
      document.getElementById('contactList').innerHTML +=/*html*/ `
      <div class="letterbox"  id="letterbox${firstLetter}">
      <div class="first-letter">
        <p>${firstLetter}</p>
      </div>
      <div class="between-line"><p></p></div>
        
    </div>
`; }
      if (firstLetter === contact['name'].charAt(0)) {
        document.getElementById(`letterbox${firstLetter}`).innerHTML +=/*html*/ `
        <div class="contact" onclick="showSingleContact(${i})">
        <p class="beginner-letter" id="bgColor${i}">${contact['name'].split(' ').map(word => word[0]).join('')}</p>
        <div class="contact-name-div">
          <div class="contact-name">${contact['name']}</div>
          <div  class="contact-email">${contact['email']}</div>
        </div>
        </div> `;
        randomBgColor(i);
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
          <div class="contact-icon-bg" id="bgColorSingle${i}">
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
          <div class="contact-information-fr103-number">${contacts[i]['phonenumber']}</div>
        </div>
      </div>
      </div>
      <div class="add-contact-btn" onclick="showNewContactContainer()">
        <div class="add-contact-text">New contact</div>
        <div>
          <div><img src="/assets/img/contact-img/add.icon.png" alt="" srcset=""></div>

        </div>
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
              <input id="editNumber" required id="AddNumber" placeholder="${contacts[i]['phonenumber']}" type="text">
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
  document.getElementById('editNumber').value = `${contacts[i]['phonenumber']}`;
}

function editContacts(i) {
  let name = document.getElementById('editName').value; 
  let email = document.getElementById('editEmail').value; 
  let number = document.getElementById('editNumber').value; 
  contacts.splice(i,1);
  contacts.push({'name': name, 'email': email, 'phonenumber': number});
  generateContactlist();
}

function closeEditContact(){
  document.getElementById('lightboxEditContact').classList.add('d-none');
}


function addContacts() {
  
  let name = document.getElementById('AddName').value;
  let email = document.getElementById('AddEmail').value;
  let number = document.getElementById('AddNumber').value;
  contacts.push({'name': name, 'email': email, 'phonenumber': number});
  console.log(contacts);
  generateContactlist();
  
}

/**
 * generate a random color
 */
function randomBgColor(i) {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  document.getElementById(`bgColor${i}`).style.background = bgColor;

}



function showNewContactContainer() {
    document.getElementById('lightboxAddContact').classList.remove('d-none');
}

function HideNewContactContainer() {
    document.getElementById('lightboxAddContact').classList.add('d-none');
}









