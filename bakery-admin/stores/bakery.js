export const useBakeryStore = defineStore('bakery', {
  state: () => ({
    bakeryItems: [],
    storageData: [],
    branches: [],
    loading: false,
    error: null,
    bakeryTypes: [
      'Cake',
      'Bread',
      'Pastry', 
      'Cookie',
      'Muffin',
      'Croissant',
      'Donut',
      'Pie',
      'Tart',
      'Other'
    ]
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
    }
  }
})