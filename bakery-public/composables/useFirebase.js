import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Initialize Firebase directly in the composable
const firebaseConfig = {
  apiKey: "AIzaSyA-mTuHs5LPPthtSn5jFOe0hOQVpBI1Sj0",
  authDomain: "bakery-house-f7e32.firebaseapp.com",
  projectId: "bakery-house-f7e32",
  storageBucket: "bakery-house-f7e32.appspot.com",
  messagingSenderId: "617557360769",
  appId: "1:617557360769:web:b47a7378ac07ae9e940d80",
  measurementId: "G-SN3VG7L5XX"
}

let firebaseApp = null
let $db = null

const initializeFirebase = () => {
  if (!firebaseApp) {
    try {
      console.log('🔧 Initializing Firebase in public useFirebase...')
      firebaseApp = initializeApp(firebaseConfig)
      $db = getFirestore(firebaseApp)
      console.log('✅ Firebase initialized successfully in public useFirebase')
    } catch (error) {
      console.error('❌ Firebase initialization failed in public useFirebase:', error)
    }
  }
  return { $db }
}

export const useFirebase = () => {
  // Initialize Firebase when composable is used
  const { $db: db } = initializeFirebase()

  // Debug database initialization
  if (!db) {
    console.error('❌ Firebase Database is not initialized in public useFirebase')
    console.error('Please check the Firebase configuration')
  } else {
    console.log('✅ Firebase Database found in public useFirebase')
  }

  const $db = db

  // Bakery Items CRUD (Read-only for public)
  const getBakeryItems = async () => {
    try {
      if (!$db) {
        throw new Error('Firebase Database is not initialized. Please check your Firebase configuration.')
      }
      const querySnapshot = await getDocs(collection($db, 'bakeryItems'))
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error getting bakery items:', error)
      throw error
    }
  }

  const getBakeryItemsByType = async (type) => {
    try {
      const q = query(collection($db, 'bakeryItems'), where('type', '==', type))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error getting bakery items by type:', error)
      throw error
    }
  }

  const getBakeryItemById = async (id) => {
    try {
      const docRef = doc($db, 'bakeryItems', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        throw new Error('Bakery item not found')
      }
    } catch (error) {
      console.error('Error getting bakery item:', error)
      throw error
    }
  }

  // Branches CRUD (Read-only for public)
  const getBranches = async () => {
    try {
      const querySnapshot = await getDocs(collection($db, 'branches'))
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error getting branches:', error)
      throw error
    }
  }

  const getBranchById = async (id) => {
    try {
      const docRef = doc($db, 'branches', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        throw new Error('Branch not found')
      }
    } catch (error) {
      console.error('Error getting branch:', error)
      throw error
    }
  }

  // Bakeries CRUD (Read-only for public)
  const getBakeries = async () => {
    try {
      const q = query(
        collection($db, 'bakeries'), 
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error getting bakeries:', error)
      throw error
    }
  }

  const getBakeryById = async (id) => {
    try {
      const docRef = doc($db, 'bakeries', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists() && docSnap.data().isActive) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        throw new Error('Bakery not found or inactive')
      }
    } catch (error) {
      console.error('Error getting bakery:', error)
      throw error
    }
  }

  // Real-time listeners
  const subscribeToBakeries = (callback) => {
    const q = query(
      collection($db, 'bakeries'), 
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    )
    
    return onSnapshot(q, (querySnapshot) => {
      const bakeries = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }))
      callback(bakeries)
    })
  }

  const subscribeToBakeryItems = (callback, type = null) => {
    let q = collection($db, 'bakeryItems')
    
    if (type) {
      q = query(q, where('type', '==', type))
    }
    
    return onSnapshot(q, (querySnapshot) => {
      const items = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }))
      callback(items)
    })
  }

  return {
    // Bakery Items
    getBakeryItems,
    getBakeryItemsByType,
    getBakeryItemById,
    
    // Branches
    getBranches,
    getBranchById,
    
    // Bakeries
    getBakeries,
    getBakeryById,
    
    // Real-time subscriptions
    subscribeToBakeries,
    subscribeToBakeryItems
  }
}