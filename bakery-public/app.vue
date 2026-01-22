<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// SEO Meta Tags - Ensures proper indexing by Google
useSeoMeta({
  title: 'BakeryHouse - Fresh Baked Goods Daily in Vientiane, Laos',
  description: 'BakeryHouse - Premium bakery in Vientiane, Laos offering fresh baked goods, custom cakes, pastries, and desserts. Best bakery in Laos for weddings, birthdays, and special occasions. Order online for pickup or delivery in Vientiane.',
  ogTitle: 'BakeryHouse - Fresh Baked Goods Daily in Vientiane, Laos',
  ogDescription: 'Premium bakery in Vientiane, Laos offering fresh baked goods, custom cakes, pastries, and desserts. Best bakery in Laos for weddings, birthdays, and special occasions.',
  ogImage: 'https://bakery-house.org/icon-512.png',
  ogUrl: 'https://bakery-house.org',
  twitterCard: 'summary_large_image',
  twitterTitle: 'BakeryHouse - Fresh Baked Goods Daily in Vientiane, Laos',
  twitterDescription: 'Premium bakery in Vientiane, Laos offering fresh baked goods, custom cakes, pastries, and desserts.',
  twitterImage: 'https://bakery-house.org/icon-512.png',
})

// Global error handler for iOS debugging
if (import.meta.client) {
  // Catch and log all errors
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error)
    console.error('Error message:', event.message)
    console.error('Error filename:', event.filename)
    console.error('Error line:', event.lineno)
  })

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
  })

  console.log('🚀 App initialized on client')
  console.log('User Agent:', navigator.userAgent)
  console.log('Platform:', navigator.platform)
}
</script>
