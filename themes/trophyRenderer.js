/**
 * Render the Legacy Achievement System with Classic Trophy Visuals
 */
function renderTrophySVG(data, options = {}) {
  const { username, totalXP, level, visible, locked, hidden } = data;
  const {
    theme = 'dark',
    animation = 'on',
    showLocked = 'true',
    showHidden = 'false'
  } = options;

  const isDark = theme !== 'light';
  const bg = isDark ? '#0d1117' : '#ffffff';
  const cardBg = isDark ? '#161b22' : '#f6f8fa';
  const textTitle = isDark ? '#c9d1d9' : '#24292f';
  const textSub = isDark ? '#8b949e' : '#57606a';
  const strokeColor = isDark ? '#30363d' : '#d0d7de';

  const TIER_CONFIG = {
    LEGENDARY: { label: 'SSS', color: '#ff0055', trophy: '#ffd700', glow: '#ff0055aa' },
    GOLD: { label: 'S', color: '#ffb300', trophy: '#ffd700', glow: '#ffb300aa' },
    SILVER: { label: 'A', color: '#c0c0c0', trophy: '#c0c0c0', glow: '#c0c0c0aa' },
    BRONZE: { label: 'B', color: '#cd7f32', trophy: '#cd7f32', glow: '#cd7f32aa' },
    LOCKED: { label: 'C', color: '#30363d', trophy: '#30363d', glow: 'transparent' }
  };

  const cardW = 165;
  const cardH = 200;
  const gap = 20;
  const headerHeight = 150; // Increased to prevent overlap

  let displayItems = [...visible];
  if (showLocked === 'true') displayItems.push(...locked);
  if (showHidden === 'true' || hidden.length > 0) displayItems.push(...hidden);

  const numCols = 3;
  const numRows = Math.ceil(displayItems.length / numCols);
  const totalW = numCols * (cardW + gap) + gap;
  const totalH = headerHeight + numRows * (cardH + gap) + 40;

  // Trophy Cup SVG Path Helper
  const getTrophyCup = (color, rank) => `
    <g transform="translate(-35, -35)">
      <path d="M15 55 Q 15 80 35 85 Q 55 80 55 55" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.3"/>
      <path d="M25 75 L45 75 L42 70 L28 70 Z" fill="${color}" />
      <path d="M33 70 L33 65 L37 65 L37 70 Z" fill="${color}" />
      <path d="M20 35 Q 20 65 35 65 Q 50 65 50 35 Z" fill="${color}" />
      <path d="M20 40 Q 15 40 15 48 Q 15 55 20 52" fill="none" stroke="${color}" stroke-width="3" />
      <path d="M50 40 Q 55 40 55 48 Q 55 55 50 52" fill="none" stroke="${color}" stroke-width="3" />
      <text x="35" y="52" text-anchor="middle" font-family="Arial, Segoe UI" font-weight="950" font-size="16" fill="${isDark ? '#000' : '#fff'}">
        ${rank}
      </text>
    </g>
  `;

  let content = '';

  displayItems.forEach((t, i) => {
    const col = i % numCols;
    const row = Math.floor(i / numCols);
    const x = gap + col * (cardW + gap);
    const y = headerHeight + row * (cardH + gap);

    const config = TIER_CONFIG[t.tier] || TIER_CONFIG.LOCKED;
    const isLocked = t.tier === 'LOCKED';
    const animDelay = (i * 100) + 700;

    let progressBar = '';
    const progress = t.progress !== undefined ? t.progress : (t.unlocked ? 100 : 0);
    progressBar = `
      <rect x="${cardW / 2 - 50}" y="160" width="100" height="7" rx="3.5" fill="${isDark ? '#30363d' : '#e1e4e8'}"/>
      <rect x="${cardW / 2 - 50}" y="160" width="${progress}" height="7" rx="3.5" fill="${config.color}" opacity="${isLocked ? 0.3 : 1}"/>
    `;

    content += `
      <g transform="translate(${x}, ${y})">
        <g class="${animation === 'on' ? 'fade-up' : ''}" style="animation-delay: ${animDelay}ms">
          <rect width="${cardW}" height="${cardH}" rx="20" fill="${cardBg}" stroke="${isLocked ? strokeColor : config.color}" stroke-width="1.8" style="${(!isLocked && animation === 'on') ? 'filter: drop-shadow(0 0 6px ' + config.glow + ')' : ''}"/>
          
          <g transform="translate(${cardW / 2}, 65)">
             ${getTrophyCup(config.color, config.label)}
          </g>

          <text x="${cardW / 2}" y="125" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-weight="750" font-size="15" fill="${isLocked ? textSub : textTitle}">${t.title}</text>
          <text x="${cardW / 2}" y="145" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-weight="650" font-size="12" fill="${config.color}">${t.tier}</text>
          
          ${progressBar}
          <text x="${cardW / 2}" y="182" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="11" fill="${textSub}" font-weight="600">
            ${t.value !== undefined ? t.value + ' / ' + t.nextValue : (t.unlocked ? 'COMPLETED' : 'LOCKED')}
          </text>
        </g>
      </g>
    `;
  });

  return `
    <svg width="100%" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&amp;display=swap');
          .fade-up { opacity: 0; animation: fadeUpAnim 0.7s ease-out forwards; }
          .xp-fill { width: 0; animation: xpFillAnim 2s cubic-bezier(0.1, 0.5, 0.5, 1) forwards; }
          @keyframes fadeUpAnim { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes xpFillAnim { from { width: 0; } to { width: ${level.progress}%; } }
        </style>
      </defs>

      <rect width="100%" height="100%" rx="28" fill="${bg}"/>

      <!-- Main Header Section -->
      <g transform="translate(30, 40)">
        <text x="0" y="0" font-family="Segoe UI, Ubuntu, sans-serif" font-weight="900" font-size="34" fill="${textTitle}">${username}</text>
        <text x="0" y="32" font-family="Segoe UI, Ubuntu, sans-serif" font-weight="800" font-size="20" fill="#3fb950">LEVEL ${level.level}</text>
        
        <!-- XP Progress Bar -->
        <g transform="translate(0, 52)">
          <rect width="${totalW - 60}" height="16" rx="8" fill="${isDark ? '#30363d' : '#e1e4e8'}"/>
          <rect width="${(totalW - 60) * (level.progress / 100)}" height="16" rx="8" fill="#3fb950" class="${animation === 'on' ? 'xp-fill' : ''}"/>
          <text x="${totalW - 65}" y="-10" text-anchor="end" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="750" fill="${textSub}">
            ${level.currentXP} / ${level.nextLevelXP} XP
          </text>
        </g>

        <!-- Achievement Summary -->
        <text x="0" y="95" font-family="Segoe UI, Ubuntu, sans-serif" font-size="16" fill="${textSub}" font-weight="600">
          Achievement Score: <tspan font-weight="900" fill="#3fb950">${totalXP} XP</tspan> • Progression: ${data.visible.filter(t => t.unlocked).length} / ${data.visible.length}
        </text>
      </g>

      ${content}
    </svg>
  `.trim();
}

function renderErrorSVG(message) {
  return `
    <svg width="450" height="100" viewBox="0 0 450 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="20" fill="#0d1117" stroke="#ff0055" stroke-width="2.5"/>
      <text x="225" y="55" text-anchor="middle" font-family="Segoe UI" fill="#ff0055" font-weight="bold" font-size="17">XP Error: ${message}</text>
    </svg>
  `;
}

module.exports = { renderTrophySVG, renderErrorSVG };
