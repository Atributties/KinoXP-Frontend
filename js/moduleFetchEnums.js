import {fetchAnyUrl} from "./module.js";

async function fetchMovieCategories() {
    const categoriesUrl = "http://localhost:8080/categories";
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

    const ageLimitsUrl = "http://localhost:8080/age-limits";
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

export {fetchMovieCategories, fetchAgeLimits}