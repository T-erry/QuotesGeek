
let quoteList = document.querySelector(".quote-list");
let addQuoteForm = document.getElementById("add-quote-form");
let titleValue = document.getElementById("quote-value");
let authorValue = document.getElementById("author-value");
let h2 = document.getElementById("quotes-section");
let output = "";
const url = "http://localhost:3000/quotes";



function renderQuotes(quotes){
    quotes.forEach((quote)=>{
        console.log(quote);
        output += `
        <div class="card m-4 col-md-6">
        <div class="card-body">
          <h5 class="card-title">${quote.author}</h5>
          <p class="card-text">${quote.text}</p>
          <a href="#" class="btn btn-primary id="edit-quote">Edit</a>
          <a href="#" class="btn btn-primary" id="delete-quote">Delete</a>
        </div>
      </div>
        `
      quoteList.innerHTML = output;

       
    }

   )
}
// GET request
document.addEventListener("DOMContentLoaded",()=>{
    fetch(url)
    .then((response)=> response.json())
    .then((quotes)=> renderQuotes(quotes));
}
);


//POST-insert new post
addQuoteForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    // console.log(titleValue);
    fetch(url,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
        quote: titleValue.ariaValueMax,
        author: authorValue.value
        })
    })
    .then((response)=> response.json())
    .then((quotes)=> {
        const quotesArray = [];
        quotesArray.push(quotes)
        renderQuotes(quotes)
        form.reset();
    })
})









