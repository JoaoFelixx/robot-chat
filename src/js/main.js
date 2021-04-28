window.onload = () => localStorage.getItem("username") ? welcome() : createUser();

function welcome() {
  document.getElementById('welcome').innerHTML = `Olá ${localStorage.getItem("username")} !`;
}

function createUser() {
  let name = prompt('Digite seu nome !');
  name == null || name == '' ? name = 'Usuario' : true;
  localStorage.setItem("username", name);
  document.getElementById('welcome').innerHTML = `Olá ${localStorage.getItem("username")}`;
}

function RemoveElements() {
  document.getElementById('user').removeAttribute('id');
  document.getElementById('userSend').value = "";
}

function createMessagesInTheScreen(send) {
  const divMain = document.getElementById('divMain');
  divMain.insertAdjacentHTML("beforeend", `<div class="box-right" id="user">${send}</div>`);
  divMain.insertAdjacentHTML("beforeend", '<div class="box-left"  id="robot"></div>');
  RemoveElements()
}

document.getElementById('send').onclick = () => {
  const res = '../../database/Robot_res.json';
  const req = '../../database/Robot_req.json';
  const message = document.getElementById('userSend').value;
  const messageToRobot = message.toLowerCase().replace(/\s/g, '');
  createMessagesInTheScreen(message);

  message.indexOf('?') > 0 ? robotResponse(messageToRobot, req) : robotResponse(messageToRobot, res);
}

async function robotResponse(message, database) {
  console.time()
  try {
    const connection = await fetch(database);
    const json = await connection.json();
    const response = document.getElementById('robot');
    if (json[message] == undefined)
      return response.innerHTML = 'Não entendi';

    response.innerHTML = json[message];
    response.removeAttribute('id');
  }
  catch (err) {
    console.warn('erro:' + err)
  }
  console.timeEnd()
}