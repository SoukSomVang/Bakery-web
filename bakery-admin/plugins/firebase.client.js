import { auth, db, storage } from '../../shared-configs/firebase-config.js'

export default defineNuxtPlugin(() => {
  console.log('🔧 Firebase Plugin Loading...')
  console.log('📊 Auth:', auth ? 'initialized' : 'null')
  console.log('📊 Database:', db ? 'initialized' : 'null')
  console.log('📊 Storage:', storage ? 'initialized' : 'null')

  return {
    provide: {
      auth,
      db,
      storage
    }
  }
})