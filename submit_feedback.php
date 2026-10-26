<?php
$host = 'localhost';
$dbname = 'fitzone';
$username = 'root';
$password = '';

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $filename = $_POST['filename'];
    $email = $_POST['email'];
    $comment = $_POST['comment'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO feedback (filename, email, comment) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $filename, $email, $comment);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Feedback submitted successfully!"; // Return success message
    } else {
        echo "Error: " . $stmt->error; // Return error message
    }

    // Close statement and connection
    $stmt->close();
}
$conn->close();
?>
