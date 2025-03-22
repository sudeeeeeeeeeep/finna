const fs = require('fs');
const path = require('path');

// Define your website domain (update this accordingly)
const websiteUrl = 'https://finnajobs.netlify.app';

// List of pages (Modify this to include all your site URLs)
const pages = [
    '/',
    '/dreamjob.html',
    '/interview-mastery.html',
    '/productivity-charms.html',
    '/resume-alchemy.html',
    '/salary-sorcery.html',
    '/waitlist.html'
];

// Generate sitemap content
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${websiteUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`).join('')}
</urlset>`;

// Write sitemap.xml to the root directory
const sitemapPath = path.join(__dirname, 'sitemap.xml');

fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log('✅ Sitemap successfully created at sitemap.xml');


