<?php

$host = '127.0.0.1';
$port = 3306;
$user = 'root';
$pass = '';
$dbname = 'task-manager-system';

try {
    $pdo = new PDO("mysql:host=$host;port=$port;charset=utf8mb4", $user, $pass);
    echo "MySQL Connected successfully!\n";
    $stmt = $pdo->query('SHOW DATABASES');
    $databases = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo "Available databases: " . implode(', ', $databases) . "\n";

    if (!in_array($dbname, $databases)) {
        echo "Database '$dbname' not found. Creating...\n";
        $pdo->exec("CREATE DATABASE `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        echo "Database '$dbname' created successfully!\n";
    } else {
        echo "Database '$dbname' already exists.\n";
    }
} catch (PDOException $e) {
    echo "MySQL Error: " . $e->getMessage() . "\n";
    exit(1);
}
