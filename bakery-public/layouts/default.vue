<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-white">
    <!-- Header Navigation -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-50">
      <nav
        class="container mx-auto px-4 py-4 flex items-center justify-between"
      >
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <img :src="Logo" alt="" width="60" height="40" />
        </NuxtLink>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            to="/"
            class="nav-link"
            :class="{ active: $route.path === '/' }"
          >
            {{ t('nav.home') }}
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="nav-link"
            :class="{ active: $route.path === '/products' }"
          >
            {{ t('nav.allBakery') }}
          </NuxtLink>
          <NuxtLink
            to="/products/cakes"
            :class="{ active: $route.path === '/products/cakes' }"
            class="nav-link"
          >
            {{ t('nav.cakes') }}
          </NuxtLink>
          <NuxtLink
            to="/contact-us"
            class="nav-link"
            :class="{ active: $route.path === '/contact-us' }"
          >
            {{ t('nav.contactUs') }}
          </NuxtLink>
          <NuxtLink
            to="/about-us"
            class="nav-link"
            :class="{ active: $route.path === '/about-us' }"
          >
            {{ t('nav.aboutUs') }}
          </NuxtLink>
          <NuxtLink
            to="/manual"
            class="nav-link"
            :class="{ active: $route.path === '/manual' }"
          >
            {{ t('nav.manual') }}
          </NuxtLink>
          <NuxtLink
            to="/news"
            class="nav-link"
            :class="{ active: $route.path.startsWith('/news') }"
          >
            {{ t('nav.news') }}
          </NuxtLink>

          <!-- Products Dropdown Menu -->
          <!-- <div class="relative" ref="productsDropdown">
            <button
              @click="toggleProductsDropdown"
              class="nav-link flex items-center"
              :class="{
                active:
                  isProductsDropdownOpen || $route.path.startsWith('/products'),
              }"
            >
              Products
              <svg
                class="w-4 h-4 ml-1 transform transition-transform duration-200"
                :class="{ 'rotate-180': isProductsDropdownOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

           
            <div
              v-show="isProductsDropdownOpen"
              class="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10"
            >
              <div class="py-1">
                <NuxtLink
                  to="/products/breads"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Fresh Breads
                </NuxtLink>

                <NuxtLink
                  to="/products/pastries"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Pastries
                </NuxtLink>
                <NuxtLink
                  to="/products/cookies"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cookies
                </NuxtLink>
              </div>
            </div>
          </div> -->

          <!-- <NuxtLink
            to="/gallery"
            class="nav-link"
            :class="{ active: $route.path === '/gallery' }"
          >
            Gallery
          </NuxtLink>
          <NuxtLink
            to="/branches"
            class="nav-link"
            :class="{ active: $route.path === '/branches' }"
          >
            Locations
          </NuxtLink>
          <NuxtLink
            to="/catering"
            class="nav-link"
            :class="{ active: $route.path === '/catering' }"
          >
            Catering
          </NuxtLink> -->
        </div>

        <!-- Action Buttons - Hidden on mobile -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Language Switcher -->
          <LanguageSwitcher />

          <!-- Contact Us Button -->
          <NuxtLink to="/contact-us">
            <button
              class="bg-red-800 text-white px-6 py-2 rounded-md hover:bg-red-900 transition-colors"
            >
              {{ t('nav.contactUs') }}
            </button>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="md:hidden p-2">
          <svg
            class="w-6 h-6 transform transition-transform duration-200"
            :class="{ 'rotate-90': isMobileMenuOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu Backdrop -->
      <Transition name="fade">
        <div
          v-show="isMobileMenuOpen"
          @click="toggleMobileMenu"
          class="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          style="top: 72px; z-index: 40;"
        ></div>
      </Transition>

      <!-- Mobile Menu -->
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden absolute top-[75%] left-0 w-full bg-white border-t border-gray-200 shadow-lg"
        style="z-index: 50;"
      >
        <div class="px-4 py-2 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
          <NuxtLink to="/" class="block py-2 text-gray-700 hover:text-red-800">
            {{ t('nav.home') }}
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="block py-2 text-gray-700 hover:text-red-800"
          >
            {{ t('nav.allBakery') }}
          </NuxtLink>
          <NuxtLink
            to="/products/cakes"
            class="block py-2 text-gray-700 hover:text-red-800"
          >
            {{ t('nav.cakes') }}
          </NuxtLink>
          <NuxtLink
            to="/contact-us"
            class="block py-2 text-gray-700 hover:text-red-800"
          >
            {{ t('nav.contactUs') }}
          </NuxtLink>
          <NuxtLink
            to="/about-us"
            class="block py-2 text-gray-700 hover:text-red-800"
          >
            {{ t('nav.aboutUs') }}
          </NuxtLink>
          <NuxtLink
            to="/manual"
            class="block py-2 text-gray-700 hover:text-red-800"
          >
            {{ t('nav.manual') }}
          </NuxtLink>
          <NuxtLink
            to="/news"
            class="block py-2 text-gray-700 hover:text-red-800"
          >
            {{ t('nav.news') }}
          </NuxtLink>

          <!-- Language Switcher for Mobile -->
          <div class="py-2 border-t border-gray-200 mt-2">
            <LanguageSwitcher />
          </div>

          <!-- Contact Us Button for Mobile -->
          <div class="py-2 border-t border-gray-200">
            <NuxtLink to="/contact-us" class="block">
              <button
                class="w-full bg-red-800 text-white px-6 py-2 rounded-md hover:bg-red-900 transition-colors"
              >
                {{ t('nav.contactUs') }}
              </button>
            </NuxtLink>
          </div>
          <!-- <div class="py-2">
            <span class="text-gray-700 font-medium">Products</span>
            <div class="ml-4 mt-1 space-y-1">
              <NuxtLink
                to="/products/breads"
                class="block py-1 text-sm text-gray-600 hover:text-red-800"
              >
                Fresh Breads
              </NuxtLink>

              <NuxtLink
                to="/products/pastries"
                class="block py-1 text-sm text-gray-600 hover:text-red-800"
              >
                Pastries
              </NuxtLink>
              <NuxtLink
                to="/products/cookies"
                class="block py-1 text-sm text-gray-600 hover:text-red-800"
              >
                Cookies
              </NuxtLink>
            </div>
          </div>
          <NuxtLink
            to="/gallery"
            class="block py-2 text-gray-700 hover:text-red-800"
          >
            Gallery
          </NuxtLink>
          <NuxtLink
            to="/branches"
            class="block py-2 text-gray-700 hover:text-red-800"
          >
            Locations
          </NuxtLink>
          <NuxtLink
            to="/catering"
            class="block py-2 text-gray-700 hover:text-red-800"
          >
            Catering
          </NuxtLink> -->
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
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
              v-model="searchQuery"
              @keyup.enter="performSearch"
            />
            <button
              @click="performSearch"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-800"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
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
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Explore -->
          <div>
            <h3 class="text-lg font-semibold mb-4">{{ t('footer.explore') }}</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/" class="text-red-400 hover:text-red-300"
                  >{{ t('nav.home') }}</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/about-us" class="text-red-400 hover:text-red-300"
                  >{{ t('nav.aboutUs') }}</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/manual" class="text-red-400 hover:text-red-300"
                  >{{ t('nav.manual') }}</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Products -->
          <div>
            <h3 class="text-lg font-semibold mb-4">{{ t('footer.products') }}</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/products" class="text-red-400 hover:text-red-300"
                  >{{ t('footer.allBakeries') }}</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/products/cakes"
                  class="text-red-400 hover:text-red-300"
                  >{{ t('nav.cakes') }}</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Services -->
          <!-- <div>
            <h3 class="text-lg font-semibold mb-4">Services</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/catering" class="text-red-400 hover:text-red-300"
                  >Catering</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/products/cookies"
                  class="text-red-400 hover:text-red-300"
                  >Custom Orders</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/products/cakes"
                  class="text-red-400 hover:text-red-300"
                  >Wedding Cakes</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/contact-us"
                  class="text-red-400 hover:text-red-300"
                  >Consultation</NuxtLink
                >
              </li>
            </ul>
          </div> -->

          <!-- Contact -->
          <div>
            <h3 class="text-lg font-semibold mb-4">{{ t('footer.getInTouch') }}</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="mailto:bakeryhouse@gmail.com"
                  class="text-gray-300 hover:text-white"
                  >bakeryhouse@gmail.com</a
                >
              </li>
              <li>
                <a class="text-gray-300 hover:text-white">+856 20 552 212 14</a>
              </li>
              <li>
                <NuxtLink
                  to="/contact-us"
                  class="text-red-400 hover:text-red-300"
                  >{{ t('aboutUs.contactUs') }}</NuxtLink
                >
              </li>
            </ul>
            <div class="mt-4">
              <h4 class="text-sm font-semibold mb-2">{{ t('footer.followUs') }}</h4>
              <div class="flex space-x-3">
                <!-- WhatsApp -->
                <a href="https://wa.me/8562055221214" class="text-gray-400" target="_blank">
                  <img :src="WhatsappIcon" alt="whatsapp-icon" class="w-5 h-5">
                </a>

                <!-- TikTok -->
                <a href="https://www.tiktok.com/@bakeryhouse78?_t=ZS-90NpDLS35HD&_r=1" class="text-gray-400" target="_blank">
                  <img :src="TikTokIcon" alt="tiktok-icon" class="w-5 h-5">
                </a>

                <!-- Facebook -->
                <a href="#" class="text-gray-400" target="_blank">
                  <img :src="FacebookIcon" alt="facebook-icon" class="w-5 h-5">
                </a>
              </div>
            </div>
          </div>

          <!-- Company Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">{{ t('aboutUs.bakeryHouse') }}</h3>
            <address class="text-gray-300 not-italic">
              {{ t('aboutUs.bakeryHouse') }}<br />
              Nongnieng Road, Ban Nongnieng<br />
              Saysettha District, Vientiane Capital, Laos <br />
              {{ t('footer.serviceSince') }} 10/10/2024
            </address>
          </div>
        </div>

        <!-- About Us -->
        <div class="mt-12 pt-8 border-t border-gray-700">
          <h3 class="text-lg font-semibold mb-4">{{ t('footer.aboutUsTitle') }}</h3>
          <p class="text-gray-300 max-w-2xl">
            {{ t('footer.aboutUsDesc') }}
          </p>
          <p class="text-gray-300 mt-4">
            {{ t('footer.aboutUsDesc2') }}
          </p>
        </div>

        <!-- Copyright -->
        <div class="mt-8 pt-8 border-t border-gray-700 text-center">
          <p class="text-gray-400">
            {{ t('footer.copyright').replace('2024', new Date().getFullYear()) }}
          </p>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <Transition name="scroll-top">
      <button
        v-show="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-50 w-12 h-12 bg-red-800 text-white rounded-full shadow-lg hover:bg-red-900 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
        title="Scroll to top"
      >
        <svg
          class="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          ></path>
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup>
import Logo from "@/assets/images/logo/png-black-red-logo.png";
import WhatsappIcon from "@/assets/images/icons/whatsapp.png";
import TikTokIcon from "@/assets/images/icons/tik-tok.png";
import FacebookIcon from "@/assets/images/icons/facebook.png";

