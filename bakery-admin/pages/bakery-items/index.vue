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
            <option v-for="typeName in bakeryTypeNames" :key="typeName" :value="typeName">{{ typeName }}</option>
          </select>
          <button @click="clearFilter" class="btn-secondary">Clear</button>
        </div>
        
        <NuxtLink to="/bakery-items/create" class="btn-primary">
          <i class="mdi mdi-plus w-4 h-4 mr-2"></i>
          Add New Item
        </NuxtLink>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <!-- Results Summary Info -->
      <div v-if="!loading && filteredItems.length > 0" class="mb-6">
        <div class="text-center">
          <p class="text-gray-600" v-if="selectedType">
            {{ filteredItems.length }} {{ selectedType.toLowerCase() }} items found
          </p>
          <p class="text-gray-600" v-else>
            {{ filteredItems.length }} bakery items found
          </p>
        </div>
      </div>

      <!-- No Items Message -->
      <div v-if="!loading && filteredItems.length === 0" class="text-center py-12">
        <i class="mdi mdi-package-variant text-6xl text-gray-400 mx-auto mb-4 block"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No items found</h3>
        <p class="text-gray-500 mb-4">{{ selectedType ? `No ${selectedType.toLowerCase()} items found.` : 'No bakery items found.' }}</p>
        <NuxtLink to="/bakery-items/create" class="btn-primary">Add Your First Item</NuxtLink>
      </div>

      <!-- Items Grid -->
      <div v-else-if="!loading && filteredItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <div v-for="item in paginatedItems" :key="item.id" class="card hover:shadow-lg transition-shadow">
          <div class="aspect-w-16 aspect-h-9 mb-4">
            <img
              v-if="item.imageUrl"
              :src="convertGoogleDriveUrl(item.imageUrl)"
              :alt="item.name"
              class="w-full h-48 object-cover rounded-lg"
            />
            <div v-else class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <i class="mdi mdi-image-outline text-5xl text-gray-400"></i>
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
                  <i class="mdi mdi-pencil w-4 h-4"></i>
                </NuxtLink>
                <button
                  @click="deleteItem(item)"
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

      <!-- Advanced Pagination -->
      <div v-if="filteredItems.length > itemsPerPage && !loading" class="mt-8">
        <!-- Main Pagination with Items Per Page -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <!-- Pagination Info Display -->
          <div class="text-sm text-gray-600">
            <span v-if="selectedType">
              Showing {{ startItem }}-{{ endItem }} of {{ filteredItems.length }} {{ selectedType.toLowerCase() }} items
            </span>
            <span v-else>
              Showing {{ startItem }}-{{ endItem }} of {{ filteredItems.length }} bakery items
            </span>
          </div>

          <!-- Pagination Controls -->
          <div class="flex items-center space-x-2">
            <!-- First Page -->
            <button
              @click="goToFirstPage"
              :disabled="currentPage === 1"
              :class="[
                'px-3 py-2 rounded-lg font-medium transition-colors border',
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
              ]"
            >
              <i class="mdi mdi-chevron-double-left w-4 h-4"></i>
            </button>

            <!-- Previous -->
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              :class="[
                'px-3 py-2 rounded-lg font-medium transition-colors border',
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
              ]"
            >
              <i class="mdi mdi-chevron-left w-4 h-4"></i>
            </button>

            <!-- Page Numbers -->
            <div class="flex space-x-1 mx-4">
              <!-- Show ellipsis if needed -->
              <span v-if="visiblePages[0] > 1" class="px-3 py-2 text-gray-500 font-medium">...</span>

              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'min-w-[44px] px-3 py-2 rounded-lg font-medium transition-colors border text-center',
                  currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
                ]"
              >
                {{ page }}
              </button>

              <!-- Show ellipsis if needed -->
              <span v-if="visiblePages[visiblePages.length - 1] < totalPages" class="px-3 py-2 text-gray-500 font-medium">...</span>
            </div>

            <!-- Next -->
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              :class="[
                'px-3 py-2 rounded-lg font-medium transition-colors border',
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
              ]"
            >
              <i class="mdi mdi-chevron-right w-4 h-4"></i>
            </button>

            <!-- Last Page -->
            <button
              @click="goToLastPage"
              :disabled="currentPage === totalPages"
              :class="[
                'px-3 py-2 rounded-lg font-medium transition-colors border',
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
              ]"
            >
              <i class="mdi mdi-chevron-double-right w-4 h-4"></i>
            </button>
          </div>

          <!-- Items Per Page Selector -->
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Items per page:</span>
            <select
              v-model="itemsPerPage"
              @change="changeItemsPerPage(itemsPerPage)"
              class="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
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
const bakeryTypeNames = computed(() => bakeryStore.bakeryTypeNames)
const { convertGoogleDriveUrl } = useGoogleDrive()

// State
const selectedType = ref('')
const showDeleteModal = ref(false)
const itemToDelete = ref(null)

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(12)
const itemsPerPageOptions = [12, 24, 48]

// Computed
const filteredItems = computed(() => {
  if (!selectedType.value) return bakeryItems.value
  return bakeryItems.value.filter(item => item.type === selectedType.value)
})

// Pagination computed properties
const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage.value)
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredItems.value.slice(start, end)
})

const startItem = computed(() => {
  return filteredItems.value.length > 0 ? (currentPage.value - 1) * itemsPerPage.value + 1 : 0
})

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value
  return Math.min(end, filteredItems.value.length)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = 2

  let start = Math.max(1, current - delta)
  let end = Math.min(total, current + delta)

  if (current <= delta) {
    end = Math.min(total, 2 * delta + 1)
  }
  if (current + delta >= total) {
    start = Math.max(1, total - 2 * delta)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// Methods
const clearFilter = () => {
  selectedType.value = ''
  currentPage.value = 1
}

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const goToFirstPage = () => {
  currentPage.value = 1
}

const goToLastPage = () => {
  currentPage.value = totalPages.value
}

const changeItemsPerPage = (newItemsPerPage) => {
  itemsPerPage.value = newItemsPerPage
  currentPage.value = 1
}

// Watch for filter changes and reset pagination
watch(selectedType, () => {
  currentPage.value = 1
})

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

/* Ensure consistent icon alignment in pagination */
.flex .space-x-2 button i {
  width: 1rem;
  height: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
</style>