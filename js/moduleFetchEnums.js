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
async function fetchRoles() {

    const roleEnums = "http://localhost:8080/roles";
    try {
        const response = await fetchAnyUrl(roleEnums);
        const roleSelect = document.getElementById("roles");

        // Populate the dropdown with movie categories
        response.forEach(roles => {
            const option = document.createElement("option");
            option.value = roles;
            option.textContent = roles;
            roleSelect.appendChild(option);
        });
        {
            console.error("Error fetching roles:", response.status);
        }
    } catch
        (error) {
        console.error("Error fetching roles:", error);
    }
}

async function fetchTheaterName() {

    const theaterName = "http://localhost:8080/theaterName";
    try {
        const response = await fetchAnyUrl(theaterName);
        const theaterSelect = document.getElementById("theaterSelect");

        // Populate the dropdown with movie categories
        response.forEach(theater => {
            const option = document.createElement("option");
            option.value = theater;
            option.textContent = theater;
            theaterSelect.appendChild(option);
        });
        {
            console.error("Error fetching theater:", response.status);
        }
    } catch
        (error) {
        console.error("Error fetching theater:", error);
    }
}


export {fetchMovieCategories, fetchAgeLimits, fetchRoles, fetchTheaterName}