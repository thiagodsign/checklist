var nomeDoBanco = 'checklist/'
var lista = [];
var inputComONome = document.querySelector('#item');

capturarUrlDoSite()

function capturarUrlDoSite() {
  var estaEmAmbienteDeProducao = location.href.indexOf('thiagodsign') >= 1;
  if (!estaEmAmbienteDeProducao) nomeDoBanco = 'devChecklist/';
}

function obterLista() {
  firebase.database().ref(nomeDoBanco).once('value').then(function (snapshot) {
    lista = (snapshot.val() && snapshot.val());
  }).then(() => construirLista());
}

obterLista()

function criarItemNoChecklist() {
  var idDoItem;
  if (!lista) {
    idDoItem = 1;
  } else idDoItem = lista.length;


  firebase.database().ref(nomeDoBanco + idDoItem).set({
    itemDaLista: inputComONome.value,
    marcado: false,
    id: idDoItem
  }).then(() => {
    atualizarLista()
    inputComONome.value = ''
  })
  return false
}

function apagarTudo() {
  firebase.database().ref(nomeDoBanco).set(null).then(() => location.reload());
}

function atualizarLista() {
  firebase.database().ref(nomeDoBanco).once('value').then(function (snapshot) {
    lista = (snapshot.val() && snapshot.val());
  }).then(() => criarListaDeItens(lista[lista.length - 1].itemDaLista, lista[lista.length - 1].id));
  inputComONome.focus();
}

function construirLista() {
  if (lista) {
    lista.forEach(item => {
      criarListaDeItens(item.itemDaLista, item.id);
    })
    marcarListaAoIniciar()
  }
}

function criarListaDeItens(checkListTexto, id) {
  const main = document.getElementById('lista1')
  const elemento = document.createElement('LABEL')
  const input = document.createElement('INPUT')
  var texto = document.createTextNode(checkListTexto)

  elemento.classList.add('formulario__checkbox-container')
  elemento.appendChild(input)
  elemento.appendChild(texto)
  input.setAttribute('type', 'checkbox')
  input.setAttribute('value', id)
  input.setAttribute('onclick', 'marcarLista(this)')
  main.appendChild(elemento)
}

function desmarcarTodos() {
  var lista = document.querySelectorAll('.formulario__checkbox-container input');
  lista.forEach(itemDaLista => {
    itemDaLista.checked = false;
    firebase.database().ref(nomeDoBanco + itemDaLista.value).update({
      marcado: false
    });
  });
}

function marcarLista(checkbox) {
  if (checkbox.checked) {
    firebase.database().ref(nomeDoBanco + checkbox.value).update({
      marcado: true
    });
  } else {
    firebase.database().ref(nomeDoBanco + checkbox.value).update({
      marcado: false
    });
  }
}

function marcarListaAoIniciar() {
  lista.forEach(item => {
    if (item.marcado) {
      document.querySelector(`input[value='${item.id}']`).checked = true;
    }
  })
}