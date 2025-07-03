<?php
session_start();
include '../config.php';
header('Content-Type: application/json');
if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Usuário não autenticado."]);
    exit;
}
$usuario_id = $_SESSION['usuario_id'];
$sql = "SELECT
            T.ID_TREINO,
            T.NOME AS nome_treino,
            COUNT(E.ID_EXERCICIO) AS total_exercicios
        FROM
            TREINOS T
        LEFT JOIN
            EXERCICIOS E ON T.ID_TREINO = E.ID_TREINO
        WHERE
            T.ID_USUARIO = ?
        GROUP BY
            T.ID_TREINO, T.NOME
        ORDER BY
            T.NOME";
$stmt = $conn->prepare($sql);
if ($stmt === false) {

    http_response_code(500);
    echo json_encode(["error" => "Erro interno ao preparar a consulta."]);
    exit;
}
$stmt->bind_param("i", $usuario_id);
if (!$stmt->execute()) {
    
    http_response_code(500);
    echo json_encode(["error" => "Erro interno ao executar a consulta."]);
    exit;
}
$result = $stmt->get_result();
$treinosDoUsuario = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();
$conn->close();
echo json_encode($treinosDoUsuario);
?>