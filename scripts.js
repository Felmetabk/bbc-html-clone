// Ensures the script runs only after the entire HTML document has been loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Element Selectors ---
    // Grabs all necessary elements from the DOM for manipulation.
    const dateElement = document.getElementById('currentDate');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const footerNav = document.getElementById('footerNav');
    const searchInput = document.getElementById('searchInput');
    const newsCards = document.querySelectorAll('.news-card');
    const noResultsMsg = document.getElementById('noResults');
    const navLinks = mainNav ? mainNav.querySelectorAll('a') : [];
    
    // Article Viewer Elements
    const articleViewer = document.getElementById('article-viewer');
    const closeViewerBtn = document.getElementById('closeViewerBtn');
    const viewerImg = document.getElementById('viewerImg');
    const viewerTitle = document.getElementById('viewerTitle');
    const viewerText = document.getElementById('viewerText');

    // --- State ---
    // Holds the currently selected news category, defaulting to 'home'.
    let currentCategory = 'home';

    // --- Date Display ---
    // Sets the current date in the header.
    if (dateElement) {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-GB', options);
    }

    // --- Mobile Menu ---
    // Toggles the visibility of the main navigation on mobile devices.
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });
    }

    // --- Core Filtering Logic ---
    // Filters news articles based on the selected category and search term.
    const filterArticles = () => {
        if (!searchInput || !newsCards.length) return;
        let visibleCount = 0;
        const searchTerm = searchInput.value.toLowerCase().trim();

        newsCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const isCategoryMatch = (currentCategory === 'home' || cardCategory === currentCategory);
            
            let isSearchMatch = true;
            if (searchTerm) {
                const title = card.querySelector('h2, h3').textContent.toLowerCase();
                const summary = card.querySelector('p').textContent.toLowerCase();
                const tag = card.querySelector('.tag').textContent.toLowerCase();
                isSearchMatch = title.includes(searchTerm) || summary.includes(searchTerm) || tag.includes(searchTerm);
            }

            // Show card if it matches both category and search, otherwise hide it.
            if (isCategoryMatch && isSearchMatch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Show or hide the "No Results" message based on whether any articles are visible.
        if (noResultsMsg) {
            noResultsMsg.classList.toggle('hidden', visibleCount > 0);
        }
    };

    // --- Navigation State ---
    // Updates the visual 'active' state on navigation links.
    const updateActiveState = (category) => {
        currentCategory = category;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.category === category);
        });
    };

    // --- Event Listeners ---

    // Main header navigation handler.
    if (mainNav) {
        mainNav.addEventListener('click', (e) => {
            const clickedLink = e.target.closest('a');
            if (clickedLink && clickedLink.dataset.category) {
                e.preventDefault(); // Stop browser from following the link.
                updateActiveState(clickedLink.dataset.category);
                filterArticles();
                // Close mobile menu after selection.
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                }
            }
        });
    }

    // Footer navigation handler.
    if (footerNav) {
        footerNav.addEventListener('click', (e) => {
            const clickedLink = e.target.closest('a');
            if (clickedLink && clickedLink.classList.contains('footer-filter-link')) {
                e.preventDefault();
                const category = clickedLink.dataset.category;
                updateActiveState(category);
                filterArticles();
                // Scroll user to the top of the news section.
                const welcomeSection = document.querySelector('.welcome-section');
                if (welcomeSection) {
                    window.scrollTo({
                        top: welcomeSection.offsetTop - 80, // Adjust for sticky header height.
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Article Viewer open functionality.
    if (articleViewer) {
        newsCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't open viewer if a link inside the card was clicked.
                if (e.target.closest('a')) return;
                
                // Find content within the clicked card.
                const imageEl = card.querySelector('.thumbnail-img');
                const titleEl = card.querySelector('h2, h3');
                const fullStoryEl = card.querySelector('.full-story p');

                if (!imageEl || !titleEl || !fullStoryEl) {
                    console.error('Card is missing required elements for viewer.');
                    return;
                }

                // Populate the viewer with the card's content.
                viewerImg.src = imageEl.src;
                viewerTitle.textContent = titleEl.textContent;
                viewerText.textContent = fullStoryEl.textContent;

                // Display the viewer and prevent background scrolling.
                document.body.classList.add('body-no-scroll');
                articleViewer.classList.add('viewer-active');
            });
        });

        // Article Viewer close functionality.
        if (closeViewerBtn) {
            closeViewerBtn.addEventListener('click', () => {
                document.body.classList.remove('body-no-scroll');
                articleViewer.classList.remove('viewer-active');
            });
        }
    }

    // Real-time search functionality.
    if (searchInput) {
        searchInput.addEventListener('input', filterArticles);
    }
});
