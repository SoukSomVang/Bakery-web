<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[60vh]"
      :style="{
        backgroundImage: `url('${productSectionImage}')`,
      }"
    >
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 h-full flex items-center justify-center px-4">
        <div class="text-center text-white">
          <h1 class="text-5xl lg:text-7xl font-bold mb-4 italic">
            {{ t('products.ourBakery') }}
          </h1>
          <p class="text-xl lg:text-2xl">{{ t('products.freshBaked') }}</p>
        </div>
      </div>
    </section>

    <!-- All Products Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">{{ t('products.allProducts') }}</h2>

        <!-- Loading State with Skeleton -->
        <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <SkeletonProductCard v-for="i in 8" :key="i" />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <div class="text-red-600 text-xl mb-4">{{ error }}</div>
          <div v-if="retryCount > 0" class="text-gray-600 mb-4">
            {{ t('products.retryAttempt') }}: {{ retryCount }}/{{ maxRetries }}
          </div>
          <button
            @click="fetchDataWithRetry"
            :disabled="loading"
            class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {{ loading ? t('common.retrying') : t('common.tryAgain') }}
          </button>
        </div>

        <!-- Search Bar -->
        <div v-else class="max-w-md mx-auto mb-8">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('products.searchPlaceholder')"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none"
          />
        </div>

        <!-- Products Grid -->
        <div v-if="!loading && !error && filteredProducts.length > 0" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div v-for="product in paginatedProducts" :key="product.id">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl h-full flex flex-col">
              <img
                :src="getProductImage(product)"
                :alt="product.name"
                class="w-full h-48 object-cover flex-shrink-0"
              />
              <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-lg font-bold text-gray-800 mb-2">{{ product.name }}</h3>
                <p v-if="product.description" class="text-gray-600 text-sm mb-2 line-clamp-3">{{ product.description }}</p>
                <!-- <div class="text-red-600 font-semibold mt-auto">
                  {{ typeof product.price === 'number' ? product.price.toLocaleString() : product.price }} KIP
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <!-- No Products Message -->
        <div v-else-if="!loading && !error && filteredProducts.length === 0 && allProducts.length > 0" class="text-center py-20">
          <div class="text-gray-600 text-xl">{{ t('products.noProductsFound') }}</div>
          <p class="text-gray-500 mt-2">{{ t('products.adjustSearch') }}</p>
        </div>

        <!-- No Products Available -->
        <div v-else-if="!loading && !error && allProducts.length === 0" class="text-center py-20">
          <div class="text-gray-600 text-xl">{{ t('products.noProductsAvailable') }}</div>
          <p class="text-gray-500 mt-2">{{ t('products.checkBackLater') }}</p>
        </div>

        <!-- Advanced Pagination -->
        <div v-if="filteredProducts.length > 0 && !loading && !error" class="mt-12">
          <!-- Main Pagination with Items Per Page -->
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <!-- Pagination Info Display -->
            <div class="text-sm text-gray-600">
              {{ t('products.showing') }} {{ startItem }}-{{ endItem }} {{ t('common.of') }} {{ filteredProducts.length }} {{ t('nav.products') }}
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
              <span class="text-sm text-gray-600">{{ t('common.itemsPerPage') }}:</span>
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
  </div>
</template>

<script setup>
// Use client-only wrapper for Firebase composable
import productSectionImage from "@/assets/images/prop-image.jpeg"
import { describeError, isRetryable } from "../../../shared-configs/error-utils.js"

const { t } = useTranslation();

let getProductsByBakeryType;

if (import.meta.client) {
  const { getProductsByBakeryType: fetchProducts } = useProducts();
  getProductsByBakeryType = fetchProducts;
} else {
  // Server-side fallback
  getProductsByBakeryType = async () => [];
}

// Loading states
const loading = ref(true);
const error = ref(null);

// Search
const searchQuery = ref('');

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10); // Default items per page
const itemsPerPageOptions = [10, 20, 50];

// Data from Firestore
const allProducts = ref([]);

// Fetch bakery products. Throws on failure so fetchDataWithRetry can retry —
// do not swallow the error here.
const fetchData = async () => {
  console.log('🚀 PUBLIC: Fetching bakery products...');

  const products = await getProductsByBakeryType('bakery');
  allProducts.value = products || [];

  console.log('✅ PUBLIC: Products loaded:', allProducts.value.length);
  console.log('📊 PUBLIC: First product data:', allProducts.value[0]);

  // Log pagination debug info
  console.log('📄 PUBLIC: Items per page:', itemsPerPage.value);
  console.log('📄 PUBLIC: Should show pagination:', allProducts.value.length > itemsPerPage.value);

  // Log if no products found
  if (allProducts.value.length === 0) {
    console.warn('⚠️ PUBLIC: No products found in bakeryItems collection');
  }
};

