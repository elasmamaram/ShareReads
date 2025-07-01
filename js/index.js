document.addEventListener('DOMContentLoaded', function() {
    // Quote functionality
    const randomQuoteElement = document.getElementById('randomQuote');
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    
    // Quotes array
    const quotes = [
        "The more that you read, the more things you will know. The more that you learn, the more places you'll go. - Dr. Seuss",
        "A reader lives a thousand lives before he dies. The man who never reads lives only one. - George R.R. Martin",
        "Books are a uniquely portable magic. - Stephen King",
        "There is no friend as loyal as a book. - Ernest Hemingway",
        "Reading is essential for those who seek to rise above the ordinary. - Jim Rohn",
        "I have always imagined that Paradise will be a kind of library. - Jorge Luis Borges",
        "So many books, so little time. - Frank Zappa",
        "The reading of all good books is like conversation with the finest minds of past centuries. - René Descartes",
        "A book is a dream that you hold in your hand. - Neil Gaiman",
        "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers. - Charles W. Eliot"
    ];
    
    // Initialize with a random quote
    generateRandomQuote();
    
    // New quote button event
    newQuoteBtn.addEventListener('click', generateRandomQuote);
    
    // Generate random quote
    function generateRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        randomQuoteElement.textContent = quotes[randomIndex];
    }
    
    // Search functionality
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.querySelector('.search-results');
    
    // Initialize search results
    searchResults.style.display = 'none';
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch();
    });
    
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
        } else {
            performSearch();
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchForm.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    // Perform search function
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
            return;
        }
        
        const bookCards = document.querySelectorAll('.book-card');
        let hasResults = false;
        
        // Clear previous results
        searchResults.innerHTML = '';
        
        // Create a container for results
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-container';
        
        // Search through all books
        bookCards.forEach(card => {
            const title = card.querySelector('.book-title').textContent.toLowerCase();
            const author = card.querySelector('.book-author').textContent.toLowerCase();
            const description = card.querySelector('.book-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || author.includes(searchTerm) || description.includes(searchTerm)) {
                hasResults = true;
                
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                
                resultItem.innerHTML = `
                    <h3>${card.querySelector('.book-title').textContent}</h3>
                    <p class="search-author">by ${card.querySelector('.book-author').textContent}</p>
                    <p class="search-description">${card.querySelector('.book-description').textContent.substring(0, 100)}...</p>
                `;
                
                resultItem.addEventListener('click', function() {
                    // Scroll to the book card
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Highlight the card temporarily
                    const originalBorder = card.style.border;
                    card.style.border = '2px solid var(--secondary)';
                    card.style.transition = 'border 0.3s ease';
                    
                    setTimeout(() => {
                        card.style.border = originalBorder;
                    }, 2000);
                    
                    // Close search results
                    searchResults.style.display = 'none';
                    searchInput.value = '';
                });
                
                resultsContainer.appendChild(resultItem);
            }
        });
        
        if (!hasResults) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            
            noResults.innerHTML = `
                <div class="no-results-icon">📖</div>
                <p>No books found matching "<strong>${searchTerm}</strong>"</p>
                <div class="search-suggestions">
                    <p>Try searching for:</p>
                    <ul>
                        <li>Different keywords or spelling</li>
                        <li>Author's last name only</li>
                        <li>More general terms</li>
                        <li>Book genres or categories</li>
                    </ul>
                </div>
            `;
            resultsContainer.appendChild(noResults);
        }
        
        searchResults.appendChild(resultsContainer);
        searchResults.style.display = 'block';
        
        // Position the search results below the search input
        const inputRect = searchInput.getBoundingClientRect();
        searchResults.style.top = `${inputRect.bottom + window.scrollY}px`;
        searchResults.style.left = `${inputRect.left}px`;
        searchResults.style.width = `${inputRect.width}px`;
    }
    
    // Review functionality
    const reviewButtons = document.querySelectorAll('.review-btn');
    reviewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reviewSection = this.closest('.review-section');
            const textarea = reviewSection.querySelector('textarea');
            const reviewList = reviewSection.querySelector('.review-list');
            
            if (textarea.value.trim() !== '') {
                const reviewItem = document.createElement('div');
                reviewItem.className = 'review-item';
                
                // Add timestamp
                const now = new Date();
                const timestamp = now.toLocaleString();
                
                reviewItem.innerHTML = `
                    <div class="review-content">${textarea.value}</div>
                    <div class="review-timestamp">${timestamp}</div>
                `;
                
                reviewList.appendChild(reviewItem);
                textarea.value = '';
                
                // Scroll to the new review
                reviewItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // Highlight active navigation link
    const navLinks = document.querySelectorAll('.nav-links a');
    const pageSections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        pageSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Sticky header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Add keyboard navigation for search results
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const items = searchResults.querySelectorAll('.search-result-item');
            if (items.length === 0) return;
            
            e.preventDefault();
            
            let currentIndex = -1;
            items.forEach((item, index) => {
                if (item.classList.contains('highlighted')) {
                    currentIndex = index;
                    item.classList.remove('highlighted');
                }
            });
            
            if (e.key === 'ArrowDown') {
                currentIndex = (currentIndex + 1) % items.length;
            } else {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
            }
            
            items[currentIndex].classList.add('highlighted');
            items[currentIndex].scrollIntoView({ block: 'nearest' });
            
            // If Enter is pressed on a highlighted item
            if (e.key === 'Enter' && currentIndex !== -1) {
                items[currentIndex].click();
            }
        }
    });
});