// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: [
    "~/assets/css/fonts.css",
  ],
  app: {
    head: {
      title: 'Bakery House - Fresh Baked Goods Daily',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },

        // SEO Meta Tags
        { name: 'description', content: 'Bakery House offers fresh baked goods, custom cakes, pastries, and desserts. Order online for pickup or delivery.' },
        { name: 'keywords', content: 'bakery, fresh bread, cakes, pastries, desserts, custom cakes, bakery house' },
        { name: 'author', content: 'Bakery House' },

        // Open Graph Meta Tags for Google Search & Social Media
        { property: 'og:title', content: 'Bakery House - Fresh Baked Goods Daily' },
        { property: 'og:description', content: 'Bakery House offers fresh baked goods, custom cakes, pastries, and desserts. Order online for pickup or delivery.' },
        { property: 'og:image', content: '/favicon.png' },
        { property: 'og:url', content: 'https://bakery-house-f7e32.web.app' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Bakery House' },

        // Twitter Card Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Bakery House - Fresh Baked Goods Daily' },
        { name: 'twitter:description', content: 'Bakery House offers fresh baked goods, custom cakes, pastries, and desserts. Order online for pickup or delivery.' },
        { name: 'twitter:image', content: '/favicon.png' },

        // Theme Color for Mobile Browsers
        { name: 'theme-color', content: '#DC2626' },
        { name: 'msapplication-TileColor', content: '#DC2626' },
      ],
      link: [
        // Favicon for different sizes
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon.png' },

        // Apple Touch Icon
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },

        // Web Manifest
        { rel: 'manifest', href: '/manifest.json' },
      ],
    },
  },
  ssr: false,
  router: {
    options: {
      strict: false,
    },
  },
});
