<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[50vh]"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0')`,
      }"
    >
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 h-full flex items-center justify-center px-4">
        <div class="text-center text-white">
          <h1 class="text-5xl lg:text-6xl font-bold mb-4 italic" style="font-family: 'Brush Script MT', cursive;">
            Fresh Pastries
          </h1>
          <p class="text-xl lg:text-2xl">Buttery croissants, flaky puffs, and delicate treats</p>
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
          <span class="text-gray-800 font-semibold">Pastries</span>
        </nav>
      </div>
    </section>

    <!-- Pastry Categories -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Pastry Collections</h2>
        <div class="grid md:grid-cols-4 gap-6 mb-12">
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-1">Croissants</h3>
            <p class="text-sm text-gray-600">Buttery & flaky</p>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-1">Puffs</h3>
            <p class="text-sm text-gray-600">Light & airy</p>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-1">Tarts</h3>
            <p class="text-sm text-gray-600">Sweet & savory</p>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-1">Danish</h3>
            <p class="text-sm text-gray-600">Fruit-topped</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="pastry in pastries"
            :key="pastry.id"
            class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div class="relative">
              <img
                :src="pastry.image"
                :alt="pastry.name"
                class="w-full h-56 object-cover"
              />
              <div v-if="pastry.isPopular" class="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Popular
              </div>
              <div v-if="pastry.isNew" class="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                New
              </div>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-bold text-gray-800">{{ pastry.name }}</h3>
                <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {{ pastry.category }}
                </span>
              </div>
              <p class="text-gray-600 mb-3 text-sm">{{ pastry.description }}</p>
              <div class="mb-4">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="ingredient in pastry.ingredients"
                    :key="ingredient"
                    class="text-xs bg-red-50 text-red-700 px-2 py-1 rounded"
                  >
                    {{ ingredient }}
                  </span>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-red-600">${{ pastry.price }}</span>
                <button class="bg-red-900 hover:bg-red-950 text-white px-4 py-2 rounded-md font-semibold transition-colors text-sm">
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-gray-800 mb-6">French Pastry Tradition</h2>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Our pastries are crafted using traditional French techniques with premium butter, 
              creating the perfect balance of flakiness and flavor. Each croissant undergoes 
              a 3-day lamination process for the ultimate texture.
            </p>
            <div class="space-y-4 mb-8">
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">European butter (84% fat content)</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">24-hour cold fermentation</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">Hand-laminated dough layers</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">Baked fresh every 3 hours</span>
              </div>
            </div>
            <div class="flex space-x-4">
              <button class="bg-red-900 hover:bg-red-950 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                View Process
              </button>
              <button class="border border-red-900 text-red-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                Wholesale Orders
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop"
              alt="Baker preparing croissants"
              class="rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop"
              alt="Fresh pastries"
              class="rounded-lg shadow-lg mt-8"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-red-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Fresh Every 3 Hours</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Our pastries are baked fresh throughout the day. Visit us early for the warmest selection!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-white text-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Check Baking Schedule
          </button>
          <button class="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-colors">
            Order for Pickup
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const pastries = ref([
  {
    id: 1,
    name: "Ham & Cheese Croissant",
    description: "Buttery croissant filled with premium ham and Swiss cheese",
    price: "4.50",
    category: "Croissant",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    ingredients: ["Ham", "Swiss Cheese", "Butter"],
    isPopular: true
  },
  {
    id: 2,
    name: "Almond Croissant",
    description: "Classic croissant with almond cream filling and sliced almonds",
    price: "3.75",
    category: "Croissant",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    ingredients: ["Almond Cream", "Almonds", "Butter"]
  },
  {
    id: 3,
    name: "Plain Butter Croissant",
    description: "Traditional French croissant made with European butter",
    price: "2.99",
    category: "Croissant",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    ingredients: ["European Butter", "Flour", "Yeast"],
    isPopular: true
  },
  {
    id: 4,
    name: "Spinach & Cheese Croissant",
    description: "Flaky croissant with sautéed spinach and creamy cheese filling",
    price: "4.25",
    category: "Croissant",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    ingredients: ["Spinach", "Cream Cheese", "Butter"]
  },
  {
    id: 5,
    name: "Classic Cream Puffs",
    description: "Light choux pastry filled with vanilla pastry cream",
    price: "3.50",
    category: "Puffs",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
    ingredients: ["Vanilla Cream", "Choux Pastry", "Sugar"]
  },
  {
    id: 6,
    name: "Matcha Cream Puffs",
    description: "Delicate puffs filled with green tea flavored cream",
    price: "3.75",
    category: "Puffs",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
    ingredients: ["Matcha", "Cream", "Choux Pastry"],
    isNew: true
  },
  {
    id: 7,
    name: "Coconut Tart",
    description: "Crispy tart shell filled with coconut custard and toasted coconut",
    price: "4.99",
    category: "Tarts",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
    ingredients: ["Coconut", "Custard", "Pastry Shell"]
  },
  {
    id: 8,
    name: "Egg Tarts",
    description: "Portuguese-style egg tarts with silky custard filling",
    price: "3.25",
    category: "Tarts",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
    ingredients: ["Egg Custard", "Pastry Shell", "Vanilla"],
    isPopular: true
  },
  {
    id: 9,
    name: "Chocolate Danish",
    description: "Flaky Danish pastry with rich chocolate filling",
    price: "4.75",
    category: "Danish",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    ingredients: ["Chocolate", "Danish Dough", "Sugar Glaze"]
  }
]);

// SEO
useHead({
  title: 'Fresh Pastries - Bakery House | Croissants & More',
  meta: [
    {
      name: 'description',
      content: 'Discover our selection of fresh pastries including buttery croissants, cream puffs, tarts and Danish. Made with European butter and traditional French techniques.'
    },
    {
      property: 'og:title',
      content: 'Fresh Pastries - Bakery House | French Croissants & Pastries'
    },
    {
      property: 'og:description',
      content: 'Traditional French pastries made with European butter. Croissants, cream puffs, tarts and more - baked fresh throughout the day.'
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