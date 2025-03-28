<?php
include_once 'config.php';
if (isset($_POST['submit'])) {
    $prNome = $_POST['prNome'];
    $seNome = $_POST['seNome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    $sql = "SELECT * FROM usuarios WHERE email='$email'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        echo "Email já cadastrado!";
    } else {
        $sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('$prNome','$seNome', '$email', '$senha')";
        if (mysqli_query($conn, $sql)) {
            echo "Usuário cadastrado com sucesso!";
        } else {
            echo "Erro: " . mysqli_error($conn);
        }
    }
}

?>