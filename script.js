document
  .getElementById("signup-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Signup successful! Redirecting to login...");
    window.location.href = "login.html";
  });

document
  .getElementById("login-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Login successful! Redirecting to profile...");
    window.location.href = "profile.html";
  });

document
  .getElementById("profile-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Profile saved! Redirecting to home...");
    window.location.href = "home.html";
  });

function toggleChat() {
  let chatbotBox = document.getElementById("chatbot-box");
  chatbotBox.style.display =
    chatbotBox.style.display === "none" ? "block" : "none";
}

function getMatch() {
  let preference = document.getElementById("preference").value;
  alert("Finding matches for: " + preference);
}
