<template>
  <div>
    <AdminHeader 
      title="Branch Management" 
      subtitle="Manage bakery branch locations"
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
            placeholder="Search branches..."
            class="form-input max-w-xs"
          />
          <button @click="clearSearch" class="btn-secondary">Clear</button>
        </div>
        
        <NuxtLink to="/branches/create" class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
          </svg>
          Add New Branch
        </NuxtLink>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredBranches.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No branches found</h3>
        <p class="text-gray-500 mb-4">{{ searchQuery ? 'No branches match your search criteria.' : 'No branches found.' }}</p>
        <NuxtLink to="/branches/create" class="btn-primary">Add Your First Branch</NuxtLink>
      </div>

      <!-- Branches Grid -->
      <div v-else-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="branch in filteredBranches" :key="branch.id" class="card hover:shadow-lg transition-shadow">
          <!-- Branch Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="p-2 bg-blue-100 rounded-full">
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">{{ branch.name }}</h3>
                <p class="text-sm text-gray-600">{{ branch.branchCode || 'No code' }}</p>
              </div>
            </div>
            <span :class="getStatusClass(branch.status)">
              {{ branch.status }}
            </span>
          </div>

          <!-- Branch Details -->
          <div class="space-y-3">
            <div class="flex items-start space-x-2">
              <svg class="w-4 h-4 text-gray-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
              </svg>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-900">{{ branch.address || 'No address provided' }}</p>
                <p class="text-sm text-gray-600">{{ branch.city }}, {{ branch.state }} {{ branch.zipCode }}</p>
                <p class="text-sm text-gray-600">{{ branch.country }}</p>
              </div>
            </div>

            <div v-if="branch.phone" class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              <p class="text-sm text-gray-900">{{ branch.phone }}</p>
            </div>

            <div v-if="branch.email" class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <p class="text-sm text-gray-900">{{ branch.email }}</p>
            </div>

            <div v-if="branch.managerName" class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-sm text-gray-900">Manager: {{ branch.managerName }}</p>
            </div>

            <div class="flex items-center justify-between pt-3 border-t">
              <div class="text-xs text-gray-500">
                <p>Opened: {{ formatDate(branch.openingDate) }}</p>
                <p>Updated: {{ formatDate(branch.updatedAt) }}</p>
              </div>
              <div class="flex space-x-2">
                <NuxtLink 
                  :to="`/branches/edit/${branch.id}`"
                  class="text-blue-600 hover:text-blue-800"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>
                </NuxtLink>
                <button 
                  @click="deleteBranch(branch)"
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
          Are you sure you want to delete "{{ branchToDelete?.name }}"? This action cannot be undone.
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
const { branches, loading, error } = storeToRefs(bakeryStore)

// State
const searchQuery = ref('')
const showDeleteModal = ref(false)
const branchToDelete = ref(null)

// Computed
const filteredBranches = computed(() => {
  if (!searchQuery.value) return branches.value
  
  const query = searchQuery.value.toLowerCase()
  return branches.value.filter(branch => 
    branch.name.toLowerCase().includes(query) ||
    branch.address?.toLowerCase().includes(query) ||
    branch.city?.toLowerCase().includes(query) ||
    branch.managerName?.toLowerCase().includes(query)
  )
})

// Methods
const clearSearch = () => {
  searchQuery.value = ''
}

const getStatusClass = (status) => {
  const baseClass = 'px-2 py-1 text-xs rounded-full'
  switch (status?.toLowerCase()) {
    case 'active':
      return `${baseClass} bg-green-100 text-green-800`
    case 'inactive':
      return `${baseClass} bg-red-100 text-red-800`
    case 'under renovation':
      return `${baseClass} bg-yellow-100 text-yellow-800`
    case 'temporary closed':
      return `${baseClass} bg-orange-100 text-orange-800`
    default:
      return `${baseClass} bg-blue-100 text-blue-800`
  }
}

const deleteBranch = (branch) => {
  branchToDelete.value = branch
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (branchToDelete.value) {
    try {
      await bakeryStore.deleteBranch(branchToDelete.value.id)
      showDeleteModal.value = false
      branchToDelete.value = null
    } catch (err) {
      console.error('Failed to delete branch:', err)
    }
  }
}

const formatDate = (date) => {
  if (!date) return 'Not set'
  return new Date(date).toLocaleDateString()
}

const refreshData = () => {
  bakeryStore.fetchBranches()
}

// Load data on mount
onMounted(() => {
  refreshData()
})
</script>