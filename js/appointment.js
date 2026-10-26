document.getElementById("appointment-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const response = await fetch("appointment.php", {
        method: "POST",
        body: formData,
    });

    const result = await response.json();

    if (result.status === "success") {
        document.getElementById("success-message").innerText = result.message;
        document.getElementById("general-error").innerText = "";
        setTimeout(() => {
            this.reset(); // Clear fields
            window.location.href = "about.html"; // Navigate to about page
        }, 2000); // Time to navigate to about.html
    } else if (result.status === "error") {
        document.getElementById("success-message").innerText = "";
        document.getElementById("general-error").innerText = result.general || "Please fix the errors above.";

        if (result.errors) {
            for (const [key, message] of Object.entries(result.errors)) {
                document.getElementById(`${key}-error`).innerText = message;
            }
        }

        // If email and password are both incorrect, navigate after a delay
        if (result.general === "You have to register first to make an appointment.") {
            setTimeout(() => {
                this.reset(); // Clear fields
                window.location.href = "index.html"; // Navigate to index page
            }, 2000); // Time to navigate to index.html
        }
    }
});
