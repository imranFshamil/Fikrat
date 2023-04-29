<?php

// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Set recipient email address
    $to = 'imranshamil75@gmail.com';

    // Set email subject
    $subject = 'Contact Form Submission';

    // Set email message body
    $body = 'Name: ' . $_POST['name'] . "\n\n";
    $body .= 'Email: ' . $_POST['email'] . "\n\n";
    $body .= 'Message: ' . $_POST['message'] . "\n\n";

    // Set email headers
    $headers = 'From: ' . $_POST['email'] . "\r\n" .
        'Reply-To: ' . $_POST['email'] . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        $success = true;
    } else {
        $error = 'Unable to send email. Please try again later.';
    }

}

?>

<?php if (isset($success)): ?>

    <p class="alert alert-success">Thank you for contacting us. We will be in touch with you very soon.</p>

<?php else: ?>

    <?php if (isset($error)): ?>

        <p class="alert alert-danger"><?= $error ?></p>

    <?php endif ?>

    <form action="" method="post">
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" class="form-control" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="message">Message:</label>
            <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

<?php endif ?>
