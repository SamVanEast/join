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


