import {fetchAnyUrl, deleteObject, postObjectAsJson} from "./module.js";
import {fetchAgeLimits, fetchMovieCategories} from "./moduleFetchEnums.js";

console.log("i am in create Movie!!");
const movieForm = document.getElementById("movieForm");
const url = "http://localhost:8080/movie";

async function createMovie(event) {
    event.preventDefault();
    const movie = {
        title: capitalizeFirstLetter(document.getElementById("title").value),
        imageUrl: document.getElementById("imageUrl").value,
        category: document.getElementById("category").value,
        ageLimit: document.getElementById("ageLimit").value,
        duration: parseFloat(document.getElementById("duration").value),
        description: document.getElementById("description").value,
    };
    const resp = await postObjectAsJson(url, movie, "POST")
    window.location.href = "empoloyeeDashboard.html";
    movieForm.reset(); // Reset the form
    return resp;

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener("DOMContentLoaded", async() => {
    await fetchMovieCategories()
    await fetchAgeLimits()
});
movieForm.addEventListener("submit", createMovie);


//Back button that go back to where you come from with history.back()
document.getElementById('backButton').addEventListener('click', function() {
    history.back();
})

