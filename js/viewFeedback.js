// viewFeedback.js

// Fetch feedback data from viewFeedback.php
fetch('viewFeedback.php')
    .then(response => response.json())
    .then(data => {
        const feedbackList = document.getElementById('feedback-list');
        feedbackList.innerHTML = ''; // Clear the loading message

        if (data) {
            data.forEach(feedback => {
                const feedbackItem = document.createElement('div');
                feedbackItem.className = 'feedback-item';
                feedbackItem.innerHTML = `
                    <h3>${feedback.filename}</h3>
                    <p><strong>Email:</strong> ${feedback.email}</p>
                    <p><strong>Feedback:</strong> ${feedback.comment.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
                `;
                feedbackList.appendChild(feedbackItem);
            });
        } else {
            feedbackList.innerHTML = '<p>No feedback available.</p>'; // Handle no feedback case
        }
    })
    .catch(error => {
        console.error('Error fetching feedback:', error);
        document.getElementById('feedback-list').innerHTML = '<p>Error loading feedback.</p>';
    });
