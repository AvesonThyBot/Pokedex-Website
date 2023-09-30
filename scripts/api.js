// DOM variables
const btnSearch = document.getElementById("btn-search")

btnSearch.addEventListener("click",()=>{
    let pokemon = document.getElementById("search").value;
    let url= `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
    
    // Gets data and puts in console
    fetch(url)
    .then(data => data.json())
    .then(data =>{
      // Variables for pokemon data
        //pokemon image
        const pokemonImage = document.querySelector(".pokemon-image");
        pokemonImage.innerHTML = `<img src="${data.sprites.front_default}">`

        // Pokemon name
        const name = document.querySelector("#name");
        name.innerHTML = `<strong>Name:</strong> ${data.name.toUpperCase()}`;

        // Pokemon name
        const id = document.querySelector("#id");
        id.innerHTML = `<strong>ID:</strong> #${data.id}`;
        
        // Pokemon height
        const height = document.querySelector("#height");
        height.innerHTML = `<strong>Height: </strong>${data.height}m`

        // Pokemon weight
        const weight = document.querySelector("#weight");
        weight.innerHTML = `<strong>Weight: </strong>${data.weight}kg`
    
        // pokemon types
        const types = document.querySelector("#types");
        
        // Loop for all types to be displayed
        for (let index = 0; index < data.types.length; index++) {
          types.innerHTML += `<span class="${data.types[index].type.name}">${data.types[index].type.name.toUpperCase()}</span>`;
        }
        
        // Display stats
        const stats = document.querySelector("#stats");
        stats.innerHTML += `<hr class="hr">`
        for (let index = 0; index < data.stats.length; index++) {
          // Makes a progress bar with stats
          let name = data.stats[index].stat.name.toUpperCase();
          let percentage = (data.stats[index].base_stat / 450) * 100
          // change stats progressbar colour
        // change stats progressbar colour
        let extraClass = "bg-success";
        
        // change extraclass based on name
        if (name === "ATTACK") {
          extraClass = "bg-danger";
      } else if (name === "SPECIAL-ATTACK") {
          extraClass = "bg-danger";
      } else if (name === "DEFENSE" ||name === "SPECIAL-DEFENSE") {
          extraClass = "bg-info";
      } else if (name === "SPEED") {
          extraClass = "bg-warning";
      } else {
          console.log(`Unknown case; ${name}`);
      }
      
          // output the stats
          stats.innerHTML += `<div class="stats-name">${name}</div><div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 20px">
          <div class="progress-bar ${extraClass} progress-text progress-bar-striped progress-bar-animated" style="width: ${percentage}%">${data.stats[index].base_stat}</div>
        </div>`
        console.log(name,extraClass)
        }
    })
})


// HP, ATTACK, SPECIAL ATTACK, SPECIAL DEFENSE, SPEED