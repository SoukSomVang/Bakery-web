<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[50vh]"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1509440159596-0249088772ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3')`,
      }"
    >
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 h-full flex items-center justify-center px-4">
        <div class="text-center text-white">
          <h1 class="text-5xl lg:text-6xl font-bold mb-4 italic" style="font-family: 'Brush Script MT', cursive;">
            Fresh Breads
          </h1>
          <p class="text-xl lg:text-2xl">Artisan breads baked fresh every morning</p>
        </div>
      </div>
    </section>

    <!-- Breadcrumb -->
    <section class="py-4 bg-white border-b">
      <div class="container mx-auto px-4">
        <nav class="text-sm text-gray-600">
          <NuxtLink to="/" class="hover:text-red-600">Home</NuxtLink>
          <span class="mx-2">></span>
          <NuxtLink to="/products" class="hover:text-red-600">Products</NuxtLink>
          <span class="mx-2">></span>
          <span class="text-gray-800 font-semibold">Breads</span>
        </nav>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <div class="text-red-600 text-xl mb-4">{{ error }}</div>
          <button
            @click="fetchBreads"
            class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
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
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
              <img
                :src="bread.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop'"
                :alt="bread.name"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">{{ bread.name }}</h3>
                <p v-if="bread.description" class="text-gray-600 text-sm mb-2">{{ bread.description }}</p>
                <div class="text-red-600 font-semibold">
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

    <!-- Our Commitment Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Commitment to Quality</h2>
            <p class="text-lg text-gray-700 mb-6">
              Every loaf is crafted with passion and precision, using time-honored techniques passed down through generations of bakers.
            </p>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">Organic flour and premium ingredients</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">Natural fermentation process</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">Hand-shaped and stone-baked</span>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
              alt="Baker at work"
              class="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-red-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Fresh Daily</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Our breads are baked fresh every morning. Pre-order to guarantee your favorites!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-white text-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Pre-Order Now
          </button>
          <button class="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-colors">
            View All Products
          </button>
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
  title: 'Fresh Breads - Bakery House | Artisan Breads Daily',
  meta: [
    {
      name: 'description',
      content: 'Discover our selection of artisan breads including sourdough, multigrain, baguettes and more. Baked fresh daily using traditional techniques and premium ingredients.'
    },
    {
      property: 'og:title',
      content: 'Fresh Artisan Breads - Bakery House'
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
