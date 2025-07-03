// Javascript/iniciarTreino.js

document.addEventListener("DOMContentLoaded", function () {
    // 1. Desestruturação para obter referências do DOM de forma mais concisa
    const elements = {
        workoutTitle: document.getElementById("workout-title"),
        timerDisplay: document.getElementById("timer-display"),
        currentExerciseName: document.getElementById("current-exercise-name"),
        currentExerciseDetails: document.getElementById("current-exercise-details"),
        startButton: document.getElementById("start-button"),
        nextButton: document.getElementById("next-button"),
        prevButton: document.getElementById("prev-button"),
        pauseResumeButton: document.getElementById("pause-resume-button"),
        resetButton: document.getElementById("reset-button"),
        finishWorkoutButton: document.getElementById("finish-workout-button"),
        workoutMessage: document.getElementById("workout-message"),
        abortedWorkoutMessage: document.getElementById("aborted-workout-message"),
        workoutCompletedMessage: document.getElementById("workout-completed-message"), // Mantido por clareza, mas não será exibido diretamente
        exerciseListDiv: document.getElementById("exercise-list"),
        loadingExercisesMessage: document.getElementById("loading-exercises-message"),
    };

    // Variáveis de estado
    let exercises = [];
    let currentExerciseIndex = 0;
    let timeLeft = 0;
    let timerInterval;
    let isPaused = false;
    let currentWorkoutId = null;
    let currentWorkoutName = '';

    // --- Funções Auxiliares ---

    // 2. Função para centralizar a visibilidade dos controles
    function setControlVisibility(state = 'initial') {
        // Esconde tudo por padrão
        Object.values(elements).forEach(el => {
            if (el && el.style && el.id !== 'workout-title' && el.id !== 'exercise-list' && el.id !== 'loading-exercises-message') {
                el.style.display = 'none';
            }
        });

        elements.loadingExercisesMessage.style.display = 'none'; // Sempre esconde a mensagem de loading

        switch (state) {
            case 'initial':
                elements.startButton.style.display = exercises.length > 0 ? 'inline-block' : 'none';
                elements.timerDisplay.textContent = "--:--";
                elements.currentExerciseName.textContent = exercises.length > 0 ? "Clique em 'Iniciar Treino' para começar!" : "";
                elements.currentExerciseDetails.textContent = "";
                break;
            case 'active':
                elements.prevButton.style.display = (currentExerciseIndex > 0) ? 'inline-block' : 'none';
                elements.nextButton.style.display = (currentExerciseIndex < exercises.length - 1) ? 'inline-block' : 'none';
                elements.finishWorkoutButton.style.display = 'inline-block';
                break;
            case 'timer_active': // Quando um exercício de tempo está rodando
                elements.pauseResumeButton.style.display = 'inline-block';
                elements.resetButton.style.display = 'inline-block';
                break;
            case 'workout_completed':
                elements.timerDisplay.textContent = "00:00";
                elements.currentExerciseName.textContent = "Treino Concluído!";
                elements.currentExerciseDetails.textContent = "Parabéns! Você completou todos os exercícios.";
                elements.workoutMessage.style.display = 'block'; // Mostra a mensagem de sucesso
                break;
            case 'workout_aborted':
                elements.timerDisplay.textContent = "00:00";
                elements.currentExerciseName.textContent = "Treino Finalizado";
                elements.currentExerciseDetails.textContent = "Você encerrou o treino antes do tempo.";
                elements.abortedWorkoutMessage.style.display = 'block'; // Mostra a mensagem de abortado
                break;
        }
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        elements.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function highlightExercise(index) {
        // Remover destaque do anterior
        document.querySelectorAll('#exercise-list li').forEach((el, idx) => {
            el.style.fontWeight = 'normal';
            el.style.color = 'initial';
        });
        // Destacar o atual
        const currentExerciseElement = document.getElementById(`exercise-${index}`);
        if (currentExerciseElement) {
            currentExerciseElement.style.fontWeight = 'bold';
            currentExerciseElement.style.color = '#007bff';
        }
    }

    function startTimer() {
        clearInterval(timerInterval);
        isPaused = false;
        elements.pauseResumeButton.textContent = "Pausar";

        timerInterval = setInterval(() => {
            if (!isPaused) {
                timeLeft--;
                updateTimerDisplay();

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    alert(`Tempo do exercício ${exercises[currentExerciseIndex].NOME} concluído!`);
                    // Não avança automaticamente; usuário deve clicar "Avançar"
                }
            }
        }, 1000);
    }

    // --- Funções Principais ---

    async function fetchWorkoutData() {
        try {
            const response = await fetch('../PHP/api/obterDadosTreino.php'); // Verifique o nome do arquivo PHP
            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 401) {
                    alert(errorData.error || 'Sua sessão expirou ou você não está autenticado. Redirecionando para o login.');
                    window.location.href = '../HTML/login.html';
                } else {
                    throw new Error(errorData.error || `Erro ao carregar dados do treino: ${response.statusText}`);
                }
            }
            const data = await response.json();

            currentWorkoutId = data.id_treino;
            currentWorkoutName = data.nome_treino;
            exercises = data.exercicios;

            elements.workoutTitle.textContent = `Treino: ${currentWorkoutName}`;
            document.title = `Iniciar Treino: ${currentWorkoutName}`;

            displayInitialState();
        } catch (error) {
            console.error("Erro ao carregar dados do treino:", error);
            elements.exerciseListDiv.innerHTML = `<p>Ocorreu um erro ao carregar seus treinos. Por favor, tente novamente mais tarde.</p>`;
            elements.loadingExercisesMessage.style.display = 'none';
            elements.startButton.style.display = 'none';
        }
    }

    function displayCurrentExercise() {
        clearInterval(timerInterval);
        isPaused = false;
        elements.pauseResumeButton.textContent = "Pausar";

        // Se todos os exercícios foram concluídos, exibe o estado final
        if (currentExerciseIndex >= exercises.length) {
            setControlVisibility('workout_completed');
            highlightExercise(-1); // Remove o destaque do último exercício ativo
            return;
        }

        highlightExercise(currentExerciseIndex); // Destaca o exercício atual

        const currentEx = exercises[currentExerciseIndex];
        elements.currentExerciseName.textContent = currentEx.NOME;

        if (currentEx.TIPO.toLowerCase() === 'tempo') { // Use .toLowerCase() para consistência com 'tempo'
            elements.currentExerciseDetails.textContent = `Tempo: ${currentEx.TEMPO_SEGUNDOS} segundos`;
            timeLeft = parseInt(currentEx.TEMPO_SEGUNDOS, 10) || 0;
            updateTimerDisplay();
            startTimer();
            setControlVisibility('active'); // Botões de navegação e finalizar
            setControlVisibility('timer_active'); // Botões de pausa/reset
        } else { // Tipo: 'repeticao'
            elements.currentExerciseDetails.textContent = `Repetições: ${currentEx.QUANT_REPETICAO}`;
            elements.timerDisplay.textContent = "--:--";
            clearInterval(timerInterval);
            setControlVisibility('active'); // Botões de navegação e finalizar (pausa/reset já estarão escondidos)
        }
    }

    function displayInitialState() {
        if (exercises.length === 0) {
            elements.exerciseListDiv.innerHTML = '<p>Nenhum exercício adicionado a este treino ainda.</p>';
        } else {
            elements.exerciseListDiv.innerHTML = '<h3>Lista de Exercícios:</h3><ol>';
            exercises.forEach((ex, index) => {
                const listItem = document.createElement('li');
                const details = (ex.TIPO || '').toLowerCase() === 'tempo' ?
                    `Tempo: ${ex.TEMPO_SEGUNDOS} segundos` :
                    `Repetições: ${ex.QUANT_REPETICAO}`;
                listItem.textContent = `${ex.NOME} (${details})`;
                listItem.id = `exercise-${index}`;
                elements.exerciseListDiv.appendChild(listItem);
            });
            elements.exerciseListDiv.innerHTML += '</ol>';
        }
        setControlVisibility('initial'); // Define a visibilidade inicial dos controles
    }

    // --- Event Listeners ---

    elements.startButton.addEventListener("click", () => {
        setControlVisibility(); // Esconde o botão Iniciar
        displayCurrentExercise();
    });

    elements.nextButton.addEventListener("click", () => {
        currentExerciseIndex++;
        displayCurrentExercise();
    });

    elements.prevButton.addEventListener("click", () => {
        if (currentExerciseIndex > 0) {
            currentExerciseIndex--;
            displayCurrentExercise();
        }
    });

    elements.pauseResumeButton.addEventListener("click", () => {
        isPaused = !isPaused;
        elements.pauseResumeButton.textContent = isPaused ? "Continuar" : "Pausar";
    });

    elements.resetButton.addEventListener("click", () => {
        const currentEx = exercises[currentExerciseIndex];
        if ((currentEx.TIPO || '').toLowerCase() === 'tempo') {
            timeLeft = parseInt(currentEx.TEMPO_SEGUNDOS, 10) || 0;
            updateTimerDisplay();
            startTimer();
        }
    });

    elements.finishWorkoutButton.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja finalizar o treino? O progresso não será salvo como concluído.")) {
            setControlVisibility('workout_aborted'); // Define o estado de treino abortado
        }
    });

    // Início: Busca os dados do treino ao carregar a página
    fetchWorkoutData();
});