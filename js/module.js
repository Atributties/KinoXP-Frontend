async function postObjectAsJson(url, object, httpVerbum) {
    const objectAsJsonString = JSON.stringify(object)
    console.log(objectAsJsonString)
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }
    const response = await fetch(url, fetchOptions)
    return response
}
async function restDelete(url) {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: ""
    }
    const response = await fetch(url, fetchOptions)
    return response
}

async function deleteObject(object, url) {
    try {
        const deleteUrl = url + "/" + object.id
        const resp = await restDelete(deleteUrl)
        const body = await resp.text();
        alert(body)
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
}


function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
}
function createElement(elementType, textContent) {
    const element = document.createElement(elementType);
    element.textContent = textContent;
    return element;
}
function showMovieDetails(movie) {
    const detailsDiv = document.createElement("div");

    // Append title to detailsDiv
    detailsDiv.appendChild(createElement("p", movie.title));

    // Append category, age limit, and duration under the title
    detailsDiv.appendChild(createElement("p", `Category: ${movie.category}`));
    detailsDiv.appendChild(createElement("p", `Age Limit: ${movie.ageLimit}`));
    detailsDiv.appendChild(createElement("p", `Duration: ${movie.duration} minutes`));

    return detailsDiv;
}



export {postObjectAsJson, fetchAnyUrl,restDelete, deleteObject, createElement, showMovieDetails}