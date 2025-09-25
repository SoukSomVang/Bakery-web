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
          <i class="mdi mdi-plus w-4 h-4 mr-2"></i>
          Add New Branch
        </NuxtLink>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredBranches.length === 0" class="text-center py-12">
        <i class="mdi mdi-office-building text-6xl text-gray-400 mx-auto mb-4 block"></i>
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
                <i class="mdi mdi-office-building w-5 h-5 text-blue-600"></i>
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
              <i class="mdi mdi-map-marker w-4 h-4 text-gray-400 mt-0.5"></i>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-900">{{ branch.address || 'No address provided' }}</p>
                <p class="text-sm text-gray-600">{{ branch.city }}, {{ branch.state }} {{ branch.zipCode }}</p>
                <p class="text-sm text-gray-600">{{ branch.country }}</p>
              </div>
            </div>

            <div v-if="branch.phone" class="flex items-center space-x-2">
              <i class="mdi mdi-phone w-4 h-4 text-gray-400"></i>
              <p class="text-sm text-gray-900">{{ branch.phone }}</p>
            </div>

            <div v-if="branch.email" class="flex items-center space-x-2">
              <i class="mdi mdi-email w-4 h-4 text-gray-400"></i>
              <p class="text-sm text-gray-900">{{ branch.email }}</p>
            </div>

            <div v-if="branch.managerName" class="flex items-center space-x-2">
              <i class="mdi mdi-account w-4 h-4 text-gray-400"></i>
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
                  <i class="mdi mdi-pencil w-4 h-4"></i>
                </NuxtLink>
                <button 
                  @click="deleteBranch(branch)"
                  class="text-red-600 hover:text-red-800"
                  :disabled="loading"
                >
                  <i class="mdi mdi-delete w-4 h-4"></i>
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