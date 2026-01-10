# 🏆 Ultimate GitHub Trophy System 🏆

A professional, gamified progression system for your GitHub Profile. This isn't just a stat counter—it's a full-featured **XP and Leveling engine** with **Gen Z energy**.

---

## 🎨 Choose Your Style (9 Modes)
We support **9 distinct rendering modes** to perfectly match your portfolio aesthetic.

| Style | Description | Preview |
|-------|-------------|---------|
| **Glass** | `mode=glass` | ![Glass](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=glass) |
| **Terminal** | `mode=terminal` | ![Terminal](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=terminal) |
| **Unreal** | `mode=unreal` | ![Unreal](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=unreal) |
| **Cyberpunk**| `mode=cyberpunk`| ![Cyberpunk](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=cyberpunk) |
| **Minecraft**| `mode=minecraft`| ![Minecraft](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=minecraft) |
| **Nostalgic**| `mode=nostalgic`| ![Nostalgic](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=nostalgic) |
| **Traditional**| `mode=traditional`| ![Traditional](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=traditional) |
| **Sketch** | `mode=sketch` | ![Sketch](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=sketch) |
| **2D Clean** | `mode=2d` | ![2D](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=2d) |

---

## 🔒 Secret & Rare Trophies
Some accomplishments are too rare to be shown immediately. These are **blurred** and marked with **"???"** until you reach at least the **Silver Tier**.

*   **Forks**: Reach Silver to reveal "The Blueprint".
*   **Discussions**: Join the community to unlock "Giga Chad".
*   **Sponsors**: Support creators to unlock "Sugar Parent".

> **Tip:** You can force show these blurred trophies by adding `&showHidden=true` to your URL.

---

## 🕹 Usage Instructions

Copy this into your `README.md`:

```markdown
![My Trophies](https://your-domain.vercel.app/api/profile?username=YOUR_USERNAME&mode=glass&theme=dark)
```

### ⚙️ Query Parameters
| Parameter | Default | Options |
|-----------|---------|---------|
| `username` | (Required) | Your GitHub Username |
| `mode` | `unreal` | `glass`, `terminal`, `minecraft`, `cyberpunk`, `traditional`, `nostalgic`, `sketch`, `2d` |
| `theme` | `dark` | `dark`, `light` |
| `showLocked` | `false` | Set `true` to show all 14 trophy slots |
| `showHidden` | `false` | Set `true` to show blurred rare trophies |

---

## 🚀 Contribution Guide

### 1. Add a New Theme
1.  Open `themes/trophyRenderer.js`.
2.  Define your own logic inside `getTrophyCup` and `cardStyles`.
3.  Test it by adding your mode to `generate-tests.js`.

### 2. Update Milestones
1.  Open `utils/github.js`.
2.  Adjust `MILESTONES` to change difficulty levels.
3.  Add new category titles in `TROPHY_TITLES` (Keep it Gen Z!).

---
Built with ❤️ for the Dev Community.
