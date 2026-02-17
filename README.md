# Inclusive Brand Guide Template

A lightweight, accessible-first brand guideline template built with [Astro](https://astro.build). This template helps teams document their design systems while demonstrating WCAG compliance.

## Prerequisites
- Node.js (v18.14.1 or higher recommended)
- npm (comes with Node.js)

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the dev server**:
   ```bash
   npm run dev
   ```

## Customization

### 1. Brand Configuration (`src/scripts/brandSettings.js`)
This is the control center for the template. Update this file to populate your brand's specific data across the site.

- **Logo & Favicon**: Set the paths to your assets.
- **Typography**: Define your primary/secondary fonts and readability metrics.
- **Palette**: Add your brand colors. These automatically populate the **Contrast Calculator**.

```javascript
// src/scripts/brandSettings.js
export const brandSettings = {
    logo: { src: "/logo.png", alt: "Brand Logo" },
    palette: [
        { name: "Primary Blue", hex: "#0056b3" },
        // ...
    ]
};
```

### 2. Global Styles (`src/styles/global.css`)
Update the CSS variables in `:root` to match your brand's look and feel (colors, fonts, border radii).

### 3. Content Sections (`src/components/sections/`)
Edit the `.astro` files in this directory to add your specific guidelines.

2.  Open your browser and navigate to `http://localhost:4321`.

## Building for Production

To build the site for deployment:

```bash
npm run build
```

This will generate a `dist/` directory with your static site.

## Deployment

This template includes a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically deploy your site to GitHub Pages.

### Setting up GitHub Pages

1. Go to your repository's **Settings** tab.
2. Click on **Pages** in the left sidebar.
3. Under **Build and deployment** > **Source**, select **GitHub Actions** from the dropdown menu.
4. The site will automatically deploy whenever you push changes to the `main` branch.

## Accessibility Features
- **Built in Interactive Contrast Calculator**: Dynamically calculates ratios based on your palette settings.
- **Keyboard Navigation**: Includes skip links and focus management for in-page navigation.
- **Semantic Structure**: Built with proper landmarks and heading hierarchy.