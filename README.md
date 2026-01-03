# RaidARC Community Repository 🎮

Welcome to the **RaidARC Community Repository**! This is the central hub for community-contributed links, resources, and categories for the [RaidARC.com](https://raidarc.com) ARC Raiders resource directory.

## 📊 Current Stats

- **Links**: 1
- **Categories**: 8
- **Contributors**: Growing daily!

## 🎯 Purpose

This repository allows the ARC Raiders community to:
- **Suggest new links** to valuable resources (wikis, guides, tools, streamers)
- **Propose new categories** for organizing content
- **Improve existing entries** with better descriptions or corrections
- **Vote on suggestions** using GitHub issues and reactions

All approved contributions are synced to [RaidARC.com](https://raidarc.com), making your contributions visible to the entire ARC Raiders community!

## 🚀 How to Contribute

There are two ways to contribute:

### 1. **Suggest via Issues** (Easiest)
Perfect for quick suggestions without needing to edit files directly.

- [**Suggest a New Link**](../../issues/new?template=new-link.yml) - Share a useful resource
- [**Suggest a New Category**](../../issues/new?template=new-category.yml) - Propose a new category

### 2. **Submit via Pull Request** (Direct)
For those familiar with GitHub, you can directly edit the data files and submit a PR.

1. Fork this repository
2. Edit `data/links.json` or `data/categories.json`
3. Submit a pull request

👉 **See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines**

## 📁 Repository Structure

```
raidarc-community/
├── data/
│   ├── links.json          # All links with metadata
│   ├── categories.json     # Category definitions
│   └── schema.json         # JSON schema for validation
├── .github/
│   ├── ISSUE_TEMPLATE/     # Issue forms for suggestions
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       └── validate.yml    # Auto-validates PR submissions
├── scripts/
│   └── validate.js         # Data validation script
├── README.md               # You are here!
├── CONTRIBUTING.md         # Contribution guidelines
└── LICENSE                 # MIT License
```

## ✅ Quality Standards

All submissions are:
- **Auto-validated** - GitHub Actions checks data format and schema
- **Manually reviewed** - Maintainers ensure quality and relevance
- **Community-driven** - Upvotes and feedback guide prioritization

### What Makes a Good Submission?

**Links:**
- Directly related to ARC Raiders
- Active and maintained
- Provides clear value to players
- Has accurate description and proper category

**Categories:**
- Fills a genuine gap in organization
- Has enough potential content to justify it
- Uses clear, descriptive naming

## 🏷️ Labels

We use these labels to track submissions:

- `new-link` - Suggested new link
- `new-category` - Suggested new category
- `approved` - Approved and ready to merge
- `duplicate` - Already exists
- `invalid` - Doesn't meet criteria
- `needs-info` - Requires more information

## 🔄 Sync Process

1. Community submits via Issues or PRs
2. Auto-validation checks data format
3. Maintainers review for quality and relevance
4. Approved changes are merged
5. Changes sync to [RaidARC.com](https://raidarc.com) (manual or automated)

## 📜 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Code of Conduct

Be respectful, constructive, and helpful. We're all here to make the ARC Raiders community better!

## 💬 Questions or Feedback?

- Open a [Discussion](../../discussions)
- Create an [Issue](../../issues)
- Visit [RaidARC.com](https://raidarc.com)

---

**Made with ❤️ by the ARC Raiders community**
