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
          <i class="mdi mdi-plus w-4 h-4 mr-2"></i>
          Add Storage Record
        </NuxtLink>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredStorageData.length === 0" class="text-center py-12">
        <i class="mdi mdi-database-outline text-6xl text-gray-400 mx-auto mb-4 block"></i>
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
                      <i class="mdi mdi-pencil w-4 h-4"></i>
                    </NuxtLink>
                    <button 
                      @click="deleteRecord(record)"
                      class="text-red-600 hover:text-red-800"
                      :disabled="loading"
                    >
                      <i class="mdi mdi-delete w-4 h-4"></i>
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