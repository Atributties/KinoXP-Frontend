document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout-button");

    function logout(event) {
        event.preventDefault();
        console.log("Logout button clicked");

        // Remove user details from localStorage
        localStorage.removeItem('userDetails');

        // Redirect to the login page
        window.location.href = "login.html";
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});