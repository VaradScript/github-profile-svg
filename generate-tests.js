const { renderTrophySVG } = require('./themes/trophyRenderer');
const fs = require('fs');
const path = require('path');

const mockData = {
    username: 'octocat',
    visible: [
        { id: 'stars', tier: 'GOLD', unlocked: true, title: 'Star GOAT', value: 100, progress: 80 },
        { id: 'repos', tier: 'SILVER', unlocked: true, title: 'Lowkey Builder', value: 20 },
        { id: 'followers', tier: 'LEGENDARY', unlocked: true, title: 'Main Character', value: 500 },
        { id: 'issues', tier: 'BRONZE', unlocked: true, title: 'Bug NPC', value: 5 },
        { id: 'prs', tier: 'GOLD', unlocked: true, title: 'Master Chef', value: 100 },
        { id: 'experience', tier: 'SILVER', unlocked: true, title: 'Old Head', value: 3 },
        { id: 'gists', tier: 'GOLD', unlocked: true, title: 'Code Wizard', value: 30 },
        { id: 'commits', tier: 'LEGENDARY', unlocked: true, title: 'Demon Mode', value: 5000 },
        { id: 'reviews', tier: 'BRONZE', unlocked: true, title: 'Lurker', value: 2 },
        { id: 'languages', tier: 'GOLD', unlocked: true, title: 'Lingua God', value: 12 },
        { id: 'discussions', tier: 'BRONZE', unlocked: true, title: 'Lurker', value: 1, isSecret: true },
        { id: 'forks', tier: 'SILVER', unlocked: true, title: 'Forker', value: 15 },
        { id: 'sponsors', tier: 'GOLD', unlocked: true, title: 'Sugar Parent', value: 5 },
        { id: 'stars_given', tier: 'LEGENDARY', unlocked: true, title: 'Galaxy Collector', value: 2500 }
    ],
    hidden: []
};

async function test() {
    const modes = ['2d', 'unreal', 'nostalgic', 'cyberpunk', 'traditional', 'glass', 'terminal', 'minecraft', 'sketch'];

    for (const mode of modes) {
        try {
            const svg = renderTrophySVG(mockData, { mode, theme: 'dark', showLocked: 'true' });
            fs.writeFileSync(path.join(__dirname, `test-${mode}.svg`), svg);
            console.log(`Generated test-${mode}.svg`);
        } catch (e) {
            console.error(`Error generating ${mode}: ${e.message}`);
        }
    }

    const hiddenSvg = renderTrophySVG(mockData, { mode: 'glass', theme: 'dark', showHidden: 'false', showLocked: 'true' });
    fs.writeFileSync(path.join(__dirname, 'test-hidden-demo.svg'), hiddenSvg);
    console.log('Generated test-hidden-demo.svg');
}

test().catch(console.error);
