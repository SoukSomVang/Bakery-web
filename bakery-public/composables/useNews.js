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

      // Try query with index first
      try {
        const q = query(
          collection(db, 'news'),
          where('isPublished', '==', true),
          orderBy('publishedAt', 'desc')
        )
        const querySnapshot = await getDocs(q)
        console.log('✅ PUBLIC: Got all news with publishedAt orderBy:', querySnapshot.size)
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      } catch (indexError) {
        // If index error, fall back to simpler query
        if (indexError.code === 'failed-precondition' || indexError.message.includes('index')) {
          console.warn('⚠️ PUBLIC: Firestore index missing for getNews, using fallback')

          // Fallback: get all published news and sort in memory
          const q = query(
            collection(db, 'news'),
            where('isPublished', '==', true)
          )
          const querySnapshot = await getDocs(q)
          const allNews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

          // Sort by publishedAt or createdAt in memory
          allNews.sort((a, b) => {
            const dateA = a.publishedAt?.toDate?.() || a.createdAt?.toDate?.() || new Date(0)
            const dateB = b.publishedAt?.toDate?.() || b.createdAt?.toDate?.() || new Date(0)
            return dateB - dateA
          })

          console.log('✅ PUBLIC: Got all news with fallback query:', allNews.length)
          return allNews
        }
        throw indexError
      }
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

      // Try query with index first
      try {
        const q = query(
          collection(db, 'news'),
          where('isPublished', '==', true),
          orderBy('publishedAt', 'desc'),
          limit(limitCount)
        )
        const querySnapshot = await getDocs(q)
        console.log('✅ PUBLIC: Got news with publishedAt orderBy:', querySnapshot.size)
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      } catch (indexError) {
        // If index error, fall back to simpler query
        if (indexError.code === 'failed-precondition' || indexError.message.includes('index')) {
          console.warn('⚠️ PUBLIC: Firestore index missing, using fallback query')
          console.warn('Create index at:', indexError.message)

          // Fallback: get all published news and sort in memory
          const q = query(
            collection(db, 'news'),
            where('isPublished', '==', true)
          )
          const querySnapshot = await getDocs(q)
          const allNews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

          // Sort by publishedAt or createdAt in memory
          allNews.sort((a, b) => {
            const dateA = a.publishedAt?.toDate?.() || a.createdAt?.toDate?.() || new Date(0)
            const dateB = b.publishedAt?.toDate?.() || b.createdAt?.toDate?.() || new Date(0)
            return dateB - dateA
          })

          console.log('✅ PUBLIC: Got news with fallback query:', allNews.length)
          return allNews.slice(0, limitCount)
        }
        throw indexError
      }
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
