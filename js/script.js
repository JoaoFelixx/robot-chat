window.onload = start;

async function start() { // cria um nome fixo para usuario
  if (localStorage.getItem("username")) {
    document.getElementById('welcome').innerHTML = `Olá ${localStorage.getItem("username")} !`;
    return true
  }

  let name = prompt('Digite seu nome !');

  if (name == null || name == '') {
    name = 'Usuario'
  }
  if (name.length < 4) {
    alert('Usuario não pode ter menos de 4 caracteres')
  }

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
    throw console.warn('Erro ao ler arquivo .json');
  }

}

//--------------

async function startRobot(database) { // pega o array anterior por uma promise
  return await connectionWithRobot(database);
}

//----------------

document.getElementById('send').onclick = async () => {
  const message        = document.getElementById('userSend').value;
  const messageToRobot = message.toLowerCase().replace(/\s/g, '');

  cleanAndCreate(message)
  robotRequest(messageToRobot);
}

async function cleanAndCreate(send) {
  const divMain = document.getElementById('divMain')
  divMain.insertAdjacentHTML("beforeend", '<div id="user"></div>');
  divMain.insertAdjacentHTML("beforeend", '<div id="robot"></div>');
  document.getElementById('userSend').value = "";


  const divUser        = document.getElementById('user');
  const divRobot       = document.getElementById('robot');
  divRobot.setAttribute('class', 'box-left');
  divUser.setAttribute("class", "box-right");
  divUser.innerHTML = send;
}

// ----------------

async function robotResponse(message) { // recebe o valor em array das resposta do robo
  const robot = await startRobot('../database/Robot_res.json')
    .then(resolve => {

      document.getElementById('robot').innerHTML = resolve[message];

    })
    .catch(error => console.warn('failed connection', error))
}

//--------------------

async function robotRequest(message) { // recebe o valor em array das perguntas do robo
  const robot = await startRobot('../database/Robot_req.json')
    .then(resolve => {

      document.getElementById('robot').innerHTML = resolve[message];

    })
    .catch(error => console.warn('failed connection', error))
}

