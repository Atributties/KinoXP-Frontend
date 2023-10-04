console.log("i am in update Movie");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const updateButton = document.getElementById("updateButton")
const updateMovieForm = document.getElementById("updateMovieForm");

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
    const apiUrl = `http://localhost:8080/movie/${id}`;

    const updatedData = {
        title: titleInput.value,
        imageUrl: imageUrlInput.value,
        category: categorySelect.value,
        ageLimit: ageLimitSelect.value,
        duration: parseInt(durationInput.value),
        description: descriptionTextarea.value,
    };

    const headers = {
        "Content-Type": "application/json",
    };

    const requestBody = JSON.stringify(updatedData);

    fetch(apiUrl, {
        method: "PUT",
        headers: headers,
        body: requestBody,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Movie updated:", data);
            alert("Movie updated successfully!");

            // Navigate to employeeDashboard.html after successful update
            window.location.href = "/KinoXP-Frontend/empoloyeeDashboard.html";
        })
        .catch((error) => {
            console.error("Error updating movie:", error);
            alert("Error updating movie. Please try again.");
        });
}

// Add event listener to prevent default form submission
updateMovieForm.addEventListener('submit', function(event) {
    event.preventDefault();
    updateMovie(id);
});

