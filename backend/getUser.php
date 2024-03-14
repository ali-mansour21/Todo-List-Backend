<?php
include "./connection.php";
$query = $conn->prepare('select * from users');
$query->execute();
$query->store_result();
$query->bind_result($id, $username, $email, $password, $score);
$response = [];
while ($query->fetch()) {
    $user = [
        'id' => $id,
        'username' => $username
    ];
    $response[] = $user;
}
echo json_encode($response);
