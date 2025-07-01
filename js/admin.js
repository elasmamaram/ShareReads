document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Show the selected tab content
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Add book button
    const addBookBtn = document.querySelector('.add-btn[data-tab="books"]');
    if (addBookBtn) {
        addBookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Implement your add book functionality here
            alert('Add book functionality would go here');
        });
    }

    // Add admin button
    const addAdminBtn = document.querySelector('.add-btn[data-tab="admins"]');
    if (addAdminBtn) {
        addAdminBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Implement your add admin functionality here
            alert('Add admin functionality would go here');
        });
    }

    // Edit and delete buttons for books
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const title = row.querySelector('td:nth-child(2)').textContent;
            alert(`Editing: ${title}`);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const title = row.querySelector('td:nth-child(2)').textContent;
            if (confirm(`Are you sure you want to delete "${title}"?`)) {
                row.remove();
                updateBookCount();
            }
        });
    });

    // Delete review buttons
    document.querySelectorAll('.delete-review').forEach(btn => {
        btn.addEventListener('click', function() {
            const reviewItem = this.closest('.admin-review-item');
            if (confirm('Are you sure you want to delete this review?')) {
                reviewItem.remove();
                updateReviewCount();
            }
        });
    });

    // Function to update book count
    function updateBookCount() {
        const count = document.querySelectorAll('.admin-table tbody tr').length;
        document.querySelector('.stat-info:nth-child(1) p').textContent = count;
    }

    // Function to update review count
    function updateReviewCount() {
        const count = document.querySelectorAll('.admin-review-item').length;
        document.querySelector('.stat-info:nth-child(2) p').textContent = count;
    }
});