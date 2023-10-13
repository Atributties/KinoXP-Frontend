// Set the timer for automatic logout after 3 minutes (180,000 milliseconds)
let logoutTimer;

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
            localStorage.setItem('userDetails', JSON.stringify(userDetails));

            // Set the timer for automatic logout after 3 minutes
            logoutTimer = setTimeout(() => {
                // Clear user details from localStorage
                localStorage.removeItem('userDetails');
                console.log('User has been automatically logged out due to inactivity.');
            }, 180000); // 3 minutes in milliseconds

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

// Event listener for the "Sign Up" button
const signUpButton = document.getElementById('sign-up-button');

signUpButton.addEventListener('click', () => {
    window.location.href = 'signup.html'; // Redirect to the sign-up page
});

// Event listener for the "Back" button that goes back to the previous page
document.getElementById('backButton').addEventListener('click', () => {
    history.back();
});

// Function to reset the automatic logout timer upon user interaction
function resetLogoutTimer() {
    clearTimeout(logoutTimer);
    // Set the timer again for automatic logout after 3 minutes (if no further activity)
    logoutTimer = setTimeout(() => {
        // Clear user details from localStorage
        localStorage.removeItem('userDetails');
        console.log('User has been automatically logged out due to inactivity.');
    }, 180000); // 3 minutes in milliseconds
}

// Add a listener for user interactions to reset the timer
document.addEventListener('click', resetLogoutTimer);
document.addEventListener('keyup', resetLogoutTimer);
