import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore'
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

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

// Global Firebase instances
let firebaseApp = null
let firestoreDb = null
let firebaseStorage = null

const getFirebaseInstances = () => {
  if (!firebaseApp) {
    try {
      console.log('🔧 Initializing Firebase in useFirebase...')
      console.log('🔧 Config:', firebaseConfig)

      firebaseApp = initializeApp(firebaseConfig)
      firestoreDb = getFirestore(firebaseApp)
      firebaseStorage = getStorage(firebaseApp)

      console.log('✅ Firebase app initialized:', !!firebaseApp)
      console.log('✅ Firestore initialized:', !!firestoreDb)
      console.log('✅ Storage initialized:', !!firebaseStorage)
    } catch (error) {
      console.error('❌ Firebase initialization failed in useFirebase:', error)
      return { db: null, storage: null }
    }
  }

  return {
    db: firestoreDb,
    storage: firebaseStorage
  }
}

export const useFirebase = () => {
  console.log('🔧 useFirebase called')

  // Get Firebase instances
  const { db, storage } = getFirebaseInstances()

  // Debug database initialization
  console.log('📊 Database check:', !!db)
  console.log('📊 Storage check:', !!storage)

  if (!db) {
    console.error('❌ Firebase Database is not initialized in useFirebase')
    console.error('Please check the Firebase configuration')
  } else {
    console.log('✅ Firebase Database found in useFirebase')
  }

  const $db = db
  const $storage = storage

  // Bakery Items CRUD
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

  const addBakeryItem = async (item) => {
    try {
      if (!$db) {
        throw new Error('Firebase Database is not initialized. Please check your Firebase configuration.')
      }
      const docRef = await addDoc(collection($db, 'bakeryItems'), {
        ...item,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding bakery item:', error)
      throw error
    }
  }

  const updateBakeryItem = async (id, item) => {
    try {
      const docRef = doc($db, 'bakeryItems', id)
      await updateDoc(docRef, {
        ...item,
        updatedAt: new Date()
      })
    } catch (error) {
      console.error('Error updating bakery item:', error)
      throw error
    }
  }

  const deleteBakeryItem = async (id) => {
    try {
      await deleteDoc(doc($db, 'bakeryItems', id))
    } catch (error) {
      console.error('Error deleting bakery item:', error)
      throw error
    }
  }

  // Storage Data CRUD
  const getStorageData = async () => {
    try {
      const querySnapshot = await getDocs(collection($db, 'storageData'))
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error getting storage data:', error)
      throw error
    }
  }

  const addStorageData = async (data) => {
    try {
      const docRef = await addDoc(collection($db, 'storageData'), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding storage data:', error)
      throw error
    }
  }

  const updateStorageData = async (id, data) => {
    try {
      const docRef = doc($db, 'storageData', id)
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      })
    } catch (error) {
      console.error('Error updating storage data:', error)
      throw error
    }
  }

  const deleteStorageData = async (id) => {
    try {
      await deleteDoc(doc($db, 'storageData', id))
    } catch (error) {
      console.error('Error deleting storage data:', error)
      throw error
    }
  }

  // Branches CRUD
  const getBranches = async () => {
    try {
      const querySnapshot = await getDocs(collection($db, 'branches'))
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('Error getting branches:', error)
      throw error
    }
  }

  const addBranch = async (branch) => {
    try {
      const docRef = await addDoc(collection($db, 'branches'), {
        ...branch,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding branch:', error)
      throw error
    }
  }

  const updateBranch = async (id, branch) => {
    try {
      const docRef = doc($db, 'branches', id)
      await updateDoc(docRef, {
        ...branch,
        updatedAt: new Date()
      })
    } catch (error) {
      console.error('Error updating branch:', error)
      throw error
    }
  }

  const deleteBranch = async (id) => {
    try {
      await deleteDoc(doc($db, 'branches', id))
    } catch (error) {
      console.error('Error deleting branch:', error)
      throw error
    }
  }

  // Bakeries CRUD
  const getBakeries = async () => {
    try {
      const querySnapshot = await getDocs(collection($db, 'bakeries'))
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
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        throw new Error('Bakery not found')
      }
    } catch (error) {
      console.error('Error getting bakery:', error)
      throw error
    }
  }

  const addBakery = async (bakery) => {
    try {
      const docRef = await addDoc(collection($db, 'bakeries'), {
        ...bakery,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding bakery:', error)
      throw error
    }
  }

  const updateBakery = async (id, bakery) => {
    try {
      const docRef = doc($db, 'bakeries', id)
      await updateDoc(docRef, {
        ...bakery,
        updatedAt: new Date()
      })
    } catch (error) {
      console.error('Error updating bakery:', error)
      throw error
    }
  }

  const deleteBakery = async (id) => {
    try {
      await deleteDoc(doc($db, 'bakeries', id))
    } catch (error) {
      console.error('Error deleting bakery:', error)
      throw error
    }
  }

  // File Upload
  const uploadImage = async (file, path) => {
    try {
      // Check if storage is available
      if (!$storage) {
        console.warn('Firebase Storage is not initialized. Skipping image upload.')
        // Return a placeholder URL or null - this allows the form to work without storage
        return 'https://via.placeholder.com/400x300?text=Image+Not+Uploaded'
      }

      // Check if file is valid
      if (!file) {
        throw new Error('No file provided for upload.')
      }

      // Create storage reference
      const imageRef = storageRef($storage, `images/${path}/${file.name}`)

      // Upload file
      const snapshot = await uploadBytes(imageRef, file)

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref)
      return downloadURL
    } catch (error) {
      console.error('Error uploading image:', error)
      // If storage fails, return placeholder instead of throwing error
      console.warn('Image upload failed, using placeholder image.')
      return 'https://via.placeholder.com/400x300?text=Upload+Failed'
    }
  }

  const deleteImage = async (url) => {
    try {
      const imageRef = storageRef($storage, url)
      await deleteObject(imageRef)
    } catch (error) {
      console.error('Error deleting image:', error)
      throw error
    }
  }

  return {
    // Bakery Items
    getBakeryItems,
    getBakeryItemsByType,
    addBakeryItem,
    updateBakeryItem,
    deleteBakeryItem,
    
    // Storage Data
    getStorageData,
    addStorageData,
    updateStorageData,
    deleteStorageData,
    
    // Branches
    getBranches,
    addBranch,
    updateBranch,
    deleteBranch,
    
    // Bakeries
    getBakeries,
    getBakeryById,
    addBakery,
    updateBakery,
    deleteBakery,
    
    // File Management
    uploadImage,
    deleteImage
  }
}