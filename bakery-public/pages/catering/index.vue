<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[60vh]"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0')`,
      }"
    >
      <div class="absolute inset-0 bg-black/60"></div>
      <div class="relative z-10 h-full flex items-center justify-center px-4">
        <div class="text-center text-white">
          <h1 class="text-5xl lg:text-6xl font-bold mb-4 italic" style="font-family: 'Brush Script MT', cursive;">
            Catering Services
          </h1>
          <p class="text-xl lg:text-2xl">Perfect for events, meetings, and celebrations</p>
          <button class="mt-8 bg-red-900 hover:bg-red-950 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Get Quote Now
          </button>
        </div>
      </div>
    </section>

    <!-- Service Overview -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-6">Why Choose Our Catering?</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            From intimate gatherings to large corporate events, we provide fresh, delicious baked goods 
            that make every occasion special.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Fresh Daily</h3>
            <p class="text-gray-600">All items prepared fresh on the day of your event using premium ingredients</p>
          </div>
          <div class="text-center p-6">
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Custom Options</h3>
            <p class="text-gray-600">Tailored menus and presentations to match your event theme and dietary needs</p>
          </div>
          <div class="text-center p-6">
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Professional Setup</h3>
            <p class="text-gray-600">Complete setup and presentation with elegant displays and serving accessories</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Catering Packages -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">Catering Packages</h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="cateringPackage in cateringPackages"
            :key="cateringPackage.id"
            class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div class="relative">
              <img
                :src="cateringPackage.image"
                :alt="cateringPackage.name"
                class="w-full h-48 object-cover"
              />
              <div v-if="cateringPackage.isPopular" class="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ cateringPackage.name }}</h3>
              <p class="text-gray-600 mb-4">{{ cateringPackage.description }}</p>
              
              <div class="mb-4">
                <h4 class="font-semibold text-gray-800 mb-2">Includes:</h4>
                <ul class="space-y-1">
                  <li v-for="item in cateringPackage.includes" :key="item" class="text-sm text-gray-600 flex items-center">
                    <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="flex justify-between items-center mb-4">
                <div>
                  <span class="text-2xl font-bold text-red-600">${{ cateringPackage.price }}</span>
                  <span class="text-sm text-gray-500 ml-1">{{ cateringPackage.servingSize }}</span>
                </div>
                <span class="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {{ cateringPackage.minOrder }} min
                </span>
              </div>

              <button class="w-full bg-red-900 hover:bg-red-950 text-white py-2 px-4 rounded-md font-semibold transition-colors">
                Select Package
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Event Types -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-6">Perfect for Any Event</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            We've catered events of all sizes and types. Let us make your next event deliciously memorable.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="eventType in eventTypes"
            :key="eventType.id"
            class="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors"
          >
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20" v-html="eventType.icon">
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">{{ eventType.name }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ eventType.description }}</p>
            <div class="text-xs text-gray-500">
              <span class="block">From {{ eventType.minGuests }} guests</span>
              <span class="block">{{ eventType.notice }} notice</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Menu Options -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">Catering Menu Options</h2>
        
        <div class="grid md:grid-cols-2 gap-12">
          <div
            v-for="category in menuCategories"
            :key="category.id"
            class="bg-white rounded-lg shadow-lg p-8"
          >
            <div class="flex items-center mb-6">
              <div class="bg-red-100 p-3 rounded-full mr-4">
                <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" v-html="category.icon">
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-800">{{ category.name }}</h3>
                <p class="text-gray-600">{{ category.description }}</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <div
                v-for="item in category.items"
                :key="item.id"
                class="border-b border-gray-200 pb-3"
              >
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-800">{{ item.name }}</h4>
                    <p class="text-sm text-gray-600">{{ item.description }}</p>
                  </div>
                  <div class="text-right ml-4">
                    <span class="font-bold text-red-600">${{ item.price }}</span>
                    <span class="text-xs text-gray-500 block">{{ item.unit }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ordering Process -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-6">How to Order</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Simple steps to get delicious catering for your next event
          </p>
        </div>

        <div class="grid md:grid-cols-4 gap-8">
          <div
            v-for="(step, index) in orderingSteps"
            :key="step.id"
            class="text-center"
          >
            <div class="bg-red-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              {{ index + 1 }}
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">{{ step.title }}</h3>
            <p class="text-gray-600 text-sm">{{ step.description }}</p>
          </div>
        </div>

        <div class="text-center mt-12">
          <button class="bg-red-900 hover:bg-red-950 text-white px-8 py-3 rounded-lg font-semibold transition-colors mr-4">
            Start Your Order
          </button>
          <button class="border border-red-900 text-red-900 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
            Download Menu PDF
          </button>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="py-16 bg-red-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Ready to Cater Your Event?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Contact our catering team today for a custom quote and menu planning consultation.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-white text-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Custom Quote
          </button>
          <button class="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-colors">
            Call Catering Team
          </button>
        </div>
        <div class="mt-8 text-center">
          <p class="text-lg">Catering Hotline: <span class="font-semibold">+856 21 555 CATER</span></p>
          <p class="text-sm opacity-90 mt-1">Available Mon-Fri 8:00 AM - 6:00 PM</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const cateringPackages = ref([
  {
    id: 1,
    name: "Coffee Break Package",
    description: "Perfect for morning meetings and coffee breaks",
    price: "89",
    servingSize: "serves 10",
    minOrder: "48hr",
    isPopular: false,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    includes: [
      "Assorted pastries (12 pieces)",
      "Fresh coffee service",
      "Paper goods & napkins",
      "Setup assistance"
    ]
  },
  {
    id: 2,
    name: "Business Lunch",
    description: "Elegant spread for corporate meetings and presentations",
    price: "189",
    servingSize: "serves 15",
    minOrder: "72hr",
    isPopular: true,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    includes: [
      "Gourmet sandwich platters",
      "Artisan bread selection",
      "Fresh fruit & desserts",
      "Complete tableware",
      "Professional setup"
    ]
  },
  {
    id: 3,
    name: "Celebration Package",
    description: "Complete package for birthdays, graduations, and special events",
    price: "299",
    servingSize: "serves 25",
    minOrder: "1 week",
    isPopular: false,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    includes: [
      "Custom celebration cake",
      "Assorted pastries & cookies",
      "Beverage service",
      "Decorative setup",
      "Event coordinator"
    ]
  },
  {
    id: 4,
    name: "Wedding Package",
    description: "Comprehensive catering for your special day",
    price: "599",
    servingSize: "serves 50",
    minOrder: "3 weeks",
    isPopular: false,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    includes: [
      "Multi-tier wedding cake",
      "Dessert table setup",
      "Wedding favors",
      "Full service team",
      "Consultation & tasting"
    ]
  },
  {
    id: 5,
    name: "Corporate Event",
    description: "Large-scale catering for conferences and corporate gatherings",
    price: "799",
    servingSize: "serves 100",
    minOrder: "2 weeks",
    isPopular: true,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    includes: [
      "Full breakfast/lunch spread",
      "Coffee & beverage stations",
      "Dietary accommodations",
      "Professional service staff",
      "Event management"
    ]
  },
  {
    id: 6,
    name: "Custom Package",
    description: "Tailored specifically to your event needs and budget",
    price: "Quote",
    servingSize: "any size",
    minOrder: "varies",
    isPopular: false,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    includes: [
      "Personalized menu design",
      "Flexible serving options",
      "Custom dietary needs",
      "Specialized decorations",
      "Full consultation"
    ]
  }
]);

const eventTypes = ref([
  {
    id: 1,
    name: "Corporate Events",
    description: "Meetings, conferences, seminars",
    minGuests: "10",
    notice: "48hr",
    icon: '<path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>'
  },
  {
    id: 2,
    name: "Weddings",
    description: "Ceremonies, receptions, celebrations",
    minGuests: "25",
    notice: "3 weeks",
    icon: '<path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>'
  },
  {
    id: 3,
    name: "Private Parties",
    description: "Birthdays, anniversaries, celebrations",
    minGuests: "8",
    notice: "1 week",
    icon: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>'
  },
  {
    id: 4,
    name: "Community Events",
    description: "Fundraisers, school events, gatherings",
    minGuests: "20",
    notice: "1 week",
    icon: '<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>'
  }
]);

const menuCategories = ref([
  {
    id: 1,
    name: "Sweet Treats",
    description: "Pastries, cakes, and desserts",
    icon: '<path d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"/>',
    items: [
      { id: 1, name: "Assorted Pastry Platter", description: "Mix of croissants, muffins, and Danish", price: "45", unit: "per dozen" },
      { id: 2, name: "Mini Dessert Display", description: "Bite-sized cakes and cookies", price: "65", unit: "serves 20" },
      { id: 3, name: "Custom Celebration Cake", description: "Personalized cake for your event", price: "75", unit: "8-inch cake" }
    ]
  },
  {
    id: 2,
    name: "Savory Options",
    description: "Sandwiches, quiches, and light meals",
    icon: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
    items: [
      { id: 4, name: "Gourmet Sandwich Platter", description: "Assorted premium sandwiches", price: "89", unit: "serves 10" },
      { id: 5, name: "Mini Quiche Selection", description: "Variety of savory quiches", price: "55", unit: "per dozen" },
      { id: 6, name: "Artisan Bread Basket", description: "Fresh baked breads with spreads", price: "35", unit: "serves 15" }
    ]
  }
]);

const orderingSteps = ref([
  {
    id: 1,
    title: "Contact Us",
    description: "Call or email our catering team with your event details"
  },
  {
    id: 2,
    title: "Menu Planning",
    description: "We'll help design the perfect menu for your event and budget"
  },
  {
    id: 3,
    title: "Confirmation",
    description: "Review final details and confirm your order with deposit"
  },
  {
    id: 4,
    title: "Event Day",
    description: "We handle setup, service, and cleanup for your event"
  }
]);

// SEO
useHead({
  title: 'Catering Services - Bakery House | Events & Corporate',
  meta: [
    {
      name: 'description',
      content: 'Professional catering services for corporate events, weddings, and private parties. Fresh baked goods, custom menus, and full-service event support from Bakery House.'
    },
    {
      property: 'og:title',
      content: 'Bakery House Catering - Fresh Baked Goods for Your Event'
    },
    {
      property: 'og:description',
      content: 'Make your event memorable with our catering services. Custom cakes, pastry platters, corporate packages and full-service event support available.'
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