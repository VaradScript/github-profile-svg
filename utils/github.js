const axios = require('axios');

/**
 * XP Point Weights (Balanced for Beginner to Pro)
 */
const XP_WEIGHTS = {
    STAR: 5,
    FOLLOWER: 10,
    REPO: 10,
    PR: 10,
    ISSUE: 5,
    YEAR: 30
};

/**
 * Milestone Thresholds (Lowered for Beginner friendly progression)
 */
const MILESTONES = {
    stars: [1, 10, 50, 200], // Bronze at 1 star now!
    followers: [1, 15, 60, 250],
    repos: [1, 10, 30, 100],
    prs: [1, 10, 50, 200],
    issues: [1, 10, 50, 200],
    experience: [0, 1, 3, 5] // Bronze starts immediately (0 years)
};

const TIER_LABELS = ['BRONZE', 'SILVER', 'GOLD', 'LEGENDARY'];

/**
 * Simplified Level Logic
 */
function calculateLevel(totalXP) {
    let level = 1;
    let xpThreshold = 100; // Faster leveling for beginners
    let tempXP = totalXP;

    while (tempXP >= xpThreshold) {
        tempXP -= xpThreshold;
        level++;
        xpThreshold = Math.floor(xpThreshold * 1.5);
    }

    return {
        level,
        currentXP: tempXP,
        nextLevelXP: xpThreshold,
        progress: Math.min((tempXP / xpThreshold) * 100, 100)
    };
}

/**
 * Fetch detailed stats
 */
async function fetchDetailedStats(username, headers) {
    try {
        const [reposRes, prsRes, issuesRes] = await Promise.allSettled([
            axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, { headers }),
            axios.get(`https://api.github.com/search/issues?q=author:${username}+type:pr`, { headers }),
            axios.get(`https://api.github.com/search/issues?q=author:${username}+type:issue`, { headers })
        ]);

        let stars = 0;
        if (reposRes.status === 'fulfilled') {
            stars = reposRes.value.data.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
        }

        const prs = prsRes.status === 'fulfilled' ? prsRes.value.data.total_count : 0;
        const issues = issuesRes.status === 'fulfilled' ? issuesRes.value.data.total_count : 0;

        return { stars, prs, issues };
    } catch (e) {
        return { stars: 0, prs: 0, issues: 0 };
    }
}

/**
 * Get Trophy Data
 */
function getMetricTrophy(id, value, config) {
    const milestones = MILESTONES[id];
    let tierIndex = -1;
    for (let i = 0; i < milestones.length; i++) {
        if (value >= milestones[i]) tierIndex = i;
    }

    const nextMilestone = milestones[tierIndex + 1] || milestones[milestones.length - 1];
    const isLegendary = tierIndex === 3;

    return {
        id,
        title: config.title,
        icon: config.icon,
        value,
        unit: config.unit,
        unlocked: tierIndex >= 0,
        tier: tierIndex >= 0 ? TIER_LABELS[tierIndex] : 'LOCKED',
        progress: isLegendary ? 100 : (value / nextMilestone) * 100,
        nextValue: nextMilestone
    };
}

/**
 * Main Data Fetcher
 */
async function fetchTrophyData(username) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const headers = { 'User-Agent': 'github-trophy-generator' };
    if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;

    try {
        const response = await axios.get(`https://api.github.com/users/${username}`, { headers });
        const user = response.data;
        const { stars, prs, issues } = await fetchDetailedStats(username, headers);

        const accountAgeDays = (new Date() - new Date(user.created_at)) / (1000 * 60 * 60 * 24);
        const accountAgeYears = Math.floor(accountAgeDays / 365);

        const totalXP =
            (stars * XP_WEIGHTS.STAR) +
            (user.followers * XP_WEIGHTS.FOLLOWER) +
            (user.public_repos * XP_WEIGHTS.REPO) +
            (prs * XP_WEIGHTS.PR) +
            (issues * XP_WEIGHTS.ISSUE) +
            (accountAgeYears * XP_WEIGHTS.YEAR);

        const levelData = calculateLevel(totalXP);

        const visibleTrophies = [
            getMetricTrophy('stars', stars, { title: 'Stars', icon: '⭐', unit: 'Pts' }),
            getMetricTrophy('followers', user.followers, { title: 'Followers', icon: '👥', unit: 'Pts' }),
            getMetricTrophy('repos', user.public_repos, { title: 'Repos', icon: '📦', unit: 'Pts' }),
            getMetricTrophy('prs', prs, { title: 'PRs', icon: '🔧', unit: 'Pts' }),
            getMetricTrophy('issues', issues, { title: 'Issues', icon: '🐞', unit: 'Pts' }),
            getMetricTrophy('experience', accountAgeYears, { title: 'Years', icon: '⏳', unit: 'Pts' })
        ];

        const lockedTrophies = [
            { id: 'leader', title: 'Leader', icon: '👑', value: user.followers, nextValue: 100, unlocked: user.followers >= 100, tier: user.followers >= 100 ? 'LEGENDARY' : 'LOCKED', unit: 'Pts' },
            { id: 'hero', title: 'Hero', icon: '🛡️', value: prs, nextValue: 50, unlocked: prs >= 50, tier: prs >= 50 ? 'GOLD' : 'LOCKED', unit: 'Pts' },
            { id: 'legend', title: 'Legend', icon: '🌌', value: stars, nextValue: 200, unlocked: stars >= 200, tier: stars >= 200 ? 'LEGENDARY' : 'LOCKED', unit: 'Pts' }
        ];

        return {
            username: user.login,
            totalXP,
            level: levelData,
            visible: visibleTrophies,
            locked: lockedTrophies,
            hidden: []
        };

    } catch (error) {
        if (error.response && error.response.status === 404) throw new Error('User not found');
        throw new Error('Failed to fetch stats');
    }
}

module.exports = { fetchTrophyData };
