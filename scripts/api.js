// DOM variables
const btnSearch = document.getElementById("btn-search")

btnSearch.addEventListener("click",()=>{
    let pokemon = document.getElementById("search").value;
    let url= `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
    
    // Gets data and puts in console
    fetch(url)
    .then(res => res.json())
    .then(res =>{
        console.log(res)
    })
})

