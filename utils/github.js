const axios = require('axios');

/**
 * Rank Thresholds
 */
const RANKS = {
    SECRET: { label: 'SECRET', color: '#ff0055' }, // Special
    SSS: { label: 'SSS', color: '#ff0055' },
    SS: { label: 'SS', color: '#ffb300' }, // Gold
    S: { label: 'S', color: '#ffb300' },
    AAA: { label: 'AAA', color: '#0969da' }, // Blue
    AA: { label: 'AA', color: '#0969da' },
    A: { label: 'A', color: '#0969da' },
    B: { label: 'B', color: '#2da44e' }, // Green
    C: { label: 'C', color: '#8b949e' }, // Gray
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
 * Fetch GitHub user data and determine Ranks
 * @param {string} username 
 * @returns {Promise<object>}
 */
async function fetchTrophyData(username) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const headers = { 'User-Agent': 'github-trophy-generator' };
    if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;

    try {
        const response = await axios.get(`https://api.github.com/users/${username}`, { headers });
        const user = response.data;

        // Derived Stats
        const accountAgeDays = (new Date() - new Date(user.created_at)) / (1000 * 60 * 60 * 24);

        // Trophies Configuration
        const trophies = [
            {
                category: 'Followers',
                value: user.followers,
                rank: getRank(user.followers, { SSS: 2000, SS: 1000, S: 500, AAA: 200, AA: 100, A: 50, B: 10 })
            },
            {
                category: 'Repositories',
                value: user.public_repos,
                rank: getRank(user.public_repos, { SSS: 200, SS: 100, S: 50, AAA: 30, AA: 20, A: 10, B: 5 })
            },
            {
                category: 'Gists',
                value: user.public_gists,
                rank: getRank(user.public_gists, { SSS: 100, SS: 50, S: 20, AAA: 15, AA: 10, A: 5, B: 1 })
            },
            {
                category: 'Experience',
                value: Math.floor(accountAgeDays / 365) + ' Years',
                rank: getRank(accountAgeDays, { SSS: 3650, SS: 2555, S: 1825, AAA: 1095, AA: 730, A: 365, B: 180 })
            },
            {
                category: 'Following',
                value: user.following,
                rank: getRank(user.following, { SSS: 500, SS: 200, S: 100, AAA: 75, AA: 50, A: 30, B: 10 })
            }
        ];

        return {
            success: true,
            username: user.login,
            trophies: trophies
        };

    } catch (error) {
        if (error.response && error.response.status === 404) throw new Error('User not found');
        if (error.response && error.response.status === 403) throw new Error('Rate limit exceeded');
        throw new Error('Failed to fetch stats');
    }
}

module.exports = { fetchTrophyData };
