import {fetchAnyUrl, deleteObject, createElement} from "./module.js";

console.log("I am in All Movies!!");

const url = "http://localhost:8080/movie";

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
        imageElement.alt = movie.title;
        imageElement.style.width = "100px";
        imageElement.classList.add("mx-auto"); // Center the image

        // Append the image to the anchor
        anchorElement.appendChild(imageElement);

        // Create a div for movie details
        const detailsDiv = document.createElement("div");

        // Append title to detailsDiv
        const titleElement = createElement("p", movie.title);
        detailsDiv.appendChild(titleElement);

        // Append category, age limit, and duration under the title
        const categoryElement = createElement("p",`Category: ${movie.category}`);
        detailsDiv.appendChild(categoryElement);

        const ageLimitElement = document.createElement("p",`Age Limit: ${movie.ageLimit}`);
        detailsDiv.appendChild(ageLimitElement);

        const durationElement = document.createElement("p",`Duration: ${movie.duration} minutes`);
        detailsDiv.appendChild(durationElement);

        // Create buttons for Update and Delete
        const updateButton = createElement("button","Update");
        updateButton.className = "mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center";
        updateButton.onclick = () => {
            const movieIdToUpdate = movie.id;
            window.location.href = `updateMovie.html?id=${movieIdToUpdate}`;
        };

        const deleteButton = createElement("button","Delete");
        deleteButton.className = "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center";
        deleteButton.onclick = () => {
            const confirmMessage = `Are you sure you want to delete the movie "${movie.title}"?`;
            // Show a confirmation dialog
            const userConfirmed = window.confirm(confirmMessage);
            // If the user confirms, proceed with deletion
            if (userConfirmed) {
                deleteObject(movie, url);
                listItem.remove();
            }
        };



        anchorElement.appendChild(detailsDiv);
        listItem.appendChild(anchorElement);
        listItem.appendChild(updateButton);
        listItem.appendChild(deleteButton);
        movieList.appendChild(listItem);
    });
}



let movies = [];
async function fetchMovies() {
    movies = await fetchAnyUrl(url)
    displayMovies(movies)

}


// Fetch and display all movies when the page loads
document.addEventListener("DOMContentLoaded", fetchMovies);

// employeeDashboard.js
document.addEventListener("DOMContentLoaded", function () {
    const createMovieButton = document.getElementById("createMovieButton");
    const createShowtimeButton = document.getElementById("createShowtimeButton");

    createMovieButton.onclick = () => {
        window.location.href = "createMovie.html";
    };

    createShowtimeButton.onclick = () => {
        window.location.href = "createShowtime.html";
    };

    // Add other functionality related to the employee dashboard if needed
});

//Back button that go back to where you come from with history.back()
document.getElementById('backButton').addEventListener('click', function() {
    history.back();
})


