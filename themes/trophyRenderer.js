/**
 * Render the Classic Trophy SVG
 * @param {object} data User data with Ranked trophies
 * @param {object} options Theme options
 * @returns {string} SVG string
 */
function renderTrophySVG(data, options = {}) {
  const { username, trophies } = data;
  const { theme = 'dark', columns = 6, margin = 15 } = options;

  // Theme Constants
  const isDark = theme !== 'light';
  const bg = isDark ? '#282c34' : '#ffffff';  // OneDark-ish
  const textTitle = isDark ? '#ffffff' : '#24292f';
  const textSub = isDark ? '#abb2bf' : '#57606a';

  // Rank Colors
  const COLORS = {
    SSS: ['#ff0055', '#ff00aa'],
    SS: ['#ffcc00', '#ffaa00'],
    S: ['#ffcc00', '#ffaa00'],
    AAA: ['#00e5ff', '#0099ff'],
    AA: ['#00e5ff', '#0099ff'],
    A: ['#00e5ff', '#0099ff'],
    B: ['#00ff99', '#00cc66'],
    C: ['#8b949e', '#6e7681']
  };

  const cardW = 110;
  const cardH = 110;
  const gap = 15;

  // Layout
  const numCols = Math.min(Math.max(parseInt(columns) || 6, 1), 10);
  const numRows = Math.ceil(trophies.length / numCols);
  const totalW = numCols * (cardW + gap) + gap;
  const totalH = numRows * (cardH + gap) + gap;

  let content = '';

  trophies.forEach((t, i) => {
    const col = i % numCols;
    const row = Math.floor(i / numCols);
    const x = gap + col * (cardW + gap);
    const y = gap + row * (cardH + gap);

    const grad = COLORS[t.rank] || COLORS.C;
    const gradId = `grad_${t.category.replace(/\s/g, '')}_${i}`;

    // Rank Logic
    const isSecret = t.rank === 'SECRET';
    const rankText = isSecret ? '?' : t.rank;

    content += `
      <g transform="translate(${x}, ${y})">
        <!-- Card Frame -->
        <rect width="${cardW}" height="${cardH}" rx="8" fill="${bg}" stroke="url(#${gradId})" stroke-width="3"/>
        
        <!-- Gradient Def -->
        <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="${grad[0]}"/>
                <stop offset="100%" stop-color="${grad[1]}"/>
            </linearGradient>
        </defs>

        <!-- Category Title (Top) -->
        <text x="55" y="25" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-weight="700" font-size="11" fill="${grad[0]}">
            ${t.category.toUpperCase()}
        </text>

        <!-- Rank Letter (Center) -->
        <text x="55" y="70" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-weight="900" font-size="38" fill="url(#${gradId})" filter="drop-shadow(0 0 2px rgba(0,0,0,0.5))">
            ${rankText}
        </text>

        <!-- Value Stats (Bottom) -->
        <text x="55" y="95" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="10" fill="${textSub}">
            ${t.value}
        </text>
      </g>
    `;
  });

  return `
    <svg width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
           @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap');
        </style>
      </defs>
      <rect width="100%" height="100%" fill="none"/> 
      ${content}
    </svg>
  `.trim();
}

function renderErrorSVG(message) {
  return `
    <svg width="400" height="60" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="5" fill="#0d1117" stroke="#ff0055"/>
      <text x="200" y="35" text-anchor="middle" font-family="Segoe UI" fill="#ff0055" font-weight="bold">${message}</text>
    </svg>
  `;
}

module.exports = { renderTrophySVG, renderErrorSVG };
