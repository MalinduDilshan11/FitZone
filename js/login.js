document.getElementById('login-form').addEventListener('submit', function (event) {
    // Prevent default form submission
    event.preventDefault();

    // Clear previous messages
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('success-message').textContent = '';
    document.getElementById('general-error').textContent = '';

    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    let hasError = false;

    // Validate email
    if (email === '') {
        document.getElementById('email-error').textContent = 'Email is required.';
        hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('email-error').textContent = 'Invalid email format.';
        hasError = true;
    }

    // Validate password
    if (password === '') {
        document.getElementById('password-error').textContent = 'Password is required.';
        hasError = true;
    }

    // If no errors, submit the form
    if (!hasError) {
        const formData = new FormData(this);

        // Send data using fetch
        fetch('login.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    document.getElementById('success-message').textContent = data.message;
                    setTimeout(() => {
                        window.location.href = 'about.html'; // Redirect to about.html
                    }, 1000);
                } else {
                    // Display general error messages
                    if (data.errors) {
                        if (data.errors.email) {
                            document.getElementById('email-error').textContent = data.errors.email;
                        }
                        if (data.errors.password) {
                            document.getElementById('password-error').textContent = data.errors.password;
                        }
                    }
                    if (data.general) {
                        document.getElementById('general-error').textContent = data.general;
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('general-error').textContent = "An unexpected error occurred. Please try again.";
            });
    }
});
