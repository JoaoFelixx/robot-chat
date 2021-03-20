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


async function connectionWithRobot(database) { // transforma o json em Array para interação com usuario
  try {
    const acess = await fetch(database);
    return await acess.json();
  }
  catch (error) {
    throw new Error('Erro ao ler arquivo .json', error);
  }

}

document.getElementById('send').onclick = async () => { // função que determina quem vai responder o usuario
  const message = document.getElementById('userSend').value;
  const messageToRobot = message.toLowerCase().replace(/\s/g, '');

  createElements(message);

  await message.indexOf('?') > 0 ? robotResponse(messageToRobot, '../database/Robot_req.json') : robotResponse(messageToRobot, '../database/Robot_res.json');
}

function createElements(send) {
  const divMain = document.getElementById('divMain');
  divMain.insertAdjacentHTML("beforeend", `<div class="box-right" id="user">${ send }</div>`);
  divMain.insertAdjacentHTML("beforeend", '<div class="box-left"  id="robot"></div>');
    RemoveElements()
      return true
}

function RemoveElements() {
  document.getElementById('user').removeAttribute('id');
  document.getElementById('userSend').value = "";
    return true
}

// ----------------

async function robotResponse(message, database) { // recebe o valor em array das resposta do robo
  await connectionWithRobot(database)
    .then(resolve => {
      const response = document.getElementById('robot');
      if (resolve[message] == undefined)
        return response.innerHTML = 'Não entendi';

      response.innerHTML = resolve[message];
      response.removeAttribute('id');

    })
    .catch(error => console.warn('failed connection', error))
}