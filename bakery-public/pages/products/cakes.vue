<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[60vh]"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3')`,
      }"
    >
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 h-full flex items-center justify-center px-4">
        <div class="text-center text-white">
          <h1 class="text-5xl lg:text-7xl font-bold mb-4 italic" style="font-family: 'Brush Script MT', cursive;">
            Our cakes
          </h1>
          <p class="text-xl lg:text-2xl">Fresh baked daily with the finest ingredients</p>
        </div>
      </div>
    </section>

    <!-- Product Categories -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">All Cakes</h2>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <div class="text-red-600 text-xl mb-4">{{ error }}</div>
          <button
            @click="fetchCakes"
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
            placeholder="Search cakes..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          />
        </div>

        <!-- Cakes Grid -->
        <div v-if="!loading && !error" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div v-for="cake in paginatedCakes" :key="cake.id">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
              <img
                :src="cake.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop'"
                :alt="cake.name"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">{{ cake.name }}</h3>
                <p v-if="cake.description" class="text-gray-600 text-sm mb-2">{{ cake.description }}</p>
                <div class="text-red-600 font-semibold">
                  {{ typeof cake.price === 'number' ? cake.price.toLocaleString() : cake.price }} KIP
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Cakes Message -->
        <div v-if="!loading && !error && filteredCakes.length === 0" class="text-center py-20">
          <div class="text-gray-600 text-xl">No cakes found.</div>
          <p class="text-gray-500 mt-2">{{ searchQuery ? 'Try adjusting your search terms.' : 'Check back later for new cake varieties.' }}</p>
        </div>
      </div>
    </section>

    <!-- All Products Grid -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">

        <!-- Pagination -->
        <div v-if="filteredCakes.length > itemsPerPage && !loading && !error" class="flex justify-center items-center space-x-4">
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
const { getProductsByBakeryType } = useProducts();

// Loading and error states
const loading = ref(true);
const error = ref(null);

// Search
const searchQuery = ref('');

// Pagination
const currentPage = ref(1);
const itemsPerPage = 8;

// Data
const allCakes = ref([]);

// Fetch cakes from Firestore (filtering by bakery type)
const fetchCakes = async () => {
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
  return Math.ceil(filteredCakes.value.length / itemsPerPage);
});

const paginatedCakes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCakes.value.slice(start, end);
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

// Methods
const navigateToCategory = (category) => {
  router.push(`/products/${category}`);
};

// Fetch data on component mount
onMounted(() => {
  fetchCakes();
});

// SEO
useHead({
  title: 'Cakes - Bakery House | Fresh Baked Cakes',
  meta: [
    {
      name: 'description',
      content: 'Explore our delicious selection of fresh baked cakes including chocolate, vanilla, red velvet, and custom celebration cakes. Made daily with the finest ingredients.'
    },
    {
      property: 'og:title',
      content: 'Fresh Baked Cakes - Bakery House'
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