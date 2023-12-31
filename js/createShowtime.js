import { fetchAnyUrl, postObjectAsJson } from "./module.js";
const movieUrl = "http://localhost:8080/movie"
const showtimeUrl = "http://localhost:8080/showtime"
const theaterUrl = "http://localhost:8080/theaters"
let movies = [];
let theaters = [];
const movieSelect = document.getElementById("movieSelect");
const showtimeForm = document.getElementById("showtimeForm");
const theaterSelect = document.getElementById("theaterSelect");



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

// Function to fetch and display all movies
async function fetchTheaters() {
    try {
        theaters = await fetchAnyUrl(theaterUrl); // Await the Promise
        await fillDropdownWithTheater(theaters)
    } catch (error) {
        console.error("Error fetching theater:", error);
    }
}

async function fillDropdownWithTheater(theaters) {
    theaters.forEach(theater => {
        const option = document.createElement("option");
        option.value = theater.id;
        option.textContent = theater.theaterName;
        theaterSelect.appendChild(option);
    });
}




async function createShowtime(event) {
    debugger
    event.preventDefault();

    const movieId = document.getElementById("movieSelect").value;
    const date = document.getElementById("dateInput").value;
    const time = document.getElementById("timeInput").value;
    const theaterId = document.getElementById("theaterSelect").value;

    const showtime = {
        date: date,
        time: time,
        theater: { id: theaterId},
        movie: { id: movieId}
    };

    try {
        const resp = await postObjectAsJson(showtimeUrl, showtime, "POST");
        console.log("Showtime created successfully:", resp);
        window.location.href = "empoloyeeDashboard.html";
        showtimeForm.reset(); // Reset the form
        return resp;
    } catch (error) {
        console.error("Error creating showtime:", error);
        return null; // Handle the error as needed
    }
}


// Fetch movies when the page loads
document.addEventListener("DOMContentLoaded", fetchMovies, fetchTheaters());

showtimeForm.addEventListener("submit", createShowtime);

//Back button that go back to where you come from with history.back()
document.getElementById('backButton').addEventListener('click', function() {
    history.back();
})



