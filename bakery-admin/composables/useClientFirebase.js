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
        apiKey: "AIzaSyDaMUzqQ_HLNI2yrzFAgioucAZ2ipAmXH8",
        authDomain: "bakery-house-bf7a5.firebaseapp.com",
        projectId: "bakery-house-bf7a5",
        storageBucket: "bakery-house-bf7a5.appspot.com",
        messagingSenderId: "433307387606",
        appId: "1:433307387606:web:b47a7378ac07ae9e940d80",
        measurementId: "G-5X6YLGVP1Z"
      }

      console.log('🔄 Initializing Client Firebase...')
      const app = initializeApp(firebaseConfig)

      clientAuth = getAuth(app)
      clientDb = getFirestore(app)
      clientStorage = getStorage(app)

      clientFirebaseInitialized = true
      console.log('✅ Client Firebase initialized successfully')
      console.log('✅ Auth:', !!clientAuth)
      console.log('✅ Database:', !!clientDb)
      console.log('✅ Storage:', !!clientStorage)

    } catch (error) {
      console.error('❌ Client Firebase initialization failed:', error)
    }
  }

  return {
    db: clientDb,
    auth: clientAuth,
    storage: clientStorage
  }
}