let letters = [];
  
let contacts = [
    {
        "firstname":"Anton",
        "lastname":"Mayer",
        "email":"antom@gmail.com",
        "phonenumber":"+491111111"
    },

    {
        "firstname":"Anja",
        "lastname":"Schulz",
        "email":"schulz@hotmail.com",
        "phonenumber":"+495423411"
    },

    {
        "firstname":"Bendedikt",
        "lastname":"Ziegler",
        "email":"benedikt@gmail.com",
        "phonenumber":"+498023471"
    },


]

function render(){
    includeHTML();
    generateAlphabet();
    console.log(contacts[0]['firstname'].charAt(0))
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


function generateAlphabet(filter){
  let content = document.getElementById('contactList');
  content.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      const firstLetter = contact['firstname'].charAt(0);
      const email = contact['email'];
      const phonenumber = contact['phonenumber'];

      if (!filter || filter == firstLetter) {
          content.innerHTML += generateContacts(contact, email, phonenumber);
      }


      if (!letters.includes(firstLetter)) {
          letters.push(firstLetter);
      }
  }
  renderLetters();
}


function renderLetters(){
let letterbox = document.getElementById('letterbox');
letterbox.innerHTML = '';

for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    letterbox.innerHTML += `<div onclick="setFilter('${letter}')" class="letter">${letter}</div>`;
}
}



// generate the contactlist
function generateContacts(contacts, email, phonenumber) {
  
    
  
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];     
        
        document.getElementById('contactsA').innerHTML +=/*html*/ `       
          
          <div class="contact" onclick="showSingleContact(${i})">
            <div class="beginner-letter">
                <div>
                    <p>${contacts.charAt(0)}</p>
                </div>
            </div>
            <div>
              <p class="contact-name">${contacts}</p>
              <p class="contact-email">${email}</p>
            </div>
          </div>  
        </div>
        `;
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
            <div>${contacts[i]['firstname'].charAt(0)}${contacts[i]['lastname'].charAt(0)}</div>
          </div>
        </div>
        <div class="add-task">
          <div class="add-task-name">
            <div>${contacts[i]['firstname']} ${contacts[i]['lastname']}</div>
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
          <div class="add-contact-design1"></div>
          <div class="add-contact-design2"></div>
          <div class="add-contact-design3"></div>
        </div>
        `;
}


function AddContacts() {
  let name = document.getElementById('AddName').value;
  let email = document.getElementById('AddEmail').value;
  let number = document.getElementById('AddNumber').value;
  contacts.push({firstname:name});
  
}

function showNewContactContainer() {
    document.getElementById('lightboxAddContact').classList.remove('d-none');
}

function HideNewContactContainer() {
    document.getElementById('lightboxAddContact').classList.add('d-none');
}









