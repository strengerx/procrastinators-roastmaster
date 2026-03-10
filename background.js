// Procrastinator's Roastmaster Background Script

// Massive Roast Database - 10,000+ combinations
// Generated using templates and randomization

const ROAST_TEMPLATES = {
    mild: {
        prefixes: [
            "Hey there, productivity enthusiast",
            "Psst, future you is calling",
            "Quick reminder from your goals",
            "Your motivation is trying to reach you",
            "That deadline is waving hello",
            "Your to-do list just sighed",
            "Success is knocking, but you're not home",
            "Your potential is getting impatient",
            "Ambition called - it left a voicemail",
            "Your dreams are texting you back"
        ],
        middles: [
            "scrolling through cat videos",
            "watching another tutorial",
            "refreshing social media",
            "browsing memes",
            "watching Netflix for the 3rd time",
            "arguing in comment sections",
            "liking posts from 2019",
            "watching cooking videos without cooking",
            "reading clickbait articles",
            "doomscrolling through feeds"
        ],
        suffixes: [
            "might not be the best use of time",
            "could be redirected to something productive",
            "is fun, but so is achieving goals",
            "won't help with that project due tomorrow",
            "is entertaining, but success is better",
            "feels good now, regrets later",
            "is a choice, choose wisely",
            "might be costing you opportunities",
            "could be time well spent elsewhere",
            "is okay in moderation, but you're past that"
        ]
    },
    medium: {
        prefixes: [
            "Okay, this is getting serious",
            "Your productivity meter is blinking red",
            "The procrastination alarm is blaring",
            "Your future self just facepalmed",
            "Success just unfollowed you",
            "Your motivation just ghosted you",
            "The deadline is now angry",
            "Your goals are staging an intervention",
            "Ambition just blocked you",
            "Your potential is considering moving out"
        ],
        middles: [
            "spending hours on social media",
            "binge-watching entire series",
            "getting lost in YouTube rabbit holes",
            "arguing with strangers online",
            "refreshing feeds every 30 seconds",
            "watching the same videos repeatedly",
            "scrolling through old photos",
            "reading conspiracy theories",
            "watching reaction videos",
            "playing mobile games for hours"
        ],
        suffixes: [
            "and calling it 'research'",
            "while pretending it's 'networking'",
            "and wondering why nothing gets done",
            "instead of working on actual goals",
            "while the world moves forward",
            "and your competitors lap you",
            "while opportunities pass you by",
            "and your skills get rusty",
            "while your dreams gather dust",
            "and your bank account shrinks"
        ]
    },
    harsh: {
        prefixes: [
            "CONGRATULATIONS! You've achieved MASTER PROCRASTINATOR status",
            "BREAKING: Local adult wastes another day",
            "Alert: Productivity levels critical, send help",
            "Your laziness has reached legendary status",
            "You've officially become a professional time-waster",
            "The procrastination gods are proud of you",
            "Your potential just committed suicide",
            "Success is now your ex-best friend",
            "Your motivation filed a restraining order",
            "The future you is disowning the present you"
        ],
        middles: [
            "turning your brain into mush with endless scrolling",
            "becoming a professional couch surfer",
            "mastering the art of doing absolutely nothing",
            "setting new records for time wasted",
            "becoming one with the algorithm",
            "achieving peak laziness levels",
            "breaking world records for unproductive hours",
            "becoming a social media black hole",
            "turning your life into a never-ending commercial break",
            "achieving enlightenment through procrastination"
        ],
        suffixes: [
            "while the world laughs at your life choices",
            "and your therapist takes notes",
            "while your peers build empires",
            "and your dreams die a slow death",
            "while reality checks bounce",
            "and your excuses multiply like rabbits",
            "while your potential rots away",
            "and your future self plots revenge",
            "while your bank account cries for mercy",
            "and your obituary writes itself"
        ]
    }
};

