<?php
require_once __DIR__ . '/vendor/autoload.php';

use PhpAmqpLib\Connection\AMQPConnection;
use PhpAmqpLib\Message\AMQPMessage;

ini_set('display_errors', 'on');

$connection = new AMQPConnection('172.31.0.140', 5672, 'guest', 'guest');
$channel = $connection->channel();

$channel->queue_declare('graph', false, false, false);

$men = rand(1, 90);
$women = 100 - $men;

$data = array('men' => $men, 'women' => $women);

$msg = new AMQPMessage(json_encode($data));

$channel->basic_publish($msg, '', 'graph');

echo " [x] Sent " .  json_encode($data) . "\n";

$channel->close();
$connection->close();

?>
