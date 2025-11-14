<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Product Details Section -->
    <section class="py-16 bg-white scroll-section opacity-0 translate-y-10 transition-all duration-700">
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
              <!-- <div class="flex flex-col sm:flex-row gap-4">
                <button
                  @click="$router.push('/contact-us')"
                  class="bg-red-800 hover:bg-red-900 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Order Now
                </button>
                <button
                  @click="$router.push('/products')"
                  class="border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                >
                  View All Products
                </button>
              </div> -->
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

    <!-- Our Partners Section -->
    <section class="py-16 bg-gray-50 scroll-section opacity-0 translate-y-10 transition-all duration-700">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Our Partners</h2>
        </div>

        <!-- Partner Cards -->
        <div class="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Kafepa Card -->
          <a
            :href="brands[0].link"
            target="_blank"
            rel="noopener noreferrer"
            class="group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
          >
            <div class="w-full h-64 bg-gray-50">
              <img
                :src="brands[0].image"
                :alt="brands[0].name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6 text-center bg-gradient-to-br from-white to-gray-50">
              <h3 class="text-2xl font-bold text-gray-800 group-hover:text-red-800 transition-colors mb-2">
                {{ brands[0].name }}
              </h3>
              <div class="flex items-center justify-center text-red-600 group-hover:text-red-700 transition-colors">
                <span class="text-sm font-medium">Visit {{ brands[0].name }}</span>
                <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </a>

          <!-- Treekoff Card -->
          <a
            :href="brands[1].link"
            target="_blank"
            rel="noopener noreferrer"
            class="group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
          >
            <div class="w-full h-64 bg-gray-50">
              <img
                :src="brands[1].image"
                :alt="brands[1].name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6 text-center bg-gradient-to-br from-white to-gray-50">
              <h3 class="text-2xl font-bold text-gray-800 group-hover:text-red-800 transition-colors mb-2">
                {{ brands[1].name }}
              </h3>
              <div class="flex items-center justify-center text-red-600 group-hover:text-red-700 transition-colors">
                <span class="text-sm font-medium">Visit {{ brands[1].name }}</span>
                <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import KafepaLogo from "@/assets/images/logo/kafepa_logo.jpg";
import TreekoffLogo from "@/assets/images/logo/treekoff_logo.png";

// Brand data
const brands = ref([
  {
    name: "Kafepa'",
    link: "https://www.facebook.com/share/17eGRPxhBW/?mibextid=wwXIfr",
    image: KafepaLogo
  },
  {
    name: "Treekoff",
    link: "https://treekoff.coffee/",
    image: TreekoffLogo
  }
]);

// Scroll animations
const { observeAllSections } = useScrollAnimation()

// Setup scroll animations on mount
onMounted(() => {
  observeAllSections()
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