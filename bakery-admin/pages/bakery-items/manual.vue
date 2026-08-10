<template>
  <div>
    <div class="w-[88%]">
      <AdminHeader
        title="Bakery Items - Manual View"
        subtitle="Detailed table view of all bakery product data"
        :loading="loading"
        @refresh="refreshData"
      />
    </div>

    <div class="p-6 w-[88%]">
      <!-- Search and Filter Controls -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, type, or description..."
            class="form-input w-full sm:max-w-xs"
          />
          <select v-model="selectedType" class="form-input w-full sm:max-w-xs">
            <option value="">All Types</option>
            <option v-for="typeName in bakeryTypeNames" :key="typeName" :value="typeName">{{ typeName }}</option>
          </select>
          <button @click="clearFilter" class="btn-secondary w-full sm:w-auto">Clear</button>
        </div>

        <div class="flex space-x-2">
          <NuxtLink to="/bakery-items" class="btn-secondary">
            <i class="mdi mdi-view-grid w-4 h-4 mr-2"></i>
            Grid View
          </NuxtLink>
          <NuxtLink to="/bakery-items/create" class="btn-primary">
            <i class="mdi mdi-plus w-4 h-4 mr-2"></i>
            Add New Item
          </NuxtLink>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <!-- Results Summary -->
      <div v-if="!loading && filteredItems.length > 0" class="mb-4">
        <p class="text-gray-600">
          {{ filteredItems.length }} {{ selectedType ? selectedType.toLowerCase() : 'bakery' }} items found
        </p>
      </div>

      <!-- No Items Message -->
      <div v-if="!loading && filteredItems.length === 0" class="text-center py-12">
        <i class="mdi mdi-package-variant text-6xl text-gray-400 mx-auto mb-4 block"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No items found</h3>
        <p class="text-gray-500 mb-4">{{ selectedType ? `No ${selectedType.toLowerCase()} items found.` : 'No bakery items found.' }}</p>
        <NuxtLink to="/bakery-items/create" class="btn-primary">Add Your First Item</NuxtLink>
      </div>

      <!-- Table -->
      <div v-else-if="!loading && filteredItems.length > 0" class="w-[100%] overflow-scroll">
        <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div class="overflow-auto max-h-[70vh] w-full">
            <table class="min-w-full divide-y divide-gray-200 table-fixed w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">#</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Image</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Name</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Type</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Price</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Description</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Shelf Life</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Reheat Info</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Storage Methods</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Display Methods</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Environment</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Dates</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(item, index) in paginatedItems" :key="item.id" class="hover:bg-gray-50">
                <!-- Row Number -->
                <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </td>

                <!-- Image -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="w-16 h-16">
                    <img
                      v-if="item.imageUrl"
                      :src="convertGoogleDriveUrl(item.imageUrl)"
                      :alt="item.name"
                      class="w-full h-full object-cover rounded-lg"
                    />
                    <div v-else class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <i class="mdi mdi-image-outline text-2xl text-gray-400"></i>
                    </div>
                  </div>
                </td>

                <!-- Name -->
                <td class="px-4 py-4">
                  <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                </td>

                <!-- Type -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {{ item.type || 'N/A' }}
                  </span>
                </td>

                <!-- Price -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-green-600">
                    ${{ typeof item.price === 'number' ? item.price.toFixed(2) : (item.price || '0.00') }}
                  </div>
                </td>

                <!-- Description -->
                <td class="px-4 py-4">
                  <div class="text-sm text-gray-600 max-w-xs">
                    <div class="line-clamp-3">{{ item.description || 'No description' }}</div>
                  </div>
                </td>

                <!-- Shelf Life -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ item.shelf_life_days || 'N/A' }} days
                  </div>
                </td>

                <!-- Reheat Info -->
                <td class="px-4 py-4">
                  <div class="text-sm text-gray-600">
                    <div class="mb-1">
                      <span class="font-medium">Can Reheat:</span>
                      <span :class="item.can_reheat ? 'text-green-600' : 'text-red-600'">
                        {{ item.can_reheat ? 'Yes' : 'No' }}
                      </span>
                    </div>
                    <div v-if="item.can_reheat">
                      <div v-if="item.reheat_temperature">
                        <span class="font-medium">Temp:</span> {{ item.reheat_temperature }}°
                      </div>
                      <div v-if="item.reheat_time_min || item.reheat_time_max">
                        <span class="font-medium">Time:</span>
                        {{ item.reheat_time_min || 0 }}-{{ item.reheat_time_max || 0 }} min
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Storage Methods -->
                <td class="px-4 py-4">
                  <div class="text-sm text-gray-600">
                    <div v-if="item.storage_methods && item.storage_methods.length > 0" class="space-y-1">
                      <span
                        v-for="method in item.storage_methods"
                        :key="method"
                        class="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded mr-1 mb-1"
                      >
                        {{ method }}
                      </span>
                    </div>
                    <span v-else class="text-gray-400">No methods specified</span>
                  </div>
                </td>

                <!-- Display Methods -->
                <td class="px-4 py-4">
                  <div class="text-sm text-gray-600">
                    <div v-if="item.display_methods && item.display_methods.length > 0" class="space-y-1">
                      <span
                        v-for="method in item.display_methods"
                        :key="method"
                        class="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded mr-1 mb-1"
                      >
                        {{ method }}
                      </span>
                    </div>
                    <span v-else class="text-gray-400">No methods specified</span>
                  </div>
                </td>

                <!-- Environment -->
                <td class="px-4 py-4">
                  <div class="text-sm text-gray-600 space-y-1">
                    <div class="flex items-center">
                      <i class="mdi mdi-water-outline w-4 h-4 mr-1"></i>
                      <span :class="item.avoid_moisture ? 'text-red-600' : 'text-green-600'">
                        {{ item.avoid_moisture ? 'Avoid Moisture' : 'Moisture OK' }}
                      </span>
                    </div>
                    <div class="flex items-center">
                      <i class="mdi mdi-weather-sunny w-4 h-4 mr-1"></i>
                      <span :class="item.avoid_sunlight ? 'text-red-600' : 'text-green-600'">
                        {{ item.avoid_sunlight ? 'Avoid Sunlight' : 'Sunlight OK' }}
                      </span>
                    </div>
                    <div class="flex items-center">
                      <i class="mdi mdi-thermometer w-4 h-4 mr-1"></i>
                      <span :class="item.temperature_sensitive ? 'text-red-600' : 'text-green-600'">
                        {{ item.temperature_sensitive ? 'Temp Sensitive' : 'Temp Stable' }}
                      </span>
                    </div>
                  </div>
                </td>

                <!-- Dates -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-600">
                    <div class="mb-1">
                      <span class="font-medium">Created:</span><br>
                      {{ formatDate(item.createdAt) }}
                    </div>
                    <div v-if="item.updatedAt">
                      <span class="font-medium">Updated:</span><br>
                      {{ formatDate(item.updatedAt) }}
                    </div>
                  </div>
                </td>

                <!-- Actions -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="flex space-x-2">
                    <NuxtLink
                      :to="`/bakery-items/edit/${item.id}`"
                      class="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <i class="mdi mdi-pencil w-4 h-4"></i>
                    </NuxtLink>
                    <button
                      @click="deleteItem(item)"
                      class="text-red-600 hover:text-red-800"
                      title="Delete"
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
      </div>

      <!-- Pagination -->
      <AdminPagination
        v-if="!loading && filteredItems.length > 0"
        :current-page="currentPage"
        :total-items="filteredItems.length"
        :items-per-page="itemsPerPage"
        :items-per-page-options="itemsPerPageOptions"
        :item-label="selectedType ? `${selectedType.toLowerCase()} items` : 'bakery items'"
        @go-to-first-page="goToFirstPage"
        @prev-page="prevPage"
        @next-page="nextPage"
        @go-to-last-page="goToLastPage"
        @go-to-page="goToPage"
        @change-items-per-page="changeItemsPerPage"
      />

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
        <!-- The page-level error banner sits behind this overlay, so repeat it here -->
        <div v-if="deleteError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ deleteError }}
        </div>
        <div class="flex justify-end space-x-3">
          <button @click="closeDeleteModal" class="btn-secondary">Cancel</button>
          <button @click="confirmDelete" class="btn-danger" :disabled="loading">
            {{ loading ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { describeError } from '../../../shared-configs/error-utils.js'

const bakeryStore = useBakeryStore()
const { bakeryItems, loading, error } = storeToRefs(bakeryStore)
const bakeryTypeNames = computed(() => bakeryStore.bakeryTypeNames)
const { convertGoogleDriveUrl } = useGoogleDrive()

// State
const searchQuery = ref('')
const selectedType = ref('')
const showDeleteModal = ref(false)
const itemToDelete = ref(null)
const deleteError = ref(null)

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)
const itemsPerPageOptions = [10, 20, 50]

// Computed
const filteredItems = computed(() => {
  let items = bakeryItems.value

  // Filter by search query (name, type, description)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(item =>
      item.name?.toLowerCase().includes(query) ||
      item.type?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    )
  }

  // Filter by type
  if (selectedType.value) {
    items = items.filter(item => item.type === selectedType.value)
  }

  return items
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

// Methods
const clearFilter = () => {
  searchQuery.value = ''
  selectedType.value = ''
  currentPage.value = 1
}

// Watch for search changes and reset pagination
watch([searchQuery, selectedType], () => {
  currentPage.value = 1
})

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

const deleteItem = (item) => {
  itemToDelete.value = item
  deleteError.value = null
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  itemToDelete.value = null
  deleteError.value = null
}

const confirmDelete = async () => {
  if (!itemToDelete.value) return

  deleteError.value = null

  try {
    await bakeryStore.deleteBakeryItem(itemToDelete.value.id)
    closeDeleteModal()
  } catch (err) {
    // Keep the modal open and tell the user why it failed
    console.error('Failed to delete item:', err)
    deleteError.value = `Failed to delete "${itemToDelete.value.name}": ${describeError(err)}`
  }
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const refreshData = () => {
  bakeryStore.fetchBakeryItems()
}

// Load data on mount
onMounted(() => {
  refreshData()
})

// SEO
useHead({
  title: 'Bakery Items Manual View - Admin',
  meta: [
    {
      name: 'description',
      content: 'Detailed table view of all bakery items with comprehensive product information.'
    }
  ]
})
</script>

<style scoped>
/* Custom table styles */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Table container with proper scrolling */
.overflow-auto {
  max-width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
}

/* Table layout and sizing */
.table-fixed {
  table-layout: fixed;
  width: 100%;
  min-width: 1400px;
}

/* Header styles with no wrapping */
th {
  white-space: nowrap;
  position: sticky;
  top: 0;
  background-color: #f9fafb;
  z-index: 10;
  border-bottom: 1px solid #e5e7eb;
}

/* Column width constraints for fixed table layout */
th:nth-child(1), td:nth-child(1) { /* Row number */
  width: 4%;
}

th:nth-child(2), td:nth-child(2) { /* Image */
  width: 6%;
}

th:nth-child(3), td:nth-child(3) { /* Name */
  width: 10%;
}

th:nth-child(4), td:nth-child(4) { /* Type */
  width: 7%;
}

th:nth-child(5), td:nth-child(5) { /* Price */
  width: 7%;
}

th:nth-child(6), td:nth-child(6) { /* Description */
  width: 15%;
}

th:nth-child(7), td:nth-child(7) { /* Shelf Life */
  width: 7%;
}

th:nth-child(8), td:nth-child(8) { /* Reheat Info */
  width: 12%;
}

th:nth-child(9), td:nth-child(9) { /* Storage Methods */
  width: 10%;
}

th:nth-child(10), td:nth-child(10) { /* Display Methods */
  width: 10%;
}

th:nth-child(11), td:nth-child(11) { /* Environment */
  width: 8%;
}

th:nth-child(12), td:nth-child(12) { /* Dates */
  width: 8%;
}

th:nth-child(13), td:nth-child(13) { /* Actions */
  width: 6%;
}

/* Ensure content doesn't overflow cells */
td {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
}

/* Responsive table adjustments */
@media (max-width: 1024px) {
  .table-fixed {
    font-size: 0.875rem;
    min-width: 1200px;
  }

  .px-4 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}

/* Ensure proper spacing for tags */
.space-y-1 > * + * {
  margin-top: 0.25rem;
}

/* Button styles */
button {
  /* No transitions */
}

/* Scrollbar styling */
.overflow-auto::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.overflow-auto::-webkit-scrollbar-corner {
  background: #f1f1f1;
}

/* Table responsive container */
.table-responsive {
  position: relative;
  width: 100%;
}
</style>