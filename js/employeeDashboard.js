console.log("I am in All Movies!!");

// Function to fetch and display all movies
function getAllMovies() {
    fetch("http://localhost:8080/movie")
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
function deleteMovie(id) {
    fetch(`http://localhost:8080/movie/${id}`, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.ok) {
                console.log("Movie deleted successfully!");
                alert("Movie deleted successfully!");
                location.reload();
            } else {
                console.error("Error deleting movie. Server returned:", response.status, response.statusText);
                alert("Error deleting movie. Please try again.");
            }
        })
        .catch((error) => {
            // Handle other errors (e.g., network issues)
            console.error("Error deleting movie:", error);
            alert("Error deleting movie. Please try again.");
        });
}


// Function to display movies in the HTML
function displayMovies(movies) {
    const movieList = document.getElementById("movieList");

    // Clear previous movie list
    movieList.innerHTML = "";

    // Get selected values from dropdowns
    const selectedAgeLimit = document.getElementById("ageLimit").value;
    const selectedCategory = document.getElementById("category").value;

    // Filter movies based on selected values
    const filteredMovies = movies.filter(movie => {
        return (!selectedAgeLimit || movie.ageLimit === selectedAgeLimit) &&
            (!selectedCategory || movie.category === selectedCategory);
    });

    // Loop through each filtered movie and create list items
    filteredMovies.forEach((movie) => {
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

        // Create buttons for Update and Delete
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.onclick = () => {
            // Handle update action, e.g., open a modal or navigate to an update page
            // You can use movie.id to identify the movie being updated
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => {
            const movieIdToDelete = movie.id;
            const confirmMessage = `Are you sure you want to delete the movie "${movie.title}"?`;

            // Show a confirmation dialog
            const userConfirmed = window.confirm(confirmMessage);

            // If the user confirms, proceed with deletion
            if (userConfirmed) {
                deleteMovie(movieIdToDelete);
            }
        };


        anchorElement.appendChild(detailsDiv);
        listItem.appendChild(anchorElement);
        listItem.appendChild(updateButton);
        listItem.appendChild(deleteButton);
        movieList.appendChild(listItem);
    });
}

// Event listener for dropdown changes
document.getElementById("ageLimit").addEventListener("change", getAllMovies);
document.getElementById("category").addEventListener("change", getAllMovies);

// Fetch and display all movies when the page loads
document.addEventListener("DOMContentLoaded", getAllMovies);
