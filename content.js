// Procrastinator's Roastmaster Content Script

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'showRoast') {
        showRoastOverlay(message.roastMessage, message.domain, message.minutes);
    }
});

// Function to show roast overlay
function showRoastOverlay(message, domain, minutes) {
    // Remove existing overlay if any
    const existing = document.getElementById('procrastinator-roast-overlay');
    if (existing) existing.remove();

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.id = 'procrastinator-roast-overlay';
    overlay.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        ">
            <div style="font-weight: bold; margin-bottom: 8px;">🚨 Procrastinator Alert!</div>
            <div style="margin-bottom: 8px;">${message}</div>
            <div style="font-size: 12px; opacity: 0.8;">
                You've spent ${minutes} minutes on ${domain} today.
            </div>
            <button id="close-roast" style="
                margin-top: 10px;
                background: #ff4444;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
            ">Dismiss</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Add close button functionality
    document.getElementById('close-roast').addEventListener('click', () => {
        overlay.remove();
    });

    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.remove();
        }
    }, 10000);
}

// Optional: Show a subtle indicator on page load (can be removed if too intrusive)
function showSubtleIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'procrastinator-indicator';
    indicator.innerHTML = `
        <div style="
            position: fixed;
            bottom: 10px;
            left: 10px;
            background: rgba(255, 165, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 9999;
        ">
            🕒 Procrastinator's watching...
        </div>
    `;
    document.body.appendChild(indicator);

    // Remove after 5 seconds
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.remove();
        }
    }, 5000);
}

// Show subtle indicator on load (optional)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showSubtleIndicator);
} else {
    showSubtleIndicator();
}