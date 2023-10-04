import { fetchAnyUrl, deleteObject } from "./module.js";

console.log("i am in update Movie");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const updateMovieForm = document.getElementById("updateMovieForm");
const url = "http://localhost:8080/movie";
let movie;

async function fetchMovie() {
    const updateUrl = url + "/" + id;
    try {
        movie = await fetchAnyUrl(updateUrl); // Await the Promise
        populateFormWithMovieDetails(movie);
    } catch (error) {
        console.error("Error fetching movie:", error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await fetchMovie();
});

const titleInput = document.getElementById("title");
const imageUrlInput = document.getElementById("imageUrl");
const categorySelect = document.getElementById("category");
const ageLimitSelect = document.getElementById("ageLimit");
const durationInput = document.getElementById("duration");
const descriptionTextarea = document.getElementById("description");

function populateFormWithMovieDetails(movie) {
    console.log("Movie details:", movie);
    titleInput.value = movie.title;
    imageUrlInput.value = movie.imageUrl || "";
    categorySelect.value = movie.category;

    // Iterate through options and set selected based on age limit
    // Iterate through options and set selected based on age limit
    for (let i = 0; i < ageLimitSelect.options.length; i++) {
        if (parseInt(ageLimitSelect.options[i].value) === movie.ageLimit) {
            ageLimitSelect.options[i].selected = true;
            break;
        }
    }


    durationInput.value = movie.duration;
    descriptionTextarea.value = movie.description;

    console.log("Form values set:", {
        title: titleInput.value,
        imageUrl: imageUrlInput.value,
        category: categorySelect.value,
        ageLimit: ageLimitSelect.value,
        duration: durationInput.value,
        description: descriptionTextarea.value,
    });
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

