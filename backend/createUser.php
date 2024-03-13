<?php
include "./connection.php";
$txt_username = $_POST['username'];
$txt_email = $_POST['email'];
$txt_password = $_POST['password'];

$check_user =  $conn->prepare('select username,email from users where email =? or username =?');
$check_user->bind_param('ss', $txt_email, $txt_username);
$check_user->execute();
$result = $check_user->fetch();
if ($result == 1) {
    $response[] = "User exists";
} else {
    $hashed_password = password_hash($txt_password, PASSWORD_BCRYPT);
    $insert_user = $conn->prepare('insert into users (username,email,password) values (?,?,?)');
    $insert_user->bind_param('sss', $txt_username, $txt_email, $hashed_password);
    if ($insert_user->execute()) {
        $response[] = "User created successfully";
    } else {
        $response[] = "Failed to create user";
    }
}
echo json_encode($response);
