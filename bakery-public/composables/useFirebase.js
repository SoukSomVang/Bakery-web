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
import { db } from '../../shared-configs/firebase-config.js'

export const useFirebase = () => {
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