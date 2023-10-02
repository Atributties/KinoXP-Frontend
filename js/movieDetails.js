console.log("I am in Movie Details!!");

// Function to fetch and display details for a specific movie
function getMovieDetails() {
    // Extract movie ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    fetch(`http://localhost:8099/movie/id/${movieId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((movie) => {
            // Display movie details in the HTML
            displayMovieDetails(movie);
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

// Fetch and display movie details when the page loads
document.addEventListener("DOMContentLoaded", getMovieDetails);


