# 🏆 GitHub Trophy: Hall of Fame

A premium, production-ready API to generate trophy-style SVG badges for your GitHub Profile README. This version features a complete "Hall of Fame" mode that shows both your earned achievements and the ones you still have to unlock.

## ✨ Features
- **Hall of Fame Mode:** Shows your entire trophy collection (including locked ones with a sleek grayscale effect).
- **Pure SVG Core:** perfectly compatible with GitHub READMEs.
- **Micro-Animations:** Smooth slide-up and fade-in effects for each medal.
- **Auto-Scaling:** The grid height adjusts automatically based on the collection size.
- **Legacy Support:** Works with both `/api/trophies` and `/api/profile` endpoints.

## 🛠 Usage

Embed the following in your GitHub README:

```markdown
![My Trophies](https://your-domain.vercel.app/api/trophies?username=YOUR_USERNAME&all=true)
```

### Query Parameters
| Parameter | Default | Description |
|-----------|---------|-------------|
| `username`| Required| Your GitHub username |
| `theme`   | `dark`  | `dark` or `light` |
| `columns` | `3`     | Number of medals per row |
| `all`     | `true`  | Set to `false` to hide locked trophies |

## 🏆 Achievement Tiers
| Medal | Target | Requirement |
|-------|--------|-------------|
| 🏆 **First Repo** | Code | `public_repos` ≥ 1 |
| 📦 **Repo Builder**| Momentum | `public_repos` ≥ 10 |
| 🔥 **OS Addict** | Mastery | `public_repos` ≥ 30 |
| ⭐ **Rising Dev** | Reach | `followers` ≥ 10 |
| 🌟 **Popular Dev** | Impact | `followers` ≥ 50 |
| 👑 **Leader** | Authority | `followers` ≥ 100 |
| 🤝 **Networker** | Community | `following` ≥ 50 |

## 🚀 Deployment
1. **Fork** this repository.
2. Import to **Vercel**.
3. Add `GITHUB_TOKEN` for higher rate limits.
4. **Deploy** and enjoy your Hall of Fame!

---
Built with ❤️ for GitHub Maintainers.
