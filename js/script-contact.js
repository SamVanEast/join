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


]

function render(){
    includeHTML();
    generateContactlist();
}

//Header and sidebar
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}



function generateContactlist() {
  
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    

    let firstLetter = contact['name'].charAt(0);
    if(!letters.includes(firstLetter)) {
      letters.push(firstLetter);
      console.log(firstLetter);
      
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
        <p class="beginner-letter">${contact['name'].split(' ').map(word => word[0]).join('')}</p>
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
          <div class="contact-icon-bg">
            <div>${contacts[i]['name'].split(' ').map(word => word[0]).join('')}</div>
          </div>
        </div>
        <div class="add-task">
          <div class="add-task-name">
            <div>${contacts[i]['name']} </div>
          </div>
          <div class="add-task-btn">
            <div class="add-task-btn-plus">
              <div class="add-task-btn-hori"></div>
              <div class="add-task-btn-vert"></div>
            </div>
            <div class="add-task-btn-text">Add Task</div>
          </div>
        </div>
      </div>
      <div class="contact-information-middle">
        <div class="contact-information-text"> Contact Information</div>
        <div class="edit-container">
          <div class="edit-container-left"> 
            <div class="edit-v6"></div>
            <div class="edit-v7"></div>
          </div>
          <div>Edit Contact</div>
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


function addContacts() {
  
  let name = document.getElementById('AddName').value;
  let email = document.getElementById('AddEmail').value;
  let number = document.getElementById('AddNumber').value;
  contacts.push({'name': name, 'email': email, 'phonenumber': number});
  console.log(contacts);
  render();
  
}

function showNewContactContainer() {
    document.getElementById('lightboxAddContact').classList.remove('d-none');
}

function HideNewContactContainer() {
    document.getElementById('lightboxAddContact').classList.add('d-none');
}