// Retry mechanism
const maxRetries = 3;
const retryDelayMs = 2000;
const retryCount = ref(0);

let retryTimer = null;
let cancelPendingWait = null;
let fetchInFlight = false;
let cancelled = false;

// Cancellable delay — unmounting resolves it immediately so the retry loop
// can bail out instead of leaving a timer (and a pending promise) behind
const wait = (ms) => new Promise((resolve) => {
  cancelPendingWait = resolve;
  retryTimer = setTimeout(resolve, ms);
});

// Fetch data, retrying transient Firestore failures before giving up
const fetchDataWithRetry = async () => {
  // Only fetch data on client side
  if (!import.meta.client) {
    loading.value = false;
    return;
  }

  // Ignore extra clicks on "Try Again" while a run is already going
  if (fetchInFlight) return;
  fetchInFlight = true;

  loading.value = true;
  error.value = null;
  retryCount.value = 0;

  try {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        await fetchData();
        return;
      } catch (err) {
        console.error('❌ PUBLIC: Error fetching products:', err);
        console.error('❌ PUBLIC: Error code:', err.code);
        console.error('❌ PUBLIC: Error message:', err.message);

        // Don't burn retries on failures a retry can never fix
        // (denied rules, missing index, bad query)
        if (attempt === maxRetries || !isRetryable(err)) {
          if (attempt === maxRetries) console.error('❌ PUBLIC: Max retries reached');
          allProducts.value = [];
          error.value = `${t('products.loadFailed')}: ${describeError(err)}`;
          return;
        }

        retryCount.value = attempt + 1;
        console.log(`🔄 PUBLIC: Retrying... (${retryCount.value}/${maxRetries})`);
        await wait(retryDelayMs);
        if (cancelled) return;
      }
    }
  } finally {
    retryTimer = null;
    cancelPendingWait = null;
    fetchInFlight = false;
    loading.value = false;
  }
};

// Fetch data on component mount (client-side only)
onMounted(() => {
  if (import.meta.client) {
    fetchDataWithRetry();
  }
});

// Don't leave a retry timer running after the user navigates away
onUnmounted(() => {
  cancelled = true;
  if (retryTimer) {
    clearTimeout(retryTimer);
    retryTimer = null;
  }
  if (cancelPendingWait) {
    cancelPendingWait();
    cancelPendingWait = null;
  }
});

// Computed properties for filtering
const filteredProducts = computed(() => {
  let products = allProducts.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    products = products.filter(product =>
      product.name?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
  }

  console.log('🔍 PUBLIC: Filtered products count:', products.length);
  console.log('📄 PUBLIC: Should show pagination (computed):', products.length > itemsPerPage.value);

  return products;
});

// Computed properties for pagination
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

// Computed for pagination display info
const startItem = computed(() => {
  return filteredProducts.value.length > 0 ? (currentPage.value - 1) * itemsPerPage.value + 1 : 0;
});

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return Math.min(end, filteredProducts.value.length);
});

// Generate visible page numbers for pagination
const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 3; // Show more page numbers (3 on each side)

  let start = Math.max(1, current - delta);
  let end = Math.min(total, current + delta);

  // Show at least 7 pages when possible
  if (current <= delta) {
    end = Math.min(total, 2 * delta + 1);
  }
  if (current + delta >= total) {
    start = Math.max(1, total - 2 * delta);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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
  currentPage.value = 1; // Reset to first page when changing items per page
};

// Watch for search changes and reset pagination
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Get product image - handle both single image and images array
const getProductImage = (product) => {
  // If product has images array, use the first one
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    return product.images[0];
  }

  // If product has imageUrl (single image)
  if (product.imageUrl && typeof product.imageUrl === 'string') {
    return product.imageUrl;
  }

  // If product has image property (alternative single image)
  if (product.image && typeof product.image === 'string') {
    return product.image;
  }

  // Default fallback image
  return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop';
};

// SEO
useHead({
  title: 'Our Products - BakeryHouse | Fresh Baked Goods',
  meta: [
    {
      name: 'description',
      content: 'Explore our wide range of fresh baked products including artisan breads, custom cakes, pastries, and cookies. All made daily with the finest ingredients.'
    },
    {
      property: 'og:title',
      content: 'BakeryHouse Products - Fresh Breads, Cakes, Pastries & More'
    },
    {
      property: 'og:description',
      content: 'Discover our delicious selection of baked goods including croissants, artisan breads, custom cakes, and sweet treats. Order now for pickup or delivery.'
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