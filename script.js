const URL = "https://personitas.azurewebsites.net/API/Personas/";

window.onload = getAll()

function addPersona() {
    // recogemos los campos y los almacenamos en persona
    var persona;
    persona.nombre = document.getElementById("nombre");
    persona.apellidos = document.getElementById("apellidos");
    persona.foto = document.getElementById("foto");
    persona.telefono = document.getElementById("telefono");
    persona.direccion = document.getElementById("direccion");
    persona.fechaNacimiento = document.getElementById("fechaNacimiento");
    persona.numeroDepartamento = document.getElementById("numeroDepartamento");

    console.log(persona);
}

function deletePersona(id, event) {
    if (confirm("¿Estás seguro de que quieres borrar esta persona?")){
        var client = new XMLHttpRequest();
        client.open("DELETE", URL + `${id}`)
        client.onreadystatechange = () => {
            if(client.readyState == 4 && client.status == 200) {
                alert(client.responseText);
                const fila = event.target.closest('tr');
                fila.remove();
            }
        }
        client.send();
    }
}

function getAll() {
    var client = new XMLHttpRequest();
    client.open("GET", URL);
    client.onreadystatechange = () => {
        if(client.readyState == 4 && client.status == 200){
            var personas = JSON.parse(client.responseText);
            var tbody = document.getElementById("tbody");
            for(var i = 0; i < personas.length; i++) {
                tbody.innerHTML += `<tr>
                <td>${personas[i].id}</td>
                <td>${personas[i].nombre}</td>
                <td>${personas[i].apellidos}</td>
                <td><img src="${personas[i].foto}" /></td>
                <td>${personas[i].telefono}</td>
                <td>${personas[i].direccion}</td>
                <td>${personas[i].fechaNacimiento}</td>
                <td>${personas[i].idDepartamento}</td>
                <td>
                    <button class="edit">Editar</button>
                    <button class="delete" onclick="deletePersona(${personas[i].id}, event)">Borrar</button>
                </td>
                </tr>`
            }
        }
    }
    client.send();
}