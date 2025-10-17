<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center"
      :style="{ backgroundImage: `url('${backgroundImage}')` }"
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-red-900/40"
      ></div>

      <!-- Content -->
      <div
        class="relative z-10 flex items-center min-h-[80vh] px-4 md:px-8 py-12 md:py-20"
      >
        <div class="container mx-auto">
          <div class="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <!-- Left Content -->
            <div class="space-y-6 order-2 lg:order-1 text-center lg:text-left">
              <div
                class="border-l-4 border-white lg:pl-8 pl-4 animate-fade-in-up"
                style="animation-delay: 0.4s"
              >
                <h2
                  class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white"
                >
                  {{ t('aboutUs.serviceSince') }}<br />
                  <span class="text-4xl sm:text-5xl lg:text-6xl"
                    >10/10/2024</span
                  >
                </h2>
              </div>

              <div
                class="border-l-4 border-white lg:pl-8 pl-4 animate-fade-in-up"
                style="animation-delay: 0.6s"
              >
                <h3
                  class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200"
                >
                  {{ t('aboutUs.bakeryHouse') }}
                </h3>
              </div>

              <div
                class="pl-4 lg:pl-8 animate-fade-in-up"
                style="animation-delay: 0.8s"
              >
                <button
                  class="bg-red-900 hover:bg-red-950 text-white px-6 md:px-10 py-3 md:py-4 rounded-md font-semibold transition-colors w-full sm:w-auto"
                >
                  {{ t('aboutUs.contactUs') }}
                </button>
              </div>
            </div>

            <!-- Right Content - Stylized Logo -->
            <div class="flex justify-center lg:justify-end order-1 lg:order-2">
              <div class="animate-fade-in-right" style="animation-delay: 0.8s">
                <img
                  :src="Logo"
                  alt="logo"
                  class="w-48 sm:w-64 md:w-72 lg:w-80 h-auto mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-12 md:py-16 bg-white">
      <div class="container mx-auto px-4 md:px-6">
        <div class="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <h2
              class="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left"
            >
              {{ t('aboutUs.ourStory') }}
            </h2>
            <p
              class="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base text-justify"
            >
              {{ t('aboutUs.storyContent') }}
            </p>
            <div class="flex justify-center md:justify-start">
              <div
                class="bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold text-sm sm:text-base"
              >
                {{ t('aboutUs.serviceSince') }} 10/10/2024
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <img
              :src="CeoImage"
              alt="Baker at work"
              class="rounded-lg shadow-lg w-full h-auto object-cover"
            />
            <img
              :src="CookingImage"
              alt="Fresh bread"
              class="rounded-lg shadow-lg mt-4 sm:mt-8 w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Brands Section -->
    <section class="py-12 md:py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            {{ t('home.ourCustomers') }}
          </h2>
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
                <span class="text-sm font-medium">{{ t('common.visit') }} {{ brands[0].name }}</span>
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
                <span class="text-sm font-medium">{{ t('common.visit') }} {{brands[1].name}}</span>
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
import backgroundImage from "@/assets/images/background.jpeg";
import Logo from "@/assets/images/logo/white-logo.png";
import CeoImage from "@/assets/images/ceo-image.jpeg";
import CookingImage from "@/assets/images/about-us.jpeg";
import KafepaLogo from "@/assets/images/logo/kafepa_logo.jpg";
import TreekoffLogo from "@/assets/images/logo/treekoff_logo.png";

const { t } = useTranslation();

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

// Meta tags for SEO
useHead({
  title: "About Us - BakeryHouse | Artisan Baking Since 2024",
  meta: [
    {
      name: "description",
      content:
        "Learn about BakeryHouse - our story, values, team, and locations. Crafting exceptional baked goods with passion and tradition since 2024.",
    },
    {
      property: "og:title",
      content: "About BakeryHouse - Artisan Baking & Fresh Pastries",
    },
    {
      property: "og:description",
      content:
        "Discover our commitment to quality baking, meet our talented team, and find our locations across the city.",
    },
  ],
});
</script>

<style scoped>
/* Additional custom styles if needed */
.container {
  max-width: 1200px;
}

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
</style>
