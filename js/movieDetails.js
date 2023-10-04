import {fetchAnyUrl, deleteObject} from "./module.js";

console.log("I am in Movie Details!!");

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const movieUrl = "http://localhost:8080/movie"
const showtimeUrl = "http://localhost:8080/showtime"
let movie;
let showtimes = []


async function fetchMovie() {
    const updateUrl = movieUrl + "/" + movieId;
    try {
        movie = await fetchAnyUrl(updateUrl);
        displayMovieDetails(movie);
        // Fetch and display showtimes for the movie
        fetchShowtimes();
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
    titleElement.textContent = movie.title;

    const imageElement = document.createElement("img");
    imageElement.src = movie.imageUrl || "https://media.comicbook.com/files/img/default-movie.png";// Use default image if imageUrl is not available
    imageElement.style.maxWidth = "100px"; // Set a fixed width for the image

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
async function fetchShowtimes() {
    const getShowtimesUrl = showtimeUrl + "/" + movieId;
    try {
        showtimes = await fetchAnyUrl(getShowtimesUrl); // Await the Promise
        displayShowtimes(showtimes);
    } catch (error) {
        console.error("Error fetching movie:", error);
    }
}

// Function to display showtimes in the HTML
function displayShowtimes(showtimes) {
    const showtimeContainer = document.getElementById("showtimeContainer");

    // Create elements to display showtimes
    const showtimesTitle = document.createElement("h3");
    showtimesTitle.textContent = "Showtimes";

    // Append title to the showtimeContainer
    showtimeContainer.appendChild(showtimesTitle);

    // Create a list to display showtimes
    const showtimesList = document.createElement("ul");

    // Iterate through showtimes and create list items
    showtimes.forEach((showtime) => {
        const showtimeItem = document.createElement("li");
        showtimeItem.textContent = `${showtime.date} - ${showtime.time}`;
        showtimesList.appendChild(showtimeItem);
    });

    // Append the list to the showtimeContainer
    showtimeContainer.appendChild(showtimesList);
}

// Fetch and display movie details when the page loads
document.addEventListener("DOMContentLoaded", fetchMovie);

