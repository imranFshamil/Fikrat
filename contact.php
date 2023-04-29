<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    // Set up the email headers and body
    $to = 'youremail@example.com';
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage:\n$message";
    
    // Send the email using the mail() function
    if (mail($to, $subject, $body, $headers)) {
        echo 'Message sent successfully!';
    } else {
        echo 'An error occurred. Please try again later.';
    }
}
?>
