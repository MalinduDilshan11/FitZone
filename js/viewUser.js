// Function to fetch and display user data
async function fetchUserData() {
    try {
        const response = await fetch('fetchUsers.php');
        const data = await response.json();
        const userDataTable = document.getElementById('user-data');

        if (data.status === 'success' && data.users.length > 0) {
            data.users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.nic}</td>
                    <td>${user.email}</td>
                    <td>${user.phone_number}</td>
                    <td>${user.gender}</td>
                `;
                userDataTable.appendChild(row);
            });
        } else {
            userDataTable.innerHTML = `<tr><td colspan="5">No users found.</td></tr>`;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        document.getElementById('user-data').innerHTML = `<tr><td colspan="5">Error loading data.</td></tr>`;
    }
}

// Call fetchUserData when the page loads
window.onload = fetchUserData;
