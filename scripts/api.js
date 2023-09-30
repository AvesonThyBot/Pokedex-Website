// DOM variables
const btnSearch = document.getElementById("btn-search");
const search = document.getElementById("search");

// Find pokemon function

function searchPokemon() {
  let pokemon = search.value;
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Pokemon not found: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Rest of your code for processing valid Pokemon data

      // ---------------------- Top row ----------------------
      // Variables for pokemon data
      //pokemon image
      const pokemonImage = document.querySelector(".pokemon-image");
      if (data.sprites.front_default !== null) {
        pokemonImage.innerHTML = `<img src="${data.sprites.front_default}" alt="image of pokemon">`;
      } else {
        // If front_default is null, replace with pokeball
        pokemonImage.innerHTML = `<img src="/images/pokeball.png" alt="pokemon image doesn't exist">`;
      }

      // Pokemon name
      const pokemonName = document.querySelector("#name");
      pokemonName.innerHTML = `<strong>Name:</strong> ${data.name.toUpperCase()}`;

      // Rest of your code...

      // ---------------------- Stats row ----------------------

      // Display stats
      const stats = document.querySelector("#stats");

      // stats title
      const statsTitle = document.querySelector("#stats-title");
      statsTitle.textContent = `${data.name.toUpperCase()}'s Statistics:`;
      stats.innerHTML += `<hr class="hr">`;
      for (let index = 0; index < data.stats.length; index++) {
        // Makes a progress bar with stats
        let name = data.stats[index].stat.name.toUpperCase();
        let percentage = (data.stats[index].base_stat / 450) * 100;
        // change stats progressbar colour
        // change stats progressbar colour
        let extraClass = "bg-success";

        // change extraclass based on name
        if (name === "HP") {
          extraClass = "bg-success";
        } else if (name === "ATTACK") {
          extraClass = "bg-danger";
        } else if (name === "SPECIAL-ATTACK") {
          extraClass = "bg-danger";
        } else if (name === "DEFENSE" || name === "SPECIAL-DEFENSE") {
          extraClass = "bg-info";
        } else if (name === "SPEED") {
          extraClass = "bg-warning";
        } else {
          console.log(`Unknown case; ${name}`);
        }

        // output the stats
        stats.innerHTML += `<div class="stats-name">${name}</div><div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 20px">
          <div class="progress-bar ${extraClass} progress-text progress-bar-striped progress-bar-animated" style="width: ${percentage}%">${data.stats[index].base_stat}</div>
        </div>`;
        search.placeholder = `${data.name}`;
        search.value = "";
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    });
}

// Click to search
btnSearch.addEventListener("click", searchPokemon);

// press enter to search
search.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPokemon();
  }
});
