<?php
$fname = $_POST['firstname'];
$lname = $_POST['lastname'];
$visit_reason = $_POST['reason'];
$message = $_POST['comment'];

//Validate first
if($visit_reason == 'empty')
{
    echo "Please select a reason.";
    exit;
}

$email_from = 'xxx@gmail.com';//<== update the email address
$email_subject = "A Vistor with An Appointment Has Arrived!!!";
$email_body = "You have a visit from $fname $lname.\n".
    "Appointment Time:\n $message".

$to = "xxx@qrstuv.info";//<== update the email address
$headers = "From: $email_from \r\n";
//Send the email!
mail($to,$email_subject,$email_body,$headers);
//done. redirect to thank-you page.
header('Location: appointment-visit-thank-you.html');


// Function to validate against any email injection attempts
function IsInjected($str)
{
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
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}

?>
