let quoteList = document.querySelector(".quote-list");
let addQuoteForm = document.getElementById("add-quote-form");
let quoteValue = document.getElementById("quote-value");
let authorValue = document.getElementById("author-value");
let output = "";
const url = "http://localhost:3000/quotes";


// GET method
document.addEventListener("DOMContentLoaded",()=>{
     fetch(url)
    .then((response) => response.json())
    .then((quotes) => renderQuotes(quotes));
})
// rendering details from the payload
  function renderQuotes(quotes){
    quotes.forEach((quote) => {
      output += `
         <div class="row">
          <div class="card m-4 col-md-6">
          <div class="card-body" data-id=${quote.id}>
            <h5 class="card-title">${quote.text}</h5>
            <p  class="card-text">${quote.author}</p>
            <a href="#" class="btn btn-primary" id="delete-quote">Delete</a>
          </div>
          
        </div>
        </div>
          `;
      quoteList.innerHTML = output;
      // DELETE method- deleting the the quotes
      quoteList.addEventListener("click", (e) => {
        e.preventDefault();
        let deleteButtonPressed = e.target.id === "delete-quote";
        let id = e.target.parentElement.dataset.id;
        if (deleteButtonPressed) {
          fetch(`${url}/${id}`, {
            method: "DELETE",
          });
        }
      });
     
    });
    
    CreateNewQuotes();
  }

//POST-insert new post
function CreateNewQuotes() {
  addQuoteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        text: quoteValue.value,
        author: authorValue.value,
      }),
    })
      .then((response) => response.json())
      .then((quotes) => {
        const quotesArray = [];
        quotesArray.push(quotes);
        renderQuotes(quotes);
        form.reset();
      });
  });
}
