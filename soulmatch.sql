CREATE DATABASE soulmatch;

USE soulmatch;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    age INT NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE profiles (
    user_id INT PRIMARY KEY,
    profile_pic VARCHAR(255),
    description TEXT,
    status ENUM('Divorced', 'Single', 'Unhappily Married') NOT NULL,
    height DECIMAL(3,2),
    complexion VARCHAR(50),
    hair_color VARCHAR(50),
    eye_color VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);
