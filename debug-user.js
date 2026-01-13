const { fetchTrophyData } = require('./utils/github');

async function debug() {
    const username = 'VaradScript';
    try {
        console.log(`Fetching data for ${username}...`);
        const data = await fetchTrophyData(username);
        const starsTrophy = data.visible.find(t => t.id === 'stars');
        console.log('--- STARS TROPHY DATA ---');
        console.log(JSON.stringify(starsTrophy, null, 2));

        console.log('--- ALL TROPHIES ---');
        data.visible.forEach(t => {
            console.log(`${t.id}: ${t.value} (Rank ${t.rank}, Tier ${t.tier}, Secret: ${t.isSecret})`);
        });
    } catch (e) {
        console.error(e);
    }
}

debug();
