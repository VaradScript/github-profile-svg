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

## 🏆 Ranking Criteria
Medals are awarded based on realistic tiers:

| Rank | Followers | Repos | Experience |
|------|-----------|-------|------------|
| **SSS**| > 2000 | > 200 | > 10 Years |
| **S**  | > 500  | > 50  | > 5 Years |
| **A**  | > 50   | > 10  | > 1 Year |
| **B**  | > 10   | > 5   | > 6 Months |

## 🚀 Deployment
1. **Fork** this repository.
2. Import to **Vercel**.
3. Add `GITHUB_TOKEN` for higher rate limits.
4. **Deploy** and enjoy your Hall of Fame!

---
Built with ❤️ for GitHub Maintainers.
