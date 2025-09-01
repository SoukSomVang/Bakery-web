<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-white">
    <!-- Header Navigation -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-50">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-red-800 rounded-sm flex items-center justify-center">
            <span class="text-white font-bold text-lg">B</span>
          </div>
          <span class="text-xl font-bold text-gray-800">Bakery</span>
        </NuxtLink>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">
            Home
          </NuxtLink>
          <NuxtLink to="/about-us" class="nav-link" :class="{ 'active': $route.path === '/about-us' }">
            About Us
          </NuxtLink>
          
          <!-- Products Dropdown Menu -->
          <div class="relative" ref="productsDropdown">
            <button 
              @click="toggleProductsDropdown"
              class="nav-link flex items-center"
              :class="{ 'active': isProductsDropdownOpen || $route.path.startsWith('/products') }"
            >
              Products
              <svg 
                class="w-4 h-4 ml-1 transform transition-transform duration-200" 
                :class="{ 'rotate-180': isProductsDropdownOpen }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <!-- Products Dropdown Content -->
            <div 
              v-show="isProductsDropdownOpen"
              class="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10"
            >
              <div class="py-1">
                <NuxtLink to="/products" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  All Products
                </NuxtLink>
                <NuxtLink to="/products/breads" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Fresh Breads
                </NuxtLink>
                <NuxtLink to="/products/cakes" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Cakes
                </NuxtLink>
                <NuxtLink to="/products/pastries" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Pastries
                </NuxtLink>
                <NuxtLink to="/products/cookies" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Cookies
                </NuxtLink>
              </div>
            </div>
          </div>

          <NuxtLink to="/gallery" class="nav-link" :class="{ 'active': $route.path === '/gallery' }">
            Gallery
          </NuxtLink>
          <NuxtLink to="/branches" class="nav-link" :class="{ 'active': $route.path === '/branches' }">
            Locations
          </NuxtLink>
          <NuxtLink to="/catering" class="nav-link" :class="{ 'active': $route.path === '/catering' }">
            Catering
          </NuxtLink>
          <NuxtLink to="/contact-us" class="nav-link" :class="{ 'active': $route.path === '/contact-us' }">
            Contact
          </NuxtLink>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-4">
          <!-- Search Button -->
          <button 
            @click="toggleSearch"
            class="p-2 text-gray-600 hover:text-red-800 transition-colors"
            title="Search"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          
          <!-- Contact Us Button -->
          <NuxtLink to="/contact-us">
            <button class="bg-red-800 text-white px-6 py-2 rounded-md hover:bg-red-900 transition-colors">
              Contact Us
            </button>
          </NuxtLink>
          
          <!-- User Account -->
          <button 
            @click="toggleUserMenu"
            class="p-2 text-gray-600 hover:text-red-800 transition-colors"
            title="Account"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2"
        >
          <svg 
            class="w-6 h-6 transform transition-transform duration-200" 
            :class="{ 'rotate-90': isMobileMenuOpen }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div 
        v-show="isMobileMenuOpen"
        class="md:hidden bg-white border-t border-gray-200"
      >
        <div class="px-4 py-2 space-y-1">
          <NuxtLink to="/" class="block py-2 text-gray-700 hover:text-red-800">
            Home
          </NuxtLink>
          <NuxtLink to="/about-us" class="block py-2 text-gray-700 hover:text-red-800">
            About Us
          </NuxtLink>
          <div class="py-2">
            <span class="text-gray-700 font-medium">Products</span>
            <div class="ml-4 mt-1 space-y-1">
              <NuxtLink to="/products" class="block py-1 text-sm text-gray-600 hover:text-red-800">
                All Products
              </NuxtLink>
              <NuxtLink to="/products/breads" class="block py-1 text-sm text-gray-600 hover:text-red-800">
                Fresh Breads
              </NuxtLink>
              <NuxtLink to="/products/cakes" class="block py-1 text-sm text-gray-600 hover:text-red-800">
                Cakes
              </NuxtLink>
              <NuxtLink to="/products/pastries" class="block py-1 text-sm text-gray-600 hover:text-red-800">
                Pastries
              </NuxtLink>
              <NuxtLink to="/products/cookies" class="block py-1 text-sm text-gray-600 hover:text-red-800">
                Cookies
              </NuxtLink>
            </div>
          </div>
          <NuxtLink to="/gallery" class="block py-2 text-gray-700 hover:text-red-800">
            Gallery
          </NuxtLink>
          <NuxtLink to="/branches" class="block py-2 text-gray-700 hover:text-red-800">
            Locations
          </NuxtLink>
          <NuxtLink to="/catering" class="block py-2 text-gray-700 hover:text-red-800">
            Catering
          </NuxtLink>
          <NuxtLink to="/contact-us" class="block py-2 text-gray-700 hover:text-red-800">
            Contact
          </NuxtLink>
        </div>
      </div>

      <!-- Search Overlay -->
      <div 
        v-show="isSearchOpen"
        class="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg"
      >
        <div class="container mx-auto px-4 py-4">
          <div class="relative">
            <input 
              type="text"
              placeholder="Search for bakery items..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              v-model="searchQuery"
              @keyup.enter="performSearch"
            >
            <button 
              @click="performSearch"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-800"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <!-- Explore -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Explore</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-red-400 hover:text-red-300">Home</NuxtLink></li>
              <li><NuxtLink to="/about-us" class="text-red-400 hover:text-red-300">About Us</NuxtLink></li>
              <li><NuxtLink to="/gallery" class="text-red-400 hover:text-red-300">Gallery</NuxtLink></li>
              <li><NuxtLink to="/branches" class="text-red-400 hover:text-red-300">Locations</NuxtLink></li>
            </ul>
          </div>

          <!-- Products -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Products</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/products" class="text-red-400 hover:text-red-300">All Products</NuxtLink></li>
              <li><NuxtLink to="/products/breads" class="text-red-400 hover:text-red-300">Fresh Breads</NuxtLink></li>
              <li><NuxtLink to="/products/cakes" class="text-red-400 hover:text-red-300">Cakes</NuxtLink></li>
              <li><NuxtLink to="/products/pastries" class="text-red-400 hover:text-red-300">Pastries</NuxtLink></li>
            </ul>
          </div>

          <!-- Services -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Services</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/catering" class="text-red-400 hover:text-red-300">Catering</NuxtLink></li>
              <li><NuxtLink to="/products/cookies" class="text-red-400 hover:text-red-300">Custom Orders</NuxtLink></li>
              <li><NuxtLink to="/products/cakes" class="text-red-400 hover:text-red-300">Wedding Cakes</NuxtLink></li>
              <li><NuxtLink to="/contact-us" class="text-red-400 hover:text-red-300">Consultation</NuxtLink></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Get in touch</h3>
            <ul class="space-y-2">
              <li><a href="mailto:info@bakeryhouse.com" class="text-gray-300 hover:text-white">info@bakeryhouse.com</a></li>
              <li><a href="tel:+8562055555556" class="text-gray-300 hover:text-white">+856 20 5555 5556</a></li>
              <li><NuxtLink to="/contact-us" class="text-red-400 hover:text-red-300">Contact Form</NuxtLink></li>
            </ul>
            <div class="mt-4">
              <h4 class="text-sm font-semibold mb-2">Follow us</h4>
              <div class="flex space-x-3">
                <a href="#" class="text-gray-400 hover:text-red-300">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-red-300">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-red-300">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Company Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Bakery House</h3>
            <address class="text-gray-300 not-italic">
              Bakery House<br>
              Vientiane, Laos<br>
              Service Since 10/10/2024
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

        <!-- Copyright -->
        <div class="mt-8 pt-8 border-t border-gray-700 text-center">
          <p class="text-gray-400">
            © {{ new Date().getFullYear() }} Bakery House. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <Transition name="scroll-top">
      <button
        v-show="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-50 w-12 h-12 bg-red-800 text-white rounded-full shadow-lg hover:bg-red-900 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        title="Scroll to top"
      >
        <svg 
          class="w-6 h-6 mx-auto" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup>
