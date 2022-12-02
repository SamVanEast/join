const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y", "Z",];
  
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
    generateContacts();
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


function generateAlphabet(){
    for (let i = 0; i < alphabet.length; i++) {
        const letter = alphabet[i];

        document.getElementById('contactList').innerHTML += /*html*/ `
        <div class="first-letter"> 
            <p>${letter}</p>
            <div class="between-line">
                <p></p>
            </div>
        </div>
        <div id="contacts"></div>                  
        `;   
    }
}



// generate the contactlist
function generateContacts() {
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];     
        
        document.getElementById('contacts').innerHTML +=/*html*/ `       
          
          <div class="contact" onclick="showSingleContact(${i})">
            <div class="beginner-letter">
                <div>
                    <p>${contact['firstname'].charAt(0)}${contact['lastname'].charAt(0)}</p>
                </div>
            </div>
            <div>
              <p class="contact-name">${contact['firstname']} ${contact['lastname']}</p>
              <p class="contact-email">${contact['email']}</p>
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

function showNewContactContainer() {
    document.getElementById('lightbox').classList.remove('d-none');
}

function HideNewContactContainer() {
    document.getElementById('lightbox').classList.add('d-none');
}






/*
let contacts = ['Anne Fischer', 'Bert Blödel', 'Claudine Kauf', 'Dirk Dach', 'Anton Ameise', 'Babette Bügel', 'Eugen Esel', 'Felicitas Fuchs'];

let email = ['']


var map = contacts.reduce((p, c) => {
    let char = c.charAt(0).toUpperCase();
    p[char] = [].concat((p[char] || []), c)
    return p;
  }, {});
  
  var result = Object.keys(map).map(k => ({
    letter: k,
    names: map[k],
    email: map[k]
  }));


function render(){
    
    generateLetters();
    
    console.log(result);
}

function generateLetters(){
    for (let i = 0; i < result.length; i++) {
        const letter = result[i];
        
        document.getElementById('contactlist').innerHTML += /*html*//* ` 
            <div class="letters">${letter['letter']}</div>
            
            <div id='letters${i}'></div>
            `;

        generateContacts(i);
    }
}

function generateContacts(i){
    for (let j = 0; j <  result[i]['names'].length; j++) {
        const contact =  result[i]['names'][j];
        console.log(contact)

        document.getElementById(`letters${i}`).innerHTML += /*html*//* `
        <div id='singleContact${j}'>${contact}</div>
        `;
    }
}

*/


