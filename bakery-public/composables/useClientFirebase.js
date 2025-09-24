import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

let clientFirebaseInitialized = false
let clientDb = null
let clientAuth = null
let clientStorage = null

export const useClientFirebase = () => {
  if (process.server) {
    return {
      db: null,
      auth: null,
      storage: null
    }
  }

  if (!clientFirebaseInitialized && process.client) {
    try {
      const firebaseConfig = {
        apiKey: "AIzaSyA-mTuHs5LPPthtSn5jFOe0hOQVpBI1Sj0",
        authDomain: "bakery-house-f7e32.firebaseapp.com",
        projectId: "bakery-house-f7e32",
        storageBucket: "bakery-house-f7e32.appspot.com",
        messagingSenderId: "617557360769",
        appId: "1:617557360769:web:b47a7378ac07ae9e940d80",
        measurementId: "G-SN3VG7L5XX"
      }

      console.log('🔄 PUBLIC: Initializing Client Firebase...')
      const app = initializeApp(firebaseConfig)

      clientAuth = getAuth(app)
      clientDb = getFirestore(app)
      clientStorage = getStorage(app)

      clientFirebaseInitialized = true
      console.log('✅ PUBLIC: Client Firebase initialized successfully')
      console.log('✅ PUBLIC: Auth:', !!clientAuth)
      console.log('✅ PUBLIC: Database:', !!clientDb)
      console.log('✅ PUBLIC: Storage:', !!clientStorage)

    } catch (error) {
      console.error('❌ PUBLIC: Client Firebase initialization failed:', error)
    }
  }

  return {
    db: clientDb,
    auth: clientAuth,
    storage: clientStorage
  }
}