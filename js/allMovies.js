import { fetchAnyUrl, deleteObject } from "./module.js";

console.log("I am in All Movies!!");

const url = "http://localhost:8080/movie";
let movies = []

// Function to fetch and display all movies
async function fetchMovie() {
    try {
        movies = await fetchAnyUrl(url); // Await the Promise
        displayMovies(movies)
    } catch (error) {
        console.error("Error fetching movie:", error);
    }
}

// Function to create a movie list item
function createMovieList(movie) {
    const listItem = document.createElement("li");
    listItem.style.display = "inline-block"; // Set display to inline-block for side-by-side layout
    listItem.style.marginRight = "10px"; // Add some margin between each movie

    // Create an anchor element for each movie
    const anchorElement = createMovieLink(movie);

    // Create a div for movie details
    const detailsDiv = createMovieDetails(movie);

    // Append detailsDiv to the anchor
    anchorElement.appendChild(detailsDiv);

    // Append the anchor to the list item
    listItem.appendChild(anchorElement);

    return listItem;
}

// Function to create a link for each movie
function createMovieLink(movie) {
    const anchorElement = document.createElement("a");
    anchorElement.href = `movieDetails.html?id=${movie.id}`; // Set the URL to navigate to the details page
    anchorElement.style.textDecoration = "none"; // Remove underline for better appearance
    anchorElement.appendChild(createMovieImage(movie));

    return anchorElement;
}

// Function to create an image for each movie
function createMovieImage(movie) {
    const imageElement = document.createElement("img");
    imageElement.src = movie.imageUrl || "https://media.comicbook.com/files/img/default-movie.png"; // Use a default image if imageUrl is not available
    imageElement.alt = movie.title; // Set alt text for accessibility
    imageElement.style.width = "100px"; // Set a fixed width for the image

    return imageElement;
}

// Function to create movie details
function createMovieDetails(movie) {
    const detailsDiv = document.createElement("div");

    // Append title to detailsDiv
    detailsDiv.appendChild(createMovieElement("p", movie.title));

    // Append category, age limit, and duration under the title
    detailsDiv.appendChild(createMovieElement("p", `Category: ${movie.category}`));
    detailsDiv.appendChild(createMovieElement("p", `Age Limit: ${movie.ageLimit}`));
    detailsDiv.appendChild(createMovieElement("p", `Duration: ${movie.duration} minutes`));

    return detailsDiv;
}

// Helper function to create elements with a given type and text
function createMovieElement(elementType, textContent) {
    const element = document.createElement(elementType);
    element.textContent = textContent;
    return element;
}

// Update displayMovies to use the new functions
function displayMovies(movies) {
    const movieList = document.getElementById("movieList");

    // Clear the previous movie list
    movieList.innerHTML = "";

    // Loop through each filtered movie and create list items
    movies.forEach((movie) => {
        const listItem = createMovieList(movie);
        movieList.appendChild(listItem);
    });
}

// Function to filter movies based on selected values
function filterMovies(movies) {
    // Get selected values from dropdowns
    const selectedAgeLimit = document.getElementById("ageLimit").value;
    const selectedCategory = document.getElementById("category").value;

    // Filter movies based on selected values
    const filteredMovies = movies.filter(movie => {
        // Filter based on selectedAgeLimit (if selected) and selectedCategory (if selected)
        return (!selectedAgeLimit || movie.ageLimit === selectedAgeLimit) &&
            (!selectedCategory || movie.category === selectedCategory);
    });

    return filteredMovies;
}


// Event listener for dropdown changes
document.getElementById("ageLimit").addEventListener("change", function() {
    const filteredMovies = filterMovies(movies);
    displayMovies(filteredMovies);
});

document.getElementById("category").addEventListener("change", function() {
    const filteredMovies = filterMovies(movies);
    displayMovies(filteredMovies);
});

// Fetch and display all movies when the page loads
document.addEventListener("DOMContentLoaded", function() {
    const filteredMovies = filterMovies(movies);
    displayMovies(filteredMovies);
    fetchMovie().then(() => {
        // Add your additional actions here
        console.log("fetchMovie has completed.");
        // You can perform any other actions you need here
    });
});


