import { getAllPosts } from '../server/dynamo/queries'

const dateFormat = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`


function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://sammeechward.com</loc>
      <lastmod>2022-10-01</lastmod>
      <changefreq>weekly</changefreq>
    </url>
     ${posts
      .map(({ slug, modified }) => {
        return `
        <url>
          <loc>https://sammeechward.com/${slug}/</loc>
          <lastmod>${dateFormat(new Date(modified))}</lastmod>
        </url>`
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const posts = await getAllPosts({
    ProjectionExpression: "slug, modified",
    // ExpressionAttributeNames: { "#h": "hash" },
  })

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;