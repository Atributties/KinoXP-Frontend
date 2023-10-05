const sigupButton = document.getElementById("sign-up-button");

document.addEventListener("DOMContentLoaded", function () {
    sigupButton.onclick = () => {
        window.location.href = "signup.html";
    };
});