document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("fetch_appointments.php");
    const appointments = await response.json();

    const appointmentList = document.getElementById("appointment-list");

    if (appointments.length > 0) {
        appointments.forEach(appointment => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${appointment.user_email}</td>
                <td>${appointment.appointment_date}</td>
                <td>${appointment.class_type}</td>
            `;
            appointmentList.appendChild(row);
        });
    } else {
        const row = document.createElement("tr");
        row.innerHTML = "<td colspan='3'>No appointments found.</td>";
        appointmentList.appendChild(row);
    }
});
