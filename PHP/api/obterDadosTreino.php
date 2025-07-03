<?php
// PHP/api/getCurrentWorkoutData.php

session_start();
include '../config.php'; // Ajuste o caminho para seu config.php conforme necessário

header('Content-Type: application/json'); // Informa que a resposta é JSON

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(['error' => 'Usuário não autenticado.']);
    exit();
}

// Verifica se os dados do treino estão na sessão
if (isset($_SESSION['current_workout_data'])) {
    $workoutData = $_SESSION['current_workout_data'];
    // Opcional: Limpar a sessão para que não seja reutilizada em futuros acessos diretos
    // unset($_SESSION['current_workout_data']);

    echo json_encode($workoutData, JSON_HEX_APOS | JSON_HEX_QUOT);
    exit();
} else {
    // Se não há dados na sessão, pode significar que o usuário acessou diretamente o HTML
    // ou a sessão expirou/foi limpa.
    http_response_code(404); // Not Found ou Bad Request
    echo json_encode(['error' => 'Nenhum dado de treino encontrado para esta sessão.']);
    exit();
}
?>