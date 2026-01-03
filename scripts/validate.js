#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

let errors = [];
let warnings = [];

function log(type, message) {
  const color = type === 'error' ? colors.red : type === 'warning' ? colors.yellow : colors.green;
  console.log(`${color}${type.toUpperCase()}${colors.reset}: ${message}`);
}

function validateJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    errors.push(`Invalid JSON in ${filePath}: ${error.message}`);
    return null;
  }
}

function validateURL(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function validateSlug(slug) {
  return /^[a-z0-9-]+$/.test(slug);
}

function validateCategories(categoriesData) {
  if (!categoriesData || !categoriesData.categories) {
    errors.push('categories.json must have a "categories" array');
    return false;
  }

  const categories = categoriesData.categories;
  const slugs = new Set();
  const ids = new Set();

  categories.forEach((cat, index) => {
    // Required fields
    if (!cat.id) errors.push(`Category at index ${index} missing "id"`);
    if (!cat.name) errors.push(`Category at index ${index} missing "name"`);
    if (!cat.slug) errors.push(`Category at index ${index} missing "slug"`);
    if (!cat.description) errors.push(`Category at index ${index} missing "description"`);
    if (typeof cat.order !== 'number') errors.push(`Category "${cat.name || index}" missing or invalid "order"`);
    if (!cat.status) errors.push(`Category "${cat.name || index}" missing "status"`);

    // Validate slug format
    if (cat.slug && !validateSlug(cat.slug)) {
      errors.push(`Category "${cat.name}" has invalid slug "${cat.slug}" (must be lowercase with hyphens only)`);
    }

    // Check for duplicates
    if (cat.slug && slugs.has(cat.slug)) {
      errors.push(`Duplicate category slug: "${cat.slug}"`);
    }
    if (cat.id && ids.has(cat.id)) {
      errors.push(`Duplicate category id: "${cat.id}"`);
    }

    slugs.add(cat.slug);
    ids.add(cat.id);

    // Validate status
    if (cat.status && !['pending', 'approved', 'rejected'].includes(cat.status)) {
      errors.push(`Category "${cat.name}" has invalid status "${cat.status}"`);
    }

    // Length checks
    if (cat.name && cat.name.length > 50) {
      warnings.push(`Category "${cat.name}" name is longer than 50 characters`);
    }
    if (cat.description && cat.description.length > 200) {
      warnings.push(`Category "${cat.name}" description is longer than 200 characters`);
    }
  });

  return slugs;
}

function validateLinks(linksData, validCategories) {
  if (!linksData || !linksData.links) {
    errors.push('links.json must have a "links" array');
    return false;
  }

  const links = linksData.links;
  const ids = new Set();

  links.forEach((link, index) => {
    // Required fields
    if (!link.id) errors.push(`Link at index ${index} missing "id"`);
    if (!link.title) errors.push(`Link at index ${index} missing "title"`);
    if (!link.url) errors.push(`Link at index ${index} missing "url"`);
    if (!link.categories || !Array.isArray(link.categories)) {
      errors.push(`Link "${link.title || index}" missing or invalid "categories" array`);
    }
    if (!link.status) errors.push(`Link "${link.title || index}" missing "status"`);

    // Validate ID format
    if (link.id && !validateSlug(link.id)) {
      errors.push(`Link "${link.title}" has invalid id "${link.id}" (must be lowercase with hyphens only)`);
    }

    // Check for duplicate IDs
    if (link.id && ids.has(link.id)) {
      errors.push(`Duplicate link id: "${link.id}"`);
    }
    ids.add(link.id);

    // Validate URL
    if (link.url && !validateURL(link.url)) {
      errors.push(`Link "${link.title}" has invalid URL "${link.url}"`);
    }

    // Validate icon URL if present
    if (link.icon && !validateURL(link.icon)) {
      errors.push(`Link "${link.title}" has invalid icon URL "${link.icon}"`);
    }

    // Validate categories exist
    if (link.categories && Array.isArray(link.categories)) {
      if (link.categories.length === 0) {
        errors.push(`Link "${link.title}" must have at least one category`);
      }
      link.categories.forEach(cat => {
        if (!validCategories.has(cat)) {
          errors.push(`Link "${link.title}" references non-existent category "${cat}"`);
        }
      });
    }

    // Validate status
    if (link.status && !['pending', 'approved', 'rejected'].includes(link.status)) {
      errors.push(`Link "${link.title}" has invalid status "${link.status}"`);
    }

    // Length checks
    if (link.title && link.title.length > 100) {
      warnings.push(`Link "${link.title}" title is longer than 100 characters`);
    }
    if (link.description && link.description.length > 500) {
      warnings.push(`Link "${link.title}" description is longer than 500 characters`);
    }

    // Date validation
    if (link.submittedAt) {
      const date = new Date(link.submittedAt);
      if (isNaN(date.getTime())) {
        errors.push(`Link "${link.title}" has invalid submittedAt date "${link.submittedAt}"`);
      }
    }
  });

  return true;
}

// Main validation
console.log(`${colors.blue}🔍 Validating RaidARC Community Data...${colors.reset}\n`);

const dataDir = path.join(__dirname, '..', 'data');
const categoriesPath = path.join(dataDir, 'categories.json');
const linksPath = path.join(dataDir, 'links.json');

// Validate files exist
if (!fs.existsSync(categoriesPath)) {
  errors.push('categories.json not found in data/ directory');
}
if (!fs.existsSync(linksPath)) {
  errors.push('links.json not found in data/ directory');
}

if (errors.length > 0) {
  errors.forEach(err => log('error', err));
  process.exit(1);
}

// Parse JSON files
const categoriesData = validateJSON(categoriesPath);
const linksData = validateJSON(linksPath);

if (!categoriesData || !linksData) {
  errors.forEach(err => log('error', err));
  process.exit(1);
}

// Validate categories
const validCategories = validateCategories(categoriesData);

// Validate links
if (validCategories) {
  validateLinks(linksData, validCategories);
}

// Report results
console.log('');
if (errors.length === 0 && warnings.length === 0) {
  log('success', `✓ All validation checks passed!`);
  console.log(`${colors.green}✓ ${categoriesData.categories.length} categories validated${colors.reset}`);
  console.log(`${colors.green}✓ ${linksData.links.length} links validated${colors.reset}`);
  process.exit(0);
} else {
  if (errors.length > 0) {
    console.log(`${colors.red}Found ${errors.length} error(s):${colors.reset}\n`);
    errors.forEach(err => log('error', err));
  }
  if (warnings.length > 0) {
    console.log(`\n${colors.yellow}Found ${warnings.length} warning(s):${colors.reset}\n`);
    warnings.forEach(warn => log('warning', warn));
  }
  
  if (errors.length > 0) {
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✓ Validation passed with warnings${colors.reset}`);
    process.exit(0);
  }
}
