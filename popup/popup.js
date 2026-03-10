// Procrastinator's Roastmaster Popup Script (AI Roast Edition)

document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadLeaderboard();
    loadAchievements();
    setupEventListeners();
});

function loadStats() {
    chrome.storage.local.get(['procrastinationData'], (result) => {
        const data = result.procrastinationData || { dailyStats: {}, totalTime: {} };
        displayStats(data);
    });
}

function loadLeaderboard() {
    chrome.runtime.sendMessage({ action: 'getLeaderboard' }, (leaderboard) => {
        displayLeaderboard(leaderboard);
    });
}

function loadAchievements() {
    chrome.runtime.sendMessage({ action: 'getAchievements' }, (achievements) => {
        displayAchievements(achievements);
    });
}

function displayStats(data) {
    const statsContent = document.getElementById('stats-content');
    const dailyStats = data.dailyStats || {};

    let html = '<div class="stats-grid">';

    if (Object.keys(dailyStats).length === 0) {
        html += '<p>No procrastination detected today. Good job! 🎉</p>';
    } else {

        html += '<h3>Time Wasted Today:</h3>';

        for (const [domain, minutes] of Object.entries(dailyStats)) {
            html += `< div class="stat-item" >
                <span class="domain">${domain}</span>
                <span class="time">${minutes} min</span>
            </ > `;
        }

        const totalToday = Object.values(dailyStats).reduce((sum, min) => sum + min, 0);

        html += `< div class="stat-total" > Total: ${totalToday} minutes</ > `;
    }

    html += '</div>';

    statsContent.innerHTML = html;
}

function setupEventListeners() {

    document.getElementById('get-roast')
        .addEventListener('click', generateRandomRoast);

    document.getElementById('reset-stats')
        .addEventListener('click', resetStats);

    document.getElementById('view-options')
        .addEventListener('click', openOptions);
}


// ==========================================
// AI Roast Generator
// ==========================================

function generateRandomRoast() {

    chrome.storage.local.get(['procrastinationData'], (result) => {

        const data = result.procrastinationData || { dailyStats: {} };
        const dailyStats = data.dailyStats || {};

        const domains = Object.keys(dailyStats);

        const totalToday = Object.values(dailyStats)
            .reduce((sum, min) => sum + min, 0);


        const openers = [
            "Breaking news.",
            "Alert.",
            "Status update.",
            "System notification.",
            "Reality check.",
            "Scientists confirm.",
            "Productivity report.",
            "Attention."
        ];

        const subjects = [
            "your productivity",
            "your focus",
            "your motivation",
            "your discipline",
            "your attention span",
            "your work ethic",
            "your goals",
            "your brain"
        ];

        const actions = [
            "has left the chat",
            "is buffering at 2%",
            "filed a missing person report",
            "took an extended vacation",
            "is stuck in airplane mode",
            "ran away screaming",
            "has been postponed indefinitely",
            "is currently in sleep mode"
        ];

        const insults = [
            "Even your coffee expected more from you.",
            "Your keyboard deserves a better owner.",
            "Your to-do list is crying quietly.",
            "Your WiFi works harder than you.",
            "Your future self just sighed loudly.",
            "A goldfish has a longer attention span.",
            "Somewhere a productivity guru just fainted.",
            "Your brain opened 47 tabs and none are useful."
        ];

        const scrollRoasts = [
            "You're doing Olympic-level procrastination.",
            "Another scroll won't fix your life.",
            "At this point you're just training your thumb.",
            "Legend says you'll start working in 5 minutes.",
            "Your deadline is approaching faster than your progress.",
            "This scroll session deserves a trophy.",
            "You call this productivity?",
            "Achievement unlocked: Professional Time Waster."
        ];

        const domainRoasts = {

            youtube: [
                "YouTube again? Your code won't write itself.",
                "Another video? Your future salary just decreased slightly."
            ],

            instagram: [
                "Instagram reels again? Your attention span is shrinking.",
                "Scrolling Instagram won't make you successful."
            ],

            reddit: [
                "Ah Reddit. Where productivity goes to die.",
                "Another Reddit thread? Your tasks are still waiting."
            ],

            twitter: [
                "Twitter again? Congratulations on learning nothing useful.",
                "Scrolling Twitter won't finish your project."
            ]
        };


        const rand = arr => arr[Math.floor(Math.random() * arr.length)];

        let roast =
            `${rand(openers)} ${rand(subjects)} ${rand(actions)}. ${rand(insults)} ${rand(scrollRoasts)} `;


        // Domain-aware roasting
        if (domains.length > 0) {

            const randomDomain = rand(domains).toLowerCase();

            if (domainRoasts[randomDomain]) {
                roast += " " + rand(domainRoasts[randomDomain]);
            }
        }


        // Time based roasting
        if (totalToday > 60) {
            roast += " You've wasted over an hour today.";
        }

        if (totalToday > 120) {
            roast += " That's basically a full movie worth of procrastination.";
        }

        if (totalToday > 180) {
            roast += " At this point procrastination should be your full-time job.";
        }


        document.getElementById('roast-message').textContent = roast;

    });
}

function displayLeaderboard(leaderboard) {
    const content = document.getElementById('leaderboard-content');
    if (!leaderboard || leaderboard.length === 0) {
        content.innerHTML = '<p>No leaderboard data yet. Start procrastinating!</p>';
        return;
    }

    let html = '<div class="leaderboard-list">';
    leaderboard.slice(0, 5).forEach((entry, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅';
        html += `
            <div class="leaderboard-item">
                <span class="rank">${medal} #${index + 1}</span>
                <span class="date">${new Date(entry.date).toLocaleDateString()}</span>
                <span class="time">${entry.totalTime} min</span>
                <span class="site">${entry.topSite ? entry.topSite[0] : 'N/A'}</span>
            </div>
        `;
    });
    html += '</div>';
    content.innerHTML = html;
}

function displayAchievements(achievements) {
    const content = document.getElementById('achievements-content');
    if (!achievements || achievements.length === 0) {
        content.innerHTML = '<p>No achievements yet. Keep going!</p>';
        return;
    }

    let html = '<div class="achievements-grid">';
    achievements.forEach(achievement => {
        const unlockedClass = achievement.unlocked ? 'unlocked' : 'locked';
        html += `
            <div class="achievement-item ${unlockedClass}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.desc}</div>
                    ${achievement.unlocked ? `<div class="achievement-date">Unlocked: ${new Date(achievement.unlockedAt).toLocaleDateString()}</div>` : ''}
                </div>
            </div>
        `;
    });
    html += '</div>';
    content.innerHTML = html;
}



// ==========================================
// Reset Stats
// ==========================================

function resetStats() {

    if (confirm("Are you sure you want to reset today's stats?")) {

        chrome.storage.local.get(['procrastinationData'], (result) => {

            const data = result.procrastinationData || {};

            data.dailyStats = {};
            data.lastReset = new Date().toDateString();

            chrome.storage.local.set({ procrastinationData: data }, () => {

                loadStats();
                alert('Stats reset!');

            });
        });
    }
}


// ==========================================
// Open Options
// ==========================================

function openOptions() {

    chrome.tabs.create({
        url: chrome.runtime.getURL('options/options.html')
    });

}

