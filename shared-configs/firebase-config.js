import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
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
let app
try {
  app = initializeApp(firebaseConfig)
  console.log('✅ Firebase app initialized successfully:', app ? 'success' : 'failed')
  console.log('📱 App name:', app.name)
  console.log('📱 App options:', app.options)
} catch (error) {
  console.error('❌ Firebase app initialization failed:', error)
  console.error('Error details:', error.message)
  throw error
}

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
  // Only initialize Firestore in browser environment
  if (typeof window !== 'undefined') {
    db = getFirestore(app)
    console.log('✅ Firestore initialized successfully')
    console.log('📊 Database object:', !!db)
    console.log('📊 Database app:', db.app.name)
    console.log('📊 Database type:', db.type)

    // The database is initialized correctly - any permission errors will occur during operations
    console.log('🔥 Firestore is ready for operations')
  } else {
    console.log('🔧 Server-side rendering - Firestore will be initialized on client')
  }
} catch (error) {
  console.error('❌ Firestore initialization failed:', error)
  console.error('Error details:', error.message)
  console.error('Error code:', error.code)
  console.error('Please ensure Firestore is enabled in your Firebase Console')
  console.error('Visit: https://console.firebase.google.com/project/bakery-house-f7e32/firestore')

  // Set a flag so we know initialization failed
  db = null
}

// Verify database is properly exported
if (db) {
  console.log('✅ Database exported successfully')
} else {
  console.error('❌ Database is null - export failed')
}

export { db }

// Initialize Storage with error handling
let storage = null
try {
  // Only initialize Storage in browser environment
  if (typeof window !== 'undefined') {
    storage = getStorage(app)
    console.log('✅ Firebase Storage initialized successfully')
    console.log('📁 Storage bucket:', storage.app.options.storageBucket)
  } else {
    console.log('🔧 Server-side rendering - Storage will be initialized on client')
  }
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