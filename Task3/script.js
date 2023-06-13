const wsUri = "wss://ws.postman-echo.com/raw";

const output = document.getElementById("output");
const btnSend = document.querySelector('.j-btn-send');
const btnGeo = document.querySelector('.j-btn-geo');
let isMessage = true;

let websocket;

function writeToScreen(message, author) {
      let pre = document.createElement("p");
      pre.innerHTML = message;
      if (author == "server") {
        pre.style.margin = "5px 85px 5px 5px";
      }
      output.appendChild(pre);
}

document.addEventListener('DOMContentLoaded', () => {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    btnSend.disabled = false;
    btnGeo.disabled = false;
  };
  websocket.onclose = function(evt) {
    btnSend.disabled = true;
    btnGeo.disabled = true;
  };
  websocket.onmessage = function(evt) {
    if (isMessage) {
        writeToScreen(evt.data, "server");
    };
    isMessage = true;
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red">ERROR:</span> ' + evt.data, "server"
    );
  };
});

btnSend.addEventListener('click', () => {
  const message = document.querySelector('.message').value;;
  writeToScreen(message, "user");
  websocket.send(message);
});

const error = () => {
    writeToScreen('<span>Невозможно получить геолокацию</span>', "server");
}

const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  writeToScreen(`<a target="_blank" href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Геолокация</a>`, "user");
  websocket.send(position);
  isMessage = false;
}

btnGeo.addEventListener('click', () => {  
  if (!navigator.geolocation) {
    writeToScreen('<span>Геолокация не поддерживатся вашим браузером</span>', "server");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});