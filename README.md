# 🏆 GitHub Trophy: The Ultimate Achievement System
A professional, gamified progression system for your GitHub Profile. This isn't just a stat counter—it's a full-featured **XP and Leveling engine** with **Gen Z energy**.

## 🎨 New Styles (9+ Modes)
| Mode | Description | Preview |
|------|-------------|---------|
| `unreal` | Next-gen high fidelity with glassmorphism and dynamic auras. | [Link](?mode=unreal) |
| `cyberpunk`| Neon glitch aesthetic with futuristic polygons. | [Link](?mode=cyberpunk) |
| `glass` | Modern frosted glass with soft blurs and vibrant colors. | [Link](?mode=glass) |
| `terminal` | Retro hacker terminal with ASCII-style progress bars. | [Link](?mode=terminal) |
| `minecraft`| Blocky RPG look with dirt/stone textures. | [Link](?mode=minecraft) |
| `nostalgic`| 8-bit arcade vibes with CRT scanlines. | [Link](?mode=nostalgic) |
| `traditional`| Distinguished veteran on old-world parchment. | [Link](?mode=traditional) |
| `sketch` | Hand-drawn pencil look for the artistic dev. | [Link](?mode=sketch) |
| `2d` | High-readability clean minimalist look. | [Link](?mode=2d) |

## 🕹 Usage
Embed the following in your GitHub README:

```markdown
![My Trophies](https://your-domain.vercel.app/api/profile?username=YOUR_USERNAME&mode=glass&theme=dark)
```

## 🚀 How to Contribute
We love new themes and trophy ideas! Here is how you can help:

### 1. Add a New Theme
1.  Open `themes/trophyRenderer.js`.
2.  Add weights to the `fontFamily` and `cardStyles` objects.
3.  Implement your own SVG logic inside `getTrophyCup`.
4.  Test it by adding your mode to the `modes` array in `generate-tests.js` and running `node generate-tests.js`.

### 2. Add a New Trophy Category
1.  Open `utils/github.js`.
2.  Add your category to `TROPHY_TITLES` (Don't forget the **Gen Z slang!**).
3.  Add milestones to `MILESTONES`.
4.  Update `fetchDetailedStats` to fetch the new metric from the GitHub API.
5.  Push it to the `trophies` array in `fetchTrophyData`.

## 📈 XP Point Table (Gen Z Edition)
| Category | Slang Level | Milestones |
|----------|-------------|------------|
| **Stars** | NPC → Galaxy Brain → Universal Rizz | 1 / 100 / 500 |
| **Commits**| Casual → Grinder → Demon Mode | 10 / 1000 / 5000 |
| **Gists** | Note Taker → Script Kid → Gist God | 1 / 20 / 50 |
| **Reviews**| Lurker → Vibe Checker → Final Boss | 1 / 50 / 150 |
| **Followers**| Ghosted → Valid → Main Character | 1 / 60 / 250 |

## 🛠 Deployment
1. **Fork** this repo.
2. Import to **Vercel**.
3. Add `GITHUB_TOKEN` for higher rate limits.
4. **Deploy** and flex your trophies!

---
Built with ❤️ for the GitHub Community.
