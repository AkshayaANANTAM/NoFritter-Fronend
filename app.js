// Handle email login
function handleEmailLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    
    // Validate input fields
    if (!validateEmail(email) || !password) {
        messageDiv.textContent = "Please enter a valid email and password.";
        return;
    }

    // API request for email login
    fetch('http://localhost:5000/api/login/email', {
        method: 'POST',  // Specify the request method
        body: JSON.stringify({ email, password }),  // Send email and password as JSON
        headers: {
            'Content-Type': 'application/json'  // Set the content type to JSON
        },
        credentials: 'include'  // Include cookies with the request (for session management)
    })
    .then(response => handleResponse(response))  // Handle the response
    .then(result => {
        // Assuming the response contains a success flag or user data
        window.location.href = 'dashboard.html';  // Redirect to dashboard page
    })
    .catch(error => {
        messageDiv.textContent = error.message;  // Display error message to the user
    });
}

// Handle phone login
function handlePhoneLogin() {
    const phone = document.getElementById('phone').value;
    const messageDiv = document.getElementById('message');

    // Validate phone number
    if (!validatePhoneNumber(phone)) {
        messageDiv.textContent = "Invalid phone number.";
        return;
    }

    // API request for phone login
    fetch('http://localhost:5000/api/login/phone', {
        method: 'POST',  // Specify the request method
        body: JSON.stringify({ phone }),  // Send phone number as JSON
        headers: {
            'Content-Type': 'application/json'  // Set the content type to JSON
        },
        credentials: 'include'  // Include cookies with the request (for session management)
    })
    .then(response => handleResponse(response))  // Handle the response
    .then(result => {
        // Assuming the response contains a success flag or user data
        window.location.href = 'dashboard.html';  // Redirect to dashboard page
    })
    .catch(error => {
        messageDiv.textContent = error.message;  // Display error message to the user
    });
}

// Function to handle API responses
function handleResponse(response) {
    if (!response.ok) {
        throw new Error("Invalid login credentials.");  // General error handling
    }
    return response.json();  // Parse JSON response
}

// Validate email format
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Basic email validation regex
    return emailPattern.test(email);
}

// Validate phone number format
function validatePhoneNumber(phone) {
    const validPhoneNumber = /^[0-9]{10}$/;  // Check for 10-digit phone number
    return validPhoneNumber.test(phone);
}

// Event listeners (Add these to your HTML or initialize on load)
document.getElementById('email-login-form').addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent default form submission
    handleEmailLogin();  // Call the email login function
});

document.getElementById('phone-login-form').addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent default form submission
    handlePhoneLogin();  // Call the phone login function
});
