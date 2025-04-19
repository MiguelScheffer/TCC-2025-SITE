<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
  header("Location: login.php");
  exit;
}
$nome = $_SESSION['usuario_nome'];
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>
  <link rel="stylesheet" href="../CSS/dashboard.css">
</head>

<body>
  <header>
    <h1 class="headerMensagemDiaria"><?php echo htmlspecialchars($nome) ?> </h1>

    <section class="exerciseCards">
      <div class="card">
        <div class="image imageBraco"></div>
        <div class="card-info">
          <span>Braço</span>
          <p>36 exercícios</p>
        </div>
        <a href="#" class="button">Fazer exercício</a>
      </div>
      <div class="card">
        <div class="image imagePerna"></div>
        <div class="card-info">
          <span>Braço</span>
          <p>36 exercícios</p>
        </div>
        <a href="#" class="button">Fazer exercício</a>
      </div>
      <div class="card">
        <div class="image imageAbdomen"></div>
        <div class="card-info">
          <span>Braço</span>
          <p>36 exercícios</p>
        </div>
        <a href="#" class="button">Fazer exercício</a>
      </div>
    </section>
  </header>
  <main></main>
  <button class="add">
  <span>Adicionar exercício</span>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

</button>
</body>
<script src="../Javascript/dashboard.js"></script>

</html>