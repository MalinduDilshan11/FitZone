<?php
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
$username = $nic = $email = $phoneNumber = $password = $confirmPassword = $gender = '';
$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input and validate
    $username = trim($_POST["username"]);
    $nic = trim($_POST["nic"]);
    $email = trim($_POST["email"]);
    $phoneNumber = trim($_POST["phoneNumber"]);
    $password = trim($_POST["password"]);
    $confirmPassword = trim($_POST["confirmPassword"]);
    $gender = isset($_POST["gender"]) ? $_POST["gender"] : '';

    // Validation
    if (empty($username)) {
        $errors['username'] = "Username is required";
    }
    if (empty($nic)) {
        $errors['nic'] = "NIC is required";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format";
    }
    if (empty($phoneNumber)) {
        $errors['phoneNumber'] = "Phone number is required";
    }
    if (strlen($password) < 6) {
        $errors['password'] = "Password must be at least 6 characters";
    }
    if ($password != $confirmPassword) {
        $errors['confirmPassword'] = "Passwords do not match";
    }
    if (empty($gender)) {
        $errors['gender'] = "Gender is required";
    }

    // Check for duplicate email
    if (empty($errors)) {
        $stmt = $conn->prepare("SELECT email FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $errors['email'] = "Email already exists. Please use a different email.";
        }

        $stmt->close();
    }

    // If no errors, insert data into the database
    if (empty($errors)) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO users (username, nic, email, phone_number, password, gender) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $username, $nic, $email, $phoneNumber, $hashedPassword, $gender);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Registration successful!"]);
        } else {
            echo json_encode(["status" => "error", "general" => "An error occurred while registering."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "errors" => $errors]);
    }

    $conn->close();
}
?>
