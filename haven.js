document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const gardenCards = document.querySelectorAll('.garden-card');

    // Store initial card visibility state
    let currentFilter = 'all';
    let currentGrowth = null;
    let searchQuery = '';

    // High-performance filtering system
    function filterCards() {
        gardenCards.forEach(card => {
            const type = card.dataset.type;
            const title = card.querySelector('h2').textContent.toLowerCase();
            const excerpt = card.querySelector('.card-excerpt')?.textContent.toLowerCase() || '';
            const content = `${title} ${excerpt}`;

            const matchesFilter = currentFilter === 'all' || type === currentFilter;
            const matchesGrowth = !currentGrowth || card.dataset.growth === currentGrowth;
            const matchesSearch = searchQuery === '' || content.includes(searchQuery);

            // Use CSS visibility for better performance than display:none
            card.style.display = (matchesFilter && matchesGrowth && matchesSearch) ? 'block' : 'none';
        });
    }

    // Filter button click handlers with event delegation
    document.querySelectorAll('.filter-group').forEach(group => {
        group.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                // Handle content type filters
                if (e.target.dataset.filter !== undefined) {
                    // Remove active class from content type buttons
                    group.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    currentFilter = e.target.dataset.filter;
                }
                // Handle growth stage filters
                else if (e.target.dataset.growth !== undefined) {
                    // Toggle active state for growth stage buttons
                    if (e.target.classList.contains('active')) {
                        e.target.classList.remove('active');
                        currentGrowth = null;
                    } else {
                        group.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                        e.target.classList.add('active');
                        currentGrowth = e.target.dataset.growth;
                    }
                }
                // Apply filters
                filterCards();
            }
        });
    });

    // Debounced search input handler for better performance
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchQuery = e.target.value.toLowerCase();
            filterCards();
        }, 150); // Debounce delay
    });

    // Initialize visibility
    filterCards();
});