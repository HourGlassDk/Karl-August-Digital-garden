// Function to calculate time elapsed since a given date
function calculateTimeElapsed(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
        return `${diffDays} days ago`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
        const years = Math.floor(diffDays / 365);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
}

// Function to update all article timestamps
function updateLastTendedTimestamps() {
    const articles = document.querySelectorAll('.post, .garden-card, .essay-card');
    
    articles.forEach(article => {
        const metaDiv = article.querySelector('.post-meta, .card-meta, .essay-meta');
        if (metaDiv) {
            const dateText = metaDiv.textContent;
            const dateMatch = dateText.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/);
            
            if (dateMatch) {
                const lastTendedText = `Last tended ${calculateTimeElapsed(dateMatch[0])}`;
                const existingLastTended = metaDiv.querySelector('.last-tended');
                
                if (existingLastTended) {
                    existingLastTended.textContent = lastTendedText;
                } else {
                    const lastTendedSpan = document.createElement('span');
                    lastTendedSpan.className = 'last-tended';
                    lastTendedSpan.textContent = lastTendedText;
                    metaDiv.appendChild(document.createTextNode(' • '));
                    metaDiv.appendChild(lastTendedSpan);
                }
            }
        }
    });
}

// Update timestamps when the page loads
document.addEventListener('DOMContentLoaded', updateLastTendedTimestamps);

// Update timestamps every minute
setInterval(updateLastTendedTimestamps, 60000);