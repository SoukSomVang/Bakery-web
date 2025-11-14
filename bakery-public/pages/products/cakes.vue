<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[60vh]"
      :style="{
        backgroundImage: `url('${cakeImage}')`,
      }"
    >
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 h-full flex items-center justify-center px-4">
        <div class="text-center text-white">
          <h1 class="text-5xl lg:text-7xl font-bold mb-4 italic">
            {{ t('cakes.title') }}
          </h1>
          <p class="text-xl lg:text-2xl">{{ t('cakes.subtitle') }}</p>
        </div>
      </div>
    </section>

    <!-- Product Categories -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">{{ t('cakes.allCakes') }}</h2>

        <!-- Loading State with Skeleton -->
        <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <SkeletonProductCard v-for="i in 10" :key="i" />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <div class="text-red-600 text-xl mb-4">{{ error }}</div>
          <button
            @click="fetchCakes"
            class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            {{ t('common.tryAgain') }}
          </button>
        </div>

        <!-- Search Bar -->
        <div v-else class="max-w-md mx-auto mb-8">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('cakes.searchPlaceholder')"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none"
          />
        </div>

        <!-- Cakes Grid -->
        <div v-if="!loading && !error && filteredCakes.length > 0" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div v-for="cake in paginatedCakes" :key="cake.id">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl h-full flex flex-col">
              <img
                :src="cake.imageUrl || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop'"
                :alt="cake.name"
                class="w-full h-48 object-cover flex-shrink-0"
              />
              <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-lg font-bold text-gray-800 mb-2">{{ cake.name }}</h3>
                <p v-if="cake.description" class="text-gray-600 text-sm mb-2 line-clamp-3">{{ cake.description }}</p>
                <!-- <div class="text-red-600 font-semibold mt-auto">
                  {{ typeof cake.price === 'number' ? cake.price.toLocaleString() : cake.price }} KIP
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <!-- Advanced Pagination -->
        <div v-if="filteredCakes.length > 0 && !loading && !error" class="mt-12">
          <!-- Main Pagination with Items Per Page -->
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <!-- Pagination Info Display -->
            <div class="text-sm text-gray-600">
              {{ t('cakes.showingCakes', { start: startItem, end: endItem, total: filteredCakes.length }) }}
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
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
                </svg>
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
                  'px-3 py-2 rounded-lg font-medium transition-colors border',
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
                  'px-3 py-2 rounded-lg font-medium transition-colors border',
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
              <span class="text-sm text-gray-600">{{ t('cakes.cakesPerPage') }}</span>
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

        <!-- No Cakes Message -->
        <div v-else-if="!loading && !error && filteredCakes.length === 0" class="text-center py-20">
          <div class="text-gray-600 text-xl">{{ t('cakes.noCakesFound') }}</div>
          <p class="text-gray-500 mt-2">{{ searchQuery ? t('cakes.adjustSearch') : t('cakes.checkBackLater') }}</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
// Use client-only wrapper for Firebase composable
import cakeImage from "@/assets/images/cake-section.jpeg"

const { currentLocale, t } = useTranslation()

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
const itemsPerPage = ref(10);
const itemsPerPageOptions = [10, 20, 50];

// Data
const allCakes = ref([]);

// Fetch cakes from Firestore (filtering by bakery type)
const fetchCakes = async () => {
  // Only fetch data on client side
  if (!import.meta.client) {
    loading.value = false;
    return;
  }

  try {
    console.log('🚀 CAKES: Fetching cakes from Firestore...');
    loading.value = true;
    error.value = null;

    // Get products filtered by 'cake' bakery type (lowercase)
    allCakes.value = await getProductsByBakeryType('cake');
    console.log('✅ CAKES: Cakes loaded:', allCakes.value.length);

  } catch (err) {
    console.error('❌ CAKES: Error fetching cakes:', err);
    error.value = `Failed to load cakes: ${err.message}`;
    allCakes.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed properties for filtering
const filteredCakes = computed(() => {
  if (!searchQuery.value) {
    return allCakes.value;
  }

  const query = searchQuery.value.toLowerCase();
  return allCakes.value.filter(cake =>
    cake.name?.toLowerCase().includes(query) ||
    cake.description?.toLowerCase().includes(query)
  );
});

// Computed properties for pagination
const totalPages = computed(() => {
  return Math.ceil(filteredCakes.value.length / itemsPerPage.value);
});

const paginatedCakes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCakes.value.slice(start, end);
});

// Computed for pagination display info
const startItem = computed(() => {
  return filteredCakes.value.length > 0 ? (currentPage.value - 1) * itemsPerPage.value + 1 : 0;
});

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return Math.min(end, filteredCakes.value.length);
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
    fetchCakes();
  }
});

// SEO
useHead({
  title: 'Cakes - BakeryHouse | Fresh Baked Cakes',
  meta: [
    {
      name: 'description',
      content: 'Explore our delicious selection of fresh baked cakes including chocolate, vanilla, red velvet, and custom celebration cakes. Made daily with the finest ingredients.'
    },
    {
      property: 'og:title',
      content: 'Fresh Baked Cakes - BakeryHouse'
    },
    {
      property: 'og:description',
      content: 'Discover our amazing variety of cakes perfect for any occasion. Custom cakes, birthday cakes, and more available for order.'
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