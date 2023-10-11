const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const user = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        // Make a POST request to your backend login endpoint
        const response = await fetch('http://localhost:8080/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            // If login is successful, user details are included in the response
            const userDetails = await response.json();

            console.log('User details:', userDetails);

            // Redirect based on user role
            if (userDetails.role === 'ADMIN' || userDetails.role === 'EMPLOYEE') {
                window.location.href = 'employeePage.html';
            } else if (userDetails.role === 'CUSTOMER') {
                window.location.href = 'costumerPage.html';
            } else {
                console.error('Invalid user role');
                // Handle invalid user role
            }
        } else {
            console.error('Login failed:', await response.text());
            // Handle login failure
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});














const signUpButton = document.getElementById('sign-up-button');

signUpButton.addEventListener('click', () => {
    window.location.href = 'signup.html';
});

// Back button that goes back to the previous page
document.getElementById('backButton').addEventListener('click', () => {
    history.back();
});
