// Sitemap URLs for Bakery House Laos
export default defineSitemapEventHandler(async () => {
  return [
    {
      loc: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date(),
    },
    {
      loc: '/products',
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date(),
    },
    {
      loc: '/products/cakes',
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date(),
    },
    {
      loc: '/products/breads',
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date(),
    },
    {
      loc: '/about-us',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    },
    {
      loc: '/contact-us',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    },
    {
      loc: '/whole-bread',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
    },
    {
      loc: '/manual',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    },
    // Add more dynamic routes here as needed
    // You can also fetch from Firestore and add product/news pages
  ];
});
