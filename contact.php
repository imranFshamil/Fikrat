<?php
if (isset($_POST['submit'])) {
    // Retrieve form data
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $telephone = $_POST['telephone'];
    $service = $_POST['service'];
    $message = $_POST['message'];

    // Validate form data
    $errors = array();
    if (empty($fullname)) {
        $errors[] = "Please enter your name.";
    }
    if (empty($email)) {
        $errors[] = "Please enter your email address.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please enter a valid email address.";
    }
    if (empty($telephone)) {
        $errors[] = "Please enter your telephone number.";
    }
    if (!empty($errors)) {
        // Display validation errors
        echo '<div class="alert alert-danger">';
        foreach ($errors as $error) {
            echo "<p>$error</p>";
        }
        echo '</div>';
    } else {
        // Compose email message
        $to = "youremail@example.com"; // Enter your own email address here
        $subject = "New message from contact form";
        $message = "Name: $fullname\n"
                 . "Email: $email\n"
                 . "Telephone: $telephone\n"
                 . "Service: $service\n"
                 . "Message:\n$message";

        // Send email
        if (mail($to, $subject, $message)) {
            // Display success message
            echo '<div class="alert alert-success">';
            echo "<p>Thank you for your message, $fullname. We'll be in touch soon!</p>";
            echo '</div>';
        } else {
            // Display error message
            echo '<div class="alert alert-danger">';
            echo "<p>Sorry, there was an error sending your message. Please try again later.</p>";
            echo '</div>';
        }
    }
}
?>
