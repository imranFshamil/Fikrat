<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $to = 'youremail@example.com';
  $subject = 'New message from Contact Us form';
  $message = 'Name: ' . $_POST['name'] . "\r\n\r\n";
  $message .= 'Email: ' . $_POST['email'] . "\r\n\r\n";
  $message .= 'Message: ' . $_POST['message'];

  $headers = 'From: ' . $_POST['email'] . "\r\n" .
             'Reply-To: ' . $_POST['email'] . "\r\n" .
             'X-Mailer: PHP/' . phpversion();

  if (mail($to, $subject, $message, $headers)) {
    echo 'Thank you for your message. We will get back to you soon.';
  } else {
    echo 'Sorry, there was a problem sending your message. Please try again later.';
  }
}

?>