// Reactive state for navigation
const isProductsDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')
const productsDropdown = ref(null)

// Scroll to top functionality
const showScrollTop = ref(false)

// Toggle functions
const toggleProductsDropdown = () => {
  isProductsDropdownOpen.value = !isProductsDropdownOpen.value
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    nextTick(() => {
      const searchInput = document.querySelector('input[type="text"]')
      if (searchInput) searchInput.focus()
    })
  }
}

const toggleUserMenu = () => {
  // Handle user menu toggle (can be expanded)
  console.log('User menu clicked')
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    // Navigate to search results page
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
    isSearchOpen.value = false
    searchQuery.value = ''
  }
}

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Handle scroll events
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

// Close dropdowns when clicking outside
const closeDropdowns = (event) => {
  if (productsDropdown.value && !productsDropdown.value.contains(event.target)) {
    isProductsDropdownOpen.value = false
  }
}

// Handle route changes
const route = useRoute()
watch(() => route.path, () => {
  // Close mobile menu on route change
  isMobileMenuOpen.value = false
  isProductsDropdownOpen.value = false
  isSearchOpen.value = false
})

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', closeDropdowns)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-red-800 px-3 py-2 text-sm font-medium transition-colors duration-200;
}

.nav-link.active {
  @apply text-red-800 font-semibold;
}

.container {
  max-width: 1200px;
}

/* Smooth transitions */
.rotate-90 {
  transform: rotate(90deg);
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Scroll to top button transitions */
.scroll-top-enter-active,
.scroll-top-leave-active {
  transition: all 0.3s ease;
}

.scroll-top-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}
</style>