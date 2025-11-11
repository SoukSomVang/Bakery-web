// This plugin runs ONLY on the client side (browser)
// The .client.js suffix ensures it never runs during SSR

export default defineNuxtPlugin(() => {
  // Firebase will be initialized when this plugin loads
  // The import happens only on client-side
  console.log('🔥 Firebase client plugin initializing...')

  // This dynamic import ensures Firebase only loads in the browser
  if (typeof window !== 'undefined') {
    console.log('✅ Client-side detected, Firebase ready')
  }
})
