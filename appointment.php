<?php
session_start();

$host = 'localhost';
$dbname = 'fitzone';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $password = $appointmentDate = $classType = '';
$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);
    $appointmentDate = trim($_POST["appointment-date"]);
    $classType = trim($_POST["class-type"]);

    if (empty($email)) {
        $errors['email'] = "Email is required";
    }
    if (empty($password)) {
        $errors['password'] = "Password is required";
    }
    if (empty($appointmentDate)) {
        $errors['appointment-date'] = "Appointment date is required";
    }
    if (empty($classType)) {
        $errors['class-type'] = "Please select a class type";
    }

    if (empty($errors)) {
        $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($hashedPassword);
            $stmt->fetch();

            if (password_verify($password, $hashedPassword)) {
                $insertStmt = $conn->prepare("INSERT INTO appointment (user_email, appointment_date, class_type) VALUES (?, ?, ?)");
                $insertStmt->bind_param("sss", $email, $appointmentDate, $classType);

                if ($insertStmt->execute()) {
                    echo json_encode(["status" => "success", "message" => "Appointment booked successfully!"]);
                } else {
                    $errors['general'] = "Failed to book appointment. Please try again later.";
                }
                $insertStmt->close();
            } else {
                $errors['general'] = "Invalid Username or password! Try again.";
            }
        } else {
            $errors['general'] = "You have to register first to make an appointment.";
        }
        $stmt->close();
    }

    if (!empty($errors)) {
        echo json_encode(["status" => "error", "errors" => $errors, "general" => $errors['general'] ?? null]);
    }
    $conn->close();
}
?>
