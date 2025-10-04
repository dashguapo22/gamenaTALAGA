<?php

$servername = "localhost";
$username   = "root";  // default XAMPP user
$password   = "DaveAdmin";      // default is empty
$dbname     = "coffee_shop_pos"; // change to your database name

$dsn = "mysql:host=". $servername .";dbname=". $dbname .";charset=utf8mb4;";

try
{
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e){
    echo "Connection failed: " . $e->getMessage();
    exit();
}
?>