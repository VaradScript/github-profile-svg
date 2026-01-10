# 🏆 GitHub Trophy: Legacy Achievement System
A professional, gamified progression system for your GitHub Profile. This isn't just a stat counter—it's a full-featured **XP and Leveling engine**.

## ✨ Legacy Features
- **XP / Point System:** Every interaction (Stars, PRs, Issues, Followers) earns you XP.
- **Global Levels:** Accumulate XP to level up your profile card.
- **Checkpoints/Milestones:** Trophies evolve from **Bronze → Silver → Gold → Legendary**.
- **Locked & Secret Trophies:** Unlock hidden achievements like "Lone Wolf" or "Early Adopter".
- **Floating Icons & Glows:** Pure SVG animations for a premium feel.
- **Mobile Responsive:** Works perfectly in GitHub READMEs on any device.

## 🕹 Usage
Embed the following in your GitHub README:

```markdown
![My Achievements](https://your-domain.vercel.app/api/trophies?username=YOUR_USERNAME&theme=dark)
```

### ⚙️ Query Parameters
| Parameter | Default | Description |
|-----------|---------|-------------|
| `username`| Required| Your GitHub username |
| `theme`   | `dark`  | `dark` or `light` |
| `animation`| `on`   | Toggle animations (`on`/`off`) |
| `showLocked`| `false`| Show trophies that haven't reached Bronze yet |
| `mode`     | `2d`    | `2d`, `unreal`, or `nostalgic` (Retro Look) |
| `showHidden`| `false`| Reveal secret trophies even if not earned |

## 📊 XP Point Table
| Action | Reward |
|--------|--------|
| **Star** | 5 XP |
| **Follower** | 10 XP |
| **Public Repo** | 15 XP |
| **Pull Request** | 10 XP |
| **Issue Opened** | 5 XP |
| **GitHub Year** | 50 XP |

## 🌟 Secret Trophies
Can you unlock them all?
- 🦕 **Early Adopter**: Account created over 10 years ago.
- 🐺 **Lone Wolf**: ???
- 💎 **Artisan**: ???

## 🚀 Deployment
1. **Fork** this repository.
2. Import to **Vercel**.
3. Add `GITHUB_TOKEN` for higher rate limits.
4. **Deploy** and enjoy your Hall of Fame!

---
Built with ❤️ for GitHub Maintainers.
