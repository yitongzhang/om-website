<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  
header('Content-Type: application/json');

// Debugging functions
function d($a = null){
    dd($a);
    die;
}
function dd($a = null){
    echo '<pre>';
    var_dump($a);
    echo '</pre>';
}

require_once 'vendor/autoload.php';

$from      = new SendGrid\Email(null, "inquiries@youngand.co");
$subject   = "Contact details";
$to        = new SendGrid\Email(null, "inquiries@youngand.co");
$data      = $_POST;

if ( isset($data['submit']) ) {
    if ( !isset($data['Email']) || !isset($data['Name']) || !isset($data['Company'])|| !isset($data['Description']) ) {
        $response['message'] = 'Please fill required fields';
    }

    ob_start();
    include 'email.tpl';
    $message = ob_get_contents();
    ob_clean();

    $content = new SendGrid\Content("text/html", $message);
	$mail = new SendGrid\Mail($from, $subject, $to, $content);



	$apiKey = getenv('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');
	$sg = new SendGrid("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");

	$result = $sg->client->mail()->send()->post($mail);
	$response['statusCode'] = $result->statusCode();
	$response['header'] = $result->headers();
	$response['message'] = $result->body();

	if ( $result->statusCode() >= 200 && $result->statusCode() < 300 ){
		$response['message'] = 'Email was successfully submitted';
        $response['success'] = true;
	} else {
		$response['message'] = $result->body();
        $response['success'] = false;
	}
} else {
    $response['message'] = 'You should submit form';
    $response['success'] = false;
}


die(  json_encode($response) );