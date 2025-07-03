<?php
session_start(); 
include 'config.php';
if (!isset($_SESSION['usuario_id'])) {
    header("Location: ../HTML/login.html"); 
    exit;
}
$usuario_id = $_SESSION['usuario_id'];
$usuario_nome = $_SESSION['usuario_nome'] ?? 'Usuário';
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
    die("Erro interno na preparação da consulta."); 
}
$stmt->bind_param("i", $usuario_id); 
if (!$stmt->execute()) { 
     die("Erro interno ao executar a consulta."); 
}
$result = $stmt->get_result();
$treinosDoUsuario = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();
$conn->close(); 
?>