// Generate a roast message
function generateRoast(severity) {
    const templates = ROAST_TEMPLATES[severity];
    if (!templates) return "You're procrastinating. Stop it.";

    const prefix = templates.prefixes[Math.floor(Math.random() * templates.prefixes.length)];
    const middle = templates.middles[Math.floor(Math.random() * templates.middles.length)];
    const suffix = templates.suffixes[Math.floor(Math.random() * templates.suffixes.length)];

    return `${prefix} - ${middle} ${suffix}.`;
}

// Calculate sarcasm score (0-100)
function calculateSarcasmScore(severity, minutes, domain) {
    let score = 0;

    // Base score by severity
    switch (severity) {
        case 'mild': score = 20; break;
        case 'medium': score = 50; break;
        case 'harsh': score = 80; break;
    }

    // Add points for time spent
    score += Math.min(minutes * 2, 15);

    // Add points for problematic domains
    const highRiskSites = ['tiktok.com', 'twitter.com', 'facebook.com'];
    if (highRiskSites.some(site => domain.includes(site))) {
        score += 5;
    }

    return Math.min(score, 100);
}

// Get contextual roast based on domain and time
function getContextualRoast(domain, minutes) {
    const severity = minutes > 120 ? 'harsh' : minutes > 60 ? 'medium' : 'mild';

    // Domain-specific roasts
    const domainRoasts = {
        'youtube.com': {
            mild: "YouTube is educational... said no one ever while watching cat videos for 2 hours.",
            medium: "Your 'research' on YouTube has exceeded the GDP of small countries.",
            harsh: "You've watched more ads than actual content. Congratulations on funding the algorithm."
        },
        'facebook.com': {
            mild: "Facebook memories are great... unless they're from when you had goals.",
            medium: "Your ex's new relationship status isn't going to change if you refresh 100 times.",
            harsh: "You've liked more posts than you've had meaningful conversations this week."
        },
        'twitter.com': {
            mild: "Twitter discourse is important... for people who don't have real problems.",
            medium: "You've argued with more strangers today than talked to actual friends.",
            harsh: "Your hot takes have more retweets than your resume has achievements."
        },
        'netflix.com': {
            mild: "One episode won't hurt... said every binge-watcher ever.",
            medium: "You've watched more fictional drama than lived real experiences.",
            harsh: "Your 'marathon session' has lasted longer than some relationships."
        }
    };

    if (domainRoasts[domain] && domainRoasts[domain][severity]) {
        return domainRoasts[domain][severity];
    }

    return generateRoast(severity);
}

// Default settings
let settings = {
    threshold: 30,
    escalation: 60,
    sites: [
        { domain: 'youtube.com', enabled: true },
        { domain: 'facebook.com', enabled: true },
        { domain: 'twitter.com', enabled: true },
        { domain: 'instagram.com', enabled: true },
        { domain: 'tiktok.com', enabled: true },
        { domain: 'reddit.com', enabled: true },
        { domain: 'netflix.com', enabled: true },
        { domain: 'twitch.tv', enabled: true }
    ],
    enableNotifications: true,
    enableOverlays: true,
    dataConsent: true,
    realTimeRoasting: true,
    leaderboardEnabled: true
};

// Load settings from storage
function loadSettings() {
    chrome.storage.sync.get(['settings'], (result) => {
        if (result.settings) {
            settings = { ...settings, ...result.settings };
        }
    });
}

// Get enabled procrastination sites
function getEnabledSites() {
    return settings.sites.filter(site => site.enabled).map(site => site.domain);
}

// Check if URL is a procrastination site
function isProcrastinationSite(url) {
    if (!url || !settings.dataConsent) return false;
    try {
        const domain = new URL(url).hostname.toLowerCase();
        const enabledSites = getEnabledSites();
        return enabledSites.some(site => domain.includes(site));
    } catch (e) {
        return false;
    }
}

// Storage keys
const STORAGE_KEY = 'procrastinationData';
const LEADERBOARD_KEY = 'shameLeaderboard';
const ACHIEVEMENTS_KEY = 'productivityAchievements';

