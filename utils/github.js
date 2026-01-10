const axios = require('axios');

/**
 * Metric Names & Trophy Names mapping based on image references
 */
const TROPHY_TITLES = {
    stars: ['Star NPC', 'Star Certified', 'Galaxy Brain', 'Universal Rizz'],
    followers: ['Ghosted', 'Valid User', 'Famous', 'Main Character'],
    repos: ['Fork Enjoyer', 'Lowkey Builder', 'Project Chad', 'Creative GOAT'],
    prs: ['PR Simp', 'Valid Requester', 'Master Chef', 'Top Tier Cook'],
    issues: ['Bug NPC', 'Bug Hunter', 'Exorcist', 'Bug Slayer Demon'],
    experience: ['Freshman', 'Old Head', 'Veteran', 'Ancient One'],
    gists: ['Note Taker', 'Script Kid', 'Code Wizard', 'Gist God'],
    commits: ['Casual', 'Grinder', 'Commits No Cap', 'Demon Mode'],
    reviews: ['Lurker', 'Vibe Checker', 'Senior Critic', 'Final Boss'],
    languages: ['Mono-brain', 'Polyglot', 'Lingua God', 'Omnilingual'],
    discussions: ['Silent', 'Galaxy Brain', 'Community Sensei', 'Giga Chad'],
    sponsors: ['Gatekeeper', 'Patron', 'Sugar Parent', 'Venture Capitalist'],
    stars_given: ['Lurker', 'Explorer', 'Star Gifter', 'Galaxy Collector'],
    forks: ['Copy Paste', 'Forker', 'Chain Reaction', 'The Blueprint']
};

/**
 * Milestone Thresholds (Beginner friendly)
 */
const MILESTONES = {
    stars: [1, 20, 100, 500],
    followers: [1, 15, 60, 250],
    repos: [1, 10, 30, 100],
    prs: [1, 10, 50, 200],
    issues: [1, 10, 50, 200],
    experience: [0, 1, 3, 5],
    gists: [1, 5, 20, 50],
    commits: [10, 100, 1000, 5000],
    reviews: [1, 10, 50, 150],
    languages: [2, 5, 10, 20],
    discussions: [1, 5, 20, 100],
    sponsors: [1, 3, 10, 50],
    stars_given: [10, 100, 500, 2000],
    forks: [1, 10, 50, 200]
};

const TIER_LABELS = ['BRONZE', 'SILVER', 'GOLD', 'LEGENDARY'];
const RANK_LABELS = ['C', 'B', 'A', 'S', 'SSS']; // Indices mapped based on performance

/**
 * Level logic (Simplified)
 */
function calculateLevel(totalXP) {
    let level = 1;
    let xpThreshold = 100;
    let tempXP = totalXP;
    while (tempXP >= xpThreshold) {
        tempXP -= xpThreshold;
        level++;
        xpThreshold = Math.floor(xpThreshold * 1.5);
    }
    return { level, progress: (tempXP / xpThreshold) * 100 };
}

/**
 * Get Trophy Data for a specific metric
 */
function getMetricTrophy(id, value, config) {
    const milestones = MILESTONES[id];
    let tierIndex = -1;
    for (let i = 0; i < milestones.length; i++) {
        if (value >= milestones[i]) tierIndex = i;
    }

    const isUnlocked = tierIndex >= 0;
    const currentTier = isUnlocked ? TIER_LABELS[tierIndex] : 'LOCKED';
    const currentRank = isUnlocked ? RANK_LABELS[tierIndex + 1] : RANK_LABELS[0];
    const title = isUnlocked ? TROPHY_TITLES[id][tierIndex] : 'Locked';

    const nextMilestone = milestones[tierIndex + 1] || milestones[milestones.length - 1];

    return {
        id: config.label || id,
        title,
        icon: config.icon,
        value,
        unit: 'pt',
        unlocked: isUnlocked,
        tier: currentTier,
        label: currentRank,
        progress: (value / nextMilestone) * 100
    };
}

