const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.body.querySelector('main')

document.addEventListener('DOMContentLoaded', fetchAll)

//API functions
function fetchAll(){
    return fetch(TRAINERS_URL).then(res => res.json()).then(buildTeams)
}

function postPokemon(pokemon){
    trainerID = pokemon.target['data-trainer-id']
    fetch(POKEMONS_URL, {method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(trainerID)
    })
    .then(res => res.json())
    .then(buildNewPokemon)
}

function deletePokemon(id){
    fetch(`http://localhost:3000/pokemons/${id}`, {method: 'DELETE', 
        headers: {'Content-Type': 'application/json'}
    })
}


//HTML display controls
function buildTeams(e){
    e.forEach(buildTeam)
}

function buildTeam(e){
    let leader = e.trainer
    let pokemons = e.pokemons

    let div = document.createElement('div')
    let trainer = document.createElement('p')
    let addButton = document.createElement('button')
    let ul = document.createElement('ul')

    pokemons.forEach(poke => {
        let li = document.createElement('li')
        let releaseButton = document.createElement('button')

        li.innerText = `${poke.nickname} (${poke.species})`
        releaseButton.innerText = "Release"
        releaseButton.className = "release"
        releaseButton["data-pokemon-id"] = poke.id

        releaseButton.addEventListener('click', handleDelete)

        li.appendChild(releaseButton)
        ul.appendChild(li)
    })

    div.className = "card"
    div["data-id"] = leader.id 

    trainer.innerText = leader.name 

    addButton["data-trainer-id"] = leader.id
    addButton.innerText = "Add Pokemon "
    
    if (ul.childElementCount < 6){
        addButton.addEventListener('click', handlePost)
    }

    div.appendChild(trainer)
    div.appendChild(addButton)
    div.appendChild(ul)

    main.appendChild(div)
}

function buildNewPokemon(poke){
    const updateUL = document.body.querySelectorAll("div.card")[poke.trainer_id-1].lastChild

    let li = document.createElement('li')
    let releaseButton = document.createElement('button')

    li.innerText = `${poke.nickname} (${poke.species})`
    releaseButton.innerText = "Release"
    releaseButton.className = "release"
    releaseButton["data-pokemon-id"] = poke.id

    releaseButton.addEventListener('click', handleDelete)

    li.appendChild(releaseButton)
    updateUL.appendChild(li)
}



//Handlers
function handlePost(e){
    postPokemon(e)
}

function handleDelete(e){
    const poke_id = e.target["data-pokemon-id"]
    e.target.parentElement.remove()
    deletePokemon(poke_id) 
}

