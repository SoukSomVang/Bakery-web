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
            <div class="text-3xl font-bold text-gray-800 mb-2">4</div>
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
        
        <div class="grid lg:grid-cols-2 gap-8">
          <div
            v-for="branch in branches"
            :key="branch.id"
            class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <!-- Branch Image -->
            <div class="relative h-64">
              <img
                :src="branch.image"
                :alt="`${branch.name} location`"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-4 left-4">
                <span :class="[
                  'px-3 py-1 rounded-full text-sm font-semibold',
                  branch.isMain ? 'bg-red-600 text-white' : 'bg-white text-red-600'
                ]">
                  {{ branch.isMain ? 'Main Branch' : 'Branch' }}
                </span>
              </div>
            </div>

            <!-- Branch Details -->
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-2xl font-bold text-gray-800 mb-1">{{ branch.name }}</h3>
                  <p class="text-gray-600">{{ branch.specialty }}</p>
                </div>
                <div class="text-right">
                  <div class="flex items-center text-yellow-500 mb-1">
                    <svg v-for="star in 5" :key="star" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-600">{{ branch.rating }} ({{ branch.reviews }} reviews)</span>
                </div>
              </div>

              <!-- Address & Contact -->
              <div class="space-y-3 mb-6">
                <div class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-red-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                  <div class="text-gray-700">
                    <div class="font-medium">{{ branch.address }}</div>
                    <div class="text-sm text-gray-600">{{ branch.city }}, {{ branch.zipCode }}</div>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <span class="text-gray-700">{{ branch.phone }}</span>
                </div>

                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                  </svg>
                  <div class="text-gray-700">
                    <div class="font-medium">{{ branch.hours.weekdays }}</div>
                    <div class="text-sm text-gray-600">{{ branch.hours.weekends }}</div>
                  </div>
                </div>
              </div>

              <!-- Features -->
              <div class="mb-6">
                <h4 class="font-semibold text-gray-800 mb-2">Features</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="feature in branch.features"
                    :key="feature"
                    class="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full"
                  >
                    {{ feature }}
                  </span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex space-x-3">
                <button class="flex-1 bg-red-900 hover:bg-red-950 text-white py-2 px-4 rounded-md font-semibold transition-colors text-sm">
                  Get Directions
                </button>
                <button class="flex-1 border border-red-900 text-red-900 py-2 px-4 rounded-md font-semibold hover:bg-red-50 transition-colors text-sm">
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-6">Find Us on the Map</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Locate our branches easily with our interactive map. Each location offers the same quality and freshness you expect from Bakery House.
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

    <!-- Franchise Opportunities -->
    <section class="py-16 bg-red-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Interested in Opening a Franchise?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Join the Bakery House family and bring our delicious baked goods to your community.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-white text-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Learn About Franchising
          </button>
          <button class="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-colors">
            Contact Franchise Team
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const branches = ref([
  {
    id: 1,
    name: "Treekoff NorngNieng",
    specialty: "Artisan breads & Signature croissants",
    address: "123 Main Street, Building A",
    city: "Vientiane",
    zipCode: "01000",
    phone: "+856 21 123 456",
    email: "norngnieng@bakeryhouse.com",
    isMain: true,
    rating: "4.9",
    reviews: "245",
    image: "https://media.phillyvoice.com/media/images/Screen_Shot_2021-07-20_at_1.14.40_PM.width-600.png",
    hours: {
      weekdays: "Mon-Fri: 6:00 AM - 8:00 PM",
      weekends: "Sat-Sun: 7:00 AM - 7:00 PM"
    },
    features: ["Drive Thru", "WiFi", "Parking", "Custom Orders", "Catering", "Seating Area"]
  },
  {
    id: 2,
    name: "Treekoff Dongpalan",
    specialty: "Fresh pastries & Coffee pairings",
    address: "456 Commerce Ave, Suite 101",
    city: "Vientiane",
    zipCode: "01001",
    phone: "+856 21 234 567",
    email: "dongpalan@bakeryhouse.com",
    isMain: false,
    rating: "4.8",
    reviews: "189",
    image: "https://media.phillyvoice.com/media/images/Screen_Shot_2021-07-20_at_1.14.40_PM.width-600.png",
    hours: {
      weekdays: "Mon-Fri: 6:30 AM - 7:30 PM",
      weekends: "Sat-Sun: 7:30 AM - 6:30 PM"
    },
    features: ["WiFi", "Parking", "Custom Orders", "Coffee Bar", "Outdoor Seating"]
  },
  {
    id: 3,
    name: "Treekoff Wattainoy",
    specialty: "Quick service & Celebration cakes",
    address: "789 Market Plaza, Floor 2",
    city: "Vientiane",
    zipCode: "01002",
    phone: "+856 21 345 678",
    email: "wattainoy@bakeryhouse.com",
    isMain: false,
    rating: "4.7",
    reviews: "156",
    image: "https://media.phillyvoice.com/media/images/Screen_Shot_2021-07-20_at_1.14.40_PM.width-600.png",
    hours: {
      weekdays: "Mon-Fri: 5:30 AM - 9:00 PM",
      weekends: "Sat-Sun: 6:00 AM - 8:00 PM"
    },
    features: ["Extended Hours", "Parking", "Custom Orders", "Express Pickup", "Party Orders"]
  },
  {
    id: 4,
    name: "Treekoff Vatchan",
    specialty: "Full menu & Custom wedding cakes",
    address: "321 Heritage Boulevard",
    city: "Vientiane",
    zipCode: "01003",
    phone: "+856 21 456 789",
    email: "vatchan@bakeryhouse.com",
    isMain: false,
    rating: "4.9",
    reviews: "203",
    image: "https://media.phillyvoice.com/media/images/Screen_Shot_2021-07-20_at_1.14.40_PM.width-600.png",
    hours: {
      weekdays: "Mon-Fri: 6:00 AM - 8:30 PM",
      weekends: "Sat-Sun: 7:00 AM - 7:30 PM"
    },
    features: ["Full Menu", "WiFi", "Parking", "Custom Orders", "Wedding Cakes", "Event Planning", "Private Consultations"]
  }
]);

// SEO
useHead({
  title: 'Our Locations - Bakery House | Find Us Near You',
  meta: [
    {
      name: 'description',
      content: 'Find Bakery House locations across the city. Visit our 4 branches for fresh baked goods, custom orders, and specialty items. Store hours, directions, and contact info.'
    },
    {
      property: 'og:title',
      content: 'Bakery House Locations - Fresh Baked Goods Near You'
    },
    {
      property: 'og:description',
      content: 'Discover our 4 bakery locations offering artisan breads, custom cakes, and fresh pastries. Each branch specializes in different products to serve you better.'
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