const { t } = useTranslation();

// Get route safely
const route = useRoute();
const router = useRouter();

// Reactive state for navigation
const isProductsDropdownOpen = ref(false);
const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false);
const searchQuery = ref("");
const productsDropdown = ref(null);

// Helper function to check if route is active
const isRouteActive = (path) => {
  return route?.path === path;
};

// Scroll to top functionality
const showScrollTop = ref(false);

// Toggle functions
const toggleProductsDropdown = () => {
  isProductsDropdownOpen.value = !isProductsDropdownOpen.value;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
  if (isSearchOpen.value && import.meta.client) {
    nextTick(() => {
      const searchInput = document.querySelector('input[type="text"]');
      if (searchInput) searchInput.focus();
    });
  }
};

const toggleUserMenu = () => {
  // Handle user menu toggle (can be expanded)
  console.log("User menu clicked");
};

const performSearch = () => {
  if (searchQuery.value.trim()) {
    // Navigate to search results page
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`);
    isSearchOpen.value = false;
    searchQuery.value = "";
  }
};

// Scroll to top function
const scrollToTop = () => {
  if (import.meta.client) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

// Handle scroll events
const handleScroll = () => {
  if (import.meta.client) {
    showScrollTop.value = window.scrollY > 300;
  }
};

// Close dropdowns when clicking outside
const closeDropdowns = (event) => {
  if (
    productsDropdown.value &&
    !productsDropdown.value.contains(event.target)
  ) {
    isProductsDropdownOpen.value = false;
  }
};

// Handle route changes - watch route to close menus
watch(
  () => route.path,
  () => {
    // Close mobile menu on route change
    isMobileMenuOpen.value = false;
    isProductsDropdownOpen.value = false;
    isSearchOpen.value = false;
  }
);

// Lifecycle hooks
onMounted(() => {
  if (import.meta.client) {
    document.addEventListener("click", closeDropdowns);
    window.addEventListener("scroll", handleScroll);
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener("click", closeDropdowns);
    window.removeEventListener("scroll", handleScroll);
  }
});
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

/* Fade transition for backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
