/**
 * Render the Classic "Ryo-ma" Style Trophy Grid
 */
function renderTrophySVG(data, options = {}) {
  const { username, visible, hidden } = data;
  const {
    theme = 'dark',
    animation = 'on',
    showLocked = 'false', // Default to false for clean look
  } = options;

  const isDark = theme !== 'light';
  const bg = isDark ? '#0d1117' : '#ffffff';
  const cardBg = isDark ? '#161b22' : '#f6f8fa';
  const textTitle = isDark ? '#c9d1d9' : '#24292f';
  const textSub = isDark ? '#8b949e' : '#57606a';
  const strokeColor = isDark ? '#444c56' : '#d0d7de';

  const TIER_CONFIG = {
    LEGENDARY: { label: 'SSS', color: '#ff4b82', trophy: '#ffd700' },
    GOLD: { label: 'S', color: '#ffb300', trophy: '#ffd700' },
    SILVER: { label: 'A', color: '#a0a0a0', trophy: '#a0a0a0' },
    BRONZE: { label: 'B', color: '#cd7f32', trophy: '#cd7f32' },
    LOCKED: { label: 'C', color: '#30363d', trophy: '#30363d' }
  };

  // 1. Filter Display Items (Only show unlocked by default)
  let displayItems = visible.filter(t => showLocked === 'true' || t.unlocked);
  if (displayItems.length === 0) displayItems = visible.slice(0, 3); // Fallback for new users

  // Also add hidden ones if they exist
  displayItems.push(...hidden);

  const cardW = 110;  // Narrower for 6-column fit
  const cardH = 150;
  const gap = 8;
  const numCols = 6;
  const actualCols = Math.min(displayItems.length, numCols);
  const numRows = Math.ceil(displayItems.length / numCols);

  const totalW = actualCols * (cardW + gap) + gap;
  const totalH = numRows * (cardH + gap) + gap;

  // Modern Trophy Cup SVG Path
  const getTrophyCup = (color, rank) => `
    <g transform="translate(-30, -30) scale(0.85)">
      <!-- Laurel -->
      <path d="M10 50 Q 10 75 35 80 Q 60 75 60 50" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.4"/>
      <!-- Trophy Body -->
      <path d="M22 68 L48 68 L45 62 L25 62 Z" fill="${color}" />
      <path d="M32 62 L32 55 L38 55 L38 62 Z" fill="${color}" />
      <path d="M18 25 Q 18 55 35 55 Q 52 55 52 25 Z" fill="${color}" />
      <!-- Handles -->
      <path d="M18 30 Q 12 30 12 40 Q 12 48 18 45" fill="none" stroke="${color}" stroke-width="3" />
      <path d="M52 30 Q 58 30 58 40 Q 58 48 52 45" fill="none" stroke="${color}" stroke-width="3" />
      <!-- Rank -->
      <text x="35" y="44" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="${isDark ? '#000' : '#fff'}">
        ${rank}
      </text>
    </g>
  `;

  let content = '';

  displayItems.forEach((t, i) => {
    const col = i % numCols;
    const row = Math.floor(i / numCols);
    const x = gap + col * (cardW + gap);
    const y = gap + row * (cardH + gap);

    const config = TIER_CONFIG[t.tier] || TIER_CONFIG.LOCKED;
    const animDelay = i * 120;

    let progressBar = '';
    const progress = t.progress !== undefined ? t.progress : 100;
    progressBar = `
      <rect x="15" y="132" width="${cardW - 30}" height="4" rx="2" fill="${isDark ? '#30363d' : '#e1e4e8'}"/>
      <rect x="15" y="132" width="${(cardW - 30) * (progress / 100)}" height="4" rx="2" fill="${config.color}"/>
    `;

    content += `
      <g transform="translate(${x}, ${y})">
        <g class="${animation === 'on' ? 'fade-up' : ''}" style="animation-delay: ${animDelay}ms">
          <!-- Card Body -->
          <rect width="${cardW}" height="${cardH}" rx="6" fill="${cardBg}" stroke="${strokeColor}" stroke-width="1"/>
          
          <!-- Category Label (Top) -->
          <text x="${cardW / 2}" y="20" text-anchor="middle" font-family="Segoe UI, sans-serif" font-weight="700" font-size="11" fill="${config.color}">${t.id.toUpperCase()}</text>

          <!-- Trophy Cup Position -->
          <g transform="translate(${cardW / 2}, 65)">
             ${getTrophyCup(config.color, config.label)}
          </g>

          <!-- Title -->
          <text x="${cardW / 2}" y="112" text-anchor="middle" font-family="Segoe UI, sans-serif" font-weight="600" font-size="10" fill="${textTitle}">${t.title}</text>
          
          <!-- Progress / Value -->
          ${progressBar}
          <text x="${cardW / 2}" y="145" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" fill="${textSub}" font-weight="700">
            ${t.value}${t.unit === 'Pts' ? 'pt' : t.unit}
          </text>
        </g>
      </g>
    `;
  });

  return `
    <svg width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .fade-up { opacity: 0; animation: fadeUpAnim 0.6s ease-out forwards; }
          @keyframes fadeUpAnim { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        </style>
      </defs>
      
      <!-- Semi-transparent boundary if needed, otherwise clean -->
      <rect width="100%" height="100%" fill="none"/>

      ${content}
    </svg>
  `.trim();
}

function renderErrorSVG(message) {
  return `
    <svg width="400" height="60" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="6" fill="#0d1117" stroke="#ff0055" stroke-width="1"/>
      <text x="200" y="35" text-anchor="middle" font-family="Segoe UI" fill="#ff0055" font-weight="bold" font-size="14">Error: ${message}</text>
    </svg>
  `;
}

module.exports = { renderTrophySVG, renderErrorSVG };
