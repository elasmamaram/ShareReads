document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginFormElement');
    const backBtn = document.querySelector('.back-btn');
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === 'admin' && password === 'admin') {
            window.location.href = 'admin.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
    
    // Back button functionality
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
    });
});
// Admin login verification
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple hardcoded credentials (not secure for production)
    const adminCredentials = {
        username: "admin",
        password: "admin"
    };
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
        // Store login state in localStorage
        localStorage.setItem('isAdminLoggedIn', 'true');
        window.location.href = 'admin.html'; // Redirect to admin panel
    } else {
        alert('Invalid username or password');
    }
});

// Check if user is logged in when accessing admin pages
if (window.location.pathname.includes('admin.html')) {
    if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
}