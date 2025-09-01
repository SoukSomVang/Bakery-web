<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[80vh] md:h-[90vh]"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1568254183919-78a4f43a2877?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIzfHx8ZW58MHx8fHx8')`,
      }"
    >
      <!-- Overlay matching your image -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-red-900/80"
      ></div>

      <!-- Content -->
      <div class="relative z-10 h-full flex flex-col lg:flex-row justify-between items-center px-4 lg:px-8">
        <div class="w-full lg:w-1/2 mb-8 lg:mb-0">
          <div class="flex justify-center lg:justify-start">
            <div class="text-center lg:text-left">
              <!-- Bakery Text -->
              <div class="mb-4">
                <span
                  class="text-6xl lg:text-8xl xl:text-9xl font-bold italic text-white tracking-wider block animate-fade-in-up"
                  style="
                    font-family: 'Brush Script MT', cursive;
                    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
                    animation-delay: 0.2s;
                  "
                >
                  Bakery
                </span>
              </div>

              <!-- House Text -->
              <div class="relative">
                <!-- Small house icon -->
                <div class="absolute -top-6 right-0 lg:left-0 text-red-300">
                  <svg class="w-10 h-10 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                    />
                  </svg>
                </div>

                <span
                  class="text-4xl lg:text-6xl xl:text-7xl font-bold italic text-red-400 tracking-wider block animate-fade-in-up"
                  style="
                    font-family: 'Brush Script MT', cursive;
                    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
                    animation-delay: 0.4s;
                  "
                >
                  House
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <!-- White Card -->
          <div
            class="bg-white/95 backdrop-blur-sm py-8 md:py-10 px-8 md:px-12 shadow-2xl max-w-sm md:max-w-lg rounded-lg border-l-4 border-red-500 animate-fade-in-right"
            style="animation-delay: 0.6s;"
          >
            <h1
              class="text-black text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-8 leading-relaxed"
            >
              Bakery house Holding Company Limited
            </h1>
            <p class="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
              Crafting exceptional baked goods with premium ingredients and traditional techniques since our founding.
            </p>
            <button
              class="bg-red-900 hover:bg-red-950 text-white px-8 md:px-12 py-4 md:py-5 rounded-lg font-semibold transition-all duration-300 w-full md:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              @click="handleGotoAboutUs"
            >
              Discover Our Story
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="w-full bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Why Choose Bakery House</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">Our commitment to excellence is reflected in every aspect of our baking process</p>
        </div>
        <div class="grid lg:grid-cols-2 gap-8 items-center">
          <div class="grid grid-cols-2 gap-4">
            <!-- Feature 1 -->
            <div class="bg-red-800 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <span class="text-2xl font-bold">1</span>
              </div>
              <h3 class="text-lg font-bold mb-3">Premium Ingredients</h3>
              <p class="text-sm opacity-90 leading-relaxed">
                Using the finest raw materials to create exceptional baked goods that exceed expectations.
              </p>
            </div>

            <!-- Feature 2 -->
            <div class="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span class="text-2xl font-bold text-red-800">2</span>
              </div>
              <h3 class="text-lg font-bold mb-3 text-gray-800">
                Continuous Innovation
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                Constantly developing new products that fulfill the nutritional needs of our community.
              </p>
            </div>

            <!-- Feature 3 -->
            <div class="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span class="text-2xl font-bold text-red-800">3</span>
              </div>
              <h3 class="text-lg font-bold mb-3 text-gray-800">
                Advanced Technology
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                Implementing cutting-edge manufacturing technologies for consistent quality improvement.
              </p>
            </div>

            <!-- Feature 4 -->
            <div class="bg-red-800 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <span class="text-2xl font-bold">4</span>
              </div>
              <h3 class="text-lg font-bold mb-3">Safety & Freshness</h3>
              <p class="text-sm opacity-90 leading-relaxed">
                Maintaining the highest standards of freshness and cleanliness to deliver the best to our customers.
              </p>
            </div>
          </div>
          <div class="w-full h-full">
            <img
              src="https://www.chaidim.com/cdn/shop/articles/e340139307b347984dd98d8b1019c1dc_1200x798.jpg?v=1718442365"
              alt="Bakery production process"
              class="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section
      class="py-16 bg-cover bg-center h-[80vh]"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y3JvaXNzYW50c3xlbnwwfHwwfHx8MA%3D%3D')`,
      }"
    >
      <div class="container px-20">
        <h2
          class="text-start text-7xl font-semibold text-center mb-12 text-white underline cursor-pointer"
        >
          ALL BAKERY
        </h2>
      </div>
    </section>

    <!-- Product Showcase -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <div class="max-w-lg">
              <span class="text-red-600 font-semibold text-sm uppercase tracking-wider mb-2 block">Featured Product</span>
              <h2 class="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-tight">
                Whole Wheat Multigrain Bread
              </h2>
              <p class="text-gray-600 text-lg mb-8 leading-relaxed">
                Our signature multigrain bread combines the wholesome goodness of wheat with a perfect blend of seeds and grains, creating a nutritious and delicious choice for health-conscious customers.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <button class="bg-red-800 hover:bg-red-900 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Learn More
                </button>
                <button class="border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  View All Products
                </button>
              </div>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl transform rotate-6"></div>
              <img
                src="https://images.squarespace-cdn.com/content/v1/5ccc9bada9ab950174f0b374/1719853260027-MUYMSU6RJOXZFKQ8QIU2/Nature%27s+Own+-+Perfectly+Crafted+-+Multigrain+WEB+-+FOP.png?format=500w"
                alt="Whole Wheat Bread"
                class="relative w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Branches Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4 text-gray-800">
            Our Locations
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">Visit any of our conveniently located branches to experience our fresh baked goods</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">NorngNieng</h3>
            <p class="text-gray-600 text-sm">Treekoff Branch</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Dongpalan</h3>
            <p class="text-gray-600 text-sm">Treekoff Branch</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Wattainoy</h3>
            <p class="text-gray-600 text-sm">Treekoff Branch</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Vatchan</h3>
            <p class="text-gray-600 text-sm">Treekoff Branch</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// Product data
