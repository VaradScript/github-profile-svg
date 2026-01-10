const { fetchTrophyData } = require('./utils/github');
const { renderTrophySVG } = require('./themes/trophyRenderer');
const fs = require('fs');
const path = require('path');

async function test() {
    const data = await fetchTrophyData('octocat');
    const modes = ['2d', 'unreal', 'nostalgic'];

    for (const mode of modes) {
        const svg = renderTrophySVG(data, { mode, theme: 'dark' });
        fs.writeFileSync(path.join(__dirname, `test-${mode}.svg`), svg);
        console.log(`Generated test-${mode}.svg`);
    }
}

test().catch(console.error);
