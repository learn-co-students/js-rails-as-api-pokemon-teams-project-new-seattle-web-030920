const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let mainElm = document.querySelector('main');


function fetchAll()
{
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(data =>  allHandler(data))
}

function fetchTrainer(id)
{
    let url = `${TRAINERS_URL}/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => trainerHandler(data))
}

function fetchPokemon(id, parentId)
{
    let url = `${POKEMONS_URL}/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => pokemonHandler(data, parentId))
}

function allHandler(data)
{
    data.forEach(trainer => {
        fetchTrainer(trainer.id)
    });
}

function trainerHandler(trainer)
{
    trainerId = trainer.trainer.id;
    trainerName = trainer.trainer.name;

    //clean up trainer card if exists
    let searchQuery = `[data-id="${trainerId}"]`
    let trainerCard = document.querySelector(searchQuery)
    if(trainerCard == null)
    {
        trainerCard = document.createElement('div');
    }
    else
    {
        //remove children
        trainerCard.querySelectorAll('*').forEach(n => n.remove());
    } 

    
    trainerCard.classList.add("card");    
    
     pTitle = document.createElement('p');    
     pTitle.innerText = trainerName;
     trainerCard.appendChild(pTitle);     
        
    trainerCard.setAttribute("data-id", trainerId);    
    mainElm.appendChild(trainerCard);

    let buttonAdd = document.createElement("button");
    buttonAdd.textContent = "Add Pokemon";
    buttonAdd.setAttribute("data-trainer-id", trainerId);    
    buttonAdd.addEventListener('click', addPokemon);    
    trainerCard.appendChild(buttonAdd);

    let trainerUL = document.createElement('ul');    
    trainerCard.appendChild(trainerUL);

    trainer.pokemons.forEach(pokemon => {
        fetchPokemon(pokemon.id, trainerId)
    })
    
}

function pokemonHandler(pokemon, parentId)
{        
    let searchQuery = `[data-id="${parentId}"]`
    ulParent = document.querySelector(searchQuery).querySelector('ul')    
    let pokemonLI = document.createElement('li');
    pokemonLI.innerText = `${pokemon.nickname} (${pokemon.species})`
    let buttonRelease = document.createElement("button");
    buttonRelease.textContent = "Release Pokemon";
    buttonRelease.className = "release";
    buttonRelease.setAttribute("data-pokemon-id", pokemon.id);   
    buttonRelease.addEventListener('click', releasePokemon);
    pokemonLI.appendChild(buttonRelease);
    ulParent.appendChild(pokemonLI)    
}

function releasePokemon(releaseEvent)
{
    console.log("Release Pokemon Clicked");    
    let pokemonId = releaseEvent.target.getAttribute("data-pokemon-id");
    console.log(`Deleting pokemon with id = ${pokemonId}`);
    fetchDeletePokemon(pokemonId);
    parentLI = releaseEvent.target.parentElement
    parentLI.remove()

}

function addPokemon(addEvent)
{
    console.log("Add Pokemon Clicked");
    trainerId = addEvent.target.getAttribute('data-trainer-id')
    console.log(trainerId);
    fetchAddPokemon(trainerId);    
}

function fetchAddPokemon(trainerId)
{
    let url = `${TRAINERS_URL}/${trainerId}/add_pokemon`;
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Accept': 'application/json'            
        },
        body:JSON.stringify("Test")
    })
    .then(res => res.json())
    .then(function(addReseult) 
    {
        console.log(addReseult);
        fetchTrainer(trainerId);
    })
}

function fetchDeletePokemon(pokemonId)
{
    let url = `${POKEMONS_URL}/${pokemonId}`;
    fetch(url,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(console.log)
}


fetchAll()