import { fetchAnyUrl, deleteObject, createElement, showMovieDetails } from "./module.js";
import { fetchAgeLimits, fetchMovieCategories } from "./moduleFetchEnums.js";

console.log("I am in All Movies!!");
const gotoEmployeeDashBoardButton = document.getElementById("gotoEmployeeDashboard");
const loginButton = document.getElementById("login-button");

const url = "http://localhost:8080/movie";
let movies = [];

// Function to fetch and display all movies
async function fetchMovies() {
    try {
        movies = await fetchAnyUrl(url);
        displayMovies(movies);
    } catch (error) {
        console.error("Error fetching movie:", error);
    }
}

// Function to create a movie list item
function createMovieList(movie) {
    const listItem = document.createElement("li");
    listItem.style.display = "inline-block";
    listItem.style.marginRight = "10px";

    // Create an anchor element for each movie
    const anchorElement = createMovieLink(movie);

    // Create a div for movie details
    const detailsDiv = showMovieDetails(movie);

    // Append detailsDiv to the anchor
    anchorElement.appendChild(detailsDiv);

    // Append the anchor to the list item
    listItem.appendChild(anchorElement);

    // Add buttons for Update and Delete
    const updateButton = createUpdateButton(movie);
    const deleteButton = createDeleteButton(movie);

    listItem.appendChild(updateButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

// Function to create a link for each movie
function createMovieLink(movie) {
    const anchorElement = document.createElement("a");
    anchorElement.href = `movieDetails.html?id=${movie.id}`;
    anchorElement.style.textDecoration = "none";
    anchorElement.appendChild(createMovieImage(movie));

    return anchorElement;
}

// Function to create an image for each movie
function createMovieImage(movie) {
    const imageElement = document.createElement("img");
    imageElement.src = movie.imageUrl || "https://media.comicbook.com/files/img/default-movie.png";
    imageElement.alt = movie.title;
    imageElement.style.width = "100px";
    imageElement.classList.add("mx-auto");

    return imageElement;
}

// Function to create an "Update" button for a movie
function createUpdateButton(movie) {
    const updateButton = createElement("button", "Update");
    updateButton.className = "mr-2 bg-gray-300 hover-bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center";
    updateButton.onclick = () => {
        const movieIdToUpdate = movie.id;
        window.location.href = `updateMovie.html?id=${movieIdToUpdate}`;
    };

    return updateButton;
}

// Function to create a "Delete" button for a movie
function createDeleteButton(movie) {
    const deleteButton = createElement("button", "Delete");
    deleteButton.className = "bg-gray-300 hover-bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center";
    deleteButton.onclick = () => {
        const confirmMessage = `Are you sure you want to delete the movie "${movie.title}"?`;
        const userConfirmed = window.confirm(confirmMessage);
        if (userConfirmed) {
            deleteObject(movie, url);
            // Optionally, you can remove the item from the list
            listItem.remove();
        }
    };

    return deleteButton;
}

// Update displayMovies to use the new functions
function displayMovies(movies) {
    const movieList = document.getElementById("movieList");
    movieList.innerHTML = "";

    movies.forEach((movie) => {
        const listItem = createMovieList(movie);
        movieList.appendChild(listItem);
    });
}

// Function to filter movies based on selected values
function filterMovies(movies) {
    const selectedCategory = document.getElementById("category").value;
    const selectedAgeLimit = document.getElementById("ageLimit").value;

    if (selectedCategory === "All" && selectedAgeLimit === "All") {
        return movies;
    }

    return movies.filter((movie) => {
        return (
            (selectedCategory === "All" || movie.category === selectedCategory || selectedCategory === "") &&
            (selectedAgeLimit === "All" || movie.ageLimit === selectedAgeLimit || selectedAgeLimit === "")
        );
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    await fetchMovieCategories();
    await fetchAgeLimits();

    document.getElementById("ageLimit").addEventListener("change", function () {
        const filteredMovies = filterMovies(movies);
        displayMovies(filteredMovies);
    });

    document.getElementById("category").addEventListener("change", function () {
        const filteredMovies = filterMovies(movies);
        displayMovies(filteredMovies);
    });
});

// Fetch and display all movies when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const filteredMovies = filterMovies(movies);
    displayMovies(filteredMovies);
    fetchMovies().then(() => {
        console.log("fetchMovies has completed.");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");
    const gotoEmployeeDashboardButton = document.getElementById("gotoEmployeeDashboard");

    loginButton.onclick = () => {
        window.location.href = "login.html";
    };

    gotoEmployeeDashboardButton.onclick = () => {
        window.location.href = "employeeDashboard.html"; // Corrected destination
    };
});

// Functionality for the "Create Movie" and "Create Showtime" buttons
document.getElementById("createMovieButton").addEventListener("click", function () {
    window.location.href = "createMovie.html";
});

document.getElementById("createShowtimeButton").addEventListener("click", function () {
    window.location.href = "createShowtime.html";
});

