<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <!-- Hero Section -->
    <section class="relative h-[80vh] md:h-[90vh] flex overflow-hidden">
      <!-- Left Side - Background Image (2/3) -->
      <div
        class="w-2/3 bg-cover bg-center relative"
        :style="{ backgroundImage: `url(${backgroundImg})` }"
      >
        <div class="absolute inset-0 bg-black/30"></div>
      </div>

      <!-- Right Side - Solid Red (1/3) -->
      <div class="w-1/3 bg-red-900"></div>

      <!-- White Card Overlay - Centered on dividing line -->
      <div
        class="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-10 px-4"
      >
        <div
          class="bg-white/50 backdrop-blur-sm py-12 px-16 shadow-2xl rounded-lg animate-fade-in-up w-[800px] max-w-3xl"
        >
          <!-- Logo -->
          <div class="flex justify-center mb-6">
            <img
              src="../assets/images/logo/png-black-red-logo.png"
              alt="Bakery House Logo"
              class="w-40 h-40 object-contain"
            />
          </div>

          <h1
            class="text-black text-2xl md:text-3xl lg:text-4xl font-bold italic mb-8 leading-tight text-center"
          >
            BakeryHouse Holding Company Limited
          </h1>

          <div class="flex justify-center">
            <button
              class="bg-red-900 hover:bg-red-950 text-white px-12 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
              @click="handleGotoAboutUs"
            >
              Discovered us
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="w-full bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            Why Choose BakeryHouse
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Our commitment to excellence is reflected in every aspect of our
            baking process
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
              <h3 class="text-lg font-bold mb-3">Premium Ingredients</h3>
              <p class="text-sm opacity-90 leading-relaxed">
                Using the finest raw materials to create exceptional baked goods
                that exceed expectations.
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
                Continuous Innovation
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                Constantly developing new products that fulfill the nutritional
                needs of our community.
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
                Advanced Technology
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                Implementing cutting-edge manufacturing technologies for
                consistent quality improvement.
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
              <h3 class="text-lg font-bold mb-3">Safety & Freshness</h3>
              <p class="text-sm opacity-90 leading-relaxed">
                Maintaining the highest standards of freshness and cleanliness
                to deliver the best to our customers.
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
      class="py-16 bg-cover bg-[center_bottom_43%] h-[90vh]"
      :style="{
        backgroundImage: `url('${productSectionImage}')`,
      }"
    >
      <div class="w-full px-20 pe-40 flex items-center justify-end">
        <button
          class="text-right text-3xl text-white font-semibold bg-red-800 mb-12 px-12 py-4 rounded-full cursor-pointer"
          @click="$router.push('/products')"
        >
          ALL BAKERY
        </button>
      </div>
    </section>

    <!-- Product Showcase -->
    <!-- <section class="py-16 bg-white">
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
                <button
                  @click="$router.push('/products')"
                  class="border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                >
                  View All Products
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
    </section> -->

    <!-- Bakery Locations Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Branches</h2>
        </div>

        <!-- Loading State -->
        <div v-if="branchesLoading" class="text-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"
          ></div>
        </div>

        <!-- Branches List -->
        <div
          v-else-if="branches.length > 0"
          class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div
            class="md:col-span-2 lg:col-span-4 flex justify-center mb-8 text-xl"
          >
            Every Treekoff branch where we distribute Bakery:
          </div>
          <div
            v-for="branch in branches.slice(0, 6)"
            :key="branch.id"
            class="text-center"
          >
            <h3
              @click="handleLocationClick(branch)"
              class="text-lg font-medium text-red-800 underline cursor-pointer hover:text-red-700 transition-colors"
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
    <div
      v-if="showLocationDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="text-center">
          <svg
            class="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Location Not Available
          </h3>
          <p class="text-gray-600 mb-6">Branch does not have location data</p>
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
import { useRouter } from "vue-router";
import { useFirebase } from "~/composables/useFirebase";
import backgroundImg from "@/assets/images/background.jpeg";
import propImage from "@/assets/images/prop-image2.jpg";
import productSectionImage from "@/assets/images/prop-image.jpeg";

const router = useRouter();
const { getBranches } = useFirebase();
// Use client-only wrapper for Firebase composable
let getProductsByBakeryType;

if (import.meta.client) {
  const { getProductsByBakeryType: fetchProducts } = useProducts();
  getProductsByBakeryType = fetchProducts;
} else {
  // Server-side fallback
  getProductsByBakeryType = async () => [];
}

// Branch locations data
const branches = ref([]);
const branchesLoading = ref(true);
const showLocationDialog = ref(false);
const selectedBranch = ref(null);

// Product data from Firestore
const bakeryProducts = ref([]);
const productsLoading = ref(true);

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

// Handle location button click
const handleLocationClick = (branch) => {
  if (branch.locationUrl && branch.locationUrl.trim()) {
    // Open location URL in new tab
    window.open(branch.locationUrl, "_blank");
  } else {
    // Show dialog for missing location
    selectedBranch.value = branch;
    showLocationDialog.value = true;
  }
};

// Close dialog
const closeDialog = () => {
  showLocationDialog.value = false;
  selectedBranch.value = null;
};

// Load branch locations and products
onMounted(async () => {
  try {
    // Load branch locations
    branches.value = await getBranches();

    // Load bakery products (client-side only)
    if (import.meta.client) {
      bakeryProducts.value = await getProductsByBakeryType("bakery");
      console.log(
        "✅ HOME: Bakery products loaded:",
        bakeryProducts.value.length
      );
    }
  } catch (error) {
    console.error("Failed to load data:", error);
  } finally {
    branchesLoading.value = false;
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
