let generateQuote = document.getElementById("generate-quote")
let cardText = document.querySelector(".card-text");
let author = document.getElementById("author");

// GET method 
function randomQuote(){
    fetch("https://type.fit/api/quotes")
    .then((response)=> response.json())
    .then((quotes)=> {
        let index = Math.round(Math.random()* 1643)
       
      cardText.innerText = quotes[index].text;
      author.innerText = quotes[index].author;
       });
}

generateQuote.addEventListener("click", randomQuote)