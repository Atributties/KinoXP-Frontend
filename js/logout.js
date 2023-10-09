// logout.js
console.log("Logout script loaded"); // Add this line
import { postObjectAsJson } from "./module.js";

const logoutUrl = "http://localhost:8080/user/logout"; // Replace with your actual logout endpoint

async function logout() {
    try {
        const resp = await postObjectAsJson(logoutUrl, {}, "POST");

        console.log("Logout Response:", resp); // Add this line to log the response

        if (resp.ok) {
            const responseText = await resp.text();

            console.log("Logout Response Text:", responseText); // Add this line to log the response text

            if (responseText.includes("Logout successful")) {
                // Redirect to the login page after successful logout
                window.location.href = "login.html"; // Replace with your login page
            } else {
                alert('An error occurred during logout');
            }
        } else {
            alert('An error occurred during logout');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout-button");

    if (logoutButton) {
        logoutButton.onclick = () => {
            logout();
        };
    }
});

