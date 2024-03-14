<?php
include "./connection.php";
$txt_title = $_POST['title'];
$txt_id = $_POST['id'];
$txt_status = $_POST['status'];
$txt_description = $_POST['description'];
$txt_user_id = $_POST['user_id'];

$query = $conn->prepare('UPDATE tasks SET title = ?, description = ?, status =? WHERE id = ? and user_id = ?');
$query->bind_param('ssiii', $txt_title, $txt_description, $txt_status, $txt_id, $txt_user_id);
if ($query->execute()) {
    $response['status'] = "Task updated successfully";
} else {
    $response['status'] = "Update failed";
}
echo json_encode($response);
