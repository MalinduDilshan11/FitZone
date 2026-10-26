<?php
session_start();

// Database connection
$host = 'localhost';
$dbname = 'fitzone';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Define variables and set them to empty values
$email = $password = '';
$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);

    // Validation
    if (empty($email)) {
        $errors['email'] = "Email is required";
    }
    if (empty($password)) {
        $errors['password'] = "Password is required";
    }

    // If no errors, check the credentials
    if (empty($errors)) {
        $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($hashedPassword);
            $stmt->fetch();

            // Verify password
            if (password_verify($password, $hashedPassword)) {
                // Login successful
                $_SESSION['email'] = $email; // Start session for logged-in user
                echo json_encode(["status" => "success", "message" => "Login successful! Welcome to FitZone...."]);
                exit; // End script execution
            } else {
                $errors['general'] = "Invalid email or password.";
            }
        } else {
            $errors['general'] = "Invalid email or password.";
        }

        $stmt->close();
    }

    // Return error messages
    echo json_encode(["status" => "error", "errors" => $errors, "general" => isset($errors['general']) ? $errors['general'] : null]);
    $conn->close();
}
?>
