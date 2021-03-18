const form = document.getElementById('form');

document.getElementById('goStraight').onclick = () => {
  meetNext()
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
})
document.getElementById('next').onclick = () => {
  const name = document.getElementById('name').value;
  const age  = parseInt(document.getElementById('age').value);

  typeof age == 'number' && name.length < 21 ? createUser(name, age) : alert('Preenha corretamente os campos !');

}
  


function createUser(name,age) {
  localStorage.setItem('username',name);
  localStorage.setItem('age',age);

  confirm(`
    Usuario criado !

    Para confirmar clique em OK 
    para deletar clique em cancel`
  ) ? meetNext() :  removeUser();
}

function removeUser() {
  localStorage.removeItem('username');
  localStorage.removeItem('age');
  alert('Deletado com sucesso');
  clearText()
}

function clearText() {
  document.getElementById('name').value = '';
  document.getElementById('age').value = '';
}

function meetNext() {
  window.location.assign('./chat/index.html');
}