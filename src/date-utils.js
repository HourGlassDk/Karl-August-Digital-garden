function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('da-DK', { day: 'numeric', month: 'numeric', year: 'numeric' });
}

function formatRelativeDate(dateString) {
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

document.addEventListener('DOMContentLoaded', () => {
    // Handle garden cards
    const cards = document.querySelectorAll('.garden-card');
    cards.forEach(card => {
        const writtenDate = card.getAttribute('data-planted-date');
        const tendedDate = card.getAttribute('data-tended-date');
        
        const writtenSpan = card.querySelector('.planted-date');
        const tendedSpan = card.querySelector('.tended-date');

        if (writtenDate && writtenSpan) {
            writtenSpan.textContent = formatRelativeDate(writtenDate);
        }
        if (tendedDate && tendedSpan) {
            tendedSpan.textContent = formatRelativeDate(tendedDate);
        }
    });

    // Handle main page dates
    const mainPlantedDate = document.querySelector('.planted-date[data-planted-date]');
    const mainTendedDate = document.querySelector('.tended-date[data-tended-date]');

    if (mainPlantedDate) {
        const plantedDate = mainPlantedDate.getAttribute('data-planted-date');
        mainPlantedDate.textContent = formatRelativeDate(plantedDate);
    }

    if (mainTendedDate) {
        const tendedDate = mainTendedDate.getAttribute('data-tended-date');
        mainTendedDate.textContent = formatRelativeDate(tendedDate);
    }
});