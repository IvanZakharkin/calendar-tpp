<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// $postData = file_get_contents('php://input');
// $dataAboutWeek = json_decode($postData, true);
// $dataStartWeek = $dataAboutWeek["dataStartWeek"];
// $dataStartNextWeek = $dataAboutWeek["dataStartNextWeek"];
$dataStartWeek = 1590354000;
$dataStartNextWeek = 1590958800;

$string = file_get_contents("events.json");
$events = json_decode($string)->events;

// foreach($events as $event) {
//   // print_r($event->dateStart);
//   // print_r($dataStartWeek);
//   print_r($event->dateStart >= $dataStartWeek && $event->dateEnd < $dataStartNextWeek);
//   // return $event->dateStart >= $dataStartWeek && $event->dateEnd < $dataStartNextWeek;
// };


function even($event)
{
    return ($event->dateStart >= $dataStartWeek && $event->dateStart - $dataStartNextWeek < 0);
}


// $eventsWeek= array_filter($events, function($event) {
//   print_r($events->dateStart);
  // return $event->dateStart >= $dataStartWeek && $event->dateEnd < $dataStartNextWeek;
// });
// $eventsWeek = array_filter($events, "even");


print_r(array_filter($events, "even"));

// echo($events[0]->dateStart - $dataStartNextWeek < 0);
// echo(getType($events[0]->dateEnd));

?>
