// DOM variables
const btnSearch = document.getElementById("btn-search");
const search = document.getElementById("search");

// Show popup modal
function popupModal(message) {
  // Modal variables
  myModal = new bootstrap.Modal(document.getElementById("errorPopup"));
  const modalBody = document.querySelector(".modal-body");
  const modalTitle = document.querySelector(".modal-title");
  const modalFooter = document.querySelector(".modal-footer");

  // Modal content
  modalTitle.innerHTML = "Invalid Search!";
  modalBody.innerHTML = `<p>${message}</p>`;

  // Show the modal
  myModal.show();

  // Listen for the hidden.bs.modal event
  myModal._element.addEventListener("hidden.bs.modal", function () {
    // Remove the modal-backdrop element
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
  });
}

// Find pokemon function
function searchPokemon() {
  let pokemon = search.value;
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        // Show popup.
        popupModal(`'${pokemon}' was not found.<br></br>Try again.`);
        search.value = "";
      }
      return response.json();
    })
    .then((data) => {
      // Rest of your code for processing valid Pokemon data

      // ---------------------- Pokemon details ----------------------

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
      pokemonName.innerHTML = `<strong>Name:</strong> ${filterText(data.name)}`;

      // Pokemon id
      const id = document.querySelector("#id");
      id.innerHTML = `<strong>ID:</strong> #${data.id}`;

      // Pokemon height
      const height = document.querySelector("#height");
      height.innerHTML = `<strong>Height: </strong>${data.height}m`;

      // Pokemon weight
      const weight = document.querySelector("#weight");
      weight.innerHTML = `<strong>Weight: </strong>${data.weight}kg`;

      // pokemon types
      const types = document.querySelector("#type-box");
      for (let index = 0; index < data.types.length; index++) {
        // Loop for all types to be displayed
        types.innerHTML += `<span class="${data.types[index].type.name} type">${filterText(data.types[index].type.name)}</span>`;
      }

      // ---------------------- Abilties & handHeld row ----------------------
      const ability = document.querySelector("#ability");
      ability.innerHTML = `<strong>Ability: </strong>`;
      for (let index = 0; index < data.abilities.length; index++) {
        ability.innerHTML += `<div class="ability-list ${data.abilities[index].ability.name}">${filterText(data.abilities[index].ability.name)}</div>`;
      }

      const handHeld = document.querySelector("#hand-held");
      handHeld.innerHTML = `<strong>Held Items: </strong>`;
      for (let index = 0; index < data.held_items.length; index++) {
        handHeld.innerHTML += `<div class="item-list ${data.held_items[index].item.name}">${filterText(data.held_items[index].item.name)}</div>`;
      }

      const moves = document.querySelector("#moves");
      moves.innerHTML = `<strong>Moves: </strong>`;
      for (let index = 0; index < data.moves.length; index++) {
        moves.innerHTML += `<div class="move-list ${data.moves[index].move.name}">${filterText(data.moves[index].move.name)}</div>`;
      }

      // ---------------------- Stats row ----------------------

      // Display stats
      const stats = document.querySelector("#stats");

      // stats title
      const statsTitle = document.querySelector("#stats-title");
      statsTitle.textContent = `${filterText(data.name)}'s Statistics:`;
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
        stats.innerHTML += `<div class="stats-name">${filterText(
          name
        )}</div><div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 20px">
          <div class="progress-bar ${extraClass} progress-text progress-bar-striped progress-bar-animated" style="width: ${percentage}%">${data.stats[index].base_stat}</div>
        </div>`;
        search.placeholder = `${filterText(data.name)}`;
        search.value = "";
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    });
}

// Filter text (only use for word without letters)
function filterText(string) {
  // Replace "-" with space
  let modifiedString = string.replace(/-/g, " ");

  // Capitalize first letter of new word
  modifiedString = modifiedString
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return modifiedString;
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
