import {fetchAnyUrl, postObjectAsJson} from "./module.js";
import {fetchRoles} from "./moduleFetchEnums.js";

const userList = document.getElementById('userList');
const searchInput = document.getElementById('searchInput');
const userDetails = document.getElementById('userDetails');


const url = "http://localhost:8080/users";
// Fetch the list of users from your REST API
async function getUsers() {
    try {
        const response = await fetchAnyUrl(url)
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Display the list of users in alphabetical order
async function displayUsers() {
    const users = await getUsers();
    if (!users) return;

    // Sort users alphabetically by name
    users.sort((a, b) => a.name.localeCompare(b.name));

    userList.innerHTML = ''; // Clear the previous list

    users.forEach((user) => {
        const listItem = document.createElement('li');
        listItem.textContent = user.name;

        const editButton = createEditButton(user);
        listItem.appendChild(editButton);

        userList.appendChild(listItem);
    });
}

// Show user details when a user is clicked
function showUserDetails(user) {
    userDetails.innerHTML = `
        <h2>${user.name}</h2>
        <p>Email: ${user.email}</p>
        <p>Role: ${user.role}</p>
        <p>Phone: ${user.phoneNumber}</p>
        <!-- Add more details as needed -->
    `;
}

// Search for a user based on the input
function searchUser() {
    const searchTerm = searchInput.value.toLowerCase();
    const users = document.querySelectorAll('#userList li');

    users.forEach((user) => {
        const userName = user.textContent.toLowerCase();
        if (userName.includes(searchTerm)) {
            user.style.display = 'block';
        } else {
            user.style.display = 'none';
        }
    });
}
// Add an edit button to each user in the list
function createEditButton(user) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editUserRole(user));
    return editButton;
}
function editUserRole(user) {
    const roleSelect = document.createElement('select');

    // Fetch roles from the backend and populate the dropdown
    fetchRoles()
        .then(roles => {
            roles.forEach(role => {
                const option = document.createElement('option');
                option.value = role;
                option.textContent = role;
                roleSelect.appendChild(option);
            });

            // Set the currently selected role to the user's current role
            roleSelect.value = user.role;

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.addEventListener('click', async () => {
                const newRole = roleSelect.value;
                user.role = newRole; // Update the user's role

                // Send a request to update the user's role in the database
                try {
                    const response = await postObjectAsJson(`${url}/${user.id}`, user, 'PUT');

                    if (response.ok) {
                        // Role updated successfully
                        displayUsers(); // Refresh the user list
                    } else {
                        console.error('Error updating user role:', response.status);
                    }
                } catch (error) {
                    console.error('Error updating user role:', error);
                }
            });

            userDetails.innerHTML = ''; // Clear user details
            userDetails.appendChild(roleSelect);
            userDetails.appendChild(saveButton);
        })
        .catch(error => {
            console.error('Error fetching roles:', error);
        });
}


// Event listeners
searchInput.addEventListener('input', searchUser);

// Initialize the user list
displayUsers();
