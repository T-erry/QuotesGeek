let quoteList = document.querySelector(".quote-list");
let addQuoteForm = document.getElementById("add-quote-form");
let quoteValue = document.getElementById("quote-value");
let authorValue = document.getElementById("author-value");
let h2 = document.getElementById("quotes-section");
let likeBtn =document.getElementById("like-btn");
let icon = document.getElementById("icon");
let count = document.getElementById("count")
let output = "";
const url = "http://localhost:3000/quotes";


function renderQuotes(quotes) {
  quotes.forEach((quote) => {
    // console.log(quote);
    output += `
        <div class="card m-4 col-md-6">
        <div class="card-body" data-id=${quote.id}>
          <h5 class="card-title">${quote.author}</h5>
          <p class="card-text">${quote.text}</p>
          <a href="#" class="btn btn-primary" id="delete-quote">Delete</a>
        </div>
      </div>
        `; 

    quoteList.innerHTML = output;
    quoteList.addEventListener("click", (e) => {
      e.preventDefault();
      let deleteButtonPressed = e.target.id === "delete-quote";
      let id = e.target.parentElement.dataset.id;
      // DELETE method
      if (deleteButtonPressed) {
        fetch(`${url}/${id}`, {
          method: "DELETE",
        });
      }
    }); 
  });
  
}


//POST-insert new post
addQuoteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(titleValue);
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

// GET method
document.addEventListener("DOMContentLoaded", () => {
  fetch(url)
    .then((response) => response.json())
    .then((quotes) => renderQuotes(quotes));
});
 // button clicked
 
