<?php

$debug = false;

// Edit these as needed.

$to = 'rob@youngand.co';
$from = 'yitong@youngand.co';
$debugTo = 'jason@youngand.co';

// End editables.



if (!isset($_POST['submit'])) {
    echo "error; you need to submit the form!";
    exit;
}

function isInjected($str) {

    $injections = array('(\n+)',
        '(\r+)',
        '(\t+)',
        '(%0A+)',
        '(%0D+)',
        '(%08+)',
        '(%09+)'
    );

    $inject = join('|', $injections);
    $inject = "/$inject/i";
    return preg_match($inject, $str);
}

$name = $_POST['Name'];
$company = $_POST['Company'];
$visitorEmail = $_POST['Email'];
$message = $_POST['Description'];

if (empty($name) || empty($visitorEmail)) {
    echo "Name and email are mandatory!";
    exit;
}

if (isInjected($visitorEmail)) {
    echo "Bad email value!";
    exit;
}

$subject = "O/M + $company";

$body = "You have received a new message from the user $name.\n" .
    "Here is the message:\n $message";

$headers = "From: $from \r\n";
$headers .= "Reply-To: $visitorEmail \r\n";

$debug && $to = $debugTo;

$mailOk = mail($to, $subject, $body, $headers);

$response = [
    'success' => $mailOk
];

echo json_encode($response);

exit;
