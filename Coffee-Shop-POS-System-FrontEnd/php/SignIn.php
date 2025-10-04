<?php
session_start();
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_POST['register'])) {
    try {
        include 'dbcon.php';

        // Check if POST data is set
        if (!isset($_POST['email']) || !isset($_POST['pass'])) {
            throw new Exception("Form data is missing.");
        }

        $email = $_POST['email'];
        $pass  = $_POST['pass'];

        // Check for empty fields
        if (empty($email) || empty($pass)) {
            throw new Exception("Fill in all fields!");
        }

        // Check if email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Invalid email format!");
        }

        // Check if user/email already exists
        $sql = "SELECT * FROM users WHERE email = :email";
        $stmt = $pdo->prepare($sql);
        if (!$stmt) {
            throw new Exception("Failed to prepare SQL statement for checking existing users.");
        }

        $stmt->execute([':email' => $email]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            throw new Exception("Email already taken!");
        }

        // Hash the password
        $hashedPass = password_hash($pass, PASSWORD_DEFAULT);
        if (!$hashedPass) {
            throw new Exception("Failed to hash the password.");
        }

        // Insert the new user into the database
        $sql = "INSERT INTO users (email, pass) VALUES (:email, :hashedPass)";
        $stmt = $pdo->prepare($sql);
        if (!$stmt) {
            throw new Exception("Failed to prepare SQL statement for inserting user.");
        }

        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':hashedPass', $hashedPass);

        if ($stmt->execute()) {
            echo "<script> alert('You have signed up successfully!')</script>";
            
        } else {
            throw new Exception("Failed to execute SQL statement for inserting user.");
        }
    } catch (Exception $e) {
        // Handle all exceptions and display the error message
        echo "<script>alert('Error: " . $e->getMessage() . "'); window.location.href = '../loginRegister.php';</script>";
        exit();
    }
} 
//Login code here//
if(isset($_POST['signIn'])){
    try{
        include 'dbcon.php';
        if(!isset($_POST['email-log']) || !isset($_POST['password-log'])){
            throw new Exception("Form data is missing.");
        }
      
        $email = $_POST['email-log'];
        $pass  = $_POST['password-log'];

        if(empty($email) || empty($pass)){
            throw new Exception ("all fields are required!");
        }

    $sql = "select pass from users where email = :email";
    $stmt = $pdo->prepare($sql);
    if(!$stmt){
        throw new Exception("Failed to prepare SQL statement for login.");
    }
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if($result && password_verify($pass, $result['pass'])){
        $_SESSION['user'] = $email;
        
        header("Location: ../index.html");
        exit(); 
    } else {
        throw new Exception("Incorrect email or password!");
    }
    } catch (Exception $e) {
        echo "<script>alert('Error: " . $e->getMessage() . "'); window.location.href = '../loginRegister.php';</script>";
        exit();
    }

}
?>