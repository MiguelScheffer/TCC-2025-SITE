<?php
    $dbHost = "Localhost";
    $dbUserName = "root";
    $dbPassword = "";
    $dbName = "powershape";

    $conn = mysqli_connect($dbHost, $dbUserName, $dbPassword, $dbName);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
?>