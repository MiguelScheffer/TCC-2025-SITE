<?php
// PHP/iniciarTreino.php

session_start();
include 'config.php'; // Inclua seu arquivo de configuração do banco de dados

if (!isset($_SESSION['usuario_id'])) {
    header("Location: ../HTML/login.html");
    exit();
}

$usuario_id = $_SESSION['usuario_id'];
$id_treino = $_GET['treino_id'] ?? null;

if (empty($id_treino)) {
    // Redireciona para o dashboard ou uma página de erro mais amigável
    header("Location: ../HTML/dashboard.html?error=no_treino_id");
    exit();
}

// Obter detalhes do treino (nome do treino)
$stmt_treino = $conn->prepare("SELECT NOME FROM TREINOS WHERE ID_TREINO = ? AND ID_USUARIO = ?");
$stmt_treino->bind_param("ii", $id_treino, $usuario_id);
$stmt_treino->execute();
$result_treino = $stmt_treino->get_result();
$treino_data = $result_treino->fetch_assoc(); // Renomeado para evitar conflito
$stmt_treino->close();

if (!$treino_data) {
    header("Location: ../HTML/dashboard.html?error=treino_not_found");
    exit();
}

// Obter exercícios do treino
$exercicios_data = []; // Renomeado para evitar conflito
$stmt_exercicios = $conn->prepare("SELECT NOME, DESCRICAO, TIPO, TEMPO_SEGUNDOS, QUANT_REPETICAO FROM EXERCICIOS WHERE ID_TREINO = ? AND ID_USUARIO = ? ORDER BY ID_EXERCICIO ASC");
$stmt_exercicios->bind_param("ii", $id_treino, $usuario_id);
$stmt_exercicios->execute();
$result_exercicios = $stmt_exercicios->get_result();

while ($row = $result_exercicios->fetch_assoc()) {
    $exercicios_data[] = $row;
}
$stmt_exercicios->close();
$conn->close();

// --- NOVO: Armazenar dados na sessão antes de redirecionar ---
$_SESSION['current_workout_data'] = [
    'id_treino' => $id_treino,
    'nome_treino' => $treino_data['NOME'],
    'exercicios' => $exercicios_data
];

// --- NOVO: Redirecionar para o HTML puro ---
header("Location: ../HTML/iniciarTreino.html");
exit();
?>