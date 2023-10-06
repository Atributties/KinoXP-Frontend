import {fetchAnyUrl, postObjectAsJson} from "./module.js";

const url = "http://localhost:8080/user"
const signUpForm = document.getElementById("signup-form");


async function createUser(event) {
    event.preventDefault();
    try{
        const user = {
            name: document.getElementById("name").value,
            role: "CUSTOMER", // Add the role property with the default value
            password: document.getElementById("password").value,
            email: document.getElementById("email").value,
            phoneNumber: document.getElementById("phone").value,

        };

        const resp = await postObjectAsJson(url, user, "POST");
        signUpForm.reset(); // Reset the form
        return resp;


    }catch (error) {
        console.error("Error:", error);
    }

}



signUpForm.addEventListener("submit", createUser);


