lista1 = ['Cadastrar processo (usuário global e usuário escola)',
  'Anexar Documento',
  'Solicitar assinatura',
  'Tornar sem efeito',
  'Visualizar documento original',
  'Histórico de Assinaturas',
  'Criar impedimento',
  'Resolver impedimento',
  'Visualizar documentos',
  'Baixar partes do processo',
  'Baixar todo o processo',
  'Solicitar parecer de um documento do processo',
  'Solicitar parecer anexando um documento',
  'Solicitar Parecer do processo',
  'Alterar tipo de processo',
  'Incluir/Excluir interessado',
  'Visualizar como fluxo',
  'Pesquisar por tipo de processo no fluxo',
  'Alterar status',
  'Alterar status no fluxo',
  'Configurar notificações'
]

lista2 = ['Assinar documento dentro do despacho',
  'Recusar despacho de parecer',
  'Cancelar solicitação de assinatura',
  'Recusar despacho de assinatura',
  'Anexar documento de Parecer (enviar e finalizar) – do process documento',
  'Visualizar documentos do processo pelo despacho',
  'Botão “Ir para o processo”'
]

lista3 = ['Gerenciar setores',
  'Cadastrar setor',
  'Adicionar processo a um setor',
  'Remover processo de um setor',
  'Cadastrar usuário',
  'Gerenciar setores',
  'Cadastrar setor',
  'Adicionar processo a um setor',
  'Remover processo de um setor',
  'Cadastrar usuário'
]

lista4 = ['Consultar documento',
  'Esqueci minha senha'
]

window.onload = function () {
  lista1.forEach(item => {
    criarListaDeItens(item, 'lista1');
  });

  lista2.forEach(item => {
    criarListaDeItens(item, 'lista2');
  });

  lista3.forEach(item => {
    criarListaDeItens(item, 'lista3');
  });

  lista4.forEach(item => {
    criarListaDeItens(item, 'lista4');
  });

  marcarLista();
}


function criarListaDeItens(checkListTexto, divInclude) {
  const hashCode = s => s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0)
  var hash = hashCode(checkListTexto)
  var id = Math.abs(hash)

  const main = document.getElementById(divInclude)
  const elemento = document.createElement('LABEL')
  const input = document.createElement('INPUT')
  var texto = document.createTextNode(checkListTexto)

  elemento.classList.add('formulario__checkbox-container')
  elemento.appendChild(input)
  elemento.appendChild(texto)
  input.setAttribute('type', 'checkbox')
  input.setAttribute('name', id)
  main.appendChild(elemento)
}

function desmarcarTodos() {
  localStorage.clear()
  var lista = document.querySelectorAll('.formulario__checkbox-container input');
  lista.forEach(itemDaLista => {
    itemDaLista.checked = false;
  });
}

function marcarLista() {
  var lista = document.querySelectorAll('.formulario__checkbox-container input');

  lista.forEach(itemDaLista => {
    var nomeDoItem = itemDaLista.name;
    itemDaLista.addEventListener('change', () => {
      if (localStorage.getItem(nomeDoItem)) {
        localStorage.removeItem(nomeDoItem)
      } else localStorage.setItem(nomeDoItem, ' marcado')
    })

    if (localStorage.getItem(nomeDoItem)) {
      itemDaLista.checked = true;
    } else itemDaLista.checked = false;
  });
}
