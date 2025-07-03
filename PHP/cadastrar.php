<?php
include 'config.php';

if (isset($_POST['submit'])) {
    $prNome = $_POST['prNome'];
    $seNome = $_POST['seNome'];
    $email = $_POST['email'];
    $senha = trim(password_hash($_POST['senha'], PASSWORD_DEFAULT));

    $sql = "SELECT * FROM USUARIOS WHERE email=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "Email já cadastrado!";
    } else {
        $sql = "INSERT INTO USUARIOS (NOME_PR, NOME_SE, EMAIL, SENHA) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $prNome, $seNome, $email, $senha);
        if ($stmt->execute()) {
            echo "Usuário cadastrado com sucesso!";
        } else {
            echo "Erro: " . $stmt->error;
        }
    }
}
?>
