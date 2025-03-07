<?php
session_start();
$conn = new mysqli("localhost", "root", "", "soulmatch");
$username = $_SESSION['username'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $desc = $_POST['description'];
    $status = $_POST['status'];
    $height = $_POST['height'];
    $complexion = $_POST['complexion'];
    $hair_color = $_POST['hair_color'];
    $eye_color = $_POST['eye_color'];

    $stmt = $conn->prepare("INSERT INTO profiles (user_id, description, status, height, complexion, hair_color, eye_color) 
                            VALUES ((SELECT id FROM users WHERE username=?), ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $username, $desc, $status, $height, $complexion, $hair_color, $eye_color);

    if ($stmt->execute()) {
        header("Location: home.php");
    } else {
        echo "Profile update failed!";
    }
}
?>

<form method="POST">
    <textarea name="description" placeholder="Describe yourself"></textarea><br>
    <select name="status">
        <option value="Single">Single</option>
        <option value="Divorced">Divorced</option>
        <option value="Unhappily Married">Unhappily Married</option>
    </select><br>
    <input type="number" step="0.1" name="height" placeholder="Height (ft)"><br>
    <input type="text" name="complexion" placeholder="Skin Complexion"><br>
    <input type="text" name="hair_color" placeholder="Hair Color"><br>
    <input type="text" name="eye_color" placeholder="Eye Color"><br>
    <input type="submit" value="Save Profile">
</form>
