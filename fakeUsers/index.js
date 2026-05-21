//PROMISES/RESOLVE/REJECT/THEN

const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
        resolve("Datos recibidos")
    }, 2000)
})

// promise.then((resultado)=> {
//     console.log(resultado)
// })

console.log("Continuando con el flujo")

//ASYNC/AWAIT

//Ejemplo
async function obtenerDatos () {
    const resultado = await promesa

    console.log(resultado)
}


//Ejemplo funcional

async function test() {

    console.log("A")
    
    await Promise.resolve()

    console.log("B")
}

test()

console.log("C")


//Al usar fecth utilizamos información que proviene de internet, y la trae en forma de promsa por eso se usa awair fecth ("https://api.test.com/users")


async function GetUsers() {
    //Se solicita información a internet y se espera respuesta
    const response = await fetch("https://api.test.com/users")

    //Debido a que no podemos utilizar la información directamente de internet, se usa JSON para que se vuelva legible (convierte a objeto)
    const data = await response.json()

    //Leemos la información
    console.log(data)
}

//Funcion asincrona con try en caso de flujo normal y catch para errores
async function getUsers () {
    try {
        const respuesta =  await fetch("URl")
        const data =  await respuesta.json()

        console.log(data)
    }

    catch (error) {
        console.log(error)
    }
}


//Ejemplo funcional de funcion asincrona con obtención de información mediante fetch y renderización de datos con forEach además de manera de errores con try y catch

async function getUsuarios () {
    try {
        console.log("Cargando la información")

        const users = await fetch("/users.api")
        const data = await users.json()

        users.forEach(user => {
            const li = document.createElement("li")
            li.textContent = user.name

            lista.appendChild(li)
        });

    }

    catch(error) {
        console.log("Hubo un error")
    }
}


///Creación de miniprojecto, FAKEUSERS




const button = document.getElementById("button")
const lista = document.getElementById("lista")


let users = []

let loading = false


async function loadUsers () {
    
    try{
    //Aqui evitamos solicitar información que ta ya tenemos
    if (users.length> 0) {return}
    //Sirve para obtener información de interner (usuarios) pero en formato JSON, es decir no se puede usar directamente
    loading = true
    
    console.log("Cargando Usarios...")
    renderUsers()

    const response = await fetch("https://jsonplaceholder.typicode.com/users")

    //Podemos probar errores con el siguiente (simplemente indicando un link equivocado)
    // const response = await fetch("https://jsonplaceholder.xxxxxx")

    
    //Tranforma los datos a objetos/arrays JS y los vuelve usables
    const data = await response.json()

    //Sirve para actualizar la información
    users = data
        
    //Imprime en consola la info de los usuarios
    console.log(data)

    loading = false
    
    console.log("Usarios Listos")
    renderUsers()

    
    }
    catch(error) {
        lista.innerHTML = ""
        loading = false
        console.log("Error en recepción de información")
        showingError()
    }
}

function load () {
    const loadPage = document.createElement("p")
    loadPage.textContent="Cargando..."
    lista.appendChild(loadPage)
}



function showingError () {
    const showError = document.createElement("h2")
    showError.textContent = "Ups...Ha ocurrido un error"
    lista.appendChild(showError)
}


function renderUsers () {
    //Sirve para limpiar los datos antes de reenderizar
    lista.innerHTML = ""

    if (loading) {return load()}
    //Esto renderiza los usuarios dinamicamente en base a la data que tenemos
    users.forEach((user)=>{ 
        const li = document.createElement("li")
        li.textContent = user.username
        lista.appendChild(li)
        }
    )
}

button.addEventListener("click",loadUsers)

