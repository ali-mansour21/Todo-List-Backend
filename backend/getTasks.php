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
    $response['allTasks'][] = $task;
}
$get_score_query = $conn->prepare('SELECT score FROM users WHERE id = ?');
$get_score_query->bind_param('i', $user_id);
$get_score_query->execute();
$get_score_result = $get_score_query->get_result();
$user = $get_score_result->fetch_assoc();
$response['score'] = $user;
echo json_encode($response);
