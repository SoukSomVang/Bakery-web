<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[50vh]"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1509440159596-0249088772ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3')`,
      }"
    >
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 h-full flex items-center justify-center px-4">
        <div class="text-center text-white">
          <h1 class="text-5xl lg:text-6xl font-bold mb-4 italic" style="font-family: 'Brush Script MT', cursive;">
            Fresh Breads
          </h1>
          <p class="text-xl lg:text-2xl">Artisan breads baked fresh every morning</p>
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
          <span class="text-gray-800 font-semibold">Breads</span>
        </nav>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="bread in breads"
            :key="bread.id"
            class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              :src="bread.image"
              :alt="bread.name"
              class="w-full h-56 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-2">{{ bread.name }}</h3>
              <p class="text-gray-600 mb-3">{{ bread.description }}</p>
              <div class="mb-4">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="ingredient in bread.ingredients"
                    :key="ingredient"
                    class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {{ ingredient }}
                  </span>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-red-600">${{ bread.price }}</span>
                <button class="bg-red-900 hover:bg-red-950 text-white px-4 py-2 rounded-md font-semibold transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Information Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-gray-800 mb-6">Our Bread Making Process</h2>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Every loaf starts before dawn with our master bakers selecting the finest flour, 
              natural yeast, and quality ingredients. We use traditional techniques combined 
              with modern precision to create breads that are crusty on the outside and 
              perfectly soft inside.
            </p>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">Premium organic flour</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">Natural fermentation process</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">Hand-shaped and stone-baked</span>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
              alt="Baker at work"
              class="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-red-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Fresh Daily</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Our breads are baked fresh every morning. Pre-order to guarantee your favorites!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-white text-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Pre-Order Now
          </button>
          <button class="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const breads = ref([
  {
    id: 1,
    name: "Whole Wheat Multigrain Bread",
    description: "Nutritious blend of whole wheat flour with seeds and grains",
    price: "3.25",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    ingredients: ["Whole Wheat", "Sunflower Seeds", "Flax Seeds", "Oats"]
  },
  {
    id: 2,
    name: "Classic Sourdough",
    description: "Traditional sourdough with a perfectly tangy flavor and crispy crust",
    price: "4.50",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
    ingredients: ["Sourdough Starter", "Organic Flour", "Sea Salt", "Water"]
  },
  {
    id: 3,
    name: "French Baguette",
    description: "Authentic French baguette with a golden crust and airy interior",
    price: "2.75",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
    ingredients: ["French Flour", "Yeast", "Salt", "Water"]
  },
  {
    id: 4,
    name: "Pumpernickel Rye",
    description: "Dense, dark rye bread with a rich, earthy flavor",
    price: "4.25",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    ingredients: ["Rye Flour", "Molasses", "Caraway Seeds", "Sourdough"]
  },
  {
    id: 5,
    name: "Ciabatta",
    description: "Italian bread with a crispy crust and open, airy crumb",
    price: "3.75",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
    ingredients: ["Italian Flour", "Olive Oil", "Yeast", "Sea Salt"]
  },
  {
    id: 6,
    name: "Focaccia",
    description: "Herb-topped Italian flatbread, perfect for sharing",
    price: "5.50",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
    ingredients: ["Olive Oil", "Rosemary", "Sea Salt", "Italian Flour"]
  }
]);

// SEO
useHead({
  title: 'Fresh Breads - Bakery House | Artisan Breads Daily',
  meta: [
    {
      name: 'description',
      content: 'Discover our selection of artisan breads including sourdough, multigrain, baguettes and more. Baked fresh daily using traditional techniques and premium ingredients.'
    },
    {
      property: 'og:title',
      content: 'Fresh Artisan Breads - Bakery House'
    },
    {
      property: 'og:description',
      content: 'Handcrafted breads made with organic flour and traditional techniques. From classic sourdough to multigrain loaves - taste the difference quality makes.'
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