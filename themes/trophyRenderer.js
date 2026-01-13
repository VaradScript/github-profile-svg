/**
 * Ultimate GitHub Trophy Renderer
 * Supports: 2d, unreal, nostalgic, cyberpunk, traditional, glass, terminal, minecraft, sketch
 */
function renderTrophySVG(data, options = {}) {
  const { username, visible, hidden } = data;
  const {
    theme = 'dark',
    animation = 'on',
    showLocked = 'false',
    showHidden = 'false',
    mode: rawMode = 'unreal'
  } = options;

  const mode = rawMode === 'cyber' ? 'cyberpunk' : rawMode;
  const isDark = theme !== 'light';

  // Theme Variables
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

  const DOMAIN_COLORS = {
    stars: '#f1e05a', repos: '#58a6ff', followers: '#ff7b72', issues: '#ffa657',
    prs: '#a5d6ff', experience: '#7ee787', gists: '#d299ff', commits: '#ff69b4',
    reviews: '#3fb950', languages: '#bc8cff', discussions: '#6e7681',
    forks: '#d1d5da', sponsors: '#ea4aaa', stars_given: '#f9826c'
  };

  // Filter items based on locked/hidden status
  let displayItems = visible.filter(t => {
    if (showLocked !== 'true' && !t.unlocked) return false;
    return true;
  });

  if (displayItems.length === 0) displayItems = visible.slice(0, 5);

  const cardW = 120;
  const cardH = 160;
  const gap = 15;
  const numCols = 7;
  const actualCols = Math.min(displayItems.length, numCols);
  const numRows = Math.ceil(displayItems.length / numCols);

  const totalW = actualCols * (cardW + gap) + gap;
  const totalH = numRows * (cardH + gap) + gap;

  const getTrophyCup = (color, rank, mode, tier, domain, isSecret) => {
    const domainColor = DOMAIN_COLORS[domain] || color;

    // Determine filter attribute
    let filterVal = '';
    if (isSecret) {
      filterVal = 'url(#blurFilter)';
    } else if (mode === 'unreal') {
      filterVal = `url(#glow-${tier})`;
    }
    const filterAttr = filterVal ? `filter="${filterVal}"` : '';

    if (mode === 'terminal') {
      return `<g transform="translate(-25, -25)" ${filterAttr}><text x="25" y="30" text-anchor="middle" font-family="monospace" font-size="14" fill="${domainColor}">[${isSecret ? '?' : rank}]</text><text x="25" y="45" text-anchor="middle" font-family="monospace" font-size="8" fill="${domainColor}">#_${isSecret ? 'SECRET' : 'TROPHY'}</text></g>`;
    }
    if (mode === 'minecraft') {
      return `<g transform="translate(-25, -25)" ${filterAttr}><rect x="15" y="10" width="20" height="20" fill="${isSecret ? '#333' : color}" stroke="#000" stroke-width="2"/><rect x="10" y="15" width="5" height="10" fill="${isSecret ? '#333' : color}" stroke="#000" stroke-width="2"/><rect x="35" y="15" width="5" height="10" fill="${isSecret ? '#333' : color}" stroke="#000" stroke-width="2"/><text x="25" y="25" text-anchor="middle" font-family="'Courier New', Courier, monospace" font-weight="900" font-size="14" fill="#000">${isSecret ? '?' : rank}</text></g>`;
    }
    if (mode === 'sketch') {
      return `<g transform="translate(-30, -30)" ${filterAttr}><path d="M10 20 C 15 10, 45 10, 50 20 Q 55 40, 30 60 Q 5 40, 10 20" fill="none" stroke="${domainColor}" stroke-width="2" stroke-linecap="round" stroke-dasharray="2,2"/><text x="30" y="35" text-anchor="middle" font-family="cursive" font-size="20" fill="${domainColor}">${isSecret ? '?' : rank}</text></g>`;
    }
    if (mode === 'glass') {
      return `<g transform="translate(-30, -30)" ${filterAttr}><circle cx="30" cy="30" r="25" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/><text x="30" y="40" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800" font-size="22" fill="#fff" style="filter: drop-shadow(0 0 8px ${domainColor})">${isSecret ? '?' : rank}</text></g>`;
    }
    if (mode === 'nostalgic') {
      return `<g transform="translate(-25, -25)" ${filterAttr}><rect x="15" y="10" width="20" height="15" fill="${color}" /><rect x="10" y="10" width="5" height="10" fill="${color}" /><rect x="35" y="10" width="5" height="10" fill="${color}" /><rect x="22" y="25" width="6" height="10" fill="${color}" /><rect x="18" y="35" width="14" height="5" fill="${color}" /><text x="25" y="22" text-anchor="middle" font-family="monospace" font-weight="900" font-size="12" fill="${isDark ? '#000' : '#fff'}">${isSecret ? '?' : rank}</text></g>`;
    }
    if (mode === 'cyberpunk') {
      return `<g transform="translate(-30, -30)" ${filterAttr}><polygon points="10,20 50,20 60,30 60,60 30,75 0,60 0,30" fill="none" stroke="${domainColor}" stroke-width="2" class="glitch-line" /><path d="M15 25 L45 25 L45 55 L15 55 Z" fill="${domainColor}" opacity="0.2" /><text x="30" y="45" text-anchor="middle" font-family="Orbitron, sans-serif" font-weight="900" font-size="16" fill="${domainColor}" style="filter: drop-shadow(0 0 5px ${domainColor})">${isSecret ? '?' : rank}</text></g>`;
    }
    if (mode === 'traditional') {
      return `<g transform="translate(-30, -30)" ${filterAttr}><circle cx="30" cy="30" r="25" fill="#e2b13c" stroke="#8b4513" stroke-width="2" /><path d="M15 15 Q30 5 45 15 L30 50 Z" fill="#d4af37" /><text x="30" y="38" text-anchor="middle" font-family="Georgia, serif" font-weight="bold" font-size="24" fill="#5d2e0a">${isSecret ? '?' : rank}</text></g>`;
    }

    return `<g transform="translate(-30, -30) scale(0.85)" ${filterAttr}><path d="M10 50 Q 10 75 35 80 Q 60 75 60 50" fill="none" stroke="${domainColor}" stroke-width="2.5" opacity="0.4"/><path d="M22 68 L48 68 L45 62 L25 62 Z" fill="${mode === 'unreal' ? `url(#grad-${tier}-${domain})` : domainColor}" /><path d="M32 62 L32 55 L38 55 L38 62 Z" fill="${mode === 'unreal' ? `url(#grad-${tier}-${domain})` : domainColor}" /><path d="M18 25 Q 18 55 35 55 Q 52 55 52 25 Z" fill="${mode === 'unreal' ? `url(#grad-${tier}-${domain})` : domainColor}" /><path d="M18 30 Q 12 30 12 40 Q 12 48 18 45" fill="none" stroke="${domainColor}" stroke-width="3" /><path d="M52 30 Q 58 30 58 40 Q 58 48 52 45" fill="none" stroke="${domainColor}" stroke-width="3" /><text x="35" y="44" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="${isDark ? '#000' : '#fff'}">${isSecret ? '?' : rank}</text></g>`;
  };

  let content = '';

  displayItems.forEach((t, i) => {
    const col = i % numCols;
    const row = Math.floor(i / numCols);
    const x = gap + col * (cardW + gap);
    const y = gap + row * (cardH + gap);

    const config = TIER_CONFIG[t.tier] || TIER_CONFIG.LOCKED;
    const domainColor = t.isSecret && showHidden !== 'true' ? '#333' : (DOMAIN_COLORS[t.id] || config.color);
    const animDelay = i * 30;

    const progress = t.progress !== undefined ? t.progress : 100;
    const isShowingSecret = t.isSecret && showHidden !== 'true';
    let progressBar = '';

    if (mode === 'terminal') {
      const barLen = 10;
      const filled = Math.floor((progress / 100) * barLen);
      const bar = isShowingSecret ? '??????????' : ('#'.repeat(filled) + '-'.repeat(barLen - filled));
      progressBar = `<text x="15" y="142" font-family="monospace" font-size="8" fill="${domainColor}">[${bar}] ${isShowingSecret ? '???' : Math.floor(progress)}%</text>`;
    } else if (mode === 'minecraft') {
      progressBar = `<rect x="15" y="138" width="${cardW - 30}" height="8" fill="#333" stroke="#000"/><rect x="15" y="138" width="${(cardW - 30) * (progress / 100)}" height="8" fill="${domainColor}"/>`;
    } else {
      progressBar = `<rect x="15" y="138" width="${cardW - 30}" height="4" rx="2" fill="${isDark ? 'rgba(255,255,255,0.1)' : '#e1e4e8'}"/><rect x="15" y="138" width="${(cardW - 30) * (progress / 100)}" height="4" rx="2" fill="${domainColor}"/>`;
    }

    const fontFamily = {
      'nostalgic': 'Courier New, monospace', 'cyberpunk': 'Orbitron, sans-serif',
      'traditional': 'Georgia, serif', 'terminal': 'monospace',
      'minecraft': 'Courier New', 'sketch': 'cursive', 'glass': 'Inter'
    }[mode] || 'Segoe UI, sans-serif';

    const cardStyles = {
      glass: `fill="rgba(255,255,255,0.05)" stroke="${isShowingSecret ? '#333' : 'rgba(255,255,255,0.2)'}" stroke-width="1" rx="16"`,
      terminal: `fill="#000" stroke="${domainColor}" stroke-width="1"`,
      minecraft: `fill="#795548" stroke="#3e2723" stroke-width="4"`,
      sketch: `fill="none" stroke="${domainColor}" stroke-width="1.5" stroke-dasharray="5,3" rx="4"`
    }[mode] || `fill="${mode === 'traditional' ? '#f4e4bc' : cardBg}" stroke="${mode === 'cyberpunk' ? domainColor : (mode === 'traditional' ? '#8b4513' : strokeColor)}" stroke-width="${mode === 'traditional' ? 3 : 1}" rx="${mode === 'nostalgic' || mode === 'traditional' ? 0 : 8}"`;

    content += `
      <g transform="translate(${x}, ${y})">
        <g class="${animation === 'on' ? 'fade-up' : ''}" style="animation-delay: ${animDelay}ms">
          <!-- Card Body -->
          ${mode === 'unreal' ? `<rect width="${cardW}" height="${cardH}" rx="12" fill="${cardBg}" opacity="0.8" filter="url(#cardShadow)" /><rect width="${cardW}" height="${cardH}" rx="12" fill="none" stroke="url(#cardGrad)" stroke-width="1.5" />` :
        mode === 'cyberpunk' ? `<path d="M0,0 L${cardW - 10},0 L${cardW},10 L${cardW},${cardH} L10,${cardH} L0,${cardH - 10} Z" fill="${cardBg}" stroke="${domainColor}" stroke-width="1" /><rect x="5" y="5" width="10" height="2" fill="${domainColor}" />` :
          `<rect width="${cardW}" height="${cardH}" ${cardStyles} />`}
          
          <!-- Category -->
          <text x="${cardW / 2}" y="22" text-anchor="middle" font-family="${fontFamily}" font-weight="800" font-size="10" fill="${domainColor}" style="text-transform: uppercase;">${isShowingSecret ? 'Rare Achievement' : t.id}</text>

          <!-- Trophy -->
          <g transform="translate(${cardW / 2}, 70)">${getTrophyCup(config.color, config.label, mode, t.tier, t.id, isShowingSecret)}</g>

          <!-- Title -->
          <text x="${cardW / 2}" y="122" text-anchor="middle" font-family="${fontFamily}" font-weight="700" font-size="9" fill="${isShowingSecret ? '#555' : (mode === 'terminal' || mode === 'glass' ? '#fff' : textTitle)}">${isShowingSecret ? '??? UNKNOWN ???' : t.title}</text>
          
          <!-- Progress -->
          ${progressBar}
          <text x="${cardW / 2}" y="152" text-anchor="middle" font-family="${fontFamily}" font-size="9" fill="${isShowingSecret ? '#444' : (mode === 'terminal' ? domainColor : textSub)}" font-weight="700">
            ${isShowingSecret ? '???' : t.value}${isShowingSecret ? '' : (t.unit ? (t.unit === 'pt' ? ' pt' : t.unit) : '')}
          </text>
        </g>
      </g>
    `;
  });

  return `
    <svg width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Inter:wght@400;800&display=swap');
          .fade-up { opacity: 0; animation: fadeUpAnim 0.6s ease-out forwards; }
          @keyframes fadeUpAnim { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
          .glitch-line { animation: glitch 2s infinite; }
          @keyframes glitch { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        </style>
        <filter id="cardShadow"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.3"/></filter>
        <filter id="blurFilter"><feGaussianBlur in="SourceGraphic" stdDeviation="4" /></filter>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.3" /><stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" /></linearGradient>
        ${(mode === 'nostalgic' || mode === 'cyberpunk') ? `<pattern id="scanlines" width="10" height="2" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="10" y2="0" stroke="black" stroke-width="0.7" opacity="${mode === 'cyberpunk' ? (isDark ? 0.35 : 0.15) : (isDark ? 0.2 : 0.05)}" /></pattern>` : ''}
        ${Object.entries(TIER_CONFIG).map(([tier, cfg]) => `<filter id="glow-${tier}" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" /><feColorMatrix in="blur" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>`).join('')}
        ${Object.entries(DOMAIN_COLORS).map(([id, color]) => `
          <radialGradient id="grad-LEGENDARY-${id}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="0%" style="stop-color:#fff;stop-opacity:0.4" /><stop offset="100%" style="stop-color:${color};stop-opacity:1" /></radialGradient>
          <radialGradient id="grad-GOLD-${id}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="0%" style="stop-color:#fff;stop-opacity:0.4" /><stop offset="100%" style="stop-color:${color};stop-opacity:1" /></radialGradient>
          <radialGradient id="grad-SILVER-${id}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="0%" style="stop-color:#fff;stop-opacity:0.4" /><stop offset="100%" style="stop-color:${color};stop-opacity:1" /></radialGradient>
          <radialGradient id="grad-BRONZE-${id}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="0%" style="stop-color:#fff;stop-opacity:0.4" /><stop offset="100%" style="stop-color:${color};stop-opacity:1" /></radialGradient>
          <radialGradient id="grad-LOCKED-${id}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="0%" style="stop-color:#fff;stop-opacity:0.4" /><stop offset="100%" style="stop-color:${color};stop-opacity:1" /></radialGradient>
        `).join('')}
      </defs>
      <rect width="100%" height="100%" fill="none"/>
      ${content}
      ${(mode === 'nostalgic' || mode === 'cyberpunk') ? `<rect width="100%" height="100%" fill="url(#scanlines)" pointer-events="none" />` : ''}
    </svg>
  `.trim();
}

function renderErrorSVG(message) {
  return `<svg width="400" height="60" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="6" fill="#0d1117" stroke="#ff0055" stroke-width="1"/><text x="200" y="35" text-anchor="middle" font-family="Segoe UI" fill="#ff0055" font-weight="bold" font-size="14">Error: ${message}</text></svg>`;
}

module.exports = { renderTrophySVG, renderErrorSVG };
