const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.body.querySelector("main")

function loadTrainers() {
    fetch(TRAINERS_URL)
    .then( resp => resp.json() )
    .then( trainers => trainers.forEach(trainer => addTrainer(trainer)) )
}

function addTrainer(trainer) {
    let trainerDiv = document.createElement("div")
    trainerDiv.className = "card"
    trainerDiv.setAttribute("data-id", trainer.id)

    let p = document.createElement("p")
    p.innerText = trainer.name

    let ul = document.createElement("ul")
    trainer.pokemons.forEach(pokemon => loadPokemon(ul, pokemon))
    
    let btn = document.createElement("button")
    btn.innerText = "Add Pokemon"
    btn.setAttribute("data-trainer-id", trainer.id)
    
    btn.onclick = () => handleAdd(trainer, ul)

    trainerDiv.appendChild(p)
    trainerDiv.appendChild(btn)
    trainerDiv.appendChild(ul)
    main.appendChild(trainerDiv)
}

function loadPokemon(ul, pokemon) {
    let li = document.createElement("li")
    li.innerText = `${pokemon.nickname} (${pokemon.species})`

    let releaseBtn = document.createElement("button")
    releaseBtn.innerText = "Release"
    releaseBtn.className = "release"
    releaseBtn.setAttribute("data-pokemon-id", pokemon.id)
    releaseBtn.onclick = () => handleRelease(pokemon, li)

    li.appendChild(releaseBtn)
    ul.appendChild(li)
}

function handleAdd(trainer, ul) {
    if (ul.getElementsByTagName("li").length < 6) {
        return fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                trainer_id: trainer.id
            })
        })
        .then(resp => resp.json())
        .then(pokemon => loadPokemon(ul, pokemon))
        .catch(console.log)
    } else {
        alert(`${trainer.name}'s team is already full!`)
    }
}

function handleRelease(pokemon, li) {
    fetch((`${POKEMONS_URL}/${pokemon.id}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(li.remove())
    .catch(console.log)
}

loadTrainers()