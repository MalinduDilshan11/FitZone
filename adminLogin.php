<?php
session_start();

// Database connection
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'fitzone';

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['name'];
    $pass = $_POST['password'];

    // Query to check credentials
    $stmt = $conn->prepare("SELECT * FROM admin WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $user, $pass);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $_SESSION['admin'] = $user;
        echo json_encode(["status" => "success", "message" => "Login successful."]);
        exit;
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid username or password. Try again."]);
        exit;
    }
}

$conn->close();
?>
