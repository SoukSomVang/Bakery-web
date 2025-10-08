<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[50vh]"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3')`,
      }"
    >
      <div class="absolute inset-0 bg-black/60"></div>
      <div class="relative z-10 h-full flex items-center justify-center px-4">
        <div class="text-center text-white">
          <h1 class="text-5xl lg:text-6xl font-bold mb-4 italic" style="font-family: 'Brush Script MT', cursive;">
            Our Locations
          </h1>
          <p class="text-xl lg:text-2xl">Find us across the city for fresh baked goods</p>
        </div>
      </div>
    </section>

    <!-- Quick Stats -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-6 text-center">
          <div class="p-6">
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">{{ branches.length }}</div>
            <div class="text-gray-600">Locations</div>
          </div>
          <div class="p-6">
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">14</div>
            <div class="text-gray-600">Hours Daily</div>
          </div>
          <div class="p-6">
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">50+</div>
            <div class="text-gray-600">Team Members</div>
          </div>
          <div class="p-6">
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">1000+</div>
            <div class="text-gray-600">Daily Customers</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Branch Locations -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">Our Branch Locations</h2>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 text-center">
          {{ error }}
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>

        <!-- Empty State -->
        <div v-else-if="!loading && branches.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9z" clip-rule="evenodd"/>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No branch locations found</h3>
          <p class="text-gray-500">Please check back later for our branch locations.</p>
        </div>

        <!-- Branches List -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            v-for="branch in branches"
            :key="branch.id"
            class="text-center"
          >
            <h3
              @click="handleLocationClick(branch)"
              class="text-lg font-medium text-gray-700 underline cursor-pointer hover:text-red-700 transition-colors"
            >
              {{ branch.name }}
            </h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Location Dialog -->
    <div v-if="showLocationDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="text-center">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Location Not Available</h3>
          <p class="text-gray-600 mb-6">
            Branch does not have location data
          </p>
          <button
            @click="closeDialog"
            class="bg-red-900 hover:bg-red-950 text-white px-6 py-2 rounded-md font-semibold transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-6">Find Us on the Map</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Locate our branches easily with our interactive map. Each location offers the same quality and freshness you expect from BakeryHouse.
          </p>
        </div>

        <!-- Map Placeholder -->
        <div class="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
          <div class="text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            <p class="text-gray-600">Interactive Map Would Go Here</p>
            <p class="text-sm text-gray-500 mt-2">Integrate with Google Maps or similar service</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
// State
const branches = ref([])
const loading = ref(true)
const error = ref(null)
const showLocationDialog = ref(false)
const selectedBranch = ref(null)

// Load branches from database
const loadBranches = async () => {
  try {
    loading.value = true
    error.value = null

    const { getBranches } = useFirebase()
    const data = await getBranches()
    branches.value = data || []
  } catch (err) {
    console.error('Failed to load branches:', err)
    error.value = 'Failed to load branch locations'
  } finally {
    loading.value = false
  }
}

// Handle location button click
const handleLocationClick = (branch) => {
  if (branch.locationUrl && branch.locationUrl.trim()) {
    // Open location URL in new tab
    window.open(branch.locationUrl, '_blank')
  } else {
    // Show dialog for missing location
    selectedBranch.value = branch
    showLocationDialog.value = true
  }
}

// Close dialog
const closeDialog = () => {
  showLocationDialog.value = false
  selectedBranch.value = null
}

// Load data on mount
onMounted(() => {
  loadBranches()
})

// SEO
useHead({
  title: 'Our Locations - BakeryHouse | Find Us Near You',
  meta: [
    {
      name: 'description',
      content: 'Find BakeryHouse locations across the city. Visit our branches for fresh baked goods, custom orders, and specialty items. Store hours, directions, and contact info.'
    },
    {
      property: 'og:title',
      content: 'BakeryHouse Locations - Fresh Baked Goods Near You'
    },
    {
      property: 'og:description',
      content: 'Discover our bakery locations offering artisan breads, custom cakes, and fresh pastries. Each branch specializes in different products to serve you better.'
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