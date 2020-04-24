const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main=document.querySelector('main')

function fetchAllTrainers () {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(resp => trainersToDOM(resp))
}

function fetchAllPokemon (id, ul){
    return fetch(POKEMONS_URL)
    .then(resp => resp.json())
    .then( array => {   
        let trainerPokemons=array.filter(object => object.trainer_id == id)
        makeLi(trainerPokemons, ul)
    })
}

function trainersToDOM(array) {
    console.log(array)
   array.forEach(trainer => {buildCard(trainer)
    })
}

function buildCard(trainerObject){
    let div= document.createElement('div')
    div.className=("card")
    div.id=trainerObject.id
    let p = document.createElement('p')
    p.innerText= trainerObject.name
    let AddButton=document.createElement("button")
    AddButton.id=trainerObject.id
    AddButton.innerText="Add Pokemon"
    // button event listener here


    AddButton.addEventListener('click', event => {
        console.log(event)
    if (trainerObject.pokemons.length <7) {
        pokemonAdd}
    else  {
        (alert("This Trainer Has Too Many Pokemons To Add More!!"))}
    })

    let ul= document.createElement('ul')
    fetchAllPokemon (trainerObject.id, ul)

    div.appendChild(p)
    div.appendChild(AddButton)
    div.appendChild(ul)
    main.appendChild(div)
}

function makeLi(array, ul) {
    array.forEach(pokemon => {
        let li = document.createElement('li')
        li.innerText=`${pokemon.nickname} (${pokemon.species})`
        let button = document.createElement('button')
        button.className="release"
        button.innerText="release"
        button.id=pokemon.id

        button.addEventListener('click', deletePokemonFunction)

        li.appendChild(button)
        ul.appendChild(li)
    } )
}

    function deletePokemonFunction(event) {
        //delete from database
        fetch(`http://localhost:3000/pokemons/${event.target.id}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
            }
        })
        .then(res => console.log(res))

        //delete from DOM
        let parentLi=event.target.parentNode
        parentLi.remove()
    }

    function pokemonAdd (){

        // if (){

        // }
        // else () {

        // }

    }

fetchAllTrainers()

// and they have space on their team, they should get a new Pokemon.