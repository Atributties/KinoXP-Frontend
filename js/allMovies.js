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
// Function to display movies in the HTML
function displayMovies(movies) {
    const movieList = document.getElementById("movieList");

    // Clear previous movie list
    movieList.innerHTML = "";

    // Loop through each movie and create list items
    movies.forEach((movie) => {
        // Create an anchor element for each movie
        const anchorElement = document.createElement("a");
        anchorElement.href = `movieDetails.html?id=${movie.id}`; // Set the URL to navigate to details page
        anchorElement.style.textDecoration = "none"; // Remove underline for better appearance

        const listItem = document.createElement("li");
        listItem.style.display = "inline-block"; // Set display to inline-block for side-by-side layout
        listItem.style.marginRight = "10px"; // Add some margin between each movie

        // Create an image element and set its source to the movie's imageUrl
        const imageElement = document.createElement("img");
        imageElement.src = movie.imageUrl || "https://media.comicbook.com/files/img/default-movie.png"; // Use default image if imageUrl is not available
        imageElement.alt = movie.title; // Set alt text for accessibility
        imageElement.style.width = "100px"; // Set a fixed width for the image

        // Append the image to the anchor
        anchorElement.appendChild(imageElement);

        // Create a div for movie details
        const detailsDiv = document.createElement("div");

        // Append title to detailsDiv
        const titleElement = document.createElement("p");
        titleElement.textContent = movie.title;
        detailsDiv.appendChild(titleElement);

        // Append category, age limit, and duration under the title
        const categoryElement = document.createElement("p");
        categoryElement.textContent = `Category: ${movie.category}`;
        detailsDiv.appendChild(categoryElement);

        const ageLimitElement = document.createElement("p");
        ageLimitElement.textContent = `Age Limit: ${movie.ageLimit}`;
        detailsDiv.appendChild(ageLimitElement);

        const durationElement = document.createElement("p");
        durationElement.textContent = `Duration: ${movie.duration} minutes`;
        detailsDiv.appendChild(durationElement);

        // Append detailsDiv to the anchor
        anchorElement.appendChild(detailsDiv);

        // Append the anchor to the list item
        listItem.appendChild(anchorElement);

        // Append the list item to the movie list
        movieList.appendChild(listItem);
    });
}


// Fetch and display all movies when the page loads
document.addEventListener("DOMContentLoaded", getAllMovies);

