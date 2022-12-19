let quoteList = document.querySelector(".quote-list");
let addQuoteForm = document.getElementById("add-quote-form");
let quoteValue = document.getElementById("quote-value");
let authorValue = document.getElementById("author-value");

// let h2 = document.getElementById("quotes-section");
// let likeBtn =document.getElementById("like-btn");
// let icon = document.getElementById("icon");
// let count = document.getElementById("count")
let output = "";
const url = "http://localhost:3000/quotes";

function renderQuotes(quotes) {
  quotes.forEach((quote) => {
    output += `
        <div class="card m-4 col-md-6">
        <div class="card-body" data-id=${quote.id}>
          <h5 class="card-title">${quote.text}</h5>
          <p class="card-text">${quote.author}</p>
          <button class="btn btn-primary" id="up"> <i class="fa-solid fa-thumbs-up" id="thumbs-up">${quote.likes}</i></button>
          <button class="btn btn-primary" id="down"> <i class="fa-solid fa-thumbs-down" id="thumbs-down">${quote.dislikes}</i></button>
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

    let like = document.getElementById("thumbs-up")
    like.addEventListener("click", ()=>{
      quote.likes+=1;
      like.textContent = quote.likes;
      updateLikes(quote)
    })
    let dislike = document.getElementById("thumbs-down")
    dislike.addEventListener("click", ()=>{
      quote.dislikes+=1;
      dislike.textContent = quote.dislikes;
      updateDislikes(quote)
    })

   
  });
  CreateNewQuotes();
}

function updateLikes(quoteObj) {
  fetch(`${url}/${quoteObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quoteObj),
  })
    .then((response) => response.json())
    .then((quotes) => console.log(quotes));
}
function updateDislikes(quoteObj) {
  fetch(`${url}/${quoteObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quoteObj),
  })
    .then((response) => response.json())
    .then((quotes) => console.log(quotes));
}

//POST-insert new post
function CreateNewQuotes() {
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
        likes: 0,
        dislikes: 0,
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

// GET method
document.addEventListener("DOMContentLoaded", () => {
  fetch(url)
    .then((response) => response.json())
    .then((quotes) => renderQuotes(quotes));
});
