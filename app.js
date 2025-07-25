let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector("input").value.trim();
  let paragrafoVazio = document.getElementById("vazio");
  focoNoInput();
  if (chute === "") {
    paragrafoVazio.innerHTML = "Campo vazio! Digite um número";
    paragrafoVazio.style.color = "red";
    paragrafoVazio.style.display = "block";
    return;
  }

  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você descobriu o número secreto! com ${tentativas} ${palavraTentativa}`;
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior");
    }
    tentativas += 1;
    limparCampo();
  }
  document.querySelector("input").addEventListener("input", () => {
    let paragrafoVazio = document.getElementById("vazio");
    paragrafoVazio.innerHTML = "";
    paragrafoVazio.style.display = "none";
  });
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio(); //Executa a função novamente para gerar um novo número
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona ao final da lista o número gerado/escolhido
    console.log(listaDeNumerosSorteados);

    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
  focoNoInput();
}

function focoNoInput() {
  let meuInput = document.querySelector("input");
  meuInput.focus();
}
