<?php
include "./connection.php";
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;


$query = $conn->prepare('select * from tasks where user_id = ?');
$query->bind_param('i', $user_id);
$query->execute();
$query->store_result();
$query->bind_result($id, $title, $description, $user_id, $status);
$response = [];
while ($query->fetch()) {
    $task = [
        'id' => $id,
        'title' => $title,
        'description' => $description,
        'status' => $status
    ];
    $response[] = $task;
}
echo json_encode($response);
