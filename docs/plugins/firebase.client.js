import { auth, db, storage, analytics } from '../../shared-configs/firebase-config.js'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      auth,
      db,
      storage,
      analytics
    }
  }
})