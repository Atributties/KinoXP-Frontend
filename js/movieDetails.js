console.log("I am in Movie Details!!");

// Function to fetch and display details for a specific movie
function getMovieDetails() {
    // Extract movie ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    fetch(`http://localhost:8080/movie/id/${movieId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((movie) => {
            // Display movie details in the HTML
            displayMovieDetails(movie);
            // Fetch and display showtimes for the movie
            getShowtimesForMovie(movieId);
        })
        .catch((error) => {
            // Handle errors
            console.error("Error fetching movie details:", error);
            alert("Error fetching movie details. Please try again.");
        });
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
function getShowtimesForMovie(movieId) {
    fetch(`http://localhost:8080/showtime/movie/${movieId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((showtimes) => {
            // Display showtimes in the HTML
            displayShowtimes(showtimes);
        })
        .catch((error) => {
            // Handle errors
            console.error("Error fetching showtimes:", error);
            alert("Error fetching showtimes. Please try again.");
        });
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
document.addEventListener("DOMContentLoaded", getMovieDetails);

