var nomeDoBanco = '';
capturarUrlDoSite()

//Marca os itens conforme o bd
marcarListaAoIniciar();

function capturarUrlDoSite() {
  var estaEmAmbienteDeProducao = location.href.indexOf('thiagodsign') >= 1;
  nomeDoBanco = estaEmAmbienteDeProducao ? 'checklist/' : 'devChecklist/'
}

function criarItemNoChecklist() {
  firebase.database().ref(nomeDoBanco).once('value').then(function (snapshot) {
    var listaDeItens = (snapshot.val() && snapshot.val());
    var idDoItem;
    if (!listaDeItens) {
      idDoItem = 1;
    } else idDoItem = listaDeItens.length;

    var inputComONome = document.querySelector('#item');

    firebase.database().ref(nomeDoBanco + idDoItem).set({
      itemDaLista: inputComONome.value,
      marcado: false,
      id: idDoItem
    }).then(() => {
      atualizarLista()
      inputComONome.value = ''
    })
  });
}

function atualizarLista() {
  firebase.database().ref(nomeDoBanco).once('value').then(function (snapshot) {
    var listaDeItens = (snapshot.val() && snapshot.val());
    criarListaDeItens(listaDeItens[listaDeItens.length - 1].itemDaLista, listaDeItens[listaDeItens.length - 1].id);
  });
}

firebase.database().ref(nomeDoBanco).once('value').then(function (snapshot) {
  lista1 = (snapshot.val() && snapshot.val());

  if (lista1) {
    lista1.forEach(item => {
      criarListaDeItens(item.itemDaLista, item.id);
    });
  }
});


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
  firebase.database().ref(nomeDoBanco).once('value').then(function (snapshot) {
    itensDoFB = (snapshot.val() && snapshot.val());

    if (itensDoFB) {
      itensDoFB.forEach(item => {
        if (item.marcado) {
          document.querySelector(`input[value='${item.id}']`).checked = true;
        }
      })
    }
  });
}
