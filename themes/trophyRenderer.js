/**
 * Render the Trophy Grid SVG
 * @param {object} data User data with achievements
 * @param {object} options Theme and layout options
 * @returns {string} SVG string
 */
function renderTrophySVG(data, options = {}) {
  const { username, achievements } = data;
  const { theme = 'dark', columns = 3 } = options;

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#0d1117' : '#ffffff';
  const strokeColor = isDark ? '#30363d' : '#d0d7de';
  const textColor = isDark ? '#c9d1d9' : '#24292f';
  const labelColor = isDark ? '#58a6ff' : '#0969da';

  const cardWidth = 130;
  const cardHeight = 150;
  const gap = 15;
  const headerHeight = 60;

  const numCols = Math.min(Math.max(parseInt(columns) || 3, 1), 6); // Clamp between 1 and 6
  const numRows = Math.ceil(achievements.length / numCols);

  const totalWidth = numCols * (cardWidth + gap) + gap;
  const totalHeight = numRows * (cardHeight + gap) + headerHeight;

  const centerX = cardWidth / 2;
  let trophiesHtml = '';

  achievements.forEach((trophy, index) => {
    const col = index % numCols;
    const row = Math.floor(index / numCols);

    const x = gap + col * (cardWidth + gap);
    const y = headerHeight + row * (cardHeight + gap);

    trophiesHtml += `
      <g transform="translate(${x}, ${y})" class="trophy-card" style="animation-delay: ${index * 100}ms">
        <rect width="${cardWidth}" height="${cardHeight}" rx="12" fill="${bgColor}" stroke="${strokeColor}" stroke-width="1.5"/>
        <text x="${centerX}" y="65" text-anchor="middle" font-size="42">${trophy.icon}</text>
        <text x="${centerX}" y="110" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-weight="700" font-size="13" fill="${labelColor}">${trophy.label}</text>
        <text x="${centerX}" y="130" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="11" fill="${textColor}" opacity="0.5">Achievement</text>
      </g>
    `;
  });

  return `
    <svg width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 700 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .trophy-card { opacity: 0; animation: fadeIn 0.5s ease-out forwards; }
      </style>
      
      <rect width="100%" height="100%" rx="15" fill="${bgColor}"/>
      <text x="${gap}" y="35" class="header">${username}'s Achievements</text>
      
      ${trophiesHtml}
    </svg>
  `.trim();
}

/**
 * Render Error SVG
 * @param {string} message 
 * @returns {string} SVG string
 */
function renderErrorSVG(message) {
  return `
    <svg width="400" height="100" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="10" fill="#fff5f5" stroke="#feb2b2"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Segoe UI, Ubuntu, Sans-Serif" font-size="14" fill="#c53030">
        ❌ Error: ${message}
      </text>
    </svg>
  `.trim();
}

module.exports = { renderTrophySVG, renderErrorSVG };
