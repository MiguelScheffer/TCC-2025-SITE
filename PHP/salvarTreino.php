<?php
session_start();
include 'config.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['usuario_id'])) {
    
        die("Usuário não autenticado.");
    }
    $usuario_id = $_SESSION['usuario_id'];
    $nome = $_POST['nome'] ?? '';
    if (empty($nome)) {
        die("Nome do treino é obrigatório.");
    }
    $stmt = $conn->prepare("INSERT INTO TREINOS (ID_USUARIO, NOME) VALUES (?, ?)");
    $stmt->bind_param("is", $usuario_id, $nome);
    if ($stmt->execute()) {
        $id_treino_salvo = $conn->insert_id;
        header("Location: ../HTML/adicionarExer.html?id_treino=" . $id_treino_salvo);
        exit;
    } else {
        echo "Erro ao salvar o treino: " . $stmt->error;
    }
    $stmt->close();
    $conn->close();
} else {
    echo "Acesso inválido.";
}
?>