<?php
include "./connection.php";
$task_id = $_POST['id'];
$txt_user_id = $_POST['user_id'];
$query = $conn->prepare('DELETE FROM tasks WHERE id = ? AND user_id = ?');
$query->bind_param('ii', $task_id, $txt_user_id);
$query->execute();
if ($query->affected_rows) {
    $response['status'] = "Task deleted successfully";
} else {
    $response['status'] = "Failed";
}
echo json_encode($response);