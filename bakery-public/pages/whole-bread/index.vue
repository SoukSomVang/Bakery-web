<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[50vh]"
      :style="{
        backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/5ccc9bada9ab950174f0b374/1719853260027-MUYMSU6RJOXZFKQ8QIU2/Nature%27s+Own+-+Perfectly+Crafted+-+Multigrain+WEB+-+FOP.png?format=500w')`,
      }"
    >
      <div class="absolute inset-0 bg-black/60"></div>
      <div class="relative z-10 h-full flex items-center justify-center px-4">
        <div class="text-center text-white">
          <h1 class="text-5xl lg:text-6xl font-bold mb-4 italic" style="font-family: 'Brush Script MT', cursive;">
            Whole Wheat Multigrain Bread
          </h1>
          <p class="text-xl lg:text-2xl">Nutritious • Delicious • Freshly Baked</p>
        </div>
      </div>
    </section>

    <!-- Product Details Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="max-w-lg">
              <span class="text-red-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                Featured Product
              </span>
              <h2 class="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-tight">
                Whole Wheat Multigrain Bread
              </h2>
              <p class="text-gray-600 text-lg mb-6 leading-relaxed">
                Our signature multigrain bread combines the wholesome goodness of wheat with a perfect blend of seeds and grains, creating a nutritious and delicious choice for health-conscious customers.
              </p>

              <!-- Features -->
              <div class="space-y-4 mb-8">
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span class="text-gray-700">100% Whole Wheat Flour</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span class="text-gray-700">Rich in Fiber & Protein</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span class="text-gray-700">No Artificial Preservatives</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span class="text-gray-700">Baked Fresh Daily</span>
                </div>
              </div>

              <!-- Nutrition Facts -->
              <div class="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Nutrition Facts (per slice)</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-600">Calories:</span>
                    <span class="font-semibold ml-2">80</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Protein:</span>
                    <span class="font-semibold ml-2">4g</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Fiber:</span>
                    <span class="font-semibold ml-2">3g</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Whole Grains:</span>
                    <span class="font-semibold ml-2">16g</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <button
                  @click="$router.push('/contact-us')"
                  class="bg-red-800 hover:bg-red-900 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Order Now
                </button>
                <button
                  @click="$router.push('/products')"
                  class="border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                >
                  View All Products
                </button>
              </div>
            </div>
          </div>

          <!-- Product Image -->
          <div>
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl transform rotate-6"></div>
              <img
                src="https://images.squarespace-cdn.com/content/v1/5ccc9bada9ab950174f0b374/1719853260027-MUYMSU6RJOXZFKQ8QIU2/Nature%27s+Own+-+Perfectly+Crafted+-+Multigrain+WEB+-+FOP.png?format=500w"
                alt="Whole Wheat Multigrain Bread"
                class="relative w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ingredients Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Premium Ingredients</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            We carefully select only the finest ingredients to ensure every loaf meets our high standards of quality and nutrition.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Whole Wheat Flour</h3>
            <p class="text-gray-600">Stone-ground whole wheat flour provides essential nutrients and a rich, nutty flavor.</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Ancient Grains</h3>
            <p class="text-gray-600">A blend of quinoa, millet, and amaranth adds texture and nutritional value.</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Seeds & Nuts</h3>
            <p class="text-gray-600">Sunflower seeds, pumpkin seeds, and crushed walnuts for extra crunch and nutrition.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Branches Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Available at Our Branches</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Visit any of our locations to get fresh whole wheat multigrain bread baked daily
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="branchesLoading" class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
        </div>

        <!-- Branches List -->
        <div v-else-if="branches.length > 0" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            v-for="branch in branches"
            :key="branch.id"
            class="text-center"
          >
            <h3
              @click="handleLocationClick(branch)"
              class="text-lg font-medium text-red-700 underline cursor-pointer hover:text-red-900 transition-colors"
            >
              {{ branch.name }}
            </h3>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-8">
          <p class="text-gray-500">No branches available at the moment.</p>
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
  </div>
</template>

<script setup>
import { useFirebase } from '~/composables/useFirebase'

const { getBranches } = useFirebase()

// Branch locations data
const branches = ref([])
const branchesLoading = ref(true)
const showLocationDialog = ref(false)
const selectedBranch = ref(null)

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

// Load branch locations
onMounted(async () => {
  try {
    branches.value = await getBranches()
  } catch (error) {
    console.error('Failed to load branches:', error)
  } finally {
    branchesLoading.value = false
  }
})

// SEO
useHead({
  title: 'Whole Wheat Multigrain Bread - BakeryHouse | Nutritious & Delicious',
  meta: [
    {
      name: 'description',
      content: 'Discover our signature whole wheat multigrain bread - packed with nutrition, made with premium ingredients, and baked fresh daily at BakeryHouse.'
    },
    {
      property: 'og:title',
      content: 'Whole Wheat Multigrain Bread - Fresh & Nutritious'
    },
    {
      property: 'og:description',
      content: 'Our signature multigrain bread combines wholesome wheat with ancient grains, seeds, and nuts. Rich in fiber, protein, and baked fresh daily.'
    }
  ]
})
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