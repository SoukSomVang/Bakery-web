<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center max-h-[80vh]"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1568254183919-78a4f43a2877?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIzfHx8ZW58MHx8fHx8')`,
      }"
    >
      <!-- Overlay matching your style -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-red-900/70"
      ></div>

      <!-- Content -->
      <div class="relative z-10 min-h-screen flex items-center px-4">
        <div class="container mx-auto">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- Left Content -->
            <div class="space-y-8">
              <div class="border-l-4 border-white pl-8">
                <h2
                  class="text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white"
                >
                  Service Since<br />
                  <span class="text-5xl lg:text-6xl">10/10/2024</span>
                </h2>
              </div>

              <div class="border-l-4 border-white pl-8">
                <h3 class="text-3xl lg:text-4xl font-bold text-gray-200">
                  Bakery house
                </h3>
              </div>

              <div class="pl-8">
                <button
                  class="bg-red-900 hover:bg-red-950 text-white px-6 md:px-10 py-3 md:py-4 rounded-md font-semibold transition-colors w-full md:w-auto"
                >
                  Contact Us
                </button>
              </div>
            </div>

            <!-- Right Content - Stylized Logo -->
            <div class="flex justify-center lg:justify-end">
              <div class="text-right">
                <!-- Bakery Text -->
                <div class="mb-4">
                  <span
                    class="text-7xl lg:text-8xl xl:text-9xl font-bold italic text-white tracking-wider"
                    style="
                      font-family: 'Brush Script MT', cursive;
                      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    "
                  >
                    Bakery
                  </span>
                </div>

                <!-- House Text -->
                <div class="relative">
                  <!-- Small house icon -->
                  <div class="absolute -top-6 right-0 text-red-300">
                    <svg
                      class="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                      />
                    </svg>
                  </div>

                  <span
                    class="text-5xl lg:text-6xl xl:text-7xl font-bold italic text-red-400 tracking-wider"
                    style="
                      font-family: 'Brush Script MT', cursive;
                      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    "
                  >
                    House
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Bakery House began as a dream to bring authentic, artisanal baking
              to our community. Founded with a commitment to quality and
              tradition, we've been serving freshly baked goods that bring
              families together and create lasting memories.
            </p>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Every morning, our skilled bakers arrive before dawn to prepare
              our signature croissants, artisan breads, and delectable pastries.
              We believe in using only the finest ingredients and time-honored
              techniques to ensure every bite is a moment of pure joy.
            </p>
            <div class="flex items-center space-x-4">
              <div
                class="bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold"
              >
                Service Since 10/10/2024
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop"
              alt="Baker at work"
              class="rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop"
              alt="Fresh bread"
              class="rounded-lg shadow-lg mt-8"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Branches Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-8 text-gray-800 underline">
          Branches
        </h2>
        <div class="space-y-4 max-w-md mx-auto">
          <div class="text-lg font-medium text-gray-700 underline">
            Treekoff NorngNieng
          </div>
          <div class="text-lg font-medium text-gray-700 underline">
            Treekoff Dongpalan
          </div>
          <div class="text-lg font-medium text-gray-700 underline">
            Treekoff Wattainoy
          </div>
          <div class="text-lg font-medium text-gray-700 underline">
            Treekoff Vatchan
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 bg-gradient-to-r from-red-900 to-red-700 text-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-6">Visit Us Today</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Experience the difference that passion and quality make. Come taste
          what makes Bakery House special.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="bg-white text-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View Our Products
          </button>
          <button
            class="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Meta tags for SEO
useHead({
  title: "About Us - Bakery House | Artisan Baking Since 2024",
  meta: [
    {
      name: "description",
      content:
        "Learn about Bakery House - our story, values, team, and locations. Crafting exceptional baked goods with passion and tradition since 2024.",
    },
    {
      property: "og:title",
      content: "About Bakery House - Artisan Baking & Fresh Pastries",
    },
    {
      property: "og:description",
      content:
        "Discover our commitment to quality baking, meet our talented team, and find our locations across the city.",
    },
  ],
});

// You can add reactive data here if needed for Firebase integration
const bakeryData = ref({
  foundedYear: 2024,
  branches: [
    {
      name: "Treekoff NornqNieng",
      specialty: "Artisan breads, Croissants",
      hours: "6:00 AM - 8:00 PM",
      phone: "+1 555-555-5556",
    },
    {
      name: "Treekoff Dongpalan",
      specialty: "Pastries, Coffee pairings",
      hours: "6:30 AM - 7:30 PM",
      phone: "+1 555-555-5557",
    },
    {
      name: "Treekoff Wattainoy",
      specialty: "Quick service, Cakes",
      hours: "5:30 AM - 9:00 PM",
      phone: "+1 555-555-5558",
    },
    {
      name: "Treekoff Vatchan",
      specialty: "Full menu, Custom orders",
      hours: "6:00 AM - 8:30 PM",
      phone: "+1 555-555-5559",
    },
  ],
});

// If you want to fetch data from Firebase Firestore
// const { $firestore } = useNuxtApp()
// onMounted(async () => {
//   try {
//     const doc = await $firestore.collection('bakery-info').doc('about').get()
//     if (doc.exists) {
//       bakeryData.value = { ...bakeryData.value, ...doc.data() }
//     }
//   } catch (error) {
//     console.error('Error fetching about data:', error)
//   }
// })
</script>

<style scoped>
/* Additional custom styles if needed */
.container {
  max-width: 1200px;
}
</style>
