<?php
include_once 'config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $senha = trim($_POST['senha']);

    if (empty($email) || empty($senha)) {
        echo "Por favor, preencha todos os campos.";
        exit;
    }

    $stmt = $conn->prepare("SELECT ID_USUARIO, NOME_PR, SENHA FROM USUARIOS WHERE EMAIL = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $usuario = $resultado->fetch_assoc();


        if (password_verify($senha, $usuario['SENHA'])) {
            $_SESSION['usuario_id'] = $usuario['ID_USUARIO'];
            $_SESSION['usuario_nome'] = $usuario['NOME_PR'];
            header("Location: ../HTML/dashboard.html");
        } else {
            echo "Senha incorreta.<br>";
        }
    } else {
        echo "Usuário não encontrado.";
    }

    $stmt->close();
}

$conn->close();
?>
