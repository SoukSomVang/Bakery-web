export default defineNuxtPlugin(() => {
  console.log('🔧 Firebase Plugin Loading (Client-Side Only)...')

  // Only initialize on client side to avoid SSR issues
  if (process.client) {
    try {
      const { initializeApp } = require('firebase/app')
      const { getAuth } = require('firebase/auth')
      const { getFirestore } = require('firebase/firestore')
      const { getStorage } = require('firebase/storage')

      const firebaseConfig = {
        apiKey: "AIzaSyA-mTuHs5LPPthtSn5jFOe0hOQVpBI1Sj0",
        authDomain: "bakery-house-f7e32.firebaseapp.com",
        projectId: "bakery-house-f7e32",
        storageBucket: "bakery-house-f7e32.appspot.com",
        messagingSenderId: "617557360769",
        appId: "1:617557360769:web:b47a7378ac07ae9e940d80",
        measurementId: "G-SN3VG7L5XX"
      }

      console.log('🔄 Initializing Firebase (Client-Only)...')
      const app = initializeApp(firebaseConfig)

      const auth = getAuth(app)
      const db = getFirestore(app)
      const storage = getStorage(app)

      console.log('✅ Client-side Firebase initialized')
      console.log('✅ Auth:', !!auth)
      console.log('✅ Database:', !!db)
      console.log('✅ Storage:', !!storage)

      return {
        provide: {
          firebaseAuth: auth,
          firebaseDb: db,
          firebaseStorage: storage
        }
      }
    } catch (error) {
      console.error('❌ Client Firebase Error:', error)
      return {
        provide: {
          firebaseAuth: null,
          firebaseDb: null,
          firebaseStorage: null
        }
      }
    }
  }

  // Return null providers for SSR
  return {
    provide: {
      firebaseAuth: null,
      firebaseDb: null,
      firebaseStorage: null
    }
  }
})