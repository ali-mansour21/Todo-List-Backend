<?php
include "./connection.php";
$txt_username = isset($_POST['username']) ? $_POST['username'] : null;
$txt_email = isset($_POST['email']) ? $_POST['email'] : null;
$txt_password = isset($_POST['password']) ? $_POST['password'] : null;
$is_email = filter_var($txt_email, FILTER_VALIDATE_EMAIL);

if ($is_email) {
    $query = $conn->prepare('SELECT * FROM users WHERE email = ?');
    $query->bind_param('s', $txt_email);
} else {
    $query = $conn->prepare('SELECT * FROM users WHERE username = ?');
    $query->bind_param('s', $txt_username);
}
$query->execute();
$query->store_result();
$query->bind_result($id, $username, $email, $password, $score);
$check_user = $query->fetch();
if ($check_user == 0) {
    $response['status'] = "Account not found";
} else {
    if (password_verify($txt_password, $password)) {
        $response['status'] = "logged in";
        $response['id'] = $id;
        $response['username'] = $username;
        $response['email'] = $email;
    } else {
        $response['status'] = "incorrect credentials";
    }
}
echo json_encode($response);
