<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[60vh]"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y3JvaXNzYW50c3xlbnwwfHwwfHx8MA%3D%3D')`,
      }"
    >
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 h-full flex items-center justify-center px-4">
        <div class="text-center text-white">
          <h1 class="text-5xl lg:text-7xl font-bold mb-4 italic" style="font-family: 'Brush Script MT', cursive;">
            Our bakery
          </h1>
          <p class="text-xl lg:text-2xl">Fresh baked daily with the finest ingredients</p>
        </div>
      </div>
    </section>

    <!-- All Products Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">All Bakery Products</h2>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <div class="text-red-600 text-xl mb-4">{{ error }}</div>
          <button
            @click="fetchData"
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
            placeholder="Search bakery products..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          />
        </div>

        <!-- Products Grid -->
        <div v-if="!loading && !error && filteredProducts.length > 0" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div v-for="product in paginatedProducts" :key="product.id">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
              <img
                :src="product.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop'"
                :alt="product.name"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">{{ product.name }}</h3>
                <p v-if="product.description" class="text-gray-600 text-sm mb-2">{{ product.description }}</p>
                <div class="text-red-600 font-semibold">
                  {{ typeof product.price === 'number' ? product.price.toLocaleString() : product.price }} KIP
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Products Message -->
        <div v-else-if="!loading && !error && filteredProducts.length === 0 && allProducts.length > 0" class="text-center py-20">
          <div class="text-gray-600 text-xl">No products found matching your search.</div>
          <p class="text-gray-500 mt-2">Try adjusting your search terms or filters.</p>
        </div>

        <!-- No Products Available -->
        <div v-else-if="!loading && !error && allProducts.length === 0" class="text-center py-20">
          <div class="text-gray-600 text-xl">No products available at the moment.</div>
          <p class="text-gray-500 mt-2">Please check back later or contact us for more information.</p>
        </div>

        <!-- Search Results Count -->
        <div v-if="!loading && !error && searchQuery && filteredProducts.length > 0" class="text-center mb-8">
          <p class="text-gray-600">
            Showing {{ filteredProducts.length }} result{{ filteredProducts.length !== 1 ? 's' : '' }}
            <span v-if="searchQuery">for "{{ searchQuery }}"</span>
          </p>
        </div>

        <!-- Pagination -->
        <div v-if="filteredProducts.length > itemsPerPage && !loading && !error" class="flex justify-center items-center space-x-4">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            :class="[
              'px-4 py-2 rounded-lg font-semibold transition-colors',
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-900 text-white hover:bg-red-950'
            ]"
          >
            Previous
          </button>

          <div class="flex space-x-2">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-3 py-2 rounded-lg font-semibold transition-colors',
                currentPage === page
                  ? 'bg-red-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            :class="[
              'px-4 py-2 rounded-lg font-semibold transition-colors',
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-900 text-white hover:bg-red-950'
            ]"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const { getProductsFilteredByBakeryTypes } = useProducts();

// Loading states
const loading = ref(true);
const error = ref(null);

// Search
const searchQuery = ref('');

// Pagination
const currentPage = ref(1);
const itemsPerPage = 8;

// Data from Firestore
const allProducts = ref([]);

// Fetch products filtered by bakery types
const fetchData = async () => {
  try {
    console.log('🚀 PUBLIC: Fetching products filtered by bakery types...');
    loading.value = true;
    error.value = null;

    allProducts.value = await getProductsFilteredByBakeryTypes();
    console.log('✅ PUBLIC: Products loaded:', allProducts.value.length);

  } catch (err) {
    console.error('❌ PUBLIC: Error fetching products:', err);
    error.value = `Failed to load products: ${err.message}`;
    allProducts.value = [];
  } finally {
    loading.value = false;
  }
};

// Fetch data on component mount
onMounted(() => {
  fetchData();
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

  return products;
});

// Computed properties for pagination
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
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

// Watch for search changes and reset pagination
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Methods
const navigateToCategory = (category) => {
  router.push(`/products/${category}`);
};

// SEO
useHead({
  title: 'Our Products - Bakery House | Fresh Baked Goods',
  meta: [
    {
      name: 'description',
      content: 'Explore our wide range of fresh baked products including artisan breads, custom cakes, pastries, and cookies. All made daily with the finest ingredients.'
    },
    {
      property: 'og:title',
      content: 'Bakery House Products - Fresh Breads, Cakes, Pastries & More'
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