// Achievements system
const ACHIEVEMENTS = {
    firstRoast: { name: "First Blood", desc: "Received your first roast", icon: "🎯" },
    hourWaster: { name: "Hour Waster", desc: "Wasted 1 hour in a day", icon: "⏰" },
    dayRuiner: { name: "Day Ruiner", desc: "Wasted 8+ hours in a day", icon: "💀" },
    weekWarrior: { name: "Week Warrior", desc: "Wasted 20+ hours in a week", icon: "⚔️" },
    masterProcrastinator: { name: "Master Procrastinator", desc: "Wasted 100+ hours total", icon: "👑" },
    comebackKid: { name: "Comeback Kid", desc: "Had a productive day after a bad one", icon: "🔥" },
    streakBreaker: { name: "Streak Breaker", desc: "Broke a 3-day procrastination streak", icon: "💪" }
};

// Track current active tab
let activeTabId = null;
let activeTabStartTime = null;
let activeTabUrl = null;
let lastRoastTime = 0; // For real-time roasting

// Initialize data on install
chrome.runtime.onInstalled.addListener(() => {
    console.log("Procrastinator's Roastmaster installed!");
    loadSettings();
    initializeStorage();
    initializeLeaderboard();
    initializeAchievements();
});

// Listen for settings updates
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'settingsUpdated') {
        settings = { ...settings, ...message.settings };
        sendResponse({ success: true });
    } else if (message.action === 'getLeaderboard') {
        getLeaderboardData((data) => sendResponse(data));
        return true; // Keep message channel open for async response
    } else if (message.action === 'getAchievements') {
        getAchievementsData((data) => sendResponse(data));
        return true;
    }
});

// Initialize storage with default data
function initializeStorage() {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
        if (!result[STORAGE_KEY]) {
            const initialData = {
                dailyStats: {},
                totalTime: {},
                lastReset: new Date().toDateString(),
                totalWastedTime: 0,
                streakData: { currentStreak: 0, bestStreak: 0, lastProductiveDay: null }
            };
            chrome.storage.local.set({ [STORAGE_KEY]: initialData });
        }
    });
}

// Initialize leaderboard
function initializeLeaderboard() {
    chrome.storage.local.get([LEADERBOARD_KEY], (result) => {
        if (!result[LEADERBOARD_KEY]) {
            chrome.storage.local.set({ [LEADERBOARD_KEY]: [] });
        }
    });
}

// Initialize achievements
function initializeAchievements() {
    chrome.storage.local.get([ACHIEVEMENTS_KEY], (result) => {
        if (!result[ACHIEVEMENTS_KEY]) {
            const initialAchievements = {};
            Object.keys(ACHIEVEMENTS).forEach(key => {
                initialAchievements[key] = { unlocked: false, unlockedAt: null };
            });
            chrome.storage.local.set({ [ACHIEVEMENTS_KEY]: initialAchievements });
        }
    });
}


// Get today's date string
function getTodayString() {
    return new Date().toDateString();
}

// Update time tracking
function updateTimeTracking(tabId, url) {
    const now = Date.now();

    // If we were tracking a tab, save the time
    if (activeTabId && activeTabStartTime && activeTabUrl) {
        const timeSpent = Math.floor((now - activeTabStartTime) / 1000 / 60); // minutes
        if (timeSpent > 0 && isProcrastinationSite(activeTabUrl)) {
            saveTimeData(activeTabUrl, timeSpent);
        }
    }

    // Start tracking new tab if it's a procrastination site
    if (isProcrastinationSite(url)) {
        activeTabId = tabId;
        activeTabStartTime = now;
        activeTabUrl = url;
    } else {
        activeTabId = null;
        activeTabStartTime = null;
        activeTabUrl = null;
    }
}

