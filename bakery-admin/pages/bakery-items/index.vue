<template>
  <div>
    <AdminHeader 
      title="Bakery Items" 
      subtitle="Manage your bakery products by category"
      :loading="loading"
      @refresh="refreshData"
    />
    
    <div class="p-6">
      <!-- Filter and Actions -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div class="flex items-center space-x-4">
          <select v-model="selectedType" class="form-input max-w-xs">
            <option value="">All Types</option>
            <option v-for="type in bakeryTypes" :key="type" :value="type">{{ type }}</option>
          </select>
          <button @click="clearFilter" class="btn-secondary">Clear Filter</button>
        </div>
        
        <NuxtLink to="/bakery-items/create" class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
          </svg>
          Add New Item
        </NuxtLink>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <!-- Items by Type -->
      <div v-if="!loading && filteredItems.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m6-6h4m-4 0v6"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No items found</h3>
        <p class="text-gray-500 mb-4">{{ selectedType ? `No ${selectedType.toLowerCase()} items found.` : 'No bakery items found.' }}</p>
        <NuxtLink to="/bakery-items/create" class="btn-primary">Add Your First Item</NuxtLink>
      </div>

      <!-- Items Grid -->
      <div v-else-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="item in filteredItems" :key="item.id" class="card hover:shadow-lg transition-shadow">
          <div class="aspect-w-16 aspect-h-9 mb-4">
            <img 
              v-if="item.imageUrl" 
              :src="item.imageUrl" 
              :alt="item.name"
              class="w-full h-48 object-cover rounded-lg"
            />
            <div v-else class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-gray-900 truncate">{{ item.name }}</h3>
              <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {{ item.type }}
              </span>
            </div>
            
            <p class="text-sm text-gray-600 line-clamp-2">{{ item.description || 'No description' }}</p>
            
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-green-600">${{ item.price || '0.00' }}</span>
              <span class="text-sm text-gray-500">Stock: {{ item.stock || 0 }}</span>
            </div>
            
            <div class="flex items-center justify-between pt-3 border-t">
              <span class="text-xs text-gray-500">{{ formatDate(item.createdAt) }}</span>
              <div class="flex space-x-2">
                <NuxtLink 
                  :to="`/bakery-items/edit/${item.id}`" 
                  class="text-blue-600 hover:text-blue-800"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>
                </NuxtLink>
                <button 
                  @click="deleteItem(item)"
                  class="text-red-600 hover:text-red-800"
                  :disabled="loading"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd"></path>
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9.586 12l-3.293 3.293a1 1 0 101.414 1.414L10 13.414l2.293 2.293a1 1 0 001.414-1.414L11.414 12l2.293-2.293z" clip-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete "{{ itemToDelete?.name }}"? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button @click="showDeleteModal = false" class="btn-secondary">Cancel</button>
          <button @click="confirmDelete" class="btn-danger" :disabled="loading">
            {{ loading ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const bakeryStore = useBakeryStore()
const { bakeryItems, bakeryTypes, loading, error } = storeToRefs(bakeryStore)

// State
const selectedType = ref('')
const showDeleteModal = ref(false)
const itemToDelete = ref(null)

// Computed
const filteredItems = computed(() => {
  if (!selectedType.value) return bakeryItems.value
  return bakeryItems.value.filter(item => item.type === selectedType.value)
})

// Methods
const clearFilter = () => {
  selectedType.value = ''
}

const deleteItem = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (itemToDelete.value) {
    try {
      await bakeryStore.deleteBakeryItem(itemToDelete.value.id)
      showDeleteModal.value = false
      itemToDelete.value = null
    } catch (err) {
      console.error('Failed to delete item:', err)
    }
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const refreshData = () => {
  bakeryStore.fetchBakeryItems()
}

// Load data on mount
onMounted(() => {
  refreshData()
})
</script>