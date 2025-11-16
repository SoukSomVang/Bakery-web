<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <!-- Hero Section -->
    <section
      class="relative flex flex-col md:flex-row h-auto md:h-[90vh] overflow-hidden"
    >
      <!-- Left Side - Background Image (2/3 on desktop, full width on mobile) -->
      <div
        class="w-full md:w-2/3 bg-cover bg-center relative h-[50vh] md:h-auto"
        :style="{ backgroundImage: `url(${backgroundImg})` }"
      >
        <div class="absolute inset-0 bg-black/30"></div>
      </div>

      <!-- Right Side - Solid Red (1/3 on desktop, hidden on mobile) -->
      <div class="hidden md:block w-1/3 bg-red-900"></div>

      <!-- White Card Overlay -->
      <div
        class="absolute top-1/2 left-1/2 md:left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-10 px-4 w-full flex justify-center"
      >
        <div
          class="bg-white/70 backdrop-blur-sm py-8 md:py-12 px-6 md:px-16 shadow-2xl rounded-lg animate-fade-in-up w-[90%] sm:w-[600px] md:w-[800px] max-w-3xl"
        >
          <!-- Logo -->
          <div class="flex justify-center mb-6">
            <img
              src="../assets/images/logo/png-black-red-logo.png"
              alt="Bakery House Logo"
              class="w-28 h-28 md:w-40 md:h-40 object-contain"
            />
          </div>

          <!-- Heading -->
          <h1
            class="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold italic mb-8 leading-tight text-center"
          >
            BakeryHouse Holding Company Limited
          </h1>

          <!-- Button -->
          <div class="flex justify-center">
            <button
              class="bg-red-900 hover:bg-red-950 text-white px-8 sm:px-10 md:px-12 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base md:text-lg"
              @click="handleGotoAboutUs"
            >
              {{ t('home.discoverUs') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="w-full bg-gray-50 py-16 scroll-section opacity-0 translate-y-10 transition-all duration-700">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            {{ t('home.whyChoose') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ t('home.commitment') }}
          </p>
        </div>
        <div class="grid lg:grid-cols-2 gap-8 items-center">
          <div class="grid grid-cols-2 gap-4">
            <!-- Feature 1 -->
            <div
              class="bg-red-800 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4"
              >
                <span class="text-2xl font-bold">1</span>
              </div>
              <h3 class="text-lg font-bold mb-3">{{ t('home.premiumIngredients') }}</h3>
              <p class="text-sm opacity-90 leading-relaxed">
                {{ t('home.premiumDesc') }}
              </p>
            </div>

            <!-- Feature 2 -->
            <div
              class="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4"
              >
                <span class="text-2xl font-bold text-red-800">2</span>
              </div>
              <h3 class="text-lg font-bold mb-3 text-gray-800">
                {{ t('home.continuousInnovation') }}
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                {{ t('home.innovationDesc') }}
              </p>
            </div>

            <!-- Feature 3 -->
            <div
              class="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4"
              >
                <span class="text-2xl font-bold text-red-800">3</span>
              </div>
              <h3 class="text-lg font-bold mb-3 text-gray-800">
                {{ t('home.advancedTechnology') }}
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                {{ t('home.technologyDesc') }}
              </p>
            </div>

            <!-- Feature 4 -->
            <div
              class="bg-red-800 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4"
              >
                <span class="text-2xl font-bold">4</span>
              </div>
              <h3 class="text-lg font-bold mb-3">{{ t('home.safetyFreshness') }}</h3>
              <p class="text-sm opacity-90 leading-relaxed">
                {{ t('home.safetyDesc') }}
              </p>
            </div>
          </div>
          <div class="w-full h-full flex items-center justify-center">
            <img
              :src="propImage"
              alt="Bakery production process"
              class="w-[90%] h-[70%] object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section
      class="py-16 bg-cover bg-[center_bottom_43%] h-[70vh] sm:h-[80vh] md:h-[90vh] scroll-section opacity-0 translate-y-10 transition-all duration-700"
      :style="{ backgroundImage: `url('${productSectionImage}')` }"
    >
      <div
        class="w-full px-6 sm:px-12 md:px-20 lg:pe-40 flex items-center justify-center md:justify-end"
      >
        <button
          class="text-2xl sm:text-3xl text-white font-semibold bg-red-800 mb-8 md:mb-12 px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-red-900"
          @click="$router.push('/products')"
        >
          {{ t('home.allBakery') }}
        </button>
      </div>
    </section>

    <!-- Product Showcase -->
    <section class="py-16 bg-white scroll-section opacity-0 translate-y-10 transition-all duration-700">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <div class="max-w-lg">
              <span
                class="text-red-600 font-semibold text-sm uppercase tracking-wider mb-2 block"
                >Featured Product</span
              >
              <h2
                class="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 leading-tight"
              >
                Whole Wheat Multigrain Bread
              </h2>
              <p class="text-gray-600 text-lg mb-8 leading-relaxed">
                Our signature multigrain bread combines the wholesome goodness
                of wheat with a perfect blend of seeds and grains, creating a
                nutritious and delicious choice for health-conscious customers.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <button
                  @click="$router.push('/whole-bread')"
                  class="bg-red-800 hover:bg-red-900 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  View Whole Bread
                </button>
              </div>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <div class="relative">
              <div
                class="absolute inset-0 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl transform rotate-6"
              ></div>
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

    <!-- Brands Section -->
    <section class="py-16 bg-gray-50 scroll-section opacity-0 translate-y-10 transition-all duration-700">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">{{ t('home.ourCustomers') }}</h2>
          <!-- <p class="text-lg text-gray-600">
            Bringing quality products to your table
          </p> -->
        </div>

        <!-- Brand Cards -->
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

    <!-- News Section -->
    <section class="py-16 bg-white scroll-section opacity-0 translate-y-10 transition-all duration-700">
      <div class="container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Latest News</h2>
          <p class="text-lg text-gray-600">Stay updated with our latest announcements and stories</p>
        </div>

        <!-- Single News Card -->
        <div class="max-w-2xl mx-auto">
          <div
            class="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer"
            @click="$router.push('/news-static')"
          >
            <div class="relative h-96 overflow-hidden">
              <img
                :src="news1"
                alt="Construction Progress - Building Our Dream Bakery"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div class="absolute top-4 right-4">
                <span class="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  In Progress
                </span>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <time>January 2025</time>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">
                Building Our Dream Bakery: Construction Update
              </h3>
              <p class="text-gray-600 mb-6 leading-relaxed">
                We're excited to share the latest progress on our brand new bakery location! Our construction team is making excellent progress on the new facility, installing state-of-the-art equipment and creating a warm, inviting space for our customers.
              </p>
              <div class="flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors">
                <span>Read More</span>
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- News Section -->
    <!-- <NewsSection /> -->
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import backgroundImg from "@/assets/images/background.jpeg";
import propImage from "@/assets/images/prop-image2.jpg";
import productSectionImage from "@/assets/images/prop-image.jpeg";
import KafepaLogo from "@/assets/images/logo/kafepa_logo.jpg";
import TreekoffLogo from "@/assets/images/logo/treekoff_logo.png";
import news1 from "@/assets/images/news1.jpeg";

const router = useRouter();
const { t } = useTranslation();

// Use client-only wrapper for Firebase composable
let getProductsByBakeryType;

if (import.meta.client) {
  const { getProductsByBakeryType: fetchProducts } = useProducts();
  getProductsByBakeryType = fetchProducts;
} else {
  // Server-side fallback
  getProductsByBakeryType = async () => [];
}

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

// Product data from Firestore
const bakeryProducts = ref([]);
const productsLoading = ref(true);

// Scroll animations
const { observeAllSections } = useScrollAnimation()

// Load products
onMounted(async () => {
  try {
    // Load bakery products (client-side only)
    if (import.meta.client) {
      bakeryProducts.value = await getProductsByBakeryType("bakery");
      console.log(
        "✅ HOME: Bakery products loaded:",
        bakeryProducts.value.length
      );

      // Setup scroll animations
      observeAllSections()
    }
  } catch (error) {
    console.error("Failed to load data:", error);
  } finally {
    productsLoading.value = false;
  }
});

function handleGotoAboutUs() {
  router.push("/about-us");
}

// Meta tags for SEO
useSeoMeta({
  title: "BakeryHouse - Fresh Baked Goods Daily",
  ogTitle: "BakeryHouse - Fresh Baked Goods Daily",
  description:
    "Experience the finest bakery products made with the best ingredients. From croissants to cakes, we serve fresh baked goods daily.",
  ogDescription:
    "Experience the finest bakery products made with the best ingredients. From croissants to cakes, we serve fresh baked goods daily.",
  ogImage: "/api/placeholder/1200/630",
  twitterCard: "summary_large_image",
});
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
