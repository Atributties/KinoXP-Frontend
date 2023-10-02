console.log("I am in Movie Details!!");

// Function to fetch and display details for a specific movie
function getMovieDetails() {
    // Extract movie ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    fetch(`http://localhost:8099/movie/${movieId}`)
        .then((response) => response.json())
        .then((movieArray) => {
            // Display movie details in the HTML
            displayMovieDetails(movieArray);
        })
        .catch((error) => {
            // Handle errors
            console.error("Error fetching movie details:", error);
            alert("Error fetching movie details. Please try again.");
        });
}

// Function to display movie details in the HTML
function displayMovieDetails(movieArray) {
    if (movieArray && movieArray.length > 0) {
        // Extract the movie object from the array
        const movie = movieArray[0];

        const movieDetails = document.getElementById("movieDetails");

        // Create elements to display movie details
        const titleElement = document.createElement("h2");
        titleElement.textContent = movie.title;

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
        movieDetails.appendChild(categoryElement);
        movieDetails.appendChild(ageLimitElement);
        movieDetails.appendChild(durationElement);
        movieDetails.appendChild(descriptionElement);
    } else {
        // Handle case where movieArray is empty or undefined
        console.error("Movie details not found.");
        alert("Movie details not found. Please try again.");
    }
}


// Fetch and display movie details when the page loads
document.addEventListener("DOMContentLoaded", getMovieDetails);

