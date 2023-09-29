// DOM variables
const btnSearch = document.getElementById("btn-search")

btnSearch.addEventListener("click",()=>{
    let pokemon = document.getElementById("search").value;
    let url= `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
    
    // Gets data and puts in console
    fetch(url)
    .then(data => data.json())
    .then(data =>{
        const pokemonImage = document.querySelector(".pokemon-image");
        pokemonImage.innerHTML = `<img src="${data.sprites.front_default}">`
        const tempNameElement = document.querySelector("#name");
        tempNameElement.textContent = `Name: ${data.name}`;
        const height = document.querySelector("#height");
        height.textContent = `${data.height}m`
        const weight = document.querySelector("#weight");
        weight.textContent = `${data.weight}kg`
    
        const types = document.querySelector("#types");
        
        for (let index = 0; index < data.types.length; index++) {
            types.innerHTML += `<span class="${data.types[index].type.name}">${data.types[index].type.name.toUpperCase()}</span>`;
        }
    
        const stats = document.querySelector("#stats");
        for (let index = 0; index < data.stats.length; index++) {
    
            let name = data.stats[index].stat.name.toUpperCase();
            let percentage = (data.stats[index].base_stat / 450) * 100
            stats.innerHTML += `<div>${name}</div>
          <div class="progdatas" role="progdatasbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 20px">
            <div class="progdatas-bar" style="width: ${percentage}%;">${data.stats[index].base_stat}</div>
          </div>`
        }
        
    })
})
