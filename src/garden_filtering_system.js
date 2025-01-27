document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('[data-filter], [data-growth]');
    const searchInput = document.getElementById('search-input');
    const gardenCards = document.querySelectorAll('article');

    let currentFilter = 'all';
    let currentGrowth = null;
    let searchQuery = '';

    // Initialize dates for all cards
    gardenCards.forEach(card => {
        const plantedDate = card.dataset.plantedDate;
        const tendedDate = card.dataset.tendedDate;
        
        const plantedSpan = card.querySelector('.planted-date');
        const tendedSpan = card.querySelector('.tended-date');

        if (plantedSpan && plantedDate) {
            plantedSpan.textContent = formatDate(plantedDate);
        }
        if (tendedSpan && tendedDate) {
            tendedSpan.textContent = formatDate(tendedDate);
        }
    });

    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        
        // Reset time portions to compare dates only
        date.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'today';
        if (diffDays === 1) return 'yesterday';
        
        if (diffDays >= 365) {
            const years = Math.floor(diffDays / 365);
            return `${years} ${years === 1 ? 'year' : 'years'} ago`;
        }
        
        if (diffDays >= 30) {
            const months = Math.floor(diffDays / 30);
            return `${months} ${months === 1 ? 'month' : 'months'} ago`;
        }
        
        return `${diffDays} days ago`;
    }

    function filterCards() {
        gardenCards.forEach(card => {
            const type = card.dataset.type;
            const growth = card.dataset.growth;
            const title = card.querySelector('h2').textContent.toLowerCase();
            const excerpt = card.querySelector('p')?.textContent.toLowerCase() || '';
            const content = `${title} ${excerpt}`;

            const matchesFilter = currentFilter === 'all' || type === currentFilter;
            const matchesGrowth = !currentGrowth || growth === currentGrowth;
            const matchesSearch = searchQuery === '' || content.includes(searchQuery);

            card.style.display = (matchesFilter && matchesGrowth && matchesSearch) ? 'flex' : 'none';
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterGroup = button.closest('.flex');
            
            if (button.dataset.filter !== undefined) {
                filterGroup.querySelectorAll('[data-filter]').forEach(btn => {
                    btn.dataset.active = 'false';
                });
                button.dataset.active = 'true';
                currentFilter = button.dataset.filter;
            } else if (button.dataset.growth !== undefined) {
                if (button.dataset.active === 'true') {
                    button.dataset.active = 'false';
                    currentGrowth = null;
                } else {
                    filterGroup.querySelectorAll('[data-growth]').forEach(btn => {
                        btn.dataset.active = 'false';
                    });
                    button.dataset.active = 'true';
                    currentGrowth = button.dataset.growth;
                }
            }
            filterCards();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            filterCards();
        });
    }

    filterCards();
});