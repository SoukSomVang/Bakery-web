import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot
} from 'firebase/firestore'

export const useNews = () => {
  // Check if Firestore is available
  const checkFirestore = (db) => {
    if (!db) {
      console.error('PUBLIC: Firestore is not available from useClientFirebase')
      throw new Error('PUBLIC: Firestore is not available. Please enable Firestore in Firebase Console.')
    }
    console.log('✅ PUBLIC: Firestore is available:', !!db)
  }

  // Get all published news
  const getNews = async () => {
    try {
      const { db } = useClientFirebase()
      checkFirestore(db)
      const q = query(
        collection(db, 'news'),
        where('isPublished', '==', true),
        orderBy('publishedAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('PUBLIC: Error getting news:', error)
      throw error
    }
  }

  // Get latest news with limit
  const getLatestNews = async (limitCount = 3) => {
    try {
      const { db } = useClientFirebase()
      checkFirestore(db)
      const q = query(
        collection(db, 'news'),
        where('isPublished', '==', true),
        orderBy('publishedAt', 'desc'),
        limit(limitCount)
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('PUBLIC: Error getting latest news:', error)
      throw error
    }
  }

  // Get news by ID
  const getNewsById = async (id) => {
    try {
      const { db } = useClientFirebase()
      checkFirestore(db)
      const docRef = doc(db, 'news', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        throw new Error('News not found')
      }
    } catch (error) {
      console.error('PUBLIC: Error getting news:', error)
      throw error
    }
  }

  // Get news by category
  const getNewsByCategory = async (category) => {
    try {
      const { db } = useClientFirebase()
      checkFirestore(db)
      const q = query(
        collection(db, 'news'),
        where('isPublished', '==', true),
        where('category', '==', category),
        orderBy('publishedAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('PUBLIC: Error getting news by category:', error)
      throw error
    }
  }

  // Real-time listener for news
  const subscribeToNews = (callback, limitCount = null) => {
    const { db } = useClientFirebase()
    if (!db) return () => {}

    let q = query(
      collection(db, 'news'),
      where('isPublished', '==', true),
      orderBy('publishedAt', 'desc')
    )

    if (limitCount) {
      q = query(q, limit(limitCount))
    }

    return onSnapshot(q, (querySnapshot) => {
      const news = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      callback(news)
    })
  }

  return {
    getNews,
    getLatestNews,
    getNewsById,
    getNewsByCategory,
    subscribeToNews
  }
}
