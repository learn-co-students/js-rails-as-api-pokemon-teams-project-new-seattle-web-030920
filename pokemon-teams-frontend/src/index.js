const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.body.querySelector("main")

// const img = document.createElement("img")
// img.src = "../assets/pokemon_teams.gif"
// main.appendChild(img)

function loadTrainers() {
    fetch(TRAINERS_URL)
    .then( resp => resp.json() )
    .then( trainers => addTrainers(trainers) )
}

function addTrainers(trainers) {
    trainers.forEach(trainer => {
        let trainerDiv = document.createElement("div")
        trainerDiv.id = trainer.id
        trainerDiv.className = "card"

        let p = document.createElement("p")
        p.innerText = trainer.name

        let ul = document.createElement("ul")

        trainer.pokemons.forEach(pokemon => {
            let li = document.createElement("li")
            li.innerText = `${pokemon.nickname} (${pokemon.species})`

            let releaseBtn = document.createElement("button")
            releaseBtn.innerText = "Release Pokemon"
            releaseBtn.className = "release"
            releaseBtn["data-pokemon-id"] = "pokemon.id"

            releaseBtn.addEventListener("click", () => {
                fetch((`${POKEMONS_URL}/${pokemon.id}`), {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(resp => resp.json())
                .then(console.log)
                .catch(console.log)
            })

            li.appendChild(releaseBtn)
            ul.appendChild(li)
        })

        let addBtn = document.createElement("button")
        addBtn.innerText = "Add Pokemon"
        addBtn["data-trainer-id"] = trainer.id

        addBtn.addEventListener("click", () => {
            if (ul.getElementsByTagName("li").length < 6) {
                fetch(POKEMONS_URL, {
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
                .then(console.log)
            } else {
                console.log("You already have six pokemon")
            }
        })

        trainerDiv.appendChild(p)
        trainerDiv.appendChild(addBtn)
        trainerDiv.appendChild(ul)
        main.appendChild(trainerDiv)
    });
}

loadTrainers()
