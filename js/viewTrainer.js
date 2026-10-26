document.addEventListener("DOMContentLoaded", async () => {
    const trainerList = document.getElementById("trainer-list");

    try {
        const response = await fetch("fetchTrainers.php");
        const data = await response.json();

        if (data.success) {
            data.trainers.forEach(trainer => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${trainer.trainer_name}</td>
                    <td>${trainer.email}</td>
                    <td>${trainer.class_name}</td>
                `;

                trainerList.appendChild(row);
            });
        } else {
            trainerList.innerHTML = "<tr><td colspan='3'>Unable to retrieve trainers.</td></tr>";
        }
    } catch (error) {
        console.error("Error fetching trainer data:", error);
        trainerList.innerHTML = "<tr><td colspan='3'>An error occurred while loading trainers.</td></tr>";
    }
});
