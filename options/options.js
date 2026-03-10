// Procrastinator's Roastmaster Options Script

const DEFAULT_SITES = [
    { domain: 'youtube.com', enabled: true },
    { domain: 'facebook.com', enabled: true },
    { domain: 'twitter.com', enabled: true },
    { domain: 'instagram.com', enabled: true },
    { domain: 'tiktok.com', enabled: true },
    { domain: 'reddit.com', enabled: true },
    { domain: 'netflix.com', enabled: true },
    { domain: 'twitch.tv', enabled: true }
];

const DEFAULT_SETTINGS = {
    threshold: 30,
    escalation: 60,
    sites: DEFAULT_SITES,
    enableNotifications: true,
    enableOverlays: true,
    dataConsent: true,
    realTimeRoasting: true,
    leaderboardEnabled: true
};

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    setupEventListeners();
});

function loadSettings() {
    chrome.storage.sync.get(['settings'], (result) => {
        const settings = result.settings || DEFAULT_SETTINGS;
        populateForm(settings);
    });
}

function populateForm(settings) {
    document.getElementById('threshold').value = settings.threshold || 30;
    document.getElementById('escalation').value = settings.escalation || 60;
    document.getElementById('enable-notifications').checked = settings.enableNotifications !== false;
    document.getElementById('enable-overlays').checked = settings.enableOverlays !== false;
    document.getElementById('real-time-roasting').checked = settings.realTimeRoasting !== false;
    document.getElementById('leaderboard-enabled').checked = settings.leaderboardEnabled !== false;
    document.getElementById('data-consent').checked = settings.dataConsent !== false;

    const sitesList = document.getElementById('sites-list');
    sitesList.innerHTML = '';

    const sites = settings.sites || DEFAULT_SITES;
    sites.forEach(site => {
        const div = document.createElement('div');
        div.className = 'site-item';
        div.innerHTML = `
            <label>
                <input type="checkbox" value="${site.domain}" ${site.enabled ? 'checked' : ''}>
                ${site.domain}
            </label>
        `;
        sitesList.appendChild(div);
    });
}

function setupEventListeners() {
    document.getElementById('settings-form').addEventListener('submit', saveSettings);
    document.getElementById('reset-defaults').addEventListener('click', resetToDefaults);
    document.getElementById('export-data').addEventListener('click', exportData);
    document.getElementById('clear-data').addEventListener('click', clearData);
}

function saveSettings(e) {
    e.preventDefault();

    const sites = Array.from(document.querySelectorAll('#sites-list input')).map(input => ({
        domain: input.value,
        enabled: input.checked
    }));

    const settings = {
        threshold: parseInt(document.getElementById('threshold').value),
        escalation: parseInt(document.getElementById('escalation').value),
        sites: sites,
        enableNotifications: document.getElementById('enable-notifications').checked,
        enableOverlays: document.getElementById('enable-overlays').checked,
        realTimeRoasting: document.getElementById('real-time-roasting').checked,
        leaderboardEnabled: document.getElementById('leaderboard-enabled').checked,
        dataConsent: document.getElementById('data-consent').checked
    };

    chrome.storage.sync.set({ settings: settings }, () => {
        showStatus('Settings saved successfully!', 'success');
        // Notify background script to reload settings
        chrome.runtime.sendMessage({ action: 'settingsUpdated', settings: settings });
    });
}

function resetToDefaults() {
    if (confirm('Reset all settings to defaults?')) {
        chrome.storage.sync.set({ settings: DEFAULT_SETTINGS }, () => {
            populateForm(DEFAULT_SETTINGS);
            showStatus('Settings reset to defaults!', 'success');
        });
    }
}

function exportData() {
    chrome.storage.local.get(['procrastinationData'], (result) => {
        const data = result.procrastinationData || {};
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'procrastination-data.json';
        a.click();

        URL.revokeObjectURL(url);
        showStatus('Data exported!', 'success');
    });
}

function clearData() {
    if (confirm('Clear all procrastination data? This cannot be undone.')) {
        chrome.storage.local.remove(['procrastinationData'], () => {
            showStatus('All data cleared!', 'success');
        });
    }
}

function showStatus(message, type) {
    const status = document.getElementById('status-message');
    status.textContent = message;
    status.className = `status ${type}`;
    setTimeout(() => {
        status.textContent = '';
        status.className = '';
    }, 3000);
}