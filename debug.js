const { renderTrophySVG } = require('./themes/trophyRenderer');
const fs = require('fs');
const path = require('path');

const data = {
    username: 'octocat',
    visible: [
        { id: 'stars', tier: 'GOLD', unlocked: true, title: 'Star GOAT', value: 100, progress: 80, isSecret: false },
        { id: 'discussions', tier: 'BRONZE', unlocked: true, title: 'Lurker', value: 1, progress: 10, isSecret: true }
    ],
    hidden: []
};

const modes = ['terminal', 'minecraft', 'sketch'];
for (const mode of modes) {
    try {
        console.log(`Generating test-${mode}.svg...`);
        const svg = renderTrophySVG(data, { mode, theme: 'dark', showLocked: 'true' });
        fs.writeFileSync(path.join(__dirname, `test-${mode}.svg`), svg);
        console.log(`Successfully generated test-${mode}.svg`);
    } catch (e) {
        console.error(`FAILED ${mode}: ${e.message}`);
        console.error(e.stack);
    }
}
