import {postObjectAsJson} from "./module.js";


const url = "http://localhost:8080/user/login"
const loginForm = document.getElementById("login-form")

async function login(event) {
    event.preventDefault();
    try {

        const user = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,

        };
        const resp = await postObjectAsJson(url, user, "POST")

        if (resp.ok) {
            // Successful login, handle accordingly
            alert('Login successful!');
        } else if (resp.status === 400) {
            // Invalid credentials
            alert('Invalid username or password');
        } else if (resp.status === 404) {
            // User not found
            alert('User not found');
        } else {
            // Handle other error cases
            alert('An error occurred');
        }
        loginForm.reset(); // Reset the form
    } catch (error) {
        console.error('Error:', error);
    }
}


loginForm.addEventListener('submit', login)



const sigupButton = document.getElementById("sign-up-button");

document.addEventListener("DOMContentLoaded", function () {
    sigupButton.onclick = () => {
        window.location.href = "signup.html";
    };
});