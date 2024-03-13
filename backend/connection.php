<?php
$host = "localhost";
$user = "root";
$password = "";
$db_name = "task_db";
$conn = new mysqli($host, $user, $password, $db_name);

if ($conn->connect_error) {
    echo "connection failed";
} else {
    echo true;
}
