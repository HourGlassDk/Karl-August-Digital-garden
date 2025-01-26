document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('[data-filter], [data-growth]');
    const searchInput = document.getElementById('search-input');
    const gardenCards = document.querySelectorAll('article');

    let currentFilter = 'all';
    let currentGrowth = null;
    let searchQuery = '';

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