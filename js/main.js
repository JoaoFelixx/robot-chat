window.onload = () => {
  if (localStorage.getItem("username")) {
    document.getElementById('welcome').innerHTML = `Olá ${localStorage.getItem("username")} !`;
    return true;
  }

  let name = prompt('Digite seu nome !');

  name == null || name == '' ? name = 'Usuario' : true;

  localStorage.setItem("username", name);
  document.getElementById('welcome').innerHTML = `Olá ${localStorage.getItem("username")}`;
}


// --------------

async function connectionWithRobot(database) { // transforma o json em Array para interação com usuario
  try {
    const acess = await fetch(database);
    const result = await acess.json();
    return await result;
  }
  catch (error) {
    throw console.error('Erro ao ler arquivo .json', error);
  }

}

//--------------

async function startRobot(database) { // pega o array anterior por uma promise
  return await connectionWithRobot(database);
}

//----------------

document.getElementById('send').onclick = async () => {
  const message = document.getElementById('userSend').value;
  const messageToRobot = message.toLowerCase().replace(/\s/g, '');

  create(message);

  if (message.indexOf('?') > 0)
    await robotResponse(messageToRobot, '../database/Robot_req.json');

  else if (message.indexOf('conta:') > 0)
    await robotMath(messageToRobot, '../database/Robot_math.json');

  else
    await robotResponse(messageToRobot, '../database/Robot_res.json')

}

function create(send) {
  const divMain = document.getElementById('divMain');
  divMain.insertAdjacentHTML("beforeend", `<div class="box-right" id="user">${send}</div>`);
  divMain.insertAdjacentHTML("beforeend", '<div class="box-left"  id="robot"></div>');
  clear()
  return true
}

function clear() {
  document.getElementById('user').removeAttribute('id');
  document.getElementById('userSend').value = "";
  return true
}

// ----------------

async function robotResponse(message, database) { // recebe o valor em array das resposta do robo
  const robot = await startRobot(database)
    .then(resolve => {
      const response = document.getElementById('robot');
      if (resolve[message] == undefined)
        return response.innerHTML = 'Não entendi';

      response.innerHTML = resolve[message];
      response.removeAttribute('id');

    })
    .catch(error => console.warn('failed connection', error))
}