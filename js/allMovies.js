console.log("I am in All Movies!!");

// Function to fetch and display all movies
function getAllMovies() {
    fetch("http://localhost:8099/movie")
        .then((response) => response.json())
        .then((movies) => {
            // Display movies in the HTML
            displayMovies(movies);
        })
        .catch((error) => {
            // Handle errors
            console.error("Error fetching movies:", error);
            alert("Error fetching movies. Please try again.");
        });
}

// Function to display movies in the HTML
function displayMovies(movies) {
    const movieList = document.getElementById("movieList");

    // Clear previous movie list
    movieList.innerHTML = "";

    // Loop through each movie and create list items
    movies.forEach((movie) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${movie.title} - Category: ${movie.category} - Age Limit: ${movie.ageLimit} - Duration: ${movie.duration} minutes`;
        movieList.appendChild(listItem);
    });
}

// Fetch and display all movies when the page loads
document.addEventListener("DOMContentLoaded", getAllMovies);
