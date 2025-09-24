import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA-mTuHs5LPPthtSn5jFOe0hOQVpBI1Sj0",
  authDomain: "bakery-house-f7e32.firebaseapp.com",
  projectId: "bakery-house-f7e32",
  storageBucket: "bakery-house-f7e32.appspot.com",
  messagingSenderId: "617557360769",
  appId: "1:617557360769:web:b47a7378ac07ae9e940d80",
  measurementId: "G-SN3VG7L5XX"
}

console.log('🔄 Initializing Firebase (New Config)...')

// Initialize Firebase
const app = initializeApp(firebaseConfig)
console.log('✅ Firebase App:', app.name)

// Initialize services
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

console.log('✅ Auth initialized:', !!auth)
console.log('✅ Database initialized:', !!db)
console.log('✅ Storage initialized:', !!storage)

// Export everything
export { auth, db, storage }
export default app