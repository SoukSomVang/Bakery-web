<template>
  <div class="min-h-screen bg-white">
    <!-- Header Navigation -->
    <header class="bg-white shadow-sm border-b">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-red-800 rounded-sm flex items-center justify-center">
            <span class="text-white font-bold text-lg">B</span>
          </div>
          <span class="text-xl font-bold text-gray-800">Bakery</span>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-700 hover:text-red-800 font-medium">Home</NuxtLink>
          <NuxtLink to="/contact" class="text-gray-700 hover:text-red-800 font-medium">Contact us</NuxtLink>
          <NuxtLink to="/bakery" class="text-gray-700 hover:text-red-800 font-medium">All Bakery</NuxtLink>
          <div class="relative">
            <button class="text-gray-700 hover:text-red-800 font-medium flex items-center">
              Cake
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-4">
          <button class="p-2 text-gray-600 hover:text-red-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <button class="bg-red-800 text-white px-6 py-2 rounded-md hover:bg-red-900 transition-colors">
            Contact Us
          </button>
          <button class="p-2 text-gray-600 hover:text-red-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-red-800 to-red-900 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              Bakery House
            </h1>
            <p class="text-xl mb-4">Service Since 10/10/2024</p>
            <p class="text-lg mb-8 opacity-90">
              We are a team of passionate people whose goal is to improve everyone's life through disruptive products.
            </p>
            <button class="bg-red-900 hover:bg-red-950 px-8 py-3 rounded-md font-semibold transition-colors">
              Learn more
            </button>
          </div>
          <div class="relative">
            <div class="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
              <img src="/api/placeholder/400/300" alt="Bakery display" class="w-full rounded-lg shadow-lg">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature 1 -->
          <div class="bg-gray-700 text-white p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-4">1. USING THE BEST RAW</h3>
            <p class="text-sm opacity-90">
              Using the best raw, making the best result, the best raw for the best you, Gain from the best raw.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <h3 class="text-xl font-bold mb-4 text-gray-800">2. CONTINUOUS PRODUCT</h3>
            <p class="text-sm text-gray-600">
              Development which fulfills nutrition needs of LAOS.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <h3 class="text-xl font-bold mb-4 text-gray-800">3. DEVELOPING MANUFA</h3>
            <p class="text-sm text-gray-600">
              Grand management technologies for constant improvement in product quality.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-red-800 text-white p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-4">4. HOLDING ON TO SAFETY</h3>
            <p class="text-sm opacity-90">
              Freshness, and cleanliness of products to offer the best to consumers.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">ALL BAKERY</h2>
        
        <!-- Product Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div v-for="product in bakeryProducts" :key="product.id" class="text-center">
            <div class="bg-gray-100 rounded-full w-48 h-48 mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
            </div>
            <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
          </div>
        </div>

        <!-- Cakes Section -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div v-for="cake in cakeProducts" :key="cake.id" class="text-center">
            <div class="bg-gray-100 rounded-full w-48 h-48 mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <img :src="cake.image" :alt="cake.name" class="w-full h-full object-cover">
            </div>
            <h3 class="text-lg font-semibold text-gray-800">{{ cake.name }}</h3>
          </div>
        </div>

        <!-- Additional Products -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="item in additionalProducts" :key="item.id" class="text-center">
            <div class="bg-gray-100 rounded-full w-48 h-48 mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
            </div>
            <h3 class="text-lg font-semibold text-gray-800">{{ item.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Branches Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-8 text-gray-800 underline">Branches</h2>
        <div class="space-y-4 max-w-md mx-auto">
          <div class="text-lg font-medium text-gray-700 underline">Treekoff NorngNieng</div>
          <div class="text-lg font-medium text-gray-700 underline">Treekoff Dongpalan</div>
          <div class="text-lg font-medium text-gray-700 underline">Treekoff Wattainoy</div>
          <div class="text-lg font-medium text-gray-700 underline">Treekoff Vatchan</div>
          <div class="text-lg text-gray-500">--</div>
          <div class="text-lg text-gray-500">--</div>
        </div>
      </div>
    </section>

    <!-- Product Showcase -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold mb-6 text-gray-800">
              Whole Wheat Multigrain Bread
            </h2>
            <button class="bg-red-800 hover:bg-red-900 text-white px-8 py-3 rounded-md font-semibold transition-colors">
              Learn More
            </button>
          </div>
          <div>
            <img src="/api/placeholder/400/500" alt="Whole Wheat Bread" class="w-full rounded-lg shadow-lg">
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <!-- Explore -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Explore</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-red-400 hover:text-red-300">Home</a></li>
              <li><a href="#" class="text-red-400 hover:text-red-300">Our Company</a></li>
              <li><a href="#" class="text-red-400 hover:text-red-300">Case Studies</a></li>
              <li><a href="#" class="text-red-400 hover:text-red-300">Blog</a></li>
            </ul>
          </div>

          <!-- Services -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Services</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-red-400 hover:text-red-300">Documentation</a></li>
              <li><a href="#" class="text-red-400 hover:text-red-300">Marketplace</a></li>
              <li><a href="#" class="text-red-400 hover:text-red-300">Design</a></li>
              <li><a href="#" class="text-red-400 hover:text-red-300">Resources</a></li>
            </ul>
          </div>

          <!-- Follow Us -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Follow us</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-red-400 hover:text-red-300">Facebook</a></li>
              <li><a href="#" class="text-red-400 hover:text-red-300">X</a></li>
              <li><a href="#" class="text-red-400 hover:text-red-300">LinkedIn</a></li>
              <li><a href="#" class="text-red-400 hover:text-red-300">Instagram</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Get in touch</h3>
            <ul class="space-y-2">
              <li><a href="mailto:info@yourcompany.com" class="text-gray-300">info@yourcompany.com</a></li>
              <li><a href="tel:+1555-555-5556" class="text-gray-300">+1 555-555-5556</a></li>
            </ul>
          </div>

          <!-- Company Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">My Company</h3>
            <address class="text-gray-300 not-italic">
              250 Executive Park Blvd, Suite 3400<br>
              San Francisco CA 94134<br>
              United States
            </address>
          </div>
        </div>

        <!-- About Us -->
        <div class="mt-12 pt-8 border-t border-gray-700">
          <h3 class="text-lg font-semibold mb-4">About us</h3>
          <p class="text-gray-300 max-w-2xl">
            We are a team of passionate people whose goal is to improve everyone's life through disruptive products. We build great products to solve your business problems.
          </p>
          <p class="text-gray-300 mt-4">
            Our products are designed for small to medium size companies willing to optimize their performance.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Product data
const bakeryProducts = ref([
  { id: 1, name: 'Ham cheese croissant', image: '/api/placeholder/200/200' },
  { id: 2, name: 'Chocolate two tone lava', image: '/api/placeholder/200/200' },
  { id: 3, name: 'Almond croissant', image: '/api/placeholder/200/200' },
  { id: 4, name: 'White chocolate Oreo', image: '/api/placeholder/200/200' },
  { id: 5, name: 'Butter croissant', image: '/api/placeholder/200/200' },
  { id: 6, name: 'Spinach and cheese croissant', image: '/api/placeholder/200/200' },
  { id: 7, name: 'Cookie red velvet', image: '/api/placeholder/200/200' },
  { id: 8, name: 'Cookie Chocolate', image: '/api/placeholder/200/200' }
])

const cakeProducts = ref([
  { id: 9, name: 'Cookie matcha', image: '/api/placeholder/200/200' },
  { id: 10, name: 'Cream puffs', image: '/api/placeholder/200/200' },
  { id: 11, name: 'Cream puffs matcha', image: '/api/placeholder/200/200' },
  { id: 12, name: 'Coconut pie', image: '/api/placeholder/200/200' },
  { id: 13, name: 'Carrot cake', image: '/api/placeholder/200/200' },
  { id: 14, name: 'Mousse cake Matcha', image: '/api/placeholder/200/200' },
  { id: 15, name: 'Cheese cake', image: '/api/placeholder/200/200' },
  { id: 16, name: 'Red velvet cake', image: '/api/placeholder/200/200' }
])

const additionalProducts = ref([
  { id: 17, name: 'Cake milk', image: '/api/placeholder/200/200' },
  { id: 18, name: 'Chocolate top mousse', image: '/api/placeholder/200/200' },
  { id: 19, name: 'Timbering Matcha', image: '/api/placeholder/200/200' },
  { id: 20, name: 'Timbering Chocolate', image: '/api/placeholder/200/200' },
  { id: 21, name: 'Coffee', image: '/api/placeholder/200/200' },
  { id: 22, name: 'Coffee chocolate', image: '/api/placeholder/200/200' },
  { id: 23, name: 'Coffee Matcha', image: '/api/placeholder/200/200' },
  { id: 24, name: 'Eggs tart', image: '/api/placeholder/200/200' }
])

// Meta tags for SEO
useSeoMeta({
  title: 'Bakery House - Fresh Baked Goods Daily',
  ogTitle: 'Bakery House - Fresh Baked Goods Daily',
  description: 'Experience the finest bakery products made with the best ingredients. From croissants to cakes, we serve fresh baked goods daily.',
  ogDescription: 'Experience the finest bakery products made with the best ingredients. From croissants to cakes, we serve fresh baked goods daily.',
  ogImage: '/api/placeholder/1200/630',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
/* Custom styles if needed */
.container {
  max-width: 1200px;
}
</style>