document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById('name');
    const passwordInput = document.getElementById('password');
    const successMessage = document.getElementById('success-message');
    const generalError = document.getElementById('general-error');

    const username = usernameInput.value;
    const password = passwordInput.value;

    fetch('adminLogin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ name: username, password: password })
    })
        .then(response => response.json())
        .then(data => {
            // Clear previous messages
            successMessage.textContent = "";
            generalError.textContent = "";

            if (data.status === "success") {
                successMessage.textContent = data.message;

                // Show success message for 2 seconds before navigating
                setTimeout(() => {
                    window.location.href = "adminHome.html"; // Redirect to the admin home page
                }, 2000);
            } else {
                generalError.textContent = data.message; // Display error message
                // Clear input fields for retry
                usernameInput.value = "";
                passwordInput.value = "";
            }
        })
        .catch(error => console.error('Error:', error));
});
