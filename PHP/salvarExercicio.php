<?php
session_start();
include 'config.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['usuario_id'])) {
        
        die("Usuário não autenticado.");
    }
    $usuario_id = $_SESSION['usuario_id']; 
    $id_treino = $_POST['id_treino'] ?? null;
        if (empty($id_treino)) {
         die("ID do treino não especificado. Não é possível salvar o exercício.");
    }
    $nome = $_POST['nome_exercicio'] ?? '';
    $descricao = $_POST['descricao'] ?? '';
    $tipo = $_POST['tipo'] ?? '';
    $tempo = $_POST['temp_segundos'] ?? null; 
    $repeticoes = $_POST['quant_repeticoes'] ?? null; 
    if (empty($nome) || empty($tipo)) {
         
         die("Nome e tipo do exercício são obrigatórios.");
    }    
    if ($tipo === 'tempo') {
        $repeticoes = null;
        
         if ($tempo === null || $tempo === '') {
              die("Tempo em segundos é obrigatório para tipo 'tempo'.");
         }
         $tempo = (int) $tempo; 
    } elseif ($tipo === 'repeticao') {
        $tempo = null;
         if ($repeticoes === null || $repeticoes === '') {
              die("Quantidade de repetições é obrigatória para tipo 'repeticao'.");
         }
         $repeticoes = (int) $repeticoes; 
    } else {
         die("Tipo de exercício inválido."); 
    }
        $stmt = $conn->prepare("INSERT INTO EXERCICIOS (ID_TREINO, NOME, ID_USUARIO, DESCRICAO, TIPO, TEMPO_SEGUNDOS, QUANT_REPETICAO) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isissii",
            $id_treino, 
            $nome,
            $usuario_id,
            $descricao,
            $tipo,
            $tempo,
            $repeticoes
        );

    if ($stmt->execute()) {
        header("Location: ../HTML/adicionarExer.html?id_treino=" . $id_treino . "&success=1");
        exit; 
    } else {
        echo "Erro ao salvar o exercício: " . $stmt->error;  
    }
    $stmt->close();
    $conn->close();
} else {
    echo "Acesso inválido."; 
}
?>