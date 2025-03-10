// ✅ Import Supabase module
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// ✅ Initialize Supabase Client
const supabaseUrl = "https://gqolaadozlkezdneudek.supabase.co";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY"; // Replace with actual key
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Make Supabase globally accessible
window.supabase = supabase;
console.log("✅ Supabase Connected");

// ✅ Signup User
async function signupUser(event) {
    event.preventDefault(); // Prevent form default submission

    const username = document.getElementById("username").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const country = document.getElementById("country").value;
    const city = document.getElementById("city").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!username || !age || !gender || !country || !city || !password) {
        alert("All fields are required.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const email = `${username}@soulmatch.com`;
    
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        alert("Signup failed: " + error.message);
        return;
    }

    // Store user profile data
    await supabase.from("profiles").insert([
        { auth_id: data.user.id, username, age, gender, country, city, profile_completed: false }
    ]);

    alert("Signup successful! Redirecting to login...");
    window.location.href = "login.html";
}

// ✅ Login User
async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("Username and password are required.");
        return;
    }

    const email = `${username}@soulmatch.com`;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert("Login failed: " + error.message);
        return;
    }

    // Fetch user profile
    let { data: userProfile, error: profileError } = await supabase
        .from("profiles")
        .select("profile_completed")
        .eq("auth_id", data.user.id)
        .single();

    if (profileError) {
        alert("Error fetching profile: " + profileError.message);
        return;
    }

    // Redirect based on profile completion
    window.location.href = userProfile.profile_completed ? "home.html" : "profile.html";
}

// ✅ Complete Profile
async function completeProfile() {
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user) {
        alert("Not logged in!");
        return;
    }

    await supabase.from("profiles").update({ profile_completed: true }).eq("auth_id", user.id);

    alert("Profile completed! Redirecting to home...");
    window.location.href = "home.html";
}

// ✅ Event listeners for form submissions
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signup-form")?.addEventListener("submit", signupUser);
    document.getElementById("login-form")?.addEventListener("submit", loginUser);
    document.getElementById("complete-profile-btn")?.addEventListener("click", completeProfile);
});

// ✅ Find Matches
async function getMatches() {
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user) {
        alert("Please log in first!");
        return;
    }

    let { data: userProfile } = await supabase
        .from("profiles")
        .select("gender, country, city")
        .eq("auth_id", user.id)
        .single();

    if (!userProfile) {
        alert("Profile not found!");
        return;
    }

    let { data: matches, error: matchError } = await supabase
        .from("profiles")
        .select("username, country, city")
        .neq("auth_id", user.id)
        .neq("gender", userProfile.gender)
        .limit(5);

    if (matchError) {
        alert("Error fetching matches: " + matchError.message);
        return;
    }

    let chatMessages = document.getElementById("chatbot-messages");
    chatMessages.innerHTML = "<strong>Recommended Matches:</strong><br>";
    matches.forEach(match => {
        chatMessages.innerHTML += `<p><strong>${match.username}</strong> - ${match.country}, ${match.city}</p>`;
    });
}

// ✅ Send Chat Message
async function sendMessage() {
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user) {
        alert("Please log in first!");
        return;
    }

    const message = document.getElementById("chat-input").value.trim();
    if (!message) return;

    const receiver_id = "receiver_user_id_here"; // Replace with actual recipient ID

    await supabase.from("chats").insert([{ sender_id: user.id, receiver_id, message }]);

    document.getElementById("chat-input").value = ""; // Clear input
}

// ✅ Real-time Chat Listener
const chatChannel = supabase.channel("chat_updates");

chatChannel
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "chats" }, (payload) => {
        let chatMessages = document.getElementById("chat-messages");
        chatMessages.innerHTML += `<p><strong>${payload.new.sender_id}:</strong> ${payload.new.message}</p>`;
    })
    .subscribe();

// ✅ Toggle Chatbot
function toggleChatbot() {
    let chatbotBox = document.getElementById("chatbot-box");
    chatbotBox.style.display = chatbotBox.style.display === "block" ? "none" : "block";
}
