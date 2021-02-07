//Función para obtener datos de una API esperando un resultado.
async function getRazas() {
    try {
        let respuesta = await fetch("https://dog.ceo/api/breeds/list/all");
        let datos = await respuesta.json();
        listaRazas(datos.message);
    } catch (error) {
        errorCargando();
    }
}
getRazas();

//función para visualizar mensaje de error al realizar el Fetch
function errorCargando() {
    alert("Parece que no ha cargado lo que estabas buscando.")
    let loading = crearNodo("img", (""), [], [{
        name: "src",
        value: "./img/error.jpg"
    }]);
    document.body.appendChild(loading);
}

//recibo la lista de razas del Json y lo convierto en una lista (select) para su selección.
function listaRazas(jsonRazas) {
    //creo dentro del div "raza" una lista desplegable con las razas enviadas por la DOG API
    let raza = document.getElementById("raza");
    let selectRaza = crearNodo("select", "", [], [{
        name: `onchange`,
        value: "cargarImg(this.value)"
    }]);
    selectRaza.innerHTML = `<option>Elija una raza de perro</option>
    ${Object.keys(jsonRazas).map(function (raza) {
        return `<option>${raza}</option>`
    }).join('')}`
    raza.appendChild(selectRaza);
}

//función asincrona porque no sabemos si devolverá algo o no
//Función para mostrar por raza la imagen de un perrito lindo.
async function cargarImg(raza) {
    try {
        if (raza != "Elija una raza de perro") {
            //Pido los datos por la raza y muestro la imagen por la raza especificada, cambiando el link
            const respuesta = await fetch(`https://dog.ceo/api/breed/${raza}/images/random`);
            const datos = await respuesta.json();
            let divFoto = document.getElementById("foto");
            let foto = crearNodo("img", (""), [], [{name: "src",value: `${datos.message}`}]);
            divFoto.appendChild(foto);
        }
    } catch (error) {
        errorCargando();
    }
   
}

//función "estándar" de crear nodos con tipo de nodo, lo de dentro del nodo, aplicarle clases y atributos.(si fuese necesario).
function crearNodo(tipoNodo, textoNodo, clasesNodo, atributos) {

    let nodo = document.createElement(tipoNodo);

    if (textoNodo != "" && textoNodo != null) {
        nodo.appendChild(document.createTextNode(textoNodo));
    }
    if (clasesNodo.length > 0) {
        clasesNodo.forEach(clase => nodo.classList.add(clase));
    }
    if (atributos.length > 0) {
        atributos.forEach(atributo => nodo.setAttribute(atributo.name, atributo.value));
    }
    return nodo;
}

//función para borrar nodos
function borrarNodos(nodo) {
    while (nodo.firstChild) {
        nodo.removeChild(nodo.lastChild);
    }
}