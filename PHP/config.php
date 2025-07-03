<?php
    $dbHost = "localhost";
    $dbUserName = "root";
    $dbPassword = "";
    $dbName = "TCC";

    $conn = mysqli_connect($dbHost, $dbUserName, $dbPassword, $dbName);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
?>