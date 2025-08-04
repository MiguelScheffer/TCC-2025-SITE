document.addEventListener("DOMContentLoaded", function () {
  const headerMensagemElement = document.querySelector(".headerMensagemDiaria");
  const mensagens = [
    "Bora exercitar?",
    "Tá gordo, bora se mecher?",
    "Sayori morta kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
    "Vamos treinar hoje?",
    "Que tal um treino rápido?",
    "Hora de suar!",
  ];
  const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
  headerMensagemElement.textContent = mensagemAleatoria;

  const exerciseCardsSection = document.querySelector(".exerciseCards");
  const loadingMessage = document.getElementById("loadingMessage");
  const workoutsApiUrl = "../PHP/api/obterExercicios.php";

  async function loadWorkouts() {
    try {
      if (loadingMessage) {
        loadingMessage.remove();
      }

      const response = await fetch(workoutsApiUrl);
      if (!response.ok) {
        let errorData = { error: 'Erro desconhecido' };
        try {
          errorData = await response.json();
        } catch (e) {
          console.error('Resposta de erro de workouts não é JSON:', await response.text());
        }

        if (response.status === 401) {
          alert(errorData.error || 'Sua sessão expirou ou você não está autenticado. Redirecionando para o login.');
          window.location.href = '../HTML/login.html';
          return;
        }

        throw new Error(`Erro ao carregar dados de treinos: Status ${response.status}. ${errorData.error || 'Resposta inválida do servidor.'}`);
      }

      const treinos = await response.json();
      if (treinos.error) {
        exerciseCardsSection.innerHTML += `<p>Erro ao carregar treinos: ${treinos.error}</p>`;
        console.error('Erro retornado no JSON de treinos:', treinos.error);
        return;
      }

      if (treinos.length === 0) {
        exerciseCardsSection.innerHTML += '<p>Você ainda não criou nenhum treino. Clique no botão "Adicionar Treino" abaixo para começar!</p>';
      } else {
        const swiperWrapper = document.querySelector(".swiper-wrapper");

        treinos.forEach(treino => {
          const slideDiv = document.createElement("div");
          slideDiv.classList.add("swiper-slide");

          const cardDiv = document.createElement("div");
          cardDiv.classList.add("card");

          const imageDiv = document.createElement("div");
          imageDiv.classList.add("image", "imageDefault");
          cardDiv.appendChild(imageDiv);

          const cardInfoDiv = document.createElement("div");
          cardInfoDiv.classList.add("card-info");

          const spanNome = document.createElement("span");
          spanNome.textContent = treino.nome_treino;
          cardInfoDiv.appendChild(spanNome);

          const pExercicios = document.createElement("p");
          pExercicios.textContent = `${treino.total_exercicios} exercícios`;
          cardInfoDiv.appendChild(pExercicios);

          cardDiv.appendChild(cardInfoDiv);

          const buttonLink = document.createElement("a");
          buttonLink.href = `../PHP/iniciarTreino.php?treino_id=${treino.ID_TREINO}`;
          buttonLink.classList.add("button");
          buttonLink.textContent = "Fazer treino";
          cardDiv.appendChild(buttonLink);

          slideDiv.appendChild(cardDiv);
          swiperWrapper.appendChild(slideDiv);
        });

        new Swiper(".swiper", {
          loop: false,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          scrollbar: {
            el: ".swiper-scrollbar",
          },
          slidesPerView: 1,
          spaceBetween: 20,
          breakpoints: {
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          },
        });
      }
    } catch (error) {
      console.error("Erro ao carregar treinos:", error);
      exerciseCardsSection.innerHTML += `<p>Ocorreu um erro ao carregar seus treinos. Por favor, tente novamente mais tarde.</p>`;
    }
  }

  loadWorkouts();
});
