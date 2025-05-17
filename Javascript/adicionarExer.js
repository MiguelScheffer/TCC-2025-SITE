const params = new URLSearchParams(window.location.search);
        const treinoId = params.get("id_treino");

        if (treinoId) {
            document.getElementById("id_treino_hidden").value = treinoId;
        } else {
            alert("Erro: treino_id não encontrado na URL.");
        }