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