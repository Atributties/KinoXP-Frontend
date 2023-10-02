console.log("i am in create Movie!!");
const movieForm = document.getElementById("movieForm");

function createMovie(event) {
    event.preventDefault();

    const movie = {
        title: capitalizeFirstLetter(document.getElementById("title").value),
        imageUrl: document.getElementById("imageUrl").value,
        category: document.getElementById("category").value,
        ageLimit: parseInt(document.getElementById("ageLimit").value),
        duration: parseFloat(document.getElementById("duration").value),
        description: document.getElementById("description").value,
    };

    fetch("http://localhost:8099/movie", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response (created movie)
            console.log("Movie created:", data);
            alert("Movie created successfully!");
            movieForm.reset(); // Reset the form
        })
        .catch((error) => {
            // Handle errors
            console.error("Error creating movie:", error);
            alert("Error creating movie. Please try again.");
        });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

movieForm.addEventListener("submit", createMovie);

