<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");


header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$user = "root";
$password = "";
$db_name = "task_db";
$conn = new mysqli($host, $user, $password, $db_name);

if ($conn->connect_error) {
    echo "connection failed";
}
