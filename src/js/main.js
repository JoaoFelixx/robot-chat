class Site {

  welcome() {
    document.getElementById('welcome').innerHTML = `Olá ${localStorage.getItem("username")} !`;
  }

  createUser() {
    let name = prompt('Digite seu nome !');
    name == null || name == '' ? name = 'Usuario' : true;
    localStorage.setItem("username", name);
    document.getElementById('welcome').innerHTML = `Olá ${localStorage.getItem("username")}`;
  }

  createMessagesInTheScreen(divMain, send) {
    divMain.insertAdjacentHTML("beforeend", `<div class="box-right" id="user">${send}</div>`);
    divMain.insertAdjacentHTML("beforeend", '<div class="box-left"  id="robot"></div>');
  }

  RemoveElements() {
    document.getElementById('user').removeAttribute('id');
    document.getElementById('userSend').value = "";
  }

  async robotResponse(message, database) {
    await fetch(database)
      .then(value => value.json())
      .then(data => {
        const response = document.getElementById('robot');
        if (data[message] == undefined)
          return response.innerHTML = 'Não entendi';

        response.innerHTML = data[message];
        response.removeAttribute('id');
      })
      .catch(err => {
        console.warn(`Erro na conexão: ${err}`);
      })
  }
}

const mySite = new Site();

window.onload = () => localStorage.getItem("username") ? mySite.welcome() : mySite.createUser();

document.getElementById('send').onclick = () => {
  const message = document.getElementById('userSend').value;
  const messageToRobot = message.toLowerCase().replace(/\s/g, '');

  mySite.createMessagesInTheScreen(document.getElementById('divMain'), message);
  mySite.RemoveElements();

  if (message.indexOf('?') > 0) 
    mySite.robotResponse(messageToRobot, 'https://joaofelixx.github.io/database/Robot_req.json');
  else
    mySite.robotResponse(messageToRobot, 'https://joaofelixx.github.io/database/Robot_res.json');
}
