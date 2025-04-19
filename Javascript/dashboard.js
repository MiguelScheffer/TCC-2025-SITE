const mensagens = ["bora exercitar?", "tá gordo, bora se mecher?", "caga mole"];

const mensagemAleatoria =
  mensagens[Math.floor(Math.random() * mensagens.length)];

document.querySelector(".headerMensagemDiaria").textContent +=
  mensagemAleatoria;
