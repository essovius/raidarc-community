# Contributing to RaidARC Community

Thank you for contributing to the RaidARC community! This guide will help you submit quality contributions.

## 🎯 Ways to Contribute

### 1. Suggest a New Link (via Issue)

The easiest way to contribute! Use our [New Link Template](../../issues/new?template=new-link.yml) to suggest a resource.

**What to include:**
- **Title** - Clear, descriptive name
- **URL** - Direct link to the resource
- **Description** - What makes this resource valuable (1-2 sentences)
- **Category** - Which category it belongs to (official, maps, wiki, guides, etc.)
- **Icon URL** (optional) - Link to a favicon or logo

**Example:**
```
Title: ARC Raiders Interactive Map
URL: https://example.com/map
Description: Real-time interactive map showing all POIs, loot spawns, and ARC spawn locations
Category: maps
```

### 2. Suggest a New Category (via Issue)

Think we need a new category? Use our [New Category Template](../../issues/new?template=new-category.yml).

**What to include:**
- **Category Name** - Short, clear name (e.g., "Tools", "Discord Servers")
- **Description** - What type of content belongs here
- **Why it's needed** - What gap does this fill?

**Example:**
```
Name: Tools
Description: Utilities, calculators, and helpful tools for ARC Raiders
Why: Several loadout calculators and DPS calculators exist that don't fit existing categories
```

### 3. Submit a Pull Request (Direct Edit)

For those comfortable with GitHub and JSON editing.

#### Adding a New Link

1. **Fork this repository**
2. **Edit `data/links.json`**
3. **Add your link** following this structure:

```json
{
  "id": "unique-id-kebab-case",
  "title": "Resource Name",
  "url": "https://example.com",
  "description": "Brief description of the resource",
  "icon": "https://example.com/icon.png",
  "categories": ["category-slug"],
  "submittedBy": "your-github-username",
  "submittedAt": "2025-01-19T00:00:00Z",
  "status": "pending"
}
```

**Important:**
- **id** - Must be unique, use kebab-case (lowercase with dashes)
- **categories** - Use existing category slugs from `data/categories.json`
- **submittedAt** - Use ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)
- **status** - Always use `"pending"` for new submissions

4. **Validate your changes locally** (optional but recommended):
```bash
npm install ajv ajv-formats
node scripts/validate.js
```

5. **Submit your PR** with a clear description

#### Adding a New Category

1. **Fork this repository**
2. **Edit `data/categories.json`**
3. **Add your category**:

```json
{
  "id": "unique-id",
  "name": "Display Name",
  "slug": "url-friendly-slug",
  "description": "What content belongs in this category",
  "order": 99,
  "status": "pending"
}
```

**Important:**
- **order** - Use a high number (99); maintainers will adjust
- **slug** - Must be URL-friendly (lowercase, no spaces)
- **status** - Always use `"pending"`

## ✅ Submission Guidelines

### Quality Standards

**For Links:**
- ✅ Must be ARC Raiders-related
- ✅ Content is active and maintained
- ✅ No affiliate links or spam
- ✅ No malicious or NSFW content
- ✅ Description is clear and accurate
- ✅ URL is direct (no redirects)

**For Categories:**
- ✅ Fills a genuine organizational need
- ✅ Clear, distinct purpose from existing categories
- ✅ Has enough potential content to justify it
- ✅ Name is clear and professional

### What Gets Rejected

- ❌ Duplicate submissions
- ❌ Unrelated to ARC Raiders
- ❌ Dead/abandoned links
- ❌ Low-quality or spam content
- ❌ Personal Discord servers (unless official/large community)
- ❌ Referral/affiliate links

## 🔄 Review Process

1. **Submission** - You create an issue or PR
2. **Auto-validation** - GitHub Actions validates JSON format and schema
3. **Community feedback** - Other users can upvote and comment
4. **Maintainer review** - We check quality and relevance
5. **Decision** - Approved, needs changes, or rejected with feedback
6. **Merge** - Approved submissions are merged and synced to RaidARC.com

### Timeline

- **Auto-validation**: Instant (on PR)
- **Initial review**: Usually within 1-3 days
- **Final decision**: Within 1 week

## 🏷️ Using Labels

When maintainers review your submission, they'll add labels:

- `approved` ✅ - Ready to merge!
- `needs-info` ℹ️ - Need more details from you
- `duplicate` 🔄 - Already exists
- `invalid` ❌ - Doesn't meet guidelines

## 🐛 Reporting Issues

Found a broken link or incorrect information?

1. [Open an issue](../../issues/new)
2. Describe the problem clearly
3. Include the current link/data
4. Suggest the fix if you know it

## 💡 Best Practices

1. **Search first** - Check if your suggestion already exists
2. **Be specific** - Clear descriptions help maintainers
3. **One per submission** - Don't bundle multiple links in one issue
4. **Stay updated** - Respond to feedback on your submissions
5. **Vote on others** - Use 👍 reactions to show support

## 🤝 Code of Conduct

- Be respectful and constructive
- Help others understand your submissions
- Accept feedback gracefully
- Focus on what's best for the community

## ❓ Questions?

- Check [existing issues](../../issues)
- Start a [discussion](../../discussions)
- Review the [README](README.md)

Thank you for helping make RaidARC better! 🎮
