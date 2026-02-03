document.addEventListener('DOMContentLoaded', () => {
    
    const dateElement = document.getElementById('currentDate');
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString('en-GB', options);

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const footerNav = document.getElementById('footerNav');
    const searchInput = document.getElementById('searchInput');
    const newsCards = document.querySelectorAll('.news-card');
    const noResultsMsg = document.getElementById('noResults');
    const navLinks = mainNav.querySelectorAll('a');

    let currentCategory = 'home';

    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    const filterArticles = () => {
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

        noResultsMsg.classList.toggle('hidden', visibleCount > 0);
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

    mainNav.addEventListener('click', (e) => {
        const clickedLink = e.target.closest('a');
        if (clickedLink) {
            e.preventDefault();
            updateActiveState(clickedLink.dataset.category);
            filterArticles();
            if (mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
            }
        }
    });

    if (footerNav) {
        footerNav.addEventListener('click', (e) => {
            const clickedLink = e.target.closest('a');
            if (clickedLink && clickedLink.classList.contains('footer-filter-link')) {
                e.preventDefault();
                const category = clickedLink.dataset.category;
                updateActiveState(category);
                filterArticles();
                window.scrollTo({
                    top: document.querySelector('.welcome-section').offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }

    newsCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') return;
            newsCards.forEach(otherCard => {
                if (otherCard !== card) otherCard.classList.remove('expanded');
            });
            card.classList.toggle('expanded');
        });
    });

    searchInput.addEventListener('input', filterArticles);
});