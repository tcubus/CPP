<?php
$name = $_POST['name'];
$mail = $_POST['email'];
$message = $_POST['msg'];

$header = 'From: ' . $mail . " \r\n";
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";

$message = "Este mensaje fue enviado por: " . $name . " \r\n";
$message .= "Su e-mail es: " . $email . " \r\n";
$message .= "Mensaje: " . $_POST['msg'] . " \r\n";
$message .= "Enviado el: " . date('d/m/Y', time());

$para = 'sburi@cpp.com.ec';
$asunto = 'Gracias por contactarse con nosotros';

mail($para, $asunto, utf8_decode($msg), $header);

header("Location:index.html");
?>
