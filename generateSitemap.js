const fs = require("fs");

const domain = "https://finnajobs.netlify.app"; 

const pages = [
  "index.html",
  "dreamjob.html",
  "interview-mastery.html",
  "productivity-charms.html",
  "resume-alchemy.html",
  "salary-sorcery.html",
  "waitlist.html",
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${domain}/${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.8</priority>
    </url>
  `
    )
    .join("\n")}
</urlset>`;

fs.writeFileSync("public/sitemap.xml", sitemapContent);
console.log("✅ Sitemap generated successfully!");
