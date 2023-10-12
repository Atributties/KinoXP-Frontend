import {fetchAnyUrl, deleteObject} from "./module.js";

console.log("I am in Movie Details!!");

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const movieUrl = "http://localhost:8080/movie"
const showtimeUrl = "http://localhost:8080/showtimes"
let movie;
let showtimes = []


async function fetchMovie() {
    const updateUrl = movieUrl + "/" + movieId;
    try {
        movie = await fetchAnyUrl(updateUrl);
        displayMovieDetails(movie);
        // Fetch and display showtimes for the movie
        await fetchShowtimes();
    } catch (error) {
        console.error("Error fetching movie:", error);
    }
}

// Function to display movie details in the HTML
function displayMovieDetails(movie) {
    const movieDetails = document.getElementById("movieDetails");

    // Clear previous movie details
    movieDetails.innerHTML = "";

    // Create elements to display movie details
    const titleElement = document.createElement("h2");
    titleElement.classList.add("text-4xl", "mb-4")
    titleElement.textContent = movie.title;

    const imageElement = document.createElement("img");
    imageElement.src = movie.imageUrl || "https://media.comicbook.com/files/img/default-movie.png";// Use default image if imageUrl is not available
    imageElement.classList.add("mx-auto"); // Center the image
    imageElement.style.maxWidth = "150px";

    const categoryElement = document.createElement("p");
    categoryElement.textContent = `Category: ${movie.category}`;

    const ageLimitElement = document.createElement("p");
    ageLimitElement.textContent = `Age Limit: ${movie.ageLimit}`;

    const durationElement = document.createElement("p");
    durationElement.textContent = `Duration: ${movie.duration} minutes`;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = `Description: ${movie.description}`;

    // Append elements to the movieDetails div
    movieDetails.appendChild(titleElement);
    movieDetails.appendChild(imageElement);
    movieDetails.appendChild(categoryElement);
    movieDetails.appendChild(ageLimitElement);
    movieDetails.appendChild(durationElement);
    movieDetails.appendChild(descriptionElement);
}

// Function to fetch and display showtimes for a specific movie
// Function to fetch and display showtimes for a specific movie
async function fetchShowtimes() {
    try {
        showtimes = await fetchAnyUrl(showtimeUrl); // Await the Promise

        // Log the showtimes to the console
        console.log("Fetched Showtimes:", showtimes);

        displayShowtimes(showtimes);
    } catch (error) {
        console.error("Error fetching showtimes:", error);
    }
}



function displayShowtimes(showtimes) {
    const showtimeContainer = document.getElementById("showtimeContainer");

    // Filtrer showtimes baseret på det matchende movieid
    const matchingShowtimes = showtimes.filter(showtime => showtime.movie.id === parseInt(movieId));

    // Tjek om der er nogen matchende showtimes
    if (matchingShowtimes.length === 0) {
        showtimeContainer.innerHTML = "Ingen showtimes fundet for denne film.";
        return;
    }

    // Opret HTML-elementer for hver matchende showtime
    const showtimeList = document.createElement("ul");
    matchingShowtimes.forEach(showtime => {
        const showtimeItem = document.createElement("li");
        const showtimeDateTime = new Date(`${showtime.date} ${showtime.time}`);
        const formattedDateTime = showtimeDateTime.toLocaleString(); // Brug denne funktion til at formatere datoen og tiden

        // Opret en ankellink og tilføj et data-attribut til det for at gemme showtime ID
        const showtimeLink = document.createElement("a");
        showtimeLink.href = "#"; // Her kan du tilføje den ønskede linkdestination
        showtimeLink.dataset.showtimeId = showtime.id; // Gem showtime ID som et data-attribut

        // Lyt efter klik på ankellinket og send showtime ID
        showtimeLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default link behavior
            const showtimeId = showtime.id; // Get the showtime ID
            console.log("Moviedetaisl" + showtimeId)
            window.location.href = `showShowtime.html?showtimeId=${showtimeId}`; // Include showtimeId in the URL
        });
        showtimeLink.textContent = `Date And Time: ${formattedDateTime}`;
        showtimeItem.appendChild(showtimeLink);
        showtimeList.appendChild(showtimeItem);
    });

    // Tilsæt showtimeList til showtimeContainer
    showtimeContainer.innerHTML = "";
    showtimeContainer.appendChild(showtimeList);
}




// Fetch and display movie details when the page loads
document.addEventListener("DOMContentLoaded", fetchMovie);

//Back button that go back to where you come from with history.back()
document.getElementById('backButton').addEventListener('click', function() {
    history.back();
})

