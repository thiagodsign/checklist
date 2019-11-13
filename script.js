marcarListaAoIniciar();

function criarItemNoChecklist() {
  firebase.database().ref('/').once('value').then(function (snapshot) {
    var listaDeItens = (snapshot.val() && snapshot.val().Itens);
    var idDoItem;

    if (!listaDeItens) {
      idDoItem = 1;
    } else idDoItem = listaDeItens.length;
    var nomeDoItem = document.querySelector('#item').value;

    firebase.database().ref('Itens/' + idDoItem).set({
      itemDaLista: nomeDoItem,
      marcado: false,
      id: idDoItem
      // .then(criarListaDeItens(nomeDoItem, idDoItem))
    });
  });
  setTimeout(() => {
    location.reload();
  }, 200);
}

firebase.database().ref('/').once('value').then(function (snapshot) {
  lista1 = (snapshot.val() && snapshot.val().Itens);

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
    firebase.database().ref('Itens/' + itemDaLista.value).update({
      marcado: false
    });
  });
}

function marcarLista(checkbox) {
  if (checkbox.checked) {
    firebase.database().ref('Itens/' + checkbox.value).update({
      marcado: true
    });
  } else {
    firebase.database().ref('Itens/' + checkbox.value).update({
      marcado: false
    });
  }
}

function marcarListaAoIniciar() {
  firebase.database().ref('/').once('value').then(function (snapshot) {
    var itensDoFB = (snapshot.val() && snapshot.val().Itens);
    itensDoFB.forEach(item => {
      if (item.marcado) {
        document.querySelector(`input[value='${item.id}']`).checked = true;
      }
    })
  });
}
