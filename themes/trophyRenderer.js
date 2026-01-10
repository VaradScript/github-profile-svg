/**
 * Render the Trophy Grid with multiple modes (2d, unreal, nostalgic)
 */
function renderTrophySVG(data, options = {}) {
  const { username, visible, hidden } = data;
  const {
    theme = 'dark',
    animation = 'on',
    showLocked = 'false',
    mode = '2d'
  } = options;

  const isDark = theme !== 'light';
  const bg = isDark ? '#0d1117' : '#ffffff';
  const cardBg = isDark ? '#161b22' : '#f6f8fa';
  const textTitle = isDark ? '#c9d1d9' : '#24292f';
  const textSub = isDark ? '#8b949e' : '#57606a';
  const strokeColor = isDark ? '#444c56' : '#d0d7de';

  const TIER_CONFIG = {
    LEGENDARY: { label: 'SSS', color: '#ff4b82', trophy: '#ffd700', glow: '#ff4b82' },
    GOLD: { label: 'S', color: '#ffb300', trophy: '#ffd700', glow: '#ffb300' },
    SILVER: { label: 'A', color: '#a0a0a0', trophy: '#a0a0a0', glow: '#ffffff' },
    BRONZE: { label: 'B', color: '#cd7f32', trophy: '#cd7f32', glow: '#cd7f32' },
    LOCKED: { label: 'C', color: '#30363d', trophy: '#30363d', glow: 'none' }
  };

  // 1. Filter Display Items
  let displayItems = visible.filter(t => showLocked === 'true' || t.unlocked);
  if (displayItems.length === 0) displayItems = visible.slice(0, 3);
  displayItems.push(...hidden);

  const cardW = mode === 'unreal' ? 120 : 110;
  const cardH = mode === 'unreal' ? 160 : 150;
  const gap = 12;
  const numCols = 6;
  const actualCols = Math.min(displayItems.length, numCols);
  const numRows = Math.ceil(displayItems.length / numCols);

  const totalW = actualCols * (cardW + gap) + gap;
  const totalH = numRows * (cardH + gap) + gap;

  // Modern Trophy Cup SVG Path
  const getTrophyCup = (color, rank, mode, tier) => {
    if (mode === 'nostalgic') {
      // Pixelated Trophy
      return `
        <g transform="translate(-25, -25)">
          <rect x="15" y="10" width="20" height="15" fill="${color}" />
          <rect x="10" y="10" width="5" height="10" fill="${color}" />
          <rect x="35" y="10" width="5" height="10" fill="${color}" />
          <rect x="22" y="25" width="6" height="10" fill="${color}" />
          <rect x="18" y="35" width="14" height="5" fill="${color}" />
          <text x="25" y="22" text-anchor="middle" font-family="monospace" font-weight="900" font-size="12" fill="${isDark ? '#000' : '#fff'}">
            ${rank}
          </text>
        </g>
      `;
    }

    const glow = TIER_CONFIG[tier]?.glow || color;
    const filter = mode === 'unreal' ? `filter="url(#glow-${tier})"` : '';

    return `
      <g transform="translate(-30, -30) scale(0.85)" ${filter}>
        ${mode === 'unreal' ? `<defs>
          <radialGradient id="grad-${tier}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:#fff;stop-opacity:0.4" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:1" />
          </radialGradient>
        </defs>` : ''}
        <!-- Laurel -->
        <path d="M10 50 Q 10 75 35 80 Q 60 75 60 50" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.4"/>
        <!-- Trophy Body -->
        <path d="M22 68 L48 68 L45 62 L25 62 Z" fill="${mode === 'unreal' ? `url(#grad-${tier})` : color}" />
        <path d="M32 62 L32 55 L38 55 L38 62 Z" fill="${mode === 'unreal' ? `url(#grad-${tier})` : color}" />
        <path d="M18 25 Q 18 55 35 55 Q 52 55 52 25 Z" fill="${mode === 'unreal' ? `url(#grad-${tier})` : color}" />
        <!-- Handles -->
        <path d="M18 30 Q 12 30 12 40 Q 12 48 18 45" fill="none" stroke="${color}" stroke-width="3" />
        <path d="M52 30 Q 58 30 58 40 Q 58 48 52 45" fill="none" stroke="${color}" stroke-width="3" />
        <!-- Rank -->
        <text x="35" y="44" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="${isDark ? '#000' : '#fff'}">
          ${rank}
        </text>
      </g>
    `;
  };

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

    if (mode === 'nostalgic') {
      // Step-based progress for nostalgic
      const numSteps = 10;
      const filledSteps = Math.floor((progress / 100) * numSteps);
      let steps = '';
      for (let s = 0; s < numSteps; s++) {
        steps += `<rect x="${15 + s * ((cardW - 30) / numSteps) + 1}" y="132" width="${(cardW - 30) / numSteps - 2}" height="6" fill="${s < filledSteps ? config.color : (isDark ? '#333' : '#ddd')}" />`;
      }
      progressBar = steps;
    } else {
      progressBar = `
        <rect x="15" y="132" width="${cardW - 30}" height="4" rx="2" fill="${isDark ? '#30363d' : '#e1e4e8'}"/>
        <rect x="15" y="132" width="${(cardW - 30) * (progress / 100)}" height="4" rx="2" fill="${config.color}"/>
      `;
    }

    const cardFilter = mode === 'unreal' ? 'filter="url(#cardShadow)"' : '';
    const fontFamily = mode === 'nostalgic' ? 'Courier New, monospace' : 'Segoe UI, sans-serif';

    content += `
      <g transform="translate(${x}, ${y})">
        <g class="${animation === 'on' ? 'fade-up' : ''}" style="animation-delay: ${animDelay}ms">
          <!-- Card Body -->
          ${mode === 'unreal' ? `
            <rect width="${cardW}" height="${cardH}" rx="12" fill="${cardBg}" opacity="0.8" />
            <rect width="${cardW}" height="${cardH}" rx="12" fill="none" stroke="url(#cardGrad)" stroke-width="2" />
          ` : `
            <rect width="${cardW}" height="${cardH}" rx="${mode === 'nostalgic' ? 0 : 6}" fill="${cardBg}" stroke="${strokeColor}" stroke-width="${mode === 'nostalgic' ? 2 : 1}"/>
          `}
          
          <!-- Category Label -->
          <text x="${cardW / 2}" y="20" text-anchor="middle" font-family="${fontFamily}" font-weight="700" font-size="${mode === 'nostalgic' ? 9 : 11}" fill="${config.color}" style="${mode === 'nostalgic' ? 'letter-spacing: 1px' : ''}">${t.id.toUpperCase()}</text>

          <!-- Trophy -->
          <g transform="translate(${cardW / 2}, 65)">
             ${getTrophyCup(config.color, config.label, mode, t.tier)}
          </g>

          <!-- Title -->
          <text x="${cardW / 2}" y="${mode === 'unreal' ? 116 : 112}" text-anchor="middle" font-family="${fontFamily}" font-weight="600" font-size="${mode === 'nostalgic' ? 8 : 10}" fill="${textTitle}">${t.title}</text>
          
          <!-- Progress -->
          ${progressBar}
          <text x="${cardW / 2}" y="${mode === 'unreal' ? 150 : 145}" text-anchor="middle" font-family="${fontFamily}" font-size="${mode === 'nostalgic' ? 8 : 9}" fill="${textSub}" font-weight="700">
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
        
        ${mode === 'unreal' ? `
          <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
          </linearGradient>
          ${Object.entries(TIER_CONFIG).map(([tier, cfg]) => `
            <filter id="glow-${tier}" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          `).join('')}
        ` : ''}

        ${mode === 'nostalgic' ? `
          <pattern id="scanlines" width="100%" height="2" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="100%" y2="0" stroke="black" stroke-width="0.5" opacity="${isDark ? 0.2 : 0.05}" />
          </pattern>
        ` : ''}
      </defs>
      
      <rect width="100%" height="100%" fill="none"/>
      
      ${content}

      ${mode === 'nostalgic' ? `<rect width="100%" height="100%" fill="url(#scanlines)" pointer-events="none" />` : ''}
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
