export const useBakeryStore = defineStore('bakery', {
  state: () => ({
    bakeryItems: [],
    storageData: [],
    branches: [],
    bakeries: [],
    bakeryTypes: [],
    news: [],
    loading: false,
    error: null
  }),

  getters: {
    getBakeryItemsByType: (state) => (type) => {
      return state.bakeryItems.filter(item => item.type === type)
    },
    
    getBakeryItemById: (state) => (id) => {
      return state.bakeryItems.find(item => item.id === id)
    },
    
    getBranchById: (state) => (id) => {
      return state.branches.find(branch => branch.id === id)
    },
    
    getStorageDataById: (state) => (id) => {
      return state.storageData.find(data => data.id === id)
    },
    
    getBakeryById: (state) => (id) => {
      return state.bakeries.find(bakery => bakery.id === id)
    },

    getBakeryTypeById: (state) => (id) => {
      return state.bakeryTypes.find(type => type.id === id)
    },

    // Get type names for dropdowns
    bakeryTypeNames: (state) => {
      return state.bakeryTypes.map(type => type.name)
    },

    getNewsById: (state) => (id) => {
      return state.news.find(item => item.id === id)
    }
  },

  actions: {
    setLoading(loading) {
      this.loading = loading
    },

    setError(error) {
      this.error = error
    },

    // Bakery Items Actions
    async fetchBakeryItems() {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { getBakeryItems } = useFirebase()
        this.bakeryItems = await getBakeryItems()
      } catch (error) {
        this.setError('Failed to fetch bakery items')
        console.error('Error fetching bakery items:', error)
      } finally {
        this.setLoading(false)
      }
    },

    async addBakeryItem(item) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { addBakeryItem } = useFirebase()
        const id = await addBakeryItem(item)
        
        // Add to local state
        this.bakeryItems.push({ id, ...item, createdAt: new Date(), updatedAt: new Date() })
        return id
      } catch (error) {
        this.setError('Failed to add bakery item')
        console.error('Error adding bakery item:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async updateBakeryItem(id, item) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { updateBakeryItem } = useFirebase()
        await updateBakeryItem(id, item)
        
        // Update local state
        const index = this.bakeryItems.findIndex(i => i.id === id)
        if (index !== -1) {
          this.bakeryItems[index] = { ...this.bakeryItems[index], ...item, updatedAt: new Date() }
        }
      } catch (error) {
        this.setError('Failed to update bakery item')
        console.error('Error updating bakery item:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async deleteBakeryItem(id) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { deleteBakeryItem } = useFirebase()
        await deleteBakeryItem(id)
        
        // Remove from local state
        this.bakeryItems = this.bakeryItems.filter(item => item.id !== id)
      } catch (error) {
        this.setError('Failed to delete bakery item')
        console.error('Error deleting bakery item:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    // Storage Data Actions
    async fetchStorageData() {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { getStorageData } = useFirebase()
        this.storageData = await getStorageData()
      } catch (error) {
        this.setError('Failed to fetch storage data')
        console.error('Error fetching storage data:', error)
      } finally {
        this.setLoading(false)
      }
    },

    async addStorageData(data) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { addStorageData } = useFirebase()
        const id = await addStorageData(data)
        
        // Add to local state
        this.storageData.push({ id, ...data, createdAt: new Date(), updatedAt: new Date() })
        return id
      } catch (error) {
        this.setError('Failed to add storage data')
        console.error('Error adding storage data:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async updateStorageData(id, data) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { updateStorageData } = useFirebase()
        await updateStorageData(id, data)
        
        // Update local state
        const index = this.storageData.findIndex(d => d.id === id)
        if (index !== -1) {
          this.storageData[index] = { ...this.storageData[index], ...data, updatedAt: new Date() }
        }
      } catch (error) {
        this.setError('Failed to update storage data')
        console.error('Error updating storage data:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async deleteStorageData(id) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { deleteStorageData } = useFirebase()
        await deleteStorageData(id)
        
        // Remove from local state
        this.storageData = this.storageData.filter(data => data.id !== id)
      } catch (error) {
        this.setError('Failed to delete storage data')
        console.error('Error deleting storage data:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    // Branch Actions
    async fetchBranches() {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { getBranches } = useFirebase()
        this.branches = await getBranches()
      } catch (error) {
        this.setError('Failed to fetch branches')
        console.error('Error fetching branches:', error)
      } finally {
        this.setLoading(false)
      }
    },

    async addBranch(branch) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { addBranch } = useFirebase()
        const id = await addBranch(branch)
        
        // Add to local state
        this.branches.push({ id, ...branch, createdAt: new Date(), updatedAt: new Date() })
        return id
      } catch (error) {
        this.setError('Failed to add branch')
        console.error('Error adding branch:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async updateBranch(id, branch) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { updateBranch } = useFirebase()
        await updateBranch(id, branch)
        
        // Update local state
        const index = this.branches.findIndex(b => b.id === id)
        if (index !== -1) {
          this.branches[index] = { ...this.branches[index], ...branch, updatedAt: new Date() }
        }
      } catch (error) {
        this.setError('Failed to update branch')
        console.error('Error updating branch:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async deleteBranch(id) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { deleteBranch } = useFirebase()
        await deleteBranch(id)
        
        // Remove from local state
        this.branches = this.branches.filter(branch => branch.id !== id)
      } catch (error) {
        this.setError('Failed to delete branch')
        console.error('Error deleting branch:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    // Bakery Actions
    async fetchBakeries() {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { getBakeries } = useFirebase()
        this.bakeries = await getBakeries()
      } catch (error) {
        this.setError('Failed to fetch bakeries')
        console.error('Error fetching bakeries:', error)
      } finally {
        this.setLoading(false)
      }
    },

    async addBakery(bakery) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { addBakery } = useFirebase()
        const id = await addBakery(bakery)
        
        // Add to local state
        this.bakeries.push({ id, ...bakery, createdAt: new Date(), updatedAt: new Date() })
        return id
      } catch (error) {
        this.setError('Failed to add bakery')
        console.error('Error adding bakery:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async updateBakery(id, bakery) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { updateBakery } = useFirebase()
        await updateBakery(id, bakery)
        
        // Update local state
        const index = this.bakeries.findIndex(b => b.id === id)
        if (index !== -1) {
          this.bakeries[index] = { ...this.bakeries[index], ...bakery, updatedAt: new Date() }
        }
      } catch (error) {
        this.setError('Failed to update bakery')
        console.error('Error updating bakery:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async deleteBakery(id) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { deleteBakery } = useFirebase()
        await deleteBakery(id)
        
        // Remove from local state
        this.bakeries = this.bakeries.filter(bakery => bakery.id !== id)
      } catch (error) {
        this.setError('Failed to delete bakery')
        console.error('Error deleting bakery:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    // Bakery Types Actions
    async fetchBakeryTypes() {
      this.setLoading(true)
      this.setError(null)

      try {
        const { getBakeryTypes } = useFirebase()
        this.bakeryTypes = await getBakeryTypes()
      } catch (error) {
        this.setError('Failed to fetch bakery types')
        console.error('Error fetching bakery types:', error)
      } finally {
        this.setLoading(false)
      }
    },

    async addBakeryType(type) {
      this.setLoading(true)
      this.setError(null)

      try {
        const { addBakeryType } = useFirebase()
        const id = await addBakeryType(type)

        // Add to local state
        this.bakeryTypes.push({ id, ...type, createdAt: new Date(), updatedAt: new Date() })
        return id
      } catch (error) {
        this.setError('Failed to add bakery type')
        console.error('Error adding bakery type:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async updateBakeryType(id, type) {
      this.setLoading(true)
      this.setError(null)

      try {
        const { updateBakeryType } = useFirebase()
        await updateBakeryType(id, type)

        // Update local state
        const index = this.bakeryTypes.findIndex(t => t.id === id)
        if (index !== -1) {
          this.bakeryTypes[index] = { ...this.bakeryTypes[index], ...type, updatedAt: new Date() }
        }
      } catch (error) {
        this.setError('Failed to update bakery type')
        console.error('Error updating bakery type:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async deleteBakeryType(id) {
      this.setLoading(true)
      this.setError(null)

      try {
        const { deleteBakeryType } = useFirebase()
        await deleteBakeryType(id)

        // Remove from local state
        this.bakeryTypes = this.bakeryTypes.filter(type => type.id !== id)
      } catch (error) {
        this.setError('Failed to delete bakery type')
        console.error('Error deleting bakery type:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    // News Actions
    async fetchNews() {
      this.setLoading(true)
      this.setError(null)

      try {
        const { getNews } = useFirebase()
        this.news = await getNews()
      } catch (error) {
        this.setError('Failed to fetch news')
        console.error('Error fetching news:', error)
      } finally {
        this.setLoading(false)
      }
    },

    async addNews(newsItem) {
      this.setLoading(true)
      this.setError(null)

      try {
        const { addNews } = useFirebase()
        const id = await addNews(newsItem)

        // Add to local state
        this.news.push({ id, ...newsItem, createdAt: new Date(), updatedAt: new Date() })
        return id
      } catch (error) {
        this.setError('Failed to add news')
        console.error('Error adding news:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async updateNews(id, newsItem) {
      this.setLoading(true)
      this.setError(null)

      try {
        const { updateNews } = useFirebase()
        await updateNews(id, newsItem)

        // Update local state
        const index = this.news.findIndex(n => n.id === id)
        if (index !== -1) {
          this.news[index] = { ...this.news[index], ...newsItem, updatedAt: new Date() }
        }
      } catch (error) {
        this.setError('Failed to update news')
        console.error('Error updating news:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async deleteNews(id) {
      this.setLoading(true)
      this.setError(null)

      try {
        const { deleteNews } = useFirebase()
        await deleteNews(id)

        // Remove from local state
        this.news = this.news.filter(item => item.id !== id)
      } catch (error) {
        this.setError('Failed to delete news')
        console.error('Error deleting news:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    }
  }
})