async function fetchDetailedStats(username, headers) {
    try {
        const [reposRes, prsRes, issuesRes, commitsRes, reviewsRes, discRes] = await Promise.allSettled([
            axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, { headers }),
            axios.get(`https://api.github.com/search/issues?q=author:${username}+type:pr`, { headers }),
            axios.get(`https://api.github.com/search/issues?q=author:${username}+type:issue`, { headers }),
            axios.get(`https://api.github.com/search/commits?q=author:${username}`, { headers: { ...headers, 'Accept': 'application/vnd.github.cloak-preview' } }),
            axios.get(`https://api.github.com/search/issues?q=commenter:${username}+-author:${username}`, { headers }),
            axios.get(`https://api.github.com/search/issues?q=commenter:${username}+author:${username}+type:discussion`, { headers })
        ]);

        let stars = 0;
        let forks = 0;
        let languages = new Set();
        if (reposRes.status === 'fulfilled') {
            reposRes.value.data.forEach(repo => {
                stars += (repo.stargazers_count || 0);
                forks += (repo.forks_count || 0);
                if (repo.language) languages.add(repo.language);
            });
        }

        // Stars Given (requires separate fetch or user data)
        const userRes = await axios.get(`https://api.github.com/users/${username}`, { headers });
        const following = userRes.data.following; // Proxy for engagement

        const prs = prsRes.status === 'fulfilled' ? prsRes.value.data.total_count : 0;
        const issues = issuesRes.status === 'fulfilled' ? issuesRes.value.data.total_count : 0;
        const commits = commitsRes.status === 'fulfilled' ? commitsRes.value.data.total_count : 0;
        const reviews = reviewsRes.status === 'fulfilled' ? reviewsRes.value.data.total_count : 0;
        const discussions = discRes.status === 'fulfilled' ? discRes.value.data.total_count : 0;

        return {
            stars, prs, issues, commits, reviews,
            languages: languages.size,
            discussions,
            forks,
            sponsors: 0, // Hard to fetch without auth scope sometimes
            stars_given: userRes.data.public_gists * 2 + userRes.data.public_repos * 5 // Mock/Proxy for total activity
        };
    } catch (e) {
        return { stars: 0, prs: 0, issues: 0, commits: 0, reviews: 0, languages: 0, discussions: 0, forks: 0, sponsors: 0, stars_given: 0 };
    }
}

async function fetchTrophyData(username) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const headers = { 'User-Agent': 'github-trophy-generator' };
    if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;

    try {
        const response = await axios.get(`https://api.github.com/users/${username}`, { headers });
        const user = response.data;
        const { stars, prs, issues, commits, reviews, languages, discussions, forks, stars_given } = await fetchDetailedStats(username, headers);
        const accountAgeYears = Math.floor((new Date() - new Date(user.created_at)) / (1000 * 60 * 60 * 24 * 365));

        const trophies = [
            getMetricTrophy('stars', stars, { label: 'Stars' }),
            getMetricTrophy('repos', user.public_repos, { label: 'Repos' }),
            getMetricTrophy('followers', user.followers, { label: 'Followers' }),
            getMetricTrophy('issues', issues, { label: 'Issues' }),
            getMetricTrophy('prs', prs, { label: 'PR' }),
            getMetricTrophy('experience', accountAgeYears, { label: 'Years' }),
            getMetricTrophy('gists', user.public_gists, { label: 'Gists' }),
            getMetricTrophy('commits', commits, { label: 'Commits' }),
            getMetricTrophy('reviews', reviews, { label: 'Reviews' }),
            getMetricTrophy('languages', languages, { label: 'Languages' }),
            getMetricTrophy('discussions', discussions, { label: 'Discussions' }),
            getMetricTrophy('forks', forks, { label: 'Forks' }),
            getMetricTrophy('sponsors', user.following, { label: 'Sponsors' }), // Using following as proxy for active engagement
            getMetricTrophy('stars_given', stars_given, { label: 'Explorer' })
        ];

        return {
            username: user.login,
            visible: trophies,
            hidden: []
        };
    } catch (error) {
        if (error.response?.status === 404) throw new Error('User not found');
        if (error.response?.status === 403) throw new Error('Rate limit exceeded');
        throw new Error('Failed to fetch stats');
    }
}

module.exports = { fetchTrophyData };
