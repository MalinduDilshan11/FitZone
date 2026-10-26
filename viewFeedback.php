<?php
// viewFeedback.php

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

// Fetch feedback data
$sql = "SELECT filename, email, comment FROM feedback";
$result = $conn->query($sql);

$feedbacks = []; // Initialize an array to hold feedback data

if ($result->num_rows > 0) {
    // Store each row of feedback in the array
    while($row = $result->fetch_assoc()) {
        $feedbacks[] = $row;
    }
} else {
    $feedbacks = null; // No feedback available
}

// Close the connection
$conn->close();

// Return feedback data as a JSON response
header('Content-Type: application/json');
echo json_encode($feedbacks);
?>
