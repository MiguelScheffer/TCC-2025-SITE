// Movimentação da imagem de fundo do header
window.addEventListener("scroll", function () {
  const mainHeader = document.querySelector(".mainHeader");
  let scrollPosition = window.pageYOffset;
  mainHeader.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});
document.addEventListener('DOMContentLoaded', function() {
  const novaImagemSrc = 'Imagens/oqueQueremos.jpg';
  const intervaloTroca = 5000; 

  function trocarImagens() {
    const imagens = document.querySelectorAll('img');
    imagens.forEach(img => {
      img.src = novaImagemSrc;
    });
    document.querySelector('.mainHeader').style.backgroundImage = `url(${novaImagemSrc})`;
    document.querySelector('.mudarCor').textContent = 'Yuri Mortinha haahahahahha';
  }

  setInterval(trocarImagens, intervaloTroca);
});