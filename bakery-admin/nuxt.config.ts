// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: true,
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  css: [
    '~/assets/css/admin-icons.css'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/main.css'
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID
    }
  }
})
