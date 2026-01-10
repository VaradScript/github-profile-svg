# 🏆 Ultimate GitHub Trophy System 🏆

## 📸 Quick embed (HTML `<img>` tag)

You can embed the trophy SVG directly in any HTML‑compatible markdown (e.g. GitHub README) using an `<img>` tag.  Replace `YOUR_USERNAME` with your GitHub handle and optionally add query parameters:

```html
<img src="https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=glass&theme=dark" alt="My trophies" />
```

* `mode` – one of the 9 styles (`glass`, `terminal`, `unreal`, `cyberpunk`, `minecraft`, `nostalgic`, `traditional`, `sketch`, `2d`).
* `theme` – `dark` (default) or `light`.
* `showHidden=true` – reveal secret/rare trophies.
* `showLocked=true` – display all 14 slots.
* `v=2` – optional version flag to bust caches when the service updates.

---


A professional, gamified progression system for your GitHub Profile. This isn't just a stat counter—it's a full-featured **XP and Leveling engine** with **Gen Z energy**.

---

## 🎨 Choose Your Style (9 Modes)
Copy the code below the style you want and replace `YOUR_USERNAME` with your GitHub username.

### 1. Glass (Premium)
![Glass](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=glass)
```markdown
[![Glass Trophies](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=glass)](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=glass)
```

### 2. Terminal (Hacker)
![Terminal](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=terminal)
```markdown
[![Terminal Trophies](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=terminal)](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=terminal)
```

### 3. Unreal (Glow)
![Unreal](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=unreal)
```markdown
[![Unreal Trophies](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=unreal)](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=unreal)
```

### 4. Cyberpunk (Glitch)
![Cyberpunk](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=cyberpunk)
```markdown
[![Cyberpunk Trophies](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=cyberpunk)](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=cyberpunk)
```

### 5. Minecraft (Pixel)
![Minecraft](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=minecraft)
```markdown
[![Minecraft Trophies](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=minecraft)](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=minecraft)
```

### 6. Nostalgic (Retro)
![Nostalgic](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=nostalgic)
```markdown
[![Nostalgic Trophies](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=nostalgic)](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=nostalgic)
```

### 7. Traditional (Classic)
![Traditional](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=traditional)
```markdown
[![Traditional Trophies](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=traditional)](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=traditional)
```

### 8. Sketch (Handrawn)
![Sketch](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=sketch)
```markdown
[![Sketch Trophies](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=sketch)](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=sketch)
```

### 9. 2D (Clean)
![2D](https://github-profile-svg.vercel.app/api/profile?username=varadscript&mode=2d)
```markdown
[![2D Trophies](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=2d)](https://github-profile-svg.vercel.app/api/profile?username=YOUR_USERNAME&mode=2d)
```

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
