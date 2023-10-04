import { fetchAnyUrl, postObjectAsJson } from "./module.js";
const movieUrl = "http://localhost:8080/movie"
const showtimeUrl = "http://localhost:8080/showtime"
let movies = [];
const movieSelect = document.getElementById("movieSelect");
const showtimeForm = document.getElementById("showtimeForm");


// Function to fetch and display all movies
async function fetchMovies() {
    try {
        movies = await fetchAnyUrl(movieUrl); // Await the Promise
        await fillDropdownWithMovieTitles(movies)
    } catch (error) {
        console.error("Error fetching movie:", error);
    }
}


async function fillDropdownWithMovieTitles(movies) {
    movies.forEach(movie => {
        const option = document.createElement("option");
        option.value = movie.id;
        option.textContent = movie.title;
        movieSelect.appendChild(option);
    });
}


async function createShowtime(event) {
    event.preventDefault();

    const movieId = document.getElementById("movieSelect").value;
    const date = document.getElementById("dateInput").value;
    const time = document.getElementById("timeInput").value;

    const showtime = {
        date: date,
        time: time,
        movie: { id: movieId}
    };

    try {
        const resp = await postObjectAsJson(showtimeUrl, showtime, "POST");
        console.log("Showtime created successfully:", resp);
        showtimeForm.reset(); // Reset the form
        return resp;
    } catch (error) {
        console.error("Error creating showtime:", error);
        return null; // Handle the error as needed
    }
}


// Fetch movies when the page loads
document.addEventListener("DOMContentLoaded", fetchMovies);

showtimeForm.addEventListener("submit", createShowtime);



