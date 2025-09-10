<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[50vh]"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1499636136210-6f4ee915583e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3')`,
      }"
    >
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 h-full flex items-center justify-center px-4">
        <div class="text-center text-white">
          <h1 class="text-5xl lg:text-6xl font-bold mb-4 italic" style="font-family: 'Brush Script MT', cursive;">
            Sweet Cookies
          </h1>
          <p class="text-xl lg:text-2xl">Handcrafted cookies and sweet treats</p>
        </div>
      </div>
    </section>

    <!-- Breadcrumb -->
    <section class="py-4 bg-white border-b">
      <div class="container mx-auto px-4">
        <nav class="text-sm text-gray-600">
          <NuxtLink to="/" class="hover:text-red-600">Home</NuxtLink>
          <span class="mx-2">></span>
          <NuxtLink to="/products" class="hover:text-red-600">Products</NuxtLink>
          <span class="mx-2">></span>
          <span class="text-gray-800 font-semibold">Cookies</span>
        </nav>
      </div>
    </section>

    <!-- Cookie Categories -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Cookie Varieties</h2>
        <div class="grid md:grid-cols-5 gap-4 mb-12">
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16z"/>
              </svg>
            </div>
            <h3 class="text-sm font-bold text-gray-800">Classic</h3>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-sm font-bold text-gray-800">Premium</h3>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10z"/>
              </svg>
            </div>
            <h3 class="text-sm font-bold text-gray-800">Seasonal</h3>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h3 class="text-sm font-bold text-gray-800">Decorated</h3>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-3.22l-3.02 3.02a1 1 0 01-1.56-.8V15H5a2 2 0 01-2-2V5z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-sm font-bold text-gray-800">Custom</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="cookie in cookies"
            :key="cookie.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="relative">
              <img
                :src="cookie.image"
                :alt="cookie.name"
                class="w-full h-48 object-cover"
              />
              <div v-if="cookie.isBestseller" class="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Bestseller
              </div>
              <div v-if="cookie.isNew" class="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                New
              </div>
              <div v-if="cookie.isLimited" class="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Limited
              </div>
            </div>
            <div class="p-4">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-bold text-gray-800">{{ cookie.name }}</h3>
                <span :class="[
                  'text-xs px-2 py-1 rounded-full',
                  getCategoryColor(cookie.category)
                ]">
                  {{ cookie.category }}
                </span>
              </div>
              <p class="text-gray-600 mb-3 text-sm">{{ cookie.description }}</p>
              <div class="mb-3">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="flavor in cookie.flavors"
                    :key="flavor"
                    class="text-xs bg-red-50 text-red-700 px-2 py-1 rounded"
                  >
                    {{ flavor }}
                  </span>
                </div>
              </div>
              <div class="flex justify-between items-center mb-3">
                <div>
                  <span class="text-lg font-bold text-red-600">${{ cookie.price }}</span>
                  <span class="text-xs text-gray-500 ml-1">{{ cookie.unit }}</span>
                </div>
                <div class="text-xs text-gray-500">
                  {{ cookie.size }}
                </div>
              </div>
              <button class="w-full bg-red-900 hover:bg-red-950 text-white py-2 rounded-md font-semibold transition-colors text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cookie Boxes Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-6">Cookie Gift Boxes</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Perfect for gifts, parties, or treating yourself. Our beautifully packaged cookie boxes make any occasion special.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="box in giftBoxes" :key="box.id" class="bg-gray-50 rounded-lg p-6 text-center">
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0115 5a3 3 0 013 3v6a3 3 0 01-3 3H5a3 3 0 01-3-3V8a3 3 0 013-3zm4 2H5a1 1 0 00-1 1v6a1 1 0 001 1h4V7zm2 0v9h4a1 1 0 001-1V8a1 1 0 00-1-1h-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ box.name }}</h3>
            <p class="text-gray-600 mb-3 text-sm">{{ box.description }}</p>
            <div class="text-sm text-gray-500 mb-4">
              <span class="block">{{ box.count }} cookies</span>
              <span class="block">{{ box.varieties }} varieties</span>
            </div>
            <div class="text-2xl font-bold text-red-600 mb-4">${{ box.price }}</div>
            <button class="w-full bg-red-900 hover:bg-red-950 text-white py-2 rounded-md font-semibold transition-colors">
              Order Box
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Custom Orders Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-gray-800 mb-6">Custom Cookie Orders</h2>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Create personalized cookies for your special events. From corporate logos to 
              wedding favors, we can design and bake custom cookies that match your vision perfectly.
            </p>
            <div class="space-y-3 mb-8">
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-1 rounded-full">
                  <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700 text-sm">Custom designs & logos</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-1 rounded-full">
                  <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700 text-sm">Corporate events & parties</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-1 rounded-full">
                  <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700 text-sm">Wedding & baby shower favors</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-1 rounded-full">
                  <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700 text-sm">48-hour minimum notice</span>
              </div>
            </div>
            <button class="bg-red-900 hover:bg-red-950 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Request Custom Quote
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop"
              alt="Custom decorated cookies"
              class="rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop"
              alt="Wedding favor cookies"
              class="rounded-lg shadow-lg mt-8"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-red-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Made Fresh Daily</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Our cookies are baked fresh every morning using premium ingredients. Taste the difference quality makes!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-white text-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Order Online
          </button>
          <button class="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-colors">
            Visit Store
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const cookies = ref([
  {
    id: 1,
    name: "Chocolate Chip Classic",
    description: "Traditional chocolate chip cookies with premium chocolate chunks",
    price: "2.25",
    unit: "each",
    size: "Large",
    category: "Classic",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop",
    flavors: ["Chocolate", "Vanilla"],
    isBestseller: true
  },
  {
    id: 2,
    name: "Red Velvet Cookie",
    description: "Soft red velvet cookies with cream cheese frosting",
    price: "2.50",
    unit: "each",
    size: "Large",
    category: "Premium",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop",
    flavors: ["Red Velvet", "Cream Cheese"]
  },
  {
    id: 3,
    name: "Matcha Green Tea",
    description: "Delicate matcha cookies with white chocolate drizzle",
    price: "2.75",
    unit: "each",
    size: "Medium",
    category: "Premium",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop",
    flavors: ["Matcha", "White Chocolate"],
    isNew: true
  },
  {
    id: 4,
    name: "White Chocolate Oreo",
    description: "Crushed Oreo cookies with white chocolate chunks",
    price: "3.25",
    unit: "each",
    size: "Large",
    category: "Premium",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop",
    flavors: ["Oreo", "White Chocolate"]
  },
  {
    id: 5,
    name: "Double Chocolate Fudge",
    description: "Rich chocolate cookies with fudge centers",
    price: "2.99",
    unit: "each",
    size: "Large",
    category: "Classic",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop",
    flavors: ["Dark Chocolate", "Fudge"],
    isBestseller: true
  },
  {
    id: 6,
    name: "Oatmeal Raisin",
    description: "Wholesome oats with plump raisins and cinnamon",
    price: "2.25",
    unit: "each",
    size: "Large",
    category: "Classic",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop",
    flavors: ["Oatmeal", "Raisin", "Cinnamon"]
  },
  {
    id: 7,
    name: "Snickerdoodle",
    description: "Soft cinnamon sugar cookies with crispy edges",
    price: "2.50",
    unit: "each",
    size: "Medium",
    category: "Classic",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop",
    flavors: ["Cinnamon", "Sugar"]
  },
  {
    id: 8,
    name: "Holiday Sugar Cookies",
    description: "Decorated sugar cookies for the season",
    price: "3.50",
    unit: "each",
    size: "Large",
    category: "Seasonal",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop",
    flavors: ["Vanilla", "Royal Icing"],
    isLimited: true
  }
]);

