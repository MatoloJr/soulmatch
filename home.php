<div id="chatbot-icon" onclick="toggleChat()">💬</div>
<div id="chatbot-box" style="display:none;">
    <p>Tell me your preferences:</p>
    <input type="text" id="preference" placeholder="Type here...">
    <button onclick="getMatch()">Find Match</button>
</div>

<script>
function toggleChat() {
    document.getElementById("chatbot-box").style.display = "block";
}

function getMatch() {
    let preference = document.getElementById("preference").value;
    alert("Finding match based on: " + preference);
}
</script>
