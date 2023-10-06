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
        const resp = await postObjectAsJson(url, user, "POST");

        // ... (previous code)

        if (resp.ok) {
            const responseText = await resp.text();

            if (responseText.includes("Login successful")) {
                // Fetch the user's role using the /user/role/{email} endpoint
                const roleResp = await fetch(`http://localhost:8080/user/role/${user.email}`);
                if (roleResp.ok) {
                    const roleData = await roleResp.json();
                    console.log('Role data:', roleData);
                    const userRole = roleData || "CUSTOMER";

                    // Redirect based on the user role
                    if (userRole === "CUSTOMER") {
                        window.location.href = "costumerPage.html";
                    } else if (userRole === "ADMIN" || userRole === "Employee") {
                        window.location.href = "employeePage.html";
                    } else {
                        alert('Unknown role. Unable to redirect.');
                    }
                } else {
                    // Handle error when fetching user role
                    console.error('Error fetching user role:', roleResp.statusText);
                    alert('Error fetching user role');
                }
            } else {
                alert('An error occurred');
            }

        } else if (resp.status === 400) {
            alert('Invalid username or password');
        } else if (resp.status === 404) {
            alert('User not found');
        } else {
            alert('An error occurred');
        }

        loginForm.reset(); // Reset the form
    } catch (error) {
        console.error('Error:', error);
    }
}

loginForm.addEventListener('submit', login);








const sigupButton = document.getElementById("sign-up-button");

document.addEventListener("DOMContentLoaded", function () {
    sigupButton.onclick = () => {
        window.location.href = "signup.html";
    };
});