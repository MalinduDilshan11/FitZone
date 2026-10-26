$(document).ready(function () {
    $('#contactForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting the default way
        $.ajax({
            type: 'POST',
            url: 'submit_feedback.php', // Same file as before
            data: $(this).serialize(), // Serialize form data
            success: function (response) {
                $('#successMessage').text(response).show(); // Show success message
                $('#contactForm')[0].reset(); // Reset form fields

                // Hide the success message after 2 seconds
                setTimeout(function () {
                    $('#successMessage').fadeOut(); // Fade out the success message
                }, 2000); // 3000 milliseconds = 2 seconds
            }
        });
    });
});
