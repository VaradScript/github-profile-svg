const { renderTrophySVG } = require('./themes/trophyRenderer');

const dummy = (id) => ({ id, tier: 'GOLD', unlocked: true, title: 'Title', value: 100 });

const mockData = {
    username: 'octocat',
    visible: [
        dummy('1'), dummy('2'), dummy('3'), dummy('4'), dummy('5'), dummy('6'), dummy('7'),
        dummy('8'), dummy('9'), dummy('10'),
        { id: 'discussions', tier: 'BRONZE', unlocked: true, title: 'Lurker', value: 1, isSecret: true },
        dummy('12')
    ],
    hidden: []
};

try {
    const svg = renderTrophySVG(mockData, { mode: 'glass', theme: 'dark', showHidden: 'false', showLocked: 'true' });
    console.log("Generated SVG length:", svg.length);
    if (svg.includes("discussions")) {
        console.log("Found 'discussions' in SVG.");
    } else {
        console.log("DID NOT find 'discussions' in SVG.");
    }

    if (svg.includes("Rare Achievement")) {
        console.log("Found 'Rare Achievement' in SVG.");
    } else {
        console.log("DID NOT find 'Rare Achievement' in SVG.");
    }

} catch (e) {
    console.error("Error:", e.message);
}
