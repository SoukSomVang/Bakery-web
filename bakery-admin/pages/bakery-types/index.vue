<template>
  <div>
    <AdminHeader
      title="Bakery Types"
      subtitle="Manage your bakery item types"
      :loading="loading"
      @refresh="refreshData"
    />

    <div class="p-6">
      <!-- Add New Type -->
      <div class="mb-6 flex justify-end">
        <button @click="showAddModal = true" class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
          </svg>
          Add New Type
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <!-- Types List -->
      <div v-if="!loading && bakeryTypes.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No types found</h3>
        <p class="text-gray-500 mb-4">Create your first bakery type to get started.</p>
        <button @click="showAddModal = true" class="btn-primary">Add Your First Type</button>
      </div>

      <!-- Types Grid -->
      <div v-else-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="type in bakeryTypes" :key="type.id" class="card hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">{{ type.name }}</h3>
            <div class="flex space-x-2">
              <button
                @click="editType(type)"
                class="text-blue-600 hover:text-blue-800"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
              </button>
              <button
                @click="deleteType(type)"
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

          <div class="text-sm text-gray-500">
            <p>Created: {{ formatDate(type.createdAt) }}</p>
            <p v-if="type.updatedAt">Updated: {{ formatDate(type.updatedAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">
          {{ showAddModal ? 'Add New Type' : 'Edit Type' }}
        </h3>

        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="form-label">Type Name *</label>
            <input
              v-model="typeForm.name"
              type="text"
              class="form-input"
              placeholder="e.g., Cake, Bread, Pastry"
              required
            />
          </div>

          <div class="flex justify-end space-x-3">
            <button type="button" @click="closeModal" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="loading">
              {{ loading ? 'Saving...' : showAddModal ? 'Add Type' : 'Update Type' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete "{{ typeToDelete?.name }}"? This action cannot be undone.
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
const { bakeryTypes, loading, error } = storeToRefs(bakeryStore)

// State
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const typeToDelete = ref(null)
const editingType = ref(null)

const typeForm = ref({
  name: ''
})

// Methods
const refreshData = () => {
  bakeryStore.fetchBakeryTypes()
}

const editType = (type) => {
  editingType.value = type
  typeForm.value = { ...type }
  showEditModal.value = true
}

const deleteType = (type) => {
  typeToDelete.value = type
  showDeleteModal.value = true
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  typeForm.value = { name: '' }
  editingType.value = null
}

const submitForm = async () => {
  try {
    if (showAddModal.value) {
      await bakeryStore.addBakeryType(typeForm.value)
    } else if (showEditModal.value) {
      await bakeryStore.updateBakeryType(editingType.value.id, typeForm.value)
    }
    closeModal()
  } catch (err) {
    console.error('Failed to save type:', err)
  }
}

const confirmDelete = async () => {
  if (typeToDelete.value) {
    try {
      await bakeryStore.deleteBakeryType(typeToDelete.value.id)
      showDeleteModal.value = false
      typeToDelete.value = null
    } catch (err) {
      console.error('Failed to delete type:', err)
    }
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

// Load data on mount
onMounted(() => {
  refreshData()
})
</script>