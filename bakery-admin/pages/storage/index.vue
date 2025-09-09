<template>
  <div>
    <AdminHeader 
      title="Storage Data" 
      subtitle="Manage inventory and storage records"
      :loading="loading"
      @refresh="refreshData"
    />
    
    <div class="p-6">
      <!-- Actions -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search storage records..."
            class="form-input max-w-xs"
          />
          <button @click="clearSearch" class="btn-secondary">Clear</button>
        </div>
        
        <NuxtLink to="/storage/create" class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
          </svg>
          Add Storage Record
        </NuxtLink>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredStorageData.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No storage records found</h3>
        <p class="text-gray-500 mb-4">{{ searchQuery ? 'No records match your search criteria.' : 'No storage records found.' }}</p>
        <NuxtLink to="/storage/create" class="btn-primary">Add Your First Record</NuxtLink>
      </div>

      <!-- Storage Data Table -->
      <div v-else-if="!loading" class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="record in filteredStorageData" :key="record.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ record.itemName }}</div>
                    <div class="text-sm text-gray-500">{{ record.description || 'No description' }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {{ record.type }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ record.quantity }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ record.unit }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ record.location || 'Not specified' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(record.status)">
                    {{ record.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(record.updatedAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <NuxtLink 
                      :to="`/storage/edit/${record.id}`"
                      class="text-blue-600 hover:text-blue-800"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                      </svg>
                    </NuxtLink>
                    <button 
                      @click="deleteRecord(record)"
                      class="text-red-600 hover:text-red-800"
                      :disabled="loading"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd"></path>
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9.586 12l-3.293 3.293a1 1 0 101.414 1.414L10 13.414l2.293 2.293a1 1 0 001.414-1.414L11.414 12l2.293-2.293z" clip-rule="evenodd"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
          Are you sure you want to delete the storage record for "{{ recordToDelete?.itemName }}"? This action cannot be undone.
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
const { storageData, loading, error } = storeToRefs(bakeryStore)

// State
const searchQuery = ref('')
const showDeleteModal = ref(false)
const recordToDelete = ref(null)

// Computed
const filteredStorageData = computed(() => {
  if (!searchQuery.value) return storageData.value
  
  const query = searchQuery.value.toLowerCase()
  return storageData.value.filter(record => 
    record.itemName.toLowerCase().includes(query) ||
    record.type.toLowerCase().includes(query) ||
    record.location.toLowerCase().includes(query) ||
    record.status.toLowerCase().includes(query)
  )
})

// Methods
const clearSearch = () => {
  searchQuery.value = ''
}

const getStatusClass = (status) => {
  const baseClass = 'px-2 py-1 text-xs rounded-full'
  switch (status?.toLowerCase()) {
    case 'in stock':
      return `${baseClass} bg-green-100 text-green-800`
    case 'low stock':
      return `${baseClass} bg-yellow-100 text-yellow-800`
    case 'out of stock':
      return `${baseClass} bg-red-100 text-red-800`
    case 'expired':
      return `${baseClass} bg-gray-100 text-gray-800`
    default:
      return `${baseClass} bg-blue-100 text-blue-800`
  }
}

const deleteRecord = (record) => {
  recordToDelete.value = record
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (recordToDelete.value) {
    try {
      await bakeryStore.deleteStorageData(recordToDelete.value.id)
      showDeleteModal.value = false
      recordToDelete.value = null
    } catch (err) {
      console.error('Failed to delete storage record:', err)
    }
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const refreshData = () => {
  bakeryStore.fetchStorageData()
}

// Load data on mount
onMounted(() => {
  refreshData()
})
</script>