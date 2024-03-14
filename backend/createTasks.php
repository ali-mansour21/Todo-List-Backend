<?php
include "./connection.php";
$txt_title = $_POST['title'];
$txt_description = $_POST['description'];
$txt_user_id = $_POST['user_id'];
$query = $conn->prepare('insert into tasks (title,description,user_id) values (?,?,?)');

$query->bind_param("ssi", $txt_title, $txt_description, $txt_user_id);
if ($query->execute()) {
    $response['status'] = "Task created successfully";
} else {
    $response['status'] = "Failed";
}
echo json_encode($response);