const giftBoxes = ref([
  {
    id: 1,
    name: "Classic Mix Box",
    description: "A perfect selection of our most popular cookies",
    count: 12,
    varieties: 4,
    price: "24.99"
  },
  {
    id: 2,
    name: "Premium Collection",
    description: "Our finest cookies including specialty flavors",
    count: 16,
    varieties: 6,
    price: "39.99"
  },
  {
    id: 3,
    name: "Party Pack",
    description: "Large assortment perfect for events",
    count: 24,
    varieties: 8,
    price: "59.99"
  }
]);

// Methods
const getCategoryColor = (category) => {
  const colors = {
    'Classic': 'bg-blue-100 text-blue-800',
    'Premium': 'bg-purple-100 text-purple-800',
    'Seasonal': 'bg-orange-100 text-orange-800',
    'Decorated': 'bg-pink-100 text-pink-800',
    'Custom': 'bg-green-100 text-green-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

// SEO
useHead({
  title: 'Sweet Cookies - Bakery House | Handcrafted Daily',
  meta: [
    {
      name: 'description',
      content: 'Discover our selection of handcrafted cookies including chocolate chip, red velvet, matcha, and custom decorated cookies. Fresh baked daily with premium ingredients.'
    },
    {
      property: 'og:title',
      content: 'Handcrafted Cookies - Bakery House | Fresh Daily'
    },
    {
      property: 'og:description',
      content: 'From classic chocolate chip to premium matcha cookies. Custom designs available for special events. Made fresh daily with the finest ingredients.'
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