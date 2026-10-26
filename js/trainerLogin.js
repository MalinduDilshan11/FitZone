document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Clear previous messages
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";
    document.getElementById("general-error").textContent = "";
    document.getElementById("success-message").textContent = "";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Frontend validation
    if (email.trim() === "") {
        document.getElementById("email-error").textContent = "Email is required.";
        return;
    }
    if (password.trim() === "") {
        document.getElementById("password-error").textContent = "Password is required.";
        return;
    }

    // Send login data to PHP
    try {
        const response = await fetch("trainerLogin.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });
        const result = await response.json();

        if (result.success) {
            document.getElementById("success-message").textContent = "Login successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            document.getElementById("general-error").textContent = result.message;
        }
    } catch (error) {
        document.getElementById("general-error").textContent = "An error occurred. Please try again.";
        console.error("Error:", error);
    }
});
