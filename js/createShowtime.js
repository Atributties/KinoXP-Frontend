// Fetch movies and populate the dropdown
function fetchMovies() {
    fetch("http://localhost:8080/movie/titles")
        .then(response => response.json())
        .then(movies => {
            const movieSelect = document.getElementById("movieSelect");
            movies.forEach(movie => {
                const option = document.createElement("option");
                option.value = movie.id;
                option.textContent = movie.title;
                movieSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error fetching movies:", error);
            alert("Error fetching movies. Please try again.");
        });
}

// Function to create a showtime
function createShowtime() {
    const movieId = document.getElementById("movieSelect").value;
    const date = document.getElementById("dateInput").value;
    const time = document.getElementById("timeInput").value;

    const showtimeData = {
        id: 0, // You may need to generate a unique ID on the server side
        date: date,
        time: time,
        movie: { id: parseInt(movieId) } // Movie object with just the ID
    };

    // Send a POST request to create the showtime
    fetch("http://localhost:8080/showtime", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(showtimeData)
    })
        .then(response => response.json())
        .then(createdShowtime => {
            console.log("Showtime created:", createdShowtime);
            alert("Showtime created successfully!");
        })
        .catch(error => {
            console.error("Error creating showtime:", error);
            alert("Error creating showtime. Please try again.");
        });
}

// Fetch movies when the page loads
document.addEventListener("DOMContentLoaded", fetchMovies);



