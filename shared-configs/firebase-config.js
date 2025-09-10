import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyA-mTuHs5LPPthtSn5jFOe0hOQVpBI1Sj0",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "bakery-house-f7e32.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "bakery-house-f7e32",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "bakery-house-f7e32.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "617557360769",
  appId: process.env.FIREBASE_APP_ID || "1:617557360769:web:b47a7378ac07ae9e940d80",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-SN3VG7L5XX"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const analytics = getAnalytics(app)
export default app