// createReservation.js

import { fetchAnyUrl, postObjectAsJson } from "./module.js";

const seatsContainer = document.getElementById("seatsContainer");
const confirmReservationButton = document.getElementById("confirmReservationButton");
const backToShowtimeButton = document.getElementById("backToShowtimeButton");

const postReservationUrl = "http://localhost:8080/reservation";

const userDetails = JSON.parse(localStorage.getItem('userDetails'));
const urlParams = new URLSearchParams(window.location.search);
let showtimeId = urlParams.get("showtimeId");
let showtime;
const selectedSeats = [];

async function fetchShowtime() {
    try {
        if (showtimeId) { // Check if showtimeId is valid
            let showtimeUrl = "http://localhost:8080/showtime/" + showtimeId;
            showtime = await fetchAnyUrl(showtimeUrl);
            displayShowtimeAndMovie(showtime);
            displaySeats(showtime);
        } else {
            console.error("Invalid showtimeId");
        }
    } catch (error) {
        console.error("Error fetching showtime:", error);
    }
}

function displayShowtimeAndMovie(showtime) {
    const movieDetailsContainer = document.getElementById("movieDetailsContainer");
    if (movieDetailsContainer) {
        movieDetailsContainer.innerHTML = "";

        const image = document.createElement("img");
        image.src = showtime.movie.imageUrl;
        image.alt = showtime.movie.title;
        movieDetailsContainer.appendChild(image);

        const movieName = document.createElement("h2");
        movieName.textContent = showtime.movie.title;
        movieDetailsContainer.appendChild(movieName);
    }
}

function displaySeats(showtime) {
    const seatsTable = document.createElement("table");
    seatsTable.classList.add("seats-table");

    const cellClass = "seat-cell";
    const numColumns = 15;

    let rowIndex = 0;
    let currentRow = null;

    showtime.seatDTOS.forEach((seat, index) => {
        if (index % numColumns === 0) {
            currentRow = seatsTable.insertRow(rowIndex++);
        }

        const seatImageCell = currentRow.insertCell(index % numColumns);
        seatImageCell.classList.add(cellClass);

        const seatImage = document.createElement("img");
        seatImage.src = "img/pngegg.png";
        seatImage.alt = `Seat ${seat.id}`;
        seatImageCell.appendChild(seatImage);

        seatImageCell.addEventListener("click", () => {
            if (seat.status === "AVAILABLE") {
                seatImageCell.style.backgroundColor = "orange";
                seat.status = "RESERVED";
                selectedSeats.push(seat);
            } else if (seat.status === "RESERVED") {
                seatImageCell.style.backgroundColor = "green";
                seat.status = "AVAILABLE";
                const index = selectedSeats.findIndex(selectedSeat => selectedSeat.id === seat.id);
                if (index !== -1) {
                    selectedSeats.splice(index, 1);
                }
            }
            console.log(selectedSeats);
        });

        if (seat.status === "AVAILABLE") {
            seatImageCell.style.backgroundColor = "green";
        } else {
            seatImageCell.style.backgroundColor = "red";
        }
    });

    const seatsContainer = document.getElementById("seatsContainer");
    seatsContainer.innerHTML = "";
    seatsContainer.appendChild(seatsTable);
}

async function createReservation() {
    if (userDetails) {
        const reservationData = {
            user: userDetails.id,
            showtime: showtime.id,
            seatReservations: selectedSeats,
        };

        try {
            const response = await postReservation(reservationData);

            if (response.status === 201) {
                // Reservation was created successfully; redirect to the index page
                window.location.href = "index.html"; // Update the URL as needed
            } else {
                console.error("Error creating reservation:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating reservation:", error);
        }
    } else {
        console.error("User is not logged in. Please log in to create a reservation.");
    }
}

async function postReservation(reservation) {
    debugger
    try {
        const resp = await postObjectAsJson(postReservationUrl, reservation, "POST");
        return resp;
    } catch (error) {
        console.error("Error creating reservation:", error);
        throw error;
    }
}

confirmReservationButton.addEventListener("click", createReservation);

backToShowtimeButton.addEventListener("click", () => {
    window.location.href = `showtime.html?showtimeId=${showtimeId}`;
});

document.addEventListener("DOMContentLoaded", () => {
    fetchShowtime();
});

document.addEventListener("DOMContentLoaded", () => {
    console.log(selectedSeats);
});
