import {fetchAnyUrl, postObjectAsJson} from "./module.js";

const url = "http://localhost:8080/user"
const signUpForm = document.getElementById("signup-form");

async function createUser(event) {
    event.preventDefault();
    try {
        const user = {
            name: document.getElementById("name").value,
            role: "CUSTOMER", // Add the role property with the default value
            password: document.getElementById("password").value,
            email: document.getElementById("email").value,
            phoneNumber: document.getElementById("phone").value,
        };

        const resp = await postObjectAsJson(url, user, "POST");

        if (resp.status === 201) { // Check for a successful response status (e.g., 201 Created)
            signUpForm.reset(); // Reset the form
            localStorage.setItem('lastUserEmail', user.email); // Save the email only if user creation was successful
            window.location.href = "login.html";
            return resp;
        } else {
            // Handle errors here, e.g., display a message to the user
            console.error("User creation failed with status code: " + resp.status);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

//Back button that go back to where you come from with history.back()
document.getElementById('backButton').addEventListener('click', function() {
    history.back();
})


signUpForm.addEventListener("submit", createUser);


