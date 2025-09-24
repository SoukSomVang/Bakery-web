import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyA-mTuHs5LPPthtSn5jFOe0hOQVpBI1Sj0",
  authDomain: "bakery-house-f7e32.firebaseapp.com",
  projectId: "bakery-house-f7e32",
  storageBucket: "bakery-house-f7e32.appspot.com",
  messagingSenderId: "617557360769",
  appId: "1:617557360769:web:b47a7378ac07ae9e940d80",
  measurementId: "G-SN3VG7L5XX"
}

console.log('🔧 Initializing Firebase with config:', firebaseConfig)
const app = initializeApp(firebaseConfig)
console.log('🔧 Firebase app initialized:', app ? 'success' : 'failed')

// Initialize Auth with error handling
let auth = null
try {
  auth = getAuth(app)
  console.log('✅ Firebase Auth initialized successfully')
} catch (error) {
  console.error('❌ Auth initialization failed:', error)
  console.error('Please ensure Authentication is enabled in your Firebase Console')
}
export { auth }

// Initialize Firestore with error handling
let db = null
try {
  db = getFirestore(app)
  console.log('✅ Firestore initialized successfully')
  console.log('📊 Database object:', db)
  console.log('📊 Database app:', db.app)
  console.log('📊 Database type:', db.type)
} catch (error) {
  console.error('❌ Firestore initialization failed:', error)
  console.error('Error details:', error.message)
  console.error('Error code:', error.code)
  console.error('Please ensure Firestore is enabled in your Firebase Console')
  console.error('Visit: https://console.firebase.google.com/project/bakery-house-f7e32/firestore')

  // Set a flag so we know initialization failed
  db = null
}
export { db }

// Initialize Storage with error handling
let storage = null
try {
  storage = getStorage(app)
  console.log('✅ Firebase Storage initialized successfully')
  console.log('📁 Storage bucket:', storage.app.options.storageBucket)
} catch (error) {
  console.error('❌ Storage initialization failed:', error)
  console.error('Please ensure Storage is enabled in your Firebase Console')
  console.error('Visit: https://console.firebase.google.com/project/bakery-house-f7e32/storage')
}
export { storage }

// Initialize analytics only in browser environment
let analytics = null
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app)
  } catch (error) {
    console.warn('Analytics initialization failed:', error)
  }
}
export { analytics }

export default app