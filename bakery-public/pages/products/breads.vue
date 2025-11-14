<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Products Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <!-- Loading State with Skeleton -->
        <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <SkeletonProductCard v-for="i in 8" :key="i" />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <div class="text-red-600 text-xl mb-4">{{ error }}</div>
          <button
            @click="fetchBreads"
            class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>

        <!-- Search Bar -->
        <div v-else class="max-w-md mx-auto mb-8">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search breads..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none"
          />
        </div>

        <!-- Breads Grid -->
        <div v-if="!loading && !error" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div v-for="bread in paginatedBreads" :key="bread.id">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              <img
                :src="bread.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop'"
                :alt="bread.name"
                class="w-full h-48 object-cover flex-shrink-0"
              />
              <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-lg font-bold text-gray-800 mb-2">{{ bread.name }}</h3>
                <p v-if="bread.description" class="text-gray-600 text-sm mb-2 line-clamp-3">{{ bread.description }}</p>
                <div class="text-red-600 font-semibold mt-auto">
                  {{ typeof bread.price === 'number' ? bread.price.toLocaleString() : bread.price }} KIP
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Breads Message -->
        <div v-if="!loading && !error && filteredBreads.length === 0" class="text-center py-20">
          <div class="text-gray-600 text-xl">No breads found.</div>
          <p class="text-gray-500 mt-2">{{ searchQuery ? 'Try adjusting your search terms.' : 'Check back later for fresh bread varieties.' }}</p>
        </div>

        <!-- Advanced Pagination -->
        <div v-if="filteredBreads.length > 0 && !loading && !error" class="mt-12">
          <!-- Main Pagination with Items Per Page -->
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <!-- Pagination Info Display -->
            <div class="text-sm text-gray-600">
              Showing {{ startItem }}-{{ endItem }} of {{ filteredBreads.length }} breads
            </div>

            <!-- Pagination Controls -->
            <div class="flex items-center space-x-2">
              <!-- First Page -->
              <button
                @click="goToFirstPage"
                :disabled="currentPage === 1"
                :class="[
                  'px-3 py-2 rounded-lg font-medium border',
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
                </svg>
              </button>

              <!-- Previous -->
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                :class="[
                  'px-3 py-2 rounded-lg font-medium border',
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
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
                      ? 'bg-red-600 text-white border-red-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
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
                  'px-3 py-2 rounded-lg font-medium border',
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>

              <!-- Last Page -->
              <button
                @click="goToLastPage"
                :disabled="currentPage === totalPages"
                :class="[
                  'px-3 py-2 rounded-lg font-medium border',
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>

            <!-- Items Per Page Selector -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600">Breads per page:</span>
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
      </div>
    </section>

    <!-- Our Partners Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading restaurants, hotels, and cafes across the region
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Partner 1 -->
          <div class="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 text-center mb-2">Grand Hotel Chain</h3>
            <p class="text-gray-600 text-center text-sm">
              Premium supplier for their breakfast buffet and in-room dining services
            </p>
          </div>

          <!-- Partner 2 -->
          <div class="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 text-center mb-2">The Coffee District</h3>
            <p class="text-gray-600 text-center text-sm">
              Exclusive artisan bread supplier for their cafe network of 15+ locations
            </p>
          </div>

          <!-- Partner 3 -->
          <div class="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 text-center mb-2">Restaurant Group Co.</h3>
            <p class="text-gray-600 text-center text-sm">
              Trusted wholesale partner providing fresh bread daily to fine dining establishments
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Use client-only wrapper for Firebase composable
let getProductsByBakeryType;

if (import.meta.client) {
  const { getProductsByBakeryType: fetchProducts } = useProducts();
  getProductsByBakeryType = fetchProducts;
} else {
  // Server-side fallback
  getProductsByBakeryType = async () => [];
}

// Loading and error states
const loading = ref(true);
const error = ref(null);

// Search
const searchQuery = ref('');

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(8);
const itemsPerPageOptions = [8, 16, 24];

// Data
const allBreads = ref([]);

// Fetch breads from Firestore (filtering by bakery type)
const fetchBreads = async () => {
  // Only fetch data on client side
  if (!import.meta.client) {
    loading.value = false;
    return;
  }

  try {
    loading.value = true;
    error.value = null;

    // Get products filtered by 'bread' bakery type (lowercase)
    allBreads.value = await getProductsByBakeryType('bakery');

  } catch (err) {
    console.error('Error fetching breads:', err);
    error.value = 'Failed to load breads. Please try again later.';
    allBreads.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed properties for filtering
const filteredBreads = computed(() => {
  if (!searchQuery.value) {
    return allBreads.value;
  }

  const query = searchQuery.value.toLowerCase();
  return allBreads.value.filter(bread =>
    bread.name?.toLowerCase().includes(query) ||
    bread.description?.toLowerCase().includes(query)
  );
});

// Computed properties for pagination
const totalPages = computed(() => {
  return Math.ceil(filteredBreads.value.length / itemsPerPage.value);
});

const paginatedBreads = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredBreads.value.slice(start, end);
});

// Computed for pagination display info
const startItem = computed(() => {
  return filteredBreads.value.length > 0 ? (currentPage.value - 1) * itemsPerPage.value + 1 : 0;
});

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return Math.min(end, filteredBreads.value.length);
});

// Generate visible page numbers for pagination
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

// Watch for search changes and reset pagination
watch(searchQuery, () => {
  currentPage.value = 1;
});

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

// Fetch data on component mount
onMounted(() => {
  if (import.meta.client) {
    fetchBreads();
  }
});

// SEO
useHead({
  title: 'Fresh Breads - BakeryHouse | Artisan Breads Daily',
  meta: [
    {
      name: 'description',
      content: 'Discover our selection of artisan breads including sourdough, multigrain, baguettes and more. Baked fresh daily using traditional techniques and premium ingredients.'
    },
    {
      property: 'og:title',
      content: 'Fresh Artisan Breads - BakeryHouse'
    },
    {
      property: 'og:description',
      content: 'Handcrafted breads made with organic flour and traditional techniques. From classic sourdough to multigrain loaves - taste the difference quality makes.'
    }
  ]
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-1px);
}
</style>
