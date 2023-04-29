<?php 
if(isset($_POST['submit'])) {
    $to = "imranshamil75@gmail.com"; // Add your email address here
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $telephone = $_POST['telephone'];
    $service = $_POST['service'];
    $message = $_POST['message'];
    $subject = "New Message from Company Website";
    $message_body = "You have received a new message from the Company website:\n\nFull Name: $fullname\nEmail: $email\nTelephone: $telephone\nService: $service\nMessage: $message";
    $headers = "From: Company Website <noreply@company.com>\r\nReply-To: $email\r\n";
    mail($to, $subject, $message_body, $headers);
}
?>
