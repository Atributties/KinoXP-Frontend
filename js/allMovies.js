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

        // Create an image element and set its source to the movie's imageUrl
        const imageElement = document.createElement("img");
        imageElement.src = movie.imageUrl;
        imageElement.alt = movie.title;  // Set alt text for accessibility
        imageElement.style.width = "100px";  // Set a fixed width for the image

        // Append the image and other details to the list item
        listItem.appendChild(imageElement);
        listItem.innerHTML += `Title: ${movie.title} - Category: ${movie.category} - Age Limit: ${movie.ageLimit} - Duration: ${movie.duration} minutes`;

        // Append the list item to the movie list
        movieList.appendChild(listItem);
    });
}

// Fetch and display all movies when the page loads
document.addEventListener("DOMContentLoaded", getAllMovies);

