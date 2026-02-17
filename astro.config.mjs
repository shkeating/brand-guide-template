import { defineConfig } from 'astro/config';

// 1. Check if we are running in a GitHub Action
const isGitHubAction = !!process.env.GITHUB_ACTIONS;

// 2. Get the repo name (e.g., "brand-guide-template") from the environment
//    Github gives us "owner/repo", so we split it to get just the repo name.
const repoName = isGitHubAction 
  ? process.env.GITHUB_REPOSITORY.split('/')[1] 
  : '';

// 3. Get the owner name (e.g., "shkeating") to build the site URL
const repoOwner = isGitHubAction 
  ? process.env.GITHUB_REPOSITORY_OWNER 
  : '';

export default defineConfig({
  // If in production, use the GitHub Pages URL. If local, use localhost.
  site: isGitHubAction ? `https://${repoOwner}.github.io` : 'http://localhost:4321',
  
  // If in production, set the base to the repo name (e.g., /brand-guide-template)
  base: isGitHubAction ? `/${repoName}` : '/',
});