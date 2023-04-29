<?php
if(isset($_POST['submit'])) {
    $to = "imranshamil75@gmail.com"; 
    $subject = "Message from website form";
    $message = "Full name: " . $_POST['fullname'] . "\n\n";
    $message .= "Email address: " . $_POST['email'] . "\n\n";
    $message .= "Telephone: " . $_POST['telephone'] . "\n\n";
    $message .= "Service: " . $_POST['service'] . "\n\n";
    $message .= "Message: " . $_POST['message'] . "\n\n";
    $headers = "From: " . $_POST['email'] . "\r\n" .
               "Reply-To: " . $_POST['email'] . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    mail($to, $subject, $message, $headers);
}
?>

 <?php if(isset($_POST['submit'])) { ?>
    <div class="col-12 validation-success">
        <p>Thank you for your message. We'll get back to you as soon as possible.</p>
    </div>
<?php } ?>
