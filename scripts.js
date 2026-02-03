document.addEventListener('DOMContentLoaded', () => {
    
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-GB', options);
    }

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

    let currentCategory = 'home';

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });
    }

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

            if (isCategoryMatch && isSearchMatch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (noResultsMsg) {
            noResultsMsg.classList.toggle('hidden', visibleCount > 0);
        }
    };

    const updateActiveState = (category) => {
        currentCategory = category;
        navLinks.forEach(link => {
            if (link.dataset.category === category) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    if (mainNav) {
        mainNav.addEventListener('click', (e) => {
            const clickedLink = e.target.closest('a');
            if (clickedLink && clickedLink.dataset.category) {
                e.preventDefault();
                updateActiveState(clickedLink.dataset.category);
                filterArticles();
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                }
            }
        });
    }

    if (footerNav) {
        footerNav.addEventListener('click', (e) => {
            const clickedLink = e.target.closest('a');
            if (clickedLink && clickedLink.classList.contains('footer-filter-link')) {
                e.preventDefault();
                const category = clickedLink.dataset.category;
                updateActiveState(category);
                filterArticles();
                const welcomeSection = document.querySelector('.welcome-section');
                if (welcomeSection) {
                    window.scrollTo({
                        top: welcomeSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // --- New Article Viewer Logic ---
    if (articleViewer) {
        newsCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('a')) return;
                
                const imageEl = card.querySelector('.thumbnail-img');
                const titleEl = card.querySelector('h2, h3');
                const fullStoryEl = card.querySelector('.full-story p');

                if (!imageEl || !titleEl || !fullStoryEl) {
                    console.error('Card is missing required elements for viewer.');
                    return;
                }

                viewerImg.src = imageEl.src;
                viewerTitle.textContent = titleEl.textContent;
                viewerText.textContent = fullStoryEl.textContent;

                document.body.classList.add('body-no-scroll');
                articleViewer.classList.add('viewer-active');
            });
        });

        if (closeViewerBtn) {
            closeViewerBtn.addEventListener('click', () => {
                document.body.classList.remove('body-no-scroll');
                articleViewer.classList.remove('viewer-active');
            });
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterArticles);
    }
});