// createReservation.js

import {fetchAnyUrl, postObjectAsJson} from "./module.js";

const seatsContainer = document.getElementById("seatsContainer");
const confirmReservationButton = document.getElementById("confirmReservationButton");
const backToShowtimeButton = document.getElementById("backToShowtimeButton");




let showtimeId
let showtime

async function fetchShowtime() {

    console.log(showtimeId)
    try {
        if (showtimeId) { // Check if showtimeId is valid
            let showtimeUrl = "http://localhost:8080/showtime/" + showtimeId
            showtime = await fetchAnyUrl(showtimeUrl);
            // Call a function to display the showtime and movie details on the page
            displayShowtimeAndMovie(showtime);
            displaySeats(showtime)
        } else {
            console.error("Invalid showtimeId");
        }
    } catch (error) {
        console.error("Error fetching showtime:", error);
    }
}
function displayShowtimeAndMovie(showtime) {
    // Assuming you have elements with specific IDs in your HTML for displaying the data
    const movieDetailsContainer = document.getElementById("movieDetailsContainer");

    if (movieDetailsContainer) {
        // Clear existing content
        movieDetailsContainer.innerHTML = "";

        // Create an image element for the movie
        const image = document.createElement("img");
        image.src = showtime.movie.imageUrl;
        image.alt = showtime.movie.title;
        movieDetailsContainer.appendChild(image);

        // Create a text element for the movie name
        const movieName = document.createElement("h2");
        movieName.textContent = showtime.movie.title;
        movieDetailsContainer.appendChild(movieName);
    }
}



function displaySeats(showtime) {
    const seatsTable = document.createElement("table");
    seatsTable.classList.add("seats-table"); // Add a CSS class for styling

    // Create a CSS class for the table cells
    const cellClass = "seat-cell"; // Define a class for table cells

    // Calculate the number of columns (e.g., 10 columns)
    const numColumns = 15;

    // Loop through the seats in the showtime and create table rows for each seat
    let rowIndex = 0;
    let currentRow = null;

    showtime.seatDTOS.forEach((seat, index) => {
        if (index % numColumns === 0) {
            // Create a new row for the next set of columns
            currentRow = seatsTable.insertRow(rowIndex++);
        }

        // Create a cell for the seat image
        const seatImageCell = currentRow.insertCell(index % numColumns);
        seatImageCell.classList.add(cellClass); // Apply the cell class

        const seatImage = document.createElement("img");
        seatImage.src = "img/pngegg.png"; // Update with the correct image URL
        seatImage.alt = `Seat ${seat.id}`;
        seatImageCell.appendChild(seatImage);

        // Add a click event listener to toggle the seat color and status
        seatImageCell.addEventListener("click", () => {
            if (seat.status === "AVAILABLE") {
                seatImageCell.style.backgroundColor = "orange";
                seat.status = "RESERVED"; // Update the seat status
            } else if (seat.status === "RESERVED") {
                seatImageCell.style.backgroundColor = "green";
                seat.status = "AVAILABLE"; // Update the seat status
            }
        });

        // Set initial seat color based on the seat status
        if (seat.status === "AVAILABLE") {
            seatImageCell.style.backgroundColor = "green";
        } else {
            seatImageCell.style.backgroundColor = "orange";
        }
    });

    // Append the table to the seatsContainer
    const seatsContainer = document.getElementById("seatsContainer");
    seatsContainer.innerHTML = ""; // Clear existing content
    seatsContainer.appendChild(seatsTable);
}





confirmReservationButton.addEventListener("click", () => {
    // Implement the logic for confirming the reservation
    // You can use data from the selected seats to proceed with the reservation
});

backToShowtimeButton.addEventListener("click", () => {
    // Navigate back to the showtime page
    window.location.href = `showtime.html?showtimeId=${showtimeId}`;
});

// Fetch and display showtime and seats when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    showtimeId = urlParams.get("showtimeId");
    fetchShowtime();
});






