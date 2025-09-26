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
          <i class="mdi mdi-plus w-4 h-4 mr-2"></i>
          Add New Type
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <!-- Types List -->
      <div v-if="!loading && bakeryTypes.length === 0" class="text-center py-12">
        <i class="mdi mdi-tag-multiple text-6xl text-gray-400 mx-auto mb-4 block"></i>
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
                <i class="mdi mdi-pencil w-4 h-4"></i>
              </button>
              <button
                @click="deleteType(type)"
                class="text-red-600 hover:text-red-800"
                :disabled="loading"
              >
                <i class="mdi mdi-delete w-4 h-4"></i>
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
    // Convert type name to lowercase for consistency
    typeForm.value.name = typeForm.value.name.toLowerCase()

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

<style scoped>
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-1px);
}

button:disabled {
  transform: none;
}

/* Ensure MDI icons are properly aligned in buttons */
.btn-primary i,
.btn-secondary i,
button i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}
</style>