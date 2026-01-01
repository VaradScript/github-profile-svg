# 🏆 GitHub Trophy: Classic Edition

A polished rank-based trophy generator for your GitHub Profile. This tool generates "Classic" style medal cards with SSS - C rankings based on your verified stats.

## ✨ Features
- **Rank System:** Calculates SSS, SS, S, AAA, A, B, C ranks for every stats category.
- **Classic Layout:** Renders horizontal strips of square achievement cards.
- **Gradient Themes:** Premium gradients for high-tier ranks (Gold for S, Blue for A, Green for B).
- **Zero Config:** Just add your username.
- **Pure SVG:** Crisply rendered vector graphics suitable for any zoom level.

## 🛠 Usage

Embed the following in your GitHub README:

```markdown
![My Trophies](https://your-domain.vercel.app/api/trophies?username=YOUR_USERNAME&columns=6)
```

### Query Parameters
| Parameter | Default | Description |
|-----------|---------|-------------|
| `username`| Required| Your GitHub username |
| `theme`   | `dark`  | `dark` or `light` |
| `columns` | `6`     | Cards per row (set to 6 or 3 for best results) |

## 🏆 Ranking Criteria & Tiers
Medals are awarded and titled based on realistic tiers for different activities:

| Category | Title | S Rank Criteria |
|----------|-------|-----------------|
| **Stars** | *Stargazer* | > 100 Stars |
| **Followers** | *Celebrity* | > 500 Followers |
| **Repos** | *Repo Creator* | > 50 Repos |
| **Pull Requests** | *Pull Shark* | > 100 PRs |
| **Issues** | *Bug Hunter* | > 100 Issues |
| **Account Age** | *Veteran* | > 5 Years |

**Ranks available:** `SSS`, `SS`, `S`, `AAA`, `AA`, `A`, `B`, `C`

## 🚀 Deployment
1. **Fork** this repository.
2. Import to **Vercel**.
3. Add `GITHUB_TOKEN` for higher rate limits.
4. **Deploy** and enjoy your Hall of Fame!

---
Built with ❤️ for GitHub Maintainers.
