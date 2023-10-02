console.log("i am in create Movie!!")
const movieForm = document.getElementById("movieForm");

function createMovie(event){
    event.preventDefault();

    const movie = {
        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
        ageLimit: parseInt(document.getElementById("ageLimit").value),
        duration: parseFloat(document.getElementById("duration").value),
        description: document.getElementById("description").value,
    };
    debugger
    fetch("http://localhost:8080/movie", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
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
movieForm.addEventListener("submit",createMovie);