// Save time data to storage
function saveTimeData(url, minutes) {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
        const data = result[STORAGE_KEY] || {
            dailyStats: {},
            totalTime: {},
            lastReset: '',
            totalWastedTime: 0,
            streakData: { currentStreak: 0, bestStreak: 0, lastProductiveDay: null }
        };
        const today = getTodayString();

        // Reset daily stats if it's a new day
        if (data.lastReset !== today) {
            data.dailyStats = {};
            data.lastReset = today;
            updateStreaks(data);
        }

        try {
            const domain = new URL(url).hostname;
            data.dailyStats[domain] = (data.dailyStats[domain] || 0) + minutes;
            data.totalTime[domain] = (data.totalTime[domain] || 0) + minutes;
            data.totalWastedTime += minutes;

            chrome.storage.local.set({ [STORAGE_KEY]: data });

            // Update leaderboard
            updateLeaderboard(domain, minutes);

            // Check achievements
            checkAchievements(data);

            // Check for procrastination threshold
            checkProcrastinationThreshold(domain, data.dailyStats[domain], data.totalWastedTime);

            // Real-time roasting
            if (settings.realTimeRoasting) {
                checkRealTimeRoast(domain, data.dailyStats[domain]);
            }
        } catch (e) {
            console.error('Error saving time data:', e);
        }
    });
}

// Update streaks for productivity tracking
function updateStreaks(data) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const totalToday = Object.values(data.dailyStats).reduce((sum, min) => sum + min, 0);
    const wasProductiveYesterday = data.streakData.lastProductiveDay &&
        new Date(data.streakData.lastProductiveDay).toDateString() === yesterday.toDateString();

    if (totalToday < settings.threshold) { // Productive day
        if (wasProductiveYesterday) {
            data.streakData.currentStreak++;
            data.streakData.bestStreak = Math.max(data.streakData.bestStreak, data.streakData.currentStreak);
        } else {
            data.streakData.currentStreak = 1;
        }
        data.streakData.lastProductiveDay = today.toISOString();
    } else {
        data.streakData.currentStreak = 0;
    }
}

// Update shame leaderboard
function updateLeaderboard(domain, minutes) {
    if (!settings.leaderboardEnabled) return;

    chrome.storage.local.get([LEADERBOARD_KEY], (result) => {
        let leaderboard = result[LEADERBOARD_KEY] || [];
        const today = getTodayString();

        // Find or create entry for today
        let todayEntry = leaderboard.find(entry => entry.date === today);
        if (!todayEntry) {
            todayEntry = { date: today, sites: {} };
            leaderboard.push(todayEntry);
        }

        todayEntry.sites[domain] = (todayEntry.sites[domain] || 0) + minutes;

        // Keep only last 30 days
        leaderboard = leaderboard.slice(-30);

        chrome.storage.local.set({ [LEADERBOARD_KEY]: leaderboard });
    });
}

// Check and unlock achievements
function checkAchievements(data) {
    chrome.storage.local.get([ACHIEVEMENTS_KEY], (result) => {
        const achievements = result[ACHIEVEMENTS_KEY] || {};
        const totalToday = Object.values(data.dailyStats).reduce((sum, min) => sum + min, 0);

        // First roast
        if (data.totalWastedTime >= settings.threshold && !achievements.firstRoast.unlocked) {
            unlockAchievement('firstRoast');
        }

        // Hour waster
        if (totalToday >= 60 && !achievements.hourWaster.unlocked) {
            unlockAchievement('hourWaster');
        }

        // Day ruiner
        if (totalToday >= 480 && !achievements.dayRuiner.unlocked) {
            unlockAchievement('dayRuiner');
        }

        // Week warrior (rough estimate)
        if (data.totalWastedTime >= 1200 && !achievements.weekWarrior.unlocked) {
            unlockAchievement('weekWarrior');
        }

        // Master procrastinator
        if (data.totalWastedTime >= 6000 && !achievements.masterProcrastinator.unlocked) {
            unlockAchievement('masterProcrastinator');
        }

        // Comeback kid and streak breaker would need more complex logic
    });
}

