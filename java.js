let amigos = [];

let btnGuardar = document.querySelector("#btnGuardar");
let btnCancelar = document.querySelector("#btnCancelar");

let lista = document.querySelector(".listaAmigos");
let formulario = document.querySelector("#formulario");
let found;
// let arreglofor=Array.from(formulario);
// pintar();
function limpiar() {
    formulario[0].value = "";
    formulario[1].value = "";
    formulario[2].value = "";
    formulario[3].value = "";
}

var validation = "";

function validateForm() {
    validation = "";
    let estatus = true;
    let nombre = document.getElementById("nombre");
    let telefono = document.getElementById("telefono");
    let correo = document.getElementById("correo");
    let foto = document.getElementById("foto");
    if (nombre.value === "") {
        estatus = false;
    }
    if (telefono.value === "") {
        estatus = false;
    }
    if (correo.value === "") {
        estatus = false;
    }
    if (foto.value === "") {
        estatus = false;
    }
    return estatus;
}

function pintar() {
    if (amigos.length > 0) {
        lista.innerHTML = "";
        amigos.forEach((contacto, index) => {
            let amigo = document.createElement("div");
            amigo.innerHTML = `<p>${contacto.nombre}</p><button class="muestraDetalles"><input type="hidden" value="${contacto.telefono}" />Detalles</button><button class="eliminarContacto" indice="${index}">Borrar</button>`;
            lista.appendChild(amigo);
        });
        let botones = document.getElementsByClassName("muestraDetalles");
        for (let i = 0; i < botones.length; i++) {
            const element = botones[i];
            element.addEventListener("click", () => {
                showDetalles(element.children[0].value);
            });
        }
        botones = document.getElementsByClassName("eliminarContacto");
        for (let i = 0; i < botones.length; i++) {
            const element = botones[i];
            element.addEventListener("click", () => {
                amigos.splice(element.getAttribute("indice", 1));
                pintar();
            });
        }
    }
    else {
        lista.innerHTML = "<h2>No tenemos amigos</h2>";
    }
}
function showDetalles(tel) {
    let detalles = document.getElementById("detallesAmigo");
    let amigo = amigos.find(a => {
        if (a.telefono == tel) {
            return a;
        }
    })
    detalles.innerHTML = `<img src="${amigo.foto}" alt="">
    <h3>${amigo.nombre}</h3>
    <p><span>Telefono:</span>${amigo.telefono}</p>
    <p><span>Correo</span>${amigo.correo}</p>
    <button id="cerrar">Cerrar</button>`;
    detalles.classList.remove("oculto");

    let cerrar = document.getElementById("cerrar");
    cerrar.addEventListener("click", (event) => {
        detalles.classList.add("oculto");
    })
}

btnCancelar.addEventListener("click", (event) => {
    limpiar();
    event.preventDefault();
});

btnGuardar.addEventListener("click", (event) => {
    let campos = document.getElementById("campos");
    let mal = document.getElementById("mal");
    contacto = {
        nombre: formulario["nombre"].value,
        telefono: formulario["telefono"].value,
        correo: formulario["correo"].value,
        foto: formulario["foto"].value
    };
    found = amigos.find(prueba => {
        if (prueba.telefono == formulario[1].value) {
            // repetido.innerHTML=`<h3>numero repetido</h3>`;
            return prueba;
        }
    })
    console.log(found);
    if (found) {
        mal.innerHTML = "Numero repetido"
        mal.classList.remove("oculto");
    }
    else {
        campos.classList.add("oculto");
        mal.classList.add("oculto");
        let resultado = validateForm();
        if (resultado) {
            amigos.push(contacto);
            limpiar();
            pintar();
        }
        else {
            campos.innerHTML = "faltan campos por llenar";
            campos.classList.remove("oculto");
        }
        console.log("NO hay alguien con ese telefono");
    }

    event.preventDefault();
})
