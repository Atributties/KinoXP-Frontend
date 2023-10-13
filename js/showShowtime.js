import { fetchAnyUrl } from "./module.js";

let showtimeId;
let showtime;



async function fetchShowtime() {

    console.log(showtimeId)
    try {
        if (showtimeId) { // Check if showtimeId is valid
            let showtimeUrl = "http://localhost:8080/showtime/" + showtimeId
            showtime = await fetchAnyUrl(showtimeUrl);
            // Call a function to display the showtime and movie details on the page
            displayShowtimeAndMovie(showtime);
        } else {
            console.error("Invalid showtimeId");
        }
    } catch (error) {
        console.error("Error fetching showtime:", error);
    }
}


function displayShowtimeAndMovie(showtime) {
    // Assuming you have elements with specific IDs in your HTML for displaying the data
    const showtimeContainer = document.getElementById("showtimeContainer");
    if (showtimeContainer) {
        // Create a container for the left side (image)
        const leftContainer = document.createElement("div");
        leftContainer.classList.add("left-container"); // Add a CSS class for styling

        // Create a container for the right side (text)
        const rightContainer = document.createElement("div");
        rightContainer.classList.add("right-container"); // Add a CSS class for styling

        // Create an image element and set its source
        const image = document.createElement("img");
        image.src = showtime.movie.imageUrl;
        image.alt = showtime.movie.title;
        leftContainer.appendChild(image);

        // Create text content for the right side
        const rightContent = document.createElement("div");
        rightContent.innerHTML = `
            <h1>Showtime Details</h1>
            <p>Showtime ID: ${showtime.id}</p>
            <p>Date: ${showtime.date}</p>
            <p>Time: ${showtime.time}</p>
            <p>Theater Name: ${showtime.theaterName}</p>
            
            <h2>Movie Details</h2>
            <p>Movie ID: ${showtime.movie.id}</p>
            <p>Title: ${showtime.movie.title}</p>
            <p>Category: ${showtime.movie.category}</p>
            <p>Age Limit: ${showtime.movie.ageLimit}</p>
            <p>Duration: ${showtime.movie.duration} minutes</p>
            <p>Description: ${showtime.movie.description}</p>
        `;
        rightContainer.appendChild(rightContent);

        // Append the left and right containers to the main showtime container
        showtimeContainer.innerHTML = ""; // Clear existing content
        showtimeContainer.appendChild(leftContainer);
        showtimeContainer.appendChild(rightContainer);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    showtimeId = urlParams.get("showtimeId");
    fetchShowtime(); // Fetch and display showtime details
});

//Back button that go back to where you come from with history.back()
document.getElementById('backButton').addEventListener('click', function() {
    history.back();
})
document.getElementById('CreateReservationButton').addEventListener('click', function() {
    window.location.href = `createReservation.html?showtimeId=${showtimeId}`;
});


