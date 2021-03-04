const { getDocsConfig } = require('crd-utils')

// template for google SEO
// <url>
//   <loc>muyunyun.cn/blog/xxx</loc>
//   <lastmod>{{ sNow | formatDate }}</lastmod>
//   <changefreq>daily</changefreq>
//   <priority>1.0</priority>
// </url>

const docsConfig = getDocsConfig()

const domain = docsConfig.domain
const repo = docsConfig.repo

const template = content =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${content}
</urlset>
`

/**
 * generate sitemap for google.
 */
const generateSiteMap = (routes) => {
  let content = ''
  for (let i = 0; i < routes.length; i++) {
    if (i === routes.length - 1) {
      content +=
`  <url>
    <loc>${domain}/${repo}${routes[i]}</loc>
  </url>`
    } else {
      content +=
`  <url>
    <loc>${domain}/${repo}${routes[i]}</loc>
  </url>\n`
    }
  }
  return template(content)
}

module.exports = {
  generateSiteMap,
}
