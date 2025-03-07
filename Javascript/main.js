// Movimentação da imagem de fundo do header
window.addEventListener("scroll", function () {
  const mainHeader = document.querySelector(".mainHeader");
  let scrollPosition = window.pageYOffset;
  mainHeader.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});
