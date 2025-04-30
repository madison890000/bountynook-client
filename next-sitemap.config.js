/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bountynook.com',
  generateRobotsTxt: true,
  exclude: ['/login', '/register', '/my', '/create-task'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/login', '/register', '/my', '/create-task'],
        allow: ['/tasks'],
      },
    ],
    additionalSitemaps: [
      'https://bountynook.com/sitemap.xml',
    ],
  },
}
