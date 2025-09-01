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
            Our Products
          </h1>
          <p class="text-xl lg:text-2xl">Fresh baked daily with the finest ingredients</p>
        </div>
      </div>
    </section>

    <!-- Product Categories -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">Product Categories</h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Breads -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer" @click="navigateToCategory('breads')">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop"
              alt="Fresh Breads"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-2">Breads</h3>
              <p class="text-gray-600 mb-4">Artisan breads baked fresh daily</p>
              <div class="text-red-600 font-semibold">View Products →</div>
            </div>
          </div>

          <!-- Cakes -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer" @click="navigateToCategory('cakes')">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
              alt="Fresh Cakes"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-2">Cakes</h3>
              <p class="text-gray-600 mb-4">Custom and ready-made cakes</p>
              <div class="text-red-600 font-semibold">View Products →</div>
            </div>
          </div>

          <!-- Pastries -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer" @click="navigateToCategory('pastries')">
            <img
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop"
              alt="Fresh Pastries"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-2">Pastries</h3>
              <p class="text-gray-600 mb-4">Croissants, puffs, and more</p>
              <div class="text-red-600 font-semibold">View Products →</div>
            </div>
          </div>

          <!-- Cookies -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer" @click="navigateToCategory('cookies')">
            <img
              src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop"
              alt="Fresh Cookies"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-2">Cookies</h3>
              <p class="text-gray-600 mb-4">Sweet treats and cookies</p>
              <div class="text-red-600 font-semibold">View Products →</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">Featured Products</h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="product in featuredProducts" :key="product.id" class="bg-gray-50 rounded-lg shadow-lg overflow-hidden p-6 text-center">
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ product.name }}</h3>
            <span class="text-2xl font-bold text-red-600">${{ product.price }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- All Products Grid -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">All Products</h2>
        
        <!-- Products Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow p-6 text-center"
          >
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ product.name }}</h3>
            <span class="text-2xl font-bold text-red-600">${{ product.price }}</span>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center space-x-4">
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

    <!-- Call to Action -->
    <section class="py-16 bg-red-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Custom Orders Available</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Need something special? We create custom cakes and catering platters for your events.
        </p>
        <button class="bg-white text-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Contact Us for Custom Orders
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// Pagination
const currentPage = ref(1);
const itemsPerPage = 8;

// Featured products
const featuredProducts = ref([
  {
    id: 1,
    name: "Ham Cheese Croissant",
    description: "Buttery croissant filled with ham and cheese",
    price: "4.50",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    category: "Pastries"
  },
  {
    id: 2,
    name: "Chocolate Lava Cake",
    description: "Rich chocolate cake with molten center",
    price: "6.99",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    category: "Cakes"
  },
  {
    id: 3,
    name: "Whole Wheat Bread",
    description: "Nutritious multigrain bread",
    price: "3.25",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    category: "Breads"
  }
]);

// All products
const allProducts = ref([
  // Breads
  { id: 1, name: "Whole Wheat Multigrain Bread", category: "Breads", price: "3.25", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop" },
  { id: 2, name: "Sourdough Bread", category: "Breads", price: "4.50", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=200&fit=crop" },
  { id: 3, name: "French Baguette", category: "Breads", price: "2.75", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=200&fit=crop" },
  
  // Pastries
  { id: 4, name: "Ham Cheese Croissant", category: "Pastries", price: "4.50", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=200&fit=crop" },
  { id: 5, name: "Almond Croissant", category: "Pastries", price: "3.75", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=200&fit=crop" },
  { id: 6, name: "Butter Croissant", category: "Pastries", price: "2.99", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=200&fit=crop" },
  { id: 7, name: "Spinach Cheese Croissant", category: "Pastries", price: "4.25", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=200&fit=crop" },
  { id: 8, name: "Cream Puffs", category: "Pastries", price: "3.50", image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop" },
  { id: 9, name: "Cream Puffs Matcha", category: "Pastries", price: "3.75", image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop" },
  { id: 10, name: "Coconut Pie", category: "Pastries", price: "4.99", image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop" },
  
  // Cakes
  { id: 11, name: "Chocolate Two Tone Lava", category: "Cakes", price: "6.99", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop" },
  { id: 12, name: "Carrot Cake", category: "Cakes", price: "5.75", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop" },
  { id: 13, name: "Mousse Cake Matcha", category: "Cakes", price: "7.50", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop" },
  { id: 14, name: "Cheese Cake", category: "Cakes", price: "6.25", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop" },
  { id: 15, name: "Red Velvet Cake", category: "Cakes", price: "6.75", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop" },
  { id: 16, name: "Cake Milk", category: "Cakes", price: "4.99", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop" },
  { id: 17, name: "Chocolate Top Mousse", category: "Cakes", price: "7.25", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop" },
  
  // Cookies
  { id: 18, name: "Cookie Red Velvet", category: "Cookies", price: "2.50", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop" },
  { id: 19, name: "Cookie Chocolate", category: "Cookies", price: "2.25", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop" },
  { id: 20, name: "Cookie Matcha", category: "Cookies", price: "2.75", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop" },
  { id: 21, name: "White Chocolate Oreo", category: "Cookies", price: "3.25", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop" }
]);

// Computed properties for pagination
const totalPages = computed(() => {
  return Math.ceil(allProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allProducts.value.slice(start, end);
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