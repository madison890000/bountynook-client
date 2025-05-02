/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bountynook.com',
  generateRobotsTxt: true,
  outDir: 'public',
  sitemapSize: 5000,

  // 👇 排除不适合抓取的私密/功能性页面
  exclude: [
    '/login',
    '/register',
    '/my',
    '/create-task',
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/login', '/register', '/my', '/create-task'],
      },
    ],
    // ❌ 不包含动态 sitemap-tasks.xml
    additionalSitemaps: [],
  },
};
