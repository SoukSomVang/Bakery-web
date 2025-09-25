<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-red-800 to-red-600 py-16 lg:py-24">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div class="relative z-10 container mx-auto px-4 text-center">
        <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6">
          Our Bakery Locations
        </h1>
        <p class="text-xl text-red-100 max-w-2xl mx-auto">
          Find the perfect Bakery House location near you. Each bakery offers 
          fresh, high-quality baked goods crafted with care.
        </p>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="py-16 text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading our bakery locations...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="py-16 text-center">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
        {{ error }}
      </div>
    </div>

    <!-- Bakeries Grid -->
    <section v-else class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <!-- No Bakeries -->
        <div v-if="bakeries.length === 0" class="text-center py-12">
          <svg class="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <h3 class="text-2xl font-semibold text-gray-900 mb-4">Coming Soon!</h3>
          <p class="text-gray-600">New bakery locations are opening soon. Stay tuned for updates!</p>
        </div>

        <!-- Bakeries List -->
        <div v-else>
          <!-- Results Info -->
          <div v-if="bakeries.length > 0" class="mb-8">
            <div class="text-center">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">
                {{ bakeries.length }} Location{{ bakeries.length !== 1 ? 's' : '' }} Available
              </h2>
              <p class="text-gray-600 max-w-2xl mx-auto">
                Visit any of our locations to experience the finest baked goods and exceptional service.
              </p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="bakery in paginatedBakeries"
              :key="bakery.id"
              class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <!-- Bakery Image -->
              <div class="relative h-64 bg-gray-200">
                <img 
                  v-if="bakery.image" 
                  :src="bakery.image" 
                  :alt="bakery.name"
                  class="w-full h-full object-cover"
                />
                <div 
                  v-else 
                  class="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200"
                >
                  <svg class="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                
                <!-- Status Badge -->
                <div class="absolute top-4 right-4">
                  <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Open
                  </span>
                </div>
              </div>

              <!-- Bakery Info -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ bakery.name }}</h3>
                <p v-if="bakery.description" class="text-gray-600 mb-4 text-sm">
                  {{ bakery.description }}
                </p>

                <!-- Location -->
                <div class="space-y-2 mb-4">
                  <div class="flex items-start gap-2">
                    <svg class="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div class="text-sm text-gray-700">
                      <div>{{ bakery.address }}</div>
                      <div>{{ bakery.city }}, {{ bakery.country }}</div>
                    </div>
                  </div>
                </div>

                <!-- Contact Info -->
                <div class="space-y-2 mb-4">
                  <div v-if="bakery.phone" class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <a :href="`tel:${bakery.phone}`" class="text-sm text-gray-700 hover:text-red-600 transition-colors">
                      {{ bakery.phone }}
                    </a>
                  </div>
                  
                  <div v-if="bakery.email" class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <a :href="`mailto:${bakery.email}`" class="text-sm text-gray-700 hover:text-red-600 transition-colors">
                      {{ bakery.email }}
                    </a>
                  </div>
                </div>

                <!-- Operating Hours -->
                <div v-if="bakery.operatingHours" class="mb-4">
                  <div class="flex items-start gap-2">
                    <svg class="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div class="text-sm text-gray-700">
                      {{ bakery.operatingHours }}
                    </div>
                  </div>
                </div>

                <!-- Manager -->
                <div v-if="bakery.managerName" class="mb-6">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <div class="text-sm text-gray-700">
                      Manager: {{ bakery.managerName }}
                    </div>
                  </div>
                </div>

                <!-- Action Button -->
                <button 
                  @click="openDirections(bakery)"
                  class="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"></path>
                  </svg>
                  Get Directions
                </button>
              </div>
            </div>
          </div>

          <!-- Advanced Pagination -->
          <div v-if="bakeries.length > itemsPerPage && !loading && !error" class="mt-12">
            <!-- Main Pagination with Items Per Page -->
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
              <!-- Pagination Info Display -->
              <div class="text-sm text-gray-600">
                Showing {{ startItem }}-{{ endItem }} of {{ bakeries.length }} locations
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
                <span class="text-sm text-gray-600">Locations per page:</span>
                <select
                  v-model="itemsPerPage"
                  @change="changeItemsPerPage(itemsPerPage)"
                  class="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-red-600">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Can't Find a Location Near You?</h2>
        <p class="text-red-100 mb-8 max-w-2xl mx-auto">
          We're always expanding! Contact us to suggest a new location or inquire about franchise opportunities.
        </p>
        <NuxtLink 
          to="/contact-us"
          class="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          Contact Us
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useFirebase } from '~/composables/useFirebase'

// Page state
const bakeries = ref([])
const loading = ref(true)
const error = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(6)
const itemsPerPageOptions = [6, 12, 24]

// Firebase composable
const { getBakeries } = useFirebase()

// Fetch bakeries on mount
onMounted(async () => {
  try {
    bakeries.value = await getBakeries()
  } catch (err) {
    error.value = 'Failed to load bakery locations. Please try again later.'
    console.error('Error loading bakeries:', err)
  } finally {
    loading.value = false
  }
})

// Computed properties for pagination
const totalPages = computed(() => {
  return Math.ceil(bakeries.value.length / itemsPerPage.value)
})

const paginatedBakeries = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return bakeries.value.slice(start, end)
})

const startItem = computed(() => {
  return bakeries.value.length > 0 ? (currentPage.value - 1) * itemsPerPage.value + 1 : 0
})

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value
  return Math.min(end, bakeries.value.length)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = 2

  let start = Math.max(1, current - delta)
  let end = Math.min(total, current + delta)

  if (current <= delta) {
    end = Math.min(total, 2 * delta + 1)
  }
  if (current + delta >= total) {
    start = Math.max(1, total - 2 * delta)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const goToFirstPage = () => {
  currentPage.value = 1
}

const goToLastPage = () => {
  currentPage.value = totalPages.value
}

const changeItemsPerPage = (newItemsPerPage) => {
  itemsPerPage.value = newItemsPerPage
  currentPage.value = 1
}

// Open directions
const openDirections = (bakery) => {
  const address = encodeURIComponent(`${bakery.address}, ${bakery.city}, ${bakery.country}`)
  const url = `https://www.google.com/maps/search/?api=1&query=${address}`
  window.open(url, '_blank')
}

// Meta tags
useSeoMeta({
  title: 'Our Bakery Locations - Bakery House',
  description: 'Find a Bakery House location near you. Fresh baked goods and exceptional service at all our locations.',
  ogTitle: 'Our Bakery Locations - Bakery House',
  ogDescription: 'Find a Bakery House location near you. Fresh baked goods and exceptional service at all our locations.'
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
</style>