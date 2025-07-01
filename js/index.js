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
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch();
    });
    
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            searchResults.style.display = 'none';
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
            return;
        }
        
        const bookCards = document.querySelectorAll('.book-card');
        let hasResults = false;
        
        // Clear previous results
        searchResults.innerHTML = '';
        
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
                    <p>by ${card.querySelector('.book-author').textContent}</p>
                    <p class="book-description">${card.querySelector('.book-description').textContent.substring(0, 100)}...</p>
                `;
                
                resultItem.addEventListener('click', function() {
                    // Scroll to the book card
                    card.scrollIntoView({ behavior: 'smooth' });
                    
                    // Highlight the card temporarily
                    card.style.boxShadow = '0 0 0 3px var(--secondary)';
                    setTimeout(() => {
                        card.style.boxShadow = '';
                    }, 2000);
                    
                    // Close search results
                    searchResults.style.display = 'none';
                    searchInput.value = '';
                });
                
                searchResults.appendChild(resultItem);
            }
        });
        
        if (!hasResults) {
            searchResults.innerHTML = '<div class="no-results">No books found matching your search</div>';
        }
        
        searchResults.style.display = hasResults ? 'block' : 'none';
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
                reviewItem.textContent = textarea.value;
                reviewList.appendChild(reviewItem);
                textarea.value = '';
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
});
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 0) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});