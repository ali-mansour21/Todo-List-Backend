<?php
include "./connection.php";
$txt_title = $_POST['title'];
$txt_description = $_POST['description'];
$txt_user_id = $_POST['user_id'];

$query = $conn->prepare('UPDATE tasks SET title = ?, description = ? WHERE user_id = ?');
$query->bind_param('ssi', $txt_title, $txt_description, $txt_user_id);
if ($query->execute()) {
    $response['status'] = "Task updated successfully";
} else {
    $response['status'] = "Update failed";
}
echo json_encode($response);
