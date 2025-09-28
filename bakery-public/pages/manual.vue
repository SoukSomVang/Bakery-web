<template>
  <div class="min-h-screen bg-gray-50">
    <div class="p-6 w-[88%] mx-auto">
      <!-- Search and Filter Controls -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, type, or description..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none w-full sm:max-w-xs"
          />
          <select v-model="selectedType" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none w-full sm:max-w-xs">
            <option value="">All Types</option>
            <option v-for="typeName in bakeryTypeNames" :key="typeName" :value="typeName">{{ typeName }}</option>
          </select>
          <button @click="clearFilter" class="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto">Clear</button>
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
                  <span class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                    {{ item.type || 'N/A' }}
                  </span>
                </td>

                <!-- Price -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-green-600">
                    {{ typeof item.price === 'number' ? item.price.toLocaleString() : (item.price || '0') }} KIP
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
              </tr>
            </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="!loading && filteredItems.length > 0" class="mt-6">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <!-- Pagination Info -->
          <div class="text-sm text-gray-600">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredItems.length) }} of {{ filteredItems.length }} items
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
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
              ]"
            >
              ⟪
            </button>

            <!-- Previous -->
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              :class="[
                'px-3 py-2 rounded-lg font-medium transition-colors border',
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
              ]"
            >
              ⟨
            </button>

            <!-- Page Numbers -->
            <div class="flex space-x-1 mx-4">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'min-w-[44px] px-3 py-2 rounded-lg font-medium transition-colors border text-center',
                  currentPage === page
                    ? 'bg-red-600 text-white border-red-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
                ]"
              >
                {{ page }}
              </button>
            </div>

            <!-- Next -->
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              :class="[
                'px-3 py-2 rounded-lg font-medium transition-colors border',
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
              ]"
            >
              ⟩
            </button>

            <!-- Last Page -->
            <button
              @click="goToLastPage"
              :disabled="currentPage === totalPages"
              :class="[
                'px-3 py-2 rounded-lg font-medium transition-colors border',
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
              ]"
            >
              ⟫
            </button>
          </div>

          <!-- Items Per Page Selector -->
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Items per page:</span>
            <select
              v-model="itemsPerPage"
              @change="changeItemsPerPage(itemsPerPage)"
              class="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-red-800 focus:border-red-800"
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
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getProductsByBakeryType } = useProducts();

// State
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const selectedType = ref('');

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);
const itemsPerPageOptions = [10, 20, 50];

// Data
const bakeryItems = ref([]);

// Fetch data
const fetchData = async () => {
  try {
    loading.value = true;
    error.value = null;

    const products = await getProductsByBakeryType('bakery');
    bakeryItems.value = products || [];

  } catch (err) {
    console.error('Error fetching bakery items:', err);
    error.value = `Failed to load products: ${err.message}`;
    bakeryItems.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed properties
const bakeryTypeNames = computed(() => {
  const types = new Set();
  bakeryItems.value.forEach(item => {
    if (item.type) types.add(item.type);
  });
  return Array.from(types).sort();
});

const filteredItems = computed(() => {
  let items = bakeryItems.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter(item =>
      item.name?.toLowerCase().includes(query) ||
      item.type?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    );
  }

  // Filter by type
  if (selectedType.value) {
    items = items.filter(item => item.type === selectedType.value);
  }

  return items;
});

// Pagination computed properties
const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage.value);
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredItems.value.slice(start, end);
});

// Generate visible page numbers
const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2;

  let start = Math.max(1, current - delta);
  let end = Math.min(total, current + delta);

  if (current <= delta) {
    end = Math.min(total, 2 * delta + 1);
  }
  if (current + delta >= total) {
    start = Math.max(1, total - 2 * delta);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Methods
const clearFilter = () => {
  searchQuery.value = '';
  selectedType.value = '';
  currentPage.value = 1;
};

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const goToFirstPage = () => {
  currentPage.value = 1;
};

const goToLastPage = () => {
  currentPage.value = totalPages.value;
};

const changeItemsPerPage = (newItemsPerPage) => {
  itemsPerPage.value = newItemsPerPage;
  currentPage.value = 1;
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Watch for search changes and reset pagination
watch([searchQuery, selectedType], () => {
  currentPage.value = 1;
});

// Load data on mount
onMounted(() => {
  fetchData();
});

// SEO
useHead({
  title: 'Product Manual - Bakery House | Complete Product Guide',
  meta: [
    {
      name: 'description',
      content: 'Comprehensive manual with detailed information about all our bakery products including storage, reheating instructions, and specifications.'
    }
  ]
});
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

/* Button hover effects */
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-1px);
}

button:disabled {
  transform: none;
}
</style>