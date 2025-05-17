<?php
session_start();
if (isset($_SESSION['usuario_id']) && isset($_SESSION['usuario_nome']) && !empty($_SESSION['usuario_nome'])) {
    echo htmlspecialchars($_SESSION['usuario_nome']);
} elseif (isset($_SESSION['usuario_id'])) {
    echo "Nome não encontrado na sessão"; 
} else {
    echo "Usuário não autenticado"; 
}
?>