const bakeryProducts = ref([
  { id: 1, name: "Ham cheese croissant", image: "" },
  { id: 2, name: "Chocolate two tone lava", image: "" },
  { id: 3, name: "Almond croissant", image: "" },
  { id: 4, name: "White chocolate Oreo", image: "" },
  { id: 5, name: "Butter croissant", image: "" },
  { id: 6, name: "Spinach and cheese croissant", image: "" },
  { id: 7, name: "Cookie red velvet", image: "" },
  { id: 8, name: "Cookie Chocolate", image: "" },
]);

const cakeProducts = ref([
  { id: 9, name: "Cookie matcha", image: "" },
  { id: 10, name: "Cream puffs", image: "" },
  { id: 11, name: "Cream puffs matcha", image: "" },
  { id: 12, name: "Coconut pie", image: "" },
  { id: 13, name: "Carrot cake", image: "" },
  { id: 14, name: "Mousse cake Matcha", image: "" },
  { id: 15, name: "Cheese cake", image: "" },
  { id: 16, name: "Red velvet cake", image: "" },
]);

const additionalProducts = ref([
  { id: 17, name: "Cake milk", image: "" },
  { id: 18, name: "Chocolate top mousse", image: "" },
  { id: 19, name: "Timbering Matcha", image: "" },
  { id: 20, name: "Timbering Chocolate", image: "" },
  { id: 21, name: "Coffee", image: "" },
  { id: 22, name: "Coffee chocolate", image: "" },
  { id: 23, name: "Coffee Matcha", image: "" },
  { id: 24, name: "Eggs tart", image: "" },
]);

function handleGotoAboutUs() {
  router.push("/about-us");
}

// Meta tags for SEO
// useSeoMeta({
//   title: 'Bakery House - Fresh Baked Goods Daily',
//   ogTitle: 'Bakery House - Fresh Baked Goods Daily',
//   description: 'Experience the finest bakery products made with the best ingredients. From croissants to cakes, we serve fresh baked goods daily.',
//   ogDescription: 'Experience the finest bakery products made with the best ingredients. From croissants to cakes, we serve fresh baked goods daily.',
//   ogImage: '/api/placeholder/1200/630',
//   twitterCard: 'summary_large_image',
// })
</script>

<style scoped>
/* Custom styles if needed */
.container {
  max-width: 1200px;
}

/* Custom shadow for the card */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth transitions */
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out forwards;
  opacity: 0;
}

/* Improved hover effects */
.group:hover .group-hover\:bg-red-200 {
  background-color: #fecaca;
}

/* Enhanced backdrop blur */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
