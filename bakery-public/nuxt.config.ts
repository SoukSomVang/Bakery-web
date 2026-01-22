// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/sitemap"],
  css: [
    "~/assets/css/fonts.css",
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en-LA', // English in Laos
      },
      title: 'Bakery House Laos - Fresh Baked Goods Daily in Vientiane',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },

        // Google Search Console Verification
        { name: 'google-site-verification', content: 'WyodPu_YzHpBhtOlIKnaruttNINUuCQ9hDuv4UvO3j8' },

        // Language & Location
        { 'http-equiv': 'content-language', content: 'en-LA' },
        { name: 'language', content: 'English' },
        { name: 'geo.region', content: 'LA' }, // Laos country code
        { name: 'geo.placename', content: 'Vientiane' },
        { name: 'geo.position', content: '17.9757;102.6331' }, // Vientiane coordinates

        // SEO Meta Tags - Laos Focused
        { name: 'description', content: 'Bakery House Laos - Premium bakery in Vientiane offering fresh baked goods, custom cakes, pastries, and desserts. Best bakery in Laos for weddings, birthdays, and special occasions. Order online for pickup or delivery in Vientiane.' },
        { name: 'keywords', content: 'bakery laos, vientiane bakery, bakery house laos, fresh bread laos, custom cakes vientiane, pastries laos, desserts vientiane, wedding cakes laos, birthday cakes vientiane, best bakery laos, ร้านเบเกอรี่ลาว, ຮ້ານເບເກີຣີ, bread vientiane, cake shop laos' },
        { name: 'author', content: 'Bakery House Laos' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },

        // Open Graph Meta Tags for Google Search & Social Media - Laos Specific
        { property: 'og:title', content: 'Bakery House Laos - Fresh Baked Goods Daily in Vientiane' },
        { property: 'og:description', content: 'Premium bakery in Vientiane, Laos offering fresh baked goods, custom cakes, pastries, and desserts. Best bakery in Laos for weddings, birthdays, and special occasions.' },
        { property: 'og:image', content: 'https://bakery-house.org/icon-192.png' },
        { property: 'og:url', content: 'https://bakery-house.org' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Bakery House Laos' },
        { property: 'og:locale', content: 'en_LA' },
        { property: 'og:locale:alternate', content: 'lo_LA' }, // Lao language alternate

        // Business/Location Specific
        { property: 'business:contact_data:street_address', content: 'Nongnieng Road, Ban Nongnieng' },
        { property: 'business:contact_data:locality', content: 'Saysettha District' },
        { property: 'business:contact_data:region', content: 'Vientiane Capital' },
        { property: 'business:contact_data:country_name', content: 'Laos' },
        { property: 'business:contact_data:postal_code', content: '' },
        { property: 'business:contact_data:phone_number', content: '+856 20 552 212 14' },
        { property: 'business:contact_data:email', content: 'bakeryhouse@gmail.com' },
        { property: 'business:contact_data:website', content: 'https://bakery-house.org' },

        // Twitter Card Meta Tags - Laos Specific
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Bakery House Laos - Fresh Baked Goods Daily in Vientiane' },
        { name: 'twitter:description', content: 'Premium bakery in Vientiane, Laos offering fresh baked goods, custom cakes, pastries, and desserts.' },
        { name: 'twitter:image', content: 'https://bakery-house.org/icon-192.png' },

        // Theme Color for Mobile Browsers
        { name: 'theme-color', content: '#DC2626' },
        { name: 'msapplication-TileColor', content: '#DC2626' },

        // Mobile App Meta
        { name: 'application-name', content: 'Bakery House Laos' },
        { name: 'apple-mobile-web-app-title', content: 'Bakery House Laos' },
      ],
      link: [
        // Favicon - .ico for best compatibility
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

        // PNG favicons for different sizes
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },

        // Apple Touch Icon
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },

        // Web Manifest
        { rel: 'manifest', href: '/manifest.json' },

        // Canonical URL
        { rel: 'canonical', href: 'https://bakery-house.org' },
      ],
      script: [
        // JSON-LD Schema for Local Business in Laos
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Bakery',
            name: 'Bakery House Laos',
            image: 'https://bakery-house.org/icon-192.png',
            '@id': 'https://bakery-house.org',
            url: 'https://bakery-house.org',
            telephone: '+856 20 552 212 14',
            email: 'bakeryhouse@gmail.com',
            priceRange: '₭₭',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Nongnieng Road, Ban Nongnieng',
              addressLocality: 'Saysettha District',
              addressRegion: 'Vientiane Capital',
              addressCountry: 'LA',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 17.9757,
              longitude: 102.6331,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '07:00',
                closes: '20:00',
              },
            ],
            servesCuisine: 'Bakery',
            areaServed: {
              '@type': 'City',
              name: 'Vientiane',
              '@id': 'https://en.wikipedia.org/wiki/Vientiane',
            },
            currenciesAccepted: 'LAK, THB, USD',
            paymentAccepted: 'Cash, Credit Card, Mobile Payment',
            description: 'Premium bakery in Vientiane, Laos offering fresh baked goods, custom cakes, pastries, and desserts.',
            sameAs: [
              'https://wa.me/8562055221214',
              'https://www.tiktok.com/@bakeryhouse78',
              'https://bakery-house.org',
            ],
            foundingDate: '2024-10-10',
          }),
        },
      ],
    },
  },
  ssr: false,
  router: {
    options: {
      strict: false,
    },
  },
  // Sitemap Configuration for Laos SEO
  site: {
    url: 'https://bakery-house.org',
  },
  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
});
