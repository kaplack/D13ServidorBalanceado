// Configurar username

let username = sessionStorage.getItem("username");
if (username == null) {
  username = prompt("Insert username");
  sessionStorage.setItem("username", username);
}

document.getElementById("username").innerHTML = `Welcome ${username}`;
const socket = io();
loadFirstData();

// Configuramos el envio de mensajes
const btnSend = document.getElementById("send");
btnSend.onclick = (e) => {
  e.preventDefault();
  const id = document.getElementById("email").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const edad = document.getElementById("edad").value;
  const alias = document.getElementById("alias").value;
  const avatar = document.getElementById("avatar").value;
  const msn = document.getElementById("msn").value;

  socket.emit("chat-in", {
    author: { id, nombre, apellido, edad, alias, avatar },
    text: msn,
  });
};

socket.on("chat-out", (data) => {
  addDataToDiv(data);
});

// Muestra en la pagina un solo mensaje
function addDataToDiv(data) {
  const div = document.getElementById("chat");
  div.innerHTML += `<br>[${data.date}] <b>${data.author.id}</b>: <i>${data.text}</i>`;
}

// Recupera todos los mensajes a la pagina
function loadDataToDiv(data) {
  //console.log(data);
  data.forEach((d) => addDataToDiv(d));
}

// Para cargar la data por primera vez
function loadFirstData() {
  fetch("./public/db/db.json")
    .then((data) => data.json())
    .then((d) => {
      loadDataToDiv(d);
    })
    .catch((e) => console.log("error al cargar", e));
}
