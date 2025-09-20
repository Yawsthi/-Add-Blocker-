// This function finds and hides all known ad types and their containers.
const hidePageAds = () => {
    // Selectors for ads that live inside a larger section we need to hide.
    const containerAdSelectors = [
        'ytd-ad-slot-renderer',
        'ytd-display-ad-renderer',
        'ytd-promoted-sparkles-web-renderer',
        'ytd-statement-banner-renderer',
        'ytd-billboard-renderer'
    ];

    // Find each ad and hide its parent 'ytd-item-section-renderer' container.
    document.querySelectorAll(containerAdSelectors.join(', ')).forEach(adElement => {
        // .closest() travels up the DOM tree to find the nearest ancestor that matches.
        const parentContainer = adElement.closest('ytd-item-section-renderer');
        if (parentContainer && parentContainer.style.display !== 'none') {
            parentContainer.style.display = 'none';
            console.log('Hid an ad parent container:', parentContainer);
        }
    });

    // Handle sponsored video items separately, as we just hide the item itself.
    document.querySelectorAll('ytd-rich-item-renderer').forEach(item => {
        const sponsoredBadge = item.querySelector('#text.ytd-badge-supported-renderer');
        if (sponsoredBadge && sponsoredBadge.textContent.trim() === 'Sponsored') {
            if (item.style.display !== 'none') {
                item.style.display = 'none';
                console.log('Hid a "Sponsored" item:', item);
            }
        }
    });
};

// Use a MutationObserver to watch for dynamic content changes.
const observer = new MutationObserver(hidePageAds);

// Start observing the entire document.
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Run once on initial load.
hidePageAds();