<?php
require_once 'config.php';
start_secure_session();

header('Content-Type: application/json');

if (empty($_SESSION['user'])) {
    echo json_encode(['logged' => false]);
} else {
    echo json_encode(['logged' => true, 'userId' => $_SESSION['user']['id']]);
}
?>