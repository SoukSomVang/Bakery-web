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

export const useFirebase = () => {
  const { $db, $storage } = useNuxtApp()

  // Bakery Items CRUD
  const getBakeryItems = async () => {
    try {
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

  // File Upload
  const uploadImage = async (file, path) => {
    try {
      const imageRef = storageRef($storage, `images/${path}/${file.name}`)
      const snapshot = await uploadBytes(imageRef, file)
      return await getDownloadURL(snapshot.ref)
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
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
    
    // File Management
    uploadImage,
    deleteImage
  }
}