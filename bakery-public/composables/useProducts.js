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

export const useProducts = () => {
  const { $db } = useNuxtApp()

  // Check if Firestore is available
  const checkFirestore = () => {
    if (!$db) {
      throw new Error('Firestore is not available. Please enable Firestore in Firebase Console.')
    }
  }

  // Products CRUD (Read-only for public)
  const getProducts = async () => {
    try {
      checkFirestore()
      const querySnapshot = await getDocs(collection($db, 'products'))
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error getting products:', error)
      throw error
    }
  }

  const getProductsByCategory = async (category) => {
    try {
      checkFirestore()
      const q = query(collection($db, 'products'), where('category', '==', category))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error getting products by category:', error)
      throw error
    }
  }

  const getProductById = async (id) => {
    try {
      checkFirestore()
      const docRef = doc($db, 'products', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        throw new Error('Product not found')
      }
    } catch (error) {
      console.error('Error getting product:', error)
      throw error
    }
  }

  // Categories CRUD (Read-only for public)
  const getCategories = async () => {
    try {
      checkFirestore()
      const querySnapshot = await getDocs(collection($db, 'categories'))
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error getting categories:', error)
      throw error
    }
  }

  const getCategoryById = async (id) => {
    try {
      checkFirestore()
      const docRef = doc($db, 'categories', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        throw new Error('Category not found')
      }
    } catch (error) {
      console.error('Error getting category:', error)
      throw error
    }
  }

  // Get featured products (products marked as featured)
  const getFeaturedProducts = async () => {
    try {
      checkFirestore()
      const q = query(collection($db, 'products'), where('featured', '==', true))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error getting featured products:', error)
      throw error
    }
  }

  // Real-time listeners
  const subscribeToProducts = (callback, category = null) => {
    let q = collection($db, 'products')

    if (category) {
      q = query(q, where('category', '==', category))
    }

    return onSnapshot(q, (querySnapshot) => {
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      callback(products)
    })
  }

  const subscribeToCategories = (callback) => {
    const q = collection($db, 'categories')

    return onSnapshot(q, (querySnapshot) => {
      const categories = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      callback(categories)
    })
  }

  return {
    // Products
    getProducts,
    getProductsByCategory,
    getProductById,
    getFeaturedProducts,

    // Categories
    getCategories,
    getCategoryById,

    // Real-time subscriptions
    subscribeToProducts,
    subscribeToCategories
  }
}