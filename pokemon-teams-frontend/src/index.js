const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


// Load trainers and their pokemon on page load.

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => loadTrainers(json))
}

function fetchPokemon() {
    fetch(POKEMONS_URL)
    .then(res => res.json())
    .then(json => loadPokemon(json))
}


function loadTrainers(trainers) {
    trainers.forEach(trainer => createTrainerCard(trainer))
}

function loadPokemon(pokemons) {
    pokemons.forEach(pokemon => addTrainerPokemon(pokemon))
}

function createTrainerCard(trainer) {
    let main = document.getElementsByTagName("main")[0]
    let div = document.createElement('div')
    div.id = `trainer_${trainer.id}`
    div.class = "card"
    div.innerText = trainer.name
    let ul = document.createElement('ul')
    div.appendChild(ul)
    let addBtn = document.createElement('button')
    addBtn.id = `add_${div.id}`
    addBtn.innerText = "Add Pokemon"
    wireAddBtn(addBtn)
    div.appendChild(addBtn)
    main.appendChild(div)
}

function addTrainerPokemon(pokemon) {
    let trainerDiv = document.getElementById(`trainer_${pokemon.trainer_id}`)
    let li = document.createElement('li')
    li.id = `pokemon_${pokemon.id}`
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    trainerDiv.children[0].appendChild(li)
    let removeBtn = document.createElement('button')
    removeBtn.id = `remove_${li.id}`
    removeBtn.innerText = "Release"
    removeBtn.style.backgroundColor("red")
    li.appendChild(removeBtn)
    
}

function wireAddBtn(addBtn) {
    addBtn.addEventListener('click', function(e) {
        let trainerId = addBtn.id.split("_")
        trainerId.shift()
        console.log(trainerId[1])
        let trainer = document.getElementById(`${trainerId.join("_")}`)
        // console.log(trainer)
        if(trainer.children[0].childElementCount >= 6) {
            console.log("Cannot add pokemon, release until you have less than 6.")
        } else {
            // create pokemon
            // fetch with a post
            fetch(POKEMONS_URL, {
                method: "POST",
                header: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({trainer_id : `${trainerId[1]}`})
            }).then(resp => resp.json())
            .then(json => console.log(json))
        }

    })
}


// When users release a pokemon from a team, release that pokemon

fetchTrainers()
fetchPokemon()



