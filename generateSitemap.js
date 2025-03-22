const fs = require('fs');
const path = require('path');

const siteUrl = "https://yourwebsite.com"; // Change this to your domain
const publicDir = path.join(__dirname, 'public');

// Ensure the `public` directory exists
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Function to get all `.html` files in the project
const getHtmlFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath.replace(__dirname, '').replace(/\\/g, '/'));
        }
    });
    return fileList;
};

// Get all `.html` pages in the repository
const htmlFiles = getHtmlFiles(__dirname);

// Generate sitemap XML
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${htmlFiles.map(file => `
    <url>
        <loc>${siteUrl}${file}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.8</priority>
    </url>
    `).join('')}
</urlset>`;

// Write the sitemap to `public/sitemap.xml`
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf8');

console.log("✅ Sitemap generated successfully!");

