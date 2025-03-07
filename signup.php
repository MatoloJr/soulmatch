<?php
session_start();
$conn = new mysqli("localhost", "root", "", "soulmatch");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $country = $_POST['country'];
    $city = $_POST['city'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO users (username, age, gender, country, city, password) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sissss", $username, $age, $gender, $country, $city, $password);

    if ($stmt->execute()) {
        $_SESSION['username'] = $username;
        header("Location: login.php");
    } else {
        echo "Signup failed!";
    }
}
?>

<form method="POST">
    <input type="text" name="username" placeholder="Username" required><br>
    <input type="number" name="age" placeholder="Age" required><br>
    <select name="gender">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
    </select><br>
    <input type="text" name="country" placeholder="Country" required><br>
    <input type="text" name="city" placeholder="City/Town" required><br>
    <input type="password" name="password" placeholder="Password" required><br>
    <input type="submit" value="Sign Up">
</form>