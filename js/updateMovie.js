console.log("i am in update Movie")

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const updateButton = document.getElementById("updateButton")
fetch(`http://localhost:8080/movie/id/${id}`)
    .then((response) => response.json())
    .then((movie) => {
        debugger
        populateFormWithMovieDetails(movie);
    })
    .catch((error) => {
        // Handle errors
        console.error("Error fetching movie details:", error);
    });

const titleInput = document.getElementById("title");
const imageUrlInput = document.getElementById("imageUrl");
const categorySelect = document.getElementById("category");
const ageLimitSelect = document.getElementById("ageLimit");
const durationInput = document.getElementById("duration");
const descriptionTextarea = document.getElementById("description");
function populateFormWithMovieDetails(movie) {
    titleInput.value = movie.title;
    imageUrlInput.value = movie.imageUrl || "";
    categorySelect.value = movie.category;
    ageLimitSelect.value = movie.ageLimit;
    durationInput.value = movie.duration;
    descriptionTextarea.value = movie.description;
}

function updateMovie(id) {
    // Define the URL for updating a specific movie using its IDconst apiUrl = `http://localhost:8080/movie/${id}`;

    const updatedData = {
        title: titleInput.value,
        imageUrl: imageUrlInput.value,
        category: categorySelect.value,
        ageLimit: ageLimitSelect.value,
        duration: parseInt(durationInput.value), // Convert to a number
        description: descriptionTextarea.value,
    };

    // Define the PUT request headers with Content-Type as JSON
    const headers = {
        "Content-Type": "application/json",
    };

    // Create a PUT request body by converting the updatedData object to JSON
    const requestBody = JSON.stringify(updatedData);

    // Send the PUT request
    fetch(apiUrl, {
        method: "PUT", // Use PUT method to update data
        headers: headers,
        body: requestBody,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the response JSON
        })
        .then((data) => {
            // Handle the success response, e.g., display a success message
            console.log("Movie updated:", data);
            alert("Movie updated successfully!");
        })
        .catch((error) => {
            // Handle errors, e.g., display an error message
            console.error("Error updating movie:", error);
            alert("Error updating movie. Please try again.");
        });
}


updateButton.addEventListener('click', updateMovie(id));