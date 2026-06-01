const input = document.getElementById("pokeInput")
const button = document.getElementById("pokeButton")
const card = document.getElementById("card")
const btnRandom = document.getElementById("pokeRandom") 

let loading = false
let pokemons = []

const typeColors = {
    normal: "#D8D8C0",
    fire: "#FFB4A2",
    water: "#A0C4FF",
    electric: "#FFE699",
    grass: "#B7E4C7",
    ice: "#CDEDF6",
    fighting: "#E8A598",
    poison: "#D8B4E2",
    ground: "#E6CCB2",
    flying: "#CDB4DB",
    psychic: "#FFAFCC",
    bug: "#CDE77F",
    rock: "#D3C0A8",
    ghost: "#B8B8FF",
    dragon: "#A0C4FF",
    dark: "#A68A64",
    steel: "#CED4DA",
    fairy: "#FFC8DD"
}


async function searchPokemon() {

    try{
    const pokeName = input.value

    loading = true
    pokeRender()

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)

    const data = await response.json()

    console.log(data)

    pokemons.push(data)
    
    
    loading = false
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


function load () {
    const waiting = document.createElement("h2")
    waiting.textContent = "Cargando..."
    card.appendChild(waiting)
}



function pokeRender () {
    //Limpia para futuros render sin elimnar lo que ya se tiene
    card.innerHTML=""
    //Vista de carga
    if (loading) {load()}

    //Función que renderiza los pokemones
    pokemons.forEach((pokemon, index) => {  
    //Se crean los elementos del card del pokemon
    const pokeCard = document.createElement("div")
    const pokeImage = document.createElement("img")
    const pokeName = document.createElement("h3")
    const pokeType = document.createElement("p")
    const pokeDelete = document.createElement("button")
    //Esto sirve para poder ubicar el nombre del tipo para luego añadirle el color correcto segun tipo
    const pokeTypeName = pokemon.types[0].type.name
    //Una vez obtenemos el nombre lo buscamos dentro de typeColors
    const color = typeColors[pokeTypeName]
    //Se indica con que información rellenar esos elementos creados
    pokeImage.src= pokemon.sprites.front_default
    pokeName.textContent = pokemon.name
    pokeType.textContent = pokemon.types[0].type.name
    pokeDelete.textContent = "X"
    //Se adhieren al pokeCard
    pokeCard.appendChild(pokeDelete)
    pokeCard.appendChild(pokeImage)
    pokeCard.appendChild(pokeName)
    pokeCard.appendChild(pokeType)
    
    //Se añaden los estilos
    pokeCard.classList.add("poke-Card")
    pokeDelete.classList.add("delete-btn")
    //Luego de obtener el valor del Type coloar (fijarse arriba) se añade el colocar a los estilos segun el tipo
    pokeCard.style.backgroundColor = color
    //Se adhiere el pokeCard al card
    card.appendChild(pokeCard)


    //Boton paara eliminar card

    pokeDelete.addEventListener("click", ()=> {
      pokemons =  pokemons.filter(poke=> pokemon.id !== poke.id )
      //Visualizar en consola el pokemon
      console.log(pokemons)
      //Se vuelve a renderizar
      pokeRender()

    })
    
})}
    


async function randomer () {
    try{
    
    loading = true
    if (loading) {load()}

    const id = Math.floor(Math.random() * 1025) + 1
    console.log(id)

    const pokeName = id

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)

    const data = await response.json()

    console.log(data)

    pokemons.push(data)
    
    loading = false
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