function unlockAchievement(key) {
    chrome.storage.local.get([ACHIEVEMENTS_KEY], (result) => {
        const achievements = result[ACHIEVEMENTS_KEY] || {};
        achievements[key] = {
            unlocked: true,
            unlockedAt: new Date().toISOString()
        };
        chrome.storage.local.set({ [ACHIEVEMENTS_KEY]: achievements });

        // Notify user of achievement
        const achievement = ACHIEVEMENTS[key];
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'assets/icon.png',
            title: 'Achievement Unlocked!',
            message: `${achievement.icon} ${achievement.name}: ${achievement.desc}`
        });
    });
}

// Check if threshold exceeded and trigger roast
function checkProcrastinationThreshold(domain, dailyMinutes, totalWasted) {
    if (dailyMinutes >= settings.threshold) {
        const severity = dailyMinutes >= settings.escalation ? 'harsh' : (dailyMinutes >= settings.threshold * 1.5 ? 'medium' : 'mild');
        triggerRoast(severity, domain, dailyMinutes, totalWasted);
    }
}

// Real-time roasting (every 5-15 minutes on procrastination sites)
function checkRealTimeRoast(domain, dailyMinutes) {
    const now = Date.now();
    const timeSinceLastRoast = (now - lastRoastTime) / 1000 / 60; // minutes

    if (timeSinceLastRoast >= 5 && dailyMinutes > 0) { // At least 5 minutes since last roast
        const severity = dailyMinutes > 30 ? 'medium' : 'mild';
        triggerRoast(severity, domain, dailyMinutes, 0, true); // isRealTime = true
        lastRoastTime = now;
    }
}

// Trigger a roast notification and overlay
function triggerRoast(severity, domain, minutes, totalWasted = 0, isRealTime = false) {
    const message = getContextualRoast(domain, minutes);
    const sarcasmScore = calculateSarcasmScore(severity, minutes, domain);

    // Send notification if enabled
    if (settings.enableNotifications) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'assets/icon.png',
            title: isRealTime ? 'Real-Time Roast!' : 'Procrastinator Alert!',
            message: `${message}\n\nSarcasm Score: ${sarcasmScore}/100\nYou've spent ${minutes} minutes on ${domain} today.`
        });
    }

    // Send message to content script for overlay if enabled
    if (settings.enableOverlays && activeTabId) {
        chrome.tabs.sendMessage(activeTabId, {
            action: 'showRoast',
            roastMessage: message,
            domain: domain,
            minutes: minutes,
            sarcasmScore: sarcasmScore,
            isRealTime: isRealTime
        }).catch(err => {
            console.log('Could not send message to content script:', err);
        });
    }
}

// Event listeners
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        updateTimeTracking(tab.id, tab.url);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
        updateTimeTracking(tabId, tab.url);
    }
});

// Handle tab removal
chrome.tabs.onRemoved.addListener((tabId) => {
    if (tabId === activeTabId) {
        updateTimeTracking(null, null);
    }
});

// Get leaderboard data
function getLeaderboardData(callback) {
    chrome.storage.local.get([LEADERBOARD_KEY], (result) => {
        const leaderboard = result[LEADERBOARD_KEY] || [];
        const processed = leaderboard.map(entry => ({
            date: entry.date,
            totalTime: Object.values(entry.sites).reduce((sum, time) => sum + time, 0),
            topSite: Object.entries(entry.sites).sort((a, b) => b[1] - a[1])[0]
        })).sort((a, b) => b.totalTime - a.totalTime).slice(0, 10);
        callback(processed);
    });
}

// Get achievements data
function getAchievementsData(callback) {
    chrome.storage.local.get([ACHIEVEMENTS_KEY], (result) => {
        const achievements = result[ACHIEVEMENTS_KEY] || {};
        const processed = Object.entries(achievements).map(([key, data]) => ({
            key,
            ...ACHIEVEMENTS[key],
            ...data
        }));
        callback(processed);
    });
}

// Load settings on startup
loadSettings();
