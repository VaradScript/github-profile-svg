/**
 * Render the Trophy Grid SVG
 * @param {object} data User data with achievements
 * @param {object} options Theme and layout options
 * @returns {string} SVG string
 */
function renderTrophySVG(data, options = {}) {
  const { username, achievements } = data;
  const { theme = 'dark', columns = 3, showAll = 'true' } = options;

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#0d1117' : '#ffffff';
  const cardBg = isDark ? '#161b22' : '#f6f8fa';
  const strokeColor = isDark ? '#30363d' : '#d0d7de';
  const textColor = isDark ? '#c9d1d9' : '#24292f';
  const labelColor = isDark ? '#58a6ff' : '#0969da';
  const lockedColor = isDark ? '#484f58' : '#afb8c1';

  const cardWidth = 140;
  const cardHeight = 160;
  const gap = 15;
  const headerHeight = 70;

  // Filter trophies based on showAll parameter
  const displayAchievements = showAll === 'true'
    ? achievements
    : achievements.filter(a => a.earned);

  if (displayAchievements.length === 0) {
    return renderErrorSVG(`No trophies earned yet for ${username}`);
  }

  const numCols = Math.min(Math.max(parseInt(columns) || 3, 1), 6);
  const numRows = Math.ceil(displayAchievements.length / numCols);

  const totalWidth = numCols * (cardWidth + gap) + gap;
  const totalHeight = numRows * (cardHeight + gap) + headerHeight + 20;

  const centerX = cardWidth / 2;
  let trophiesHtml = '';

  displayAchievements.forEach((trophy, index) => {
    const col = index % numCols;
    const row = Math.floor(index / numCols);

    const x = gap + col * (cardWidth + gap);
    const y = headerHeight + row * (cardHeight + gap);

    const opacity = trophy.earned ? '1' : '0.35';
    const grayscale = trophy.earned ? '' : 'filter: grayscale(100%);';
    const borderEffect = trophy.earned ? `stroke: ${labelColor}; stroke-width: 2;` : `stroke: ${strokeColor}; stroke-width: 1;`;

    trophiesHtml += `
      <g transform="translate(${x}, ${y})" class="trophy-card" style="animation-delay: ${index * 100}ms; opacity: ${opacity};">
        <rect width="${cardWidth}" height="${cardHeight}" rx="15" fill="${cardBg}" style="${borderEffect}"/>
        
        <!-- Trophy Seal Background -->
        <circle cx="${centerX}" cy="65" r="35" fill="${bgColor}" opacity="0.5" stroke="${trophy.earned ? labelColor : strokeColor}" stroke-dasharray="2 2"/>
        
        <text x="${centerX}" y="78" text-anchor="middle" font-size="45" style="${grayscale}">${trophy.icon}</text>
        
        <text x="${centerX}" y="125" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-weight="700" font-size="14" fill="${trophy.earned ? labelColor : lockedColor}">${trophy.label}</text>
        <text x="${centerX}" y="145" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="11" fill="${textColor}" opacity="0.4">${trophy.earned ? 'UNLOCKED' : 'LOCKED'}</text>
      </g>
    `;
  });

  return `
    <svg width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 800 22px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
        .sub-header { font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; opacity: 0.6; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .trophy-card { animation: fadeIn 0.6s ease-out forwards; }
        .earned-count { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${labelColor}; }
      </style>
      
      <rect width="100%" height="100%" rx="20" fill="${bgColor}"/>
      
      <g transform="translate(${gap}, 35)">
        <text x="0" y="0" class="header">${username}'s Hall of Fame</text>
        <text x="0" y="20" class="sub-header">GitHub Achievement Collection</text>
      </g>
      
      ${trophiesHtml}
      
      <text x="${totalWidth - gap}" y="${totalHeight - 15}" text-anchor="end" class="earned-count">
        Earned: ${achievements.filter(a => a.earned).length}/${achievements.length}
      </text>
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
      <rect width="100%" height="100%" rx="15" fill="#0d1117" stroke="#c53030" stroke-width="2"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Segoe UI, Ubuntu, Sans-Serif" font-size="16" font-weight="600" fill="#f85149">
        ⚠️ Error: ${message}
      </text>
    </svg>
  `.trim();
}

module.exports = { renderTrophySVG, renderErrorSVG };
