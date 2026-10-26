document.getElementById("register-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    const response = await fetch("register.php", {
        method: "POST",
        body: formData
    });

    const result = await response.json();

    // Clear previous errors and messages
    document.querySelectorAll(".error-message").forEach(el => el.style.display = 'none');
    const successMessage = document.querySelector(".success-message");
    if (successMessage) successMessage.style.display = 'none';

    if (result.status === "error") {
        // Display validation errors
        for (const field in result.errors) {
            document.getElementById(`${field}-error`).textContent = result.errors[field];
            document.getElementById(`${field}-error`).style.display = "block";
        }
        if (result.general) {
            alert(result.general); // In case of a general error (e.g., connection issue)
        }
    } else if (result.status === "success") {
        // Display success message and redirect after 3 seconds
        const successDiv = document.getElementById("success-message");
        successDiv.textContent = result.message;
        successDiv.style.display = "block";

        setTimeout(() => {
            window.location.href = "index.html"; // Redirect to the homepage
        }, 3000);
    }
});
