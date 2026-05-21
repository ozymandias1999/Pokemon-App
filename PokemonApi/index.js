const input = document.getElementById("pokeInput")
const button = document.getElementById("pokeButton")
const card = document.getElementById("pokeCard")
const btnRandom = document.getElementById("pokeRandom") 

let login = false
let pokemon = null

async function searchPokemon() {

    try{
    const pokeName = input.value

    // if(login) {}

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)

    const data = await response.json()

    console.log(data)

    pokemon = data

    pokeRender()

    }

    catch(error) {
        card.innerHTML = ""
        const showError = document.createElement("h2")
        showError.textContent = "Pokemon inexistente"
        card.appendChild(showError)
        input.value = ""
    }
}


function pokeRender () {
    card.innerHTML=""
    const pokeImage = document.createElement("img")
    const pokeName = document.createElement("h3")
    const pokeType = document.createElement("p")
    pokeImage.src= pokemon.sprites.front_default
    pokeName.textContent = pokemon.name
    pokeType.textContent = pokemon.types[0].type.name
    card.appendChild(pokeImage)
    card.appendChild(pokeName)
    card.appendChild(pokeType)
}


async function randomer () {
    try{

    const id = Math.floor(Math.random() * 1025) + 1
    console.log(id)

    const pokeName = id

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)

    const data = await response.json()

    console.log(data)

    pokemon = data

    pokeRender()

    }

    catch(error) {
        card.innerHTML = ""
        const showError = document.createElement("h2")
        showError.textContent = "Pokemon inexistente"
        card.appendChild(showError)
        input.value = ""
    }

}

button.addEventListener("click", searchPokemon)
input.addEventListener("keydown",(event)=> {
    if(event.key === "Enter") {
        searchPokemon()
    }
})


btnRandom.addEventListener("click",randomer)