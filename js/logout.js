
import { postObjectAsJson } from "./module.js";
// logout.js
console.log("Logout script loaded");

document.addEventListener("DOMContentLoaded", function () {
    console.log("Logout script loaded");

    const logoutUrl = "http://localhost:8080/user/logout";

    async function logout(event) {
        event.preventDefault(); // Prevent the default navigation behavior
        console.log("Logout button clicked"); // Add this line
        localStorage.removeItem('userDetails');
        try {
            const resp = await postObjectAsJson(logoutUrl, {}, "POST");

            console.log("Logout Response:", resp);

            if (resp.ok) {
                const responseText = await resp.text();

                console.log("Logout Response Text:", responseText);

                if (responseText.includes("Logout successful")) {
                    window.location.href = "login.html";
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

    const logoutButton = document.getElementById("logout-button");

    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});



