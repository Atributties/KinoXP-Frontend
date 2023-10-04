import {fetchAnyUrl, deleteObject, postObjectAsJson} from "./module.js";

console.log("i am in create Movie!!");
const movieForm = document.getElementById("movieForm");
const url = "http://localhost:8080/movie";
const categoriesUrl = "http://localhost:8080/categories";
const ageLimitsUrl = "http://localhost:8080/age-limits";


async function createMovie(event) {
    event.preventDefault();
debugger
    const movie = {
        title: capitalizeFirstLetter(document.getElementById("title").value),
        imageUrl: document.getElementById("imageUrl").value,
        category: document.getElementById("category").value,
        ageLimit: document.getElementById("ageLimit").value,
        duration: parseFloat(document.getElementById("duration").value),
        description: document.getElementById("description").value,
    };
    const resp = await postObjectAsJson(url, movie, "POST")
    movieForm.reset(); // Reset the form
    return resp;

}

async function fetchMovieCategories() {
    try {
        const response = await fetchAnyUrl(categoriesUrl);
        const categorySelect = document.getElementById("category");

        // Populate the dropdown with movie categories
        response.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
        {
            console.error("Error fetching movie categories:", response.status);
        }
    } catch
        (error) {
        console.error("Error fetching movie categories:", error);
    }
}

async function fetchAgeLimits() {
    debugger
    try {
        const response = await fetchAnyUrl(ageLimitsUrl);
        const ageLimitSelect = document.getElementById("ageLimit");

        // Populate the dropdown with movie categories
        response.forEach(ageLimit => {
            const option = document.createElement("option");
            option.value = ageLimit;
            option.textContent = ageLimit;
            ageLimitSelect.appendChild(option);
        });
        {
            console.error("Error fetching movie categories:", response.status);
        }
    } catch
        (error) {
        console.error("Error fetching movie categories:", error);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener("DOMContentLoaded", async() => {
    await fetchMovieCategories()
    await fetchAgeLimits()
});
movieForm.addEventListener("submit", createMovie);

