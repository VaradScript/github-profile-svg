const axios = require('axios');

/**
 * Rank Thresholds
 */
const RANKS = {
    SECRET: { label: 'SECRET', color: '#ff0055' },
    SSS: { label: 'SSS', color: '#ff0055' },
    SS: { label: 'SS', color: '#ffb300' },
    S: { label: 'S', color: '#ffb300' },
    AAA: { label: 'AAA', color: '#0969da' },
    AA: { label: 'AA', color: '#0969da' },
    A: { label: 'A', color: '#0969da' },
    B: { label: 'B', color: '#2da44e' },
    C: { label: 'C', color: '#8b949e' },
    UNKNOWN: { label: '?', color: '#8b949e' }
};

/**
 * Calculate Rank Helper
 */
function getRank(value, thresholds) {
    if (value >= thresholds.SSS) return 'SSS';
    if (value >= thresholds.SS) return 'SS';
    if (value >= thresholds.S) return 'S';
    if (value >= thresholds.AAA) return 'AAA';
    if (value >= thresholds.AA) return 'AA';
    if (value >= thresholds.A) return 'A';
    if (value >= thresholds.B) return 'B';
    return 'C';
}

/**
 * Fetch detailed stats (Stars, Issues, PRs)
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
            stars = reposRes.value.data.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        }

        const prs = prsRes.status === 'fulfilled' ? prsRes.value.data.total_count : 0;
        const issues = issuesRes.status === 'fulfilled' ? issuesRes.value.data.total_count : 0;

        return { stars, prs, issues };
    } catch (e) {
        return { stars: 0, prs: 0, issues: 0 };
    }
}

/**
 * Fetch GitHub user data and determine Ranks
 */
async function fetchTrophyData(username) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const headers = { 'User-Agent': 'github-trophy-generator' };
    if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;

    try {
        const response = await axios.get(`https://api.github.com/users/${username}`, { headers });
        const user = response.data;
        const { stars, prs, issues } = await fetchDetailedStats(username, headers);

        // Derived Stats
        const accountAgeDays = (new Date() - new Date(user.created_at)) / (1000 * 60 * 60 * 24);
        const accountAgeYears = Math.floor(accountAgeDays / 365);

        // Trophies Configuration with Titles
        const trophies = [
            {
                category: 'Stars',
                title: 'Stargazer',
                value: stars,
                rank: getRank(stars, { SSS: 2000, SS: 500, S: 100, AAA: 50, AA: 25, A: 10, B: 1 })
            },
            {
                category: 'Followers',
                title: 'Celebrity',
                value: user.followers,
                rank: getRank(user.followers, { SSS: 2000, SS: 1000, S: 500, AAA: 200, AA: 100, A: 50, B: 10 })
            },
            {
                category: 'Repositories',
                title: 'Repo Creator',
                value: user.public_repos,
                rank: getRank(user.public_repos, { SSS: 200, SS: 100, S: 50, AAA: 30, AA: 20, A: 10, B: 5 })
            },
            {
                category: 'Pull Requests',
                title: 'Pull Shark',
                value: prs,
                rank: getRank(prs, { SSS: 1000, SS: 500, S: 100, AAA: 50, AA: 25, A: 10, B: 1 })
            },
            {
                category: 'Issues',
                title: 'Bug Hunter',
                value: issues,
                rank: getRank(issues, { SSS: 1000, SS: 500, S: 100, AAA: 50, AA: 25, A: 10, B: 1 })
            },
            {
                category: 'Experience',
                title: 'Veteran',
                value: accountAgeYears + ' Years',
                rank: getRank(accountAgeDays, { SSS: 3650, SS: 2555, S: 1825, AAA: 1095, AA: 730, A: 365, B: 180 })
            }
        ];

        return {
            success: true,
            username: user.login,
            trophies: trophies
        };

    } catch (error) {
        if (error.response && error.response.status === 404) throw new Error('User not found');
        throw new Error('Failed to fetch stats');
    }
}

module.exports = { fetchTrophyData };
