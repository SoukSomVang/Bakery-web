<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[50vh]"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3')`,
      }"
    >
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 h-full flex items-center justify-center px-4">
        <div class="text-center text-white">
          <h1 class="text-5xl lg:text-6xl font-bold mb-4 italic" style="font-family: 'Brush Script MT', cursive;">
            Delicious Cakes
          </h1>
          <p class="text-xl lg:text-2xl">Custom and ready-made cakes for every occasion</p>
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
          <span class="text-gray-800 font-semibold">Cakes</span>
        </nav>
      </div>
    </section>

    <!-- Cake Categories -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Cake Categories</h2>
        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Ready-Made</h3>
            <p class="text-gray-600">Perfect for immediate purchase</p>
          </div>
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Custom Orders</h3>
            <p class="text-gray-600">Personalized for your special events</p>
          </div>
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Wedding Cakes</h3>
            <p class="text-gray-600">Beautiful multi-tier creations</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Our Cake Selection</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="cake in cakes"
            :key="cake.id"
            class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              :src="cake.image"
              :alt="cake.name"
              class="w-full h-56 object-cover"
            />
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-bold text-gray-800">{{ cake.name }}</h3>
                <span 
                  :class="[
                    'text-xs px-2 py-1 rounded-full',
                    cake.category === 'Custom' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  ]"
                >
                  {{ cake.category }}
                </span>
              </div>
              <p class="text-gray-600 mb-3">{{ cake.description }}</p>
              <div class="mb-4">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="flavor in cake.flavors"
                    :key="flavor"
                    class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {{ flavor }}
                  </span>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-2xl font-bold text-red-600">${{ cake.price }}</span>
                  <span class="text-sm text-gray-500 ml-1">{{ cake.size }}</span>
                </div>
                <button class="bg-red-900 hover:bg-red-950 text-white px-4 py-2 rounded-md font-semibold transition-colors">
                  {{ cake.category === 'Custom' ? 'Order Custom' : 'Order Now' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Custom Order Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-gray-800 mb-6">Custom Cake Orders</h2>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Make your special occasions even more memorable with our custom-designed cakes. 
              From birthday celebrations to wedding centerpieces, we create edible works of art 
              tailored to your vision.
            </p>
            <div class="space-y-4 mb-8">
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">Custom designs and themes</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">Multiple flavor combinations</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">Professional decoration</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-red-100 p-2 rounded-full">
                  <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700">48-hour advance notice required</span>
              </div>
            </div>
            <button class="bg-red-900 hover:bg-red-950 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Start Custom Order
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop"
              alt="Custom cake design"
              class="rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop"
              alt="Wedding cake"
              class="rounded-lg shadow-lg mt-8"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-red-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Sweet Celebrations</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Every celebration deserves a perfect cake. Let us create something special for your next event.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-white text-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Order Custom Cake
          </button>
          <button class="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-colors">
            View Gallery
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const cakes = ref([
  {
    id: 1,
    name: "Chocolate Two Tone Lava",
    description: "Rich chocolate cake with molten chocolate center and dual chocolate layers",
    price: "6.99",
    size: "individual",
    category: "Ready",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    flavors: ["Dark Chocolate", "Milk Chocolate", "Vanilla"]
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    description: "Classic red velvet with cream cheese frosting and elegant presentation",
    price: "6.75",
    size: "slice",
    category: "Ready",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    flavors: ["Red Velvet", "Cream Cheese"]
  },
  {
    id: 3,
    name: "Carrot Cake",
    description: "Moist carrot cake with walnuts, raisins, and cinnamon cream cheese frosting",
    price: "5.75",
    size: "slice",
    category: "Ready",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    flavors: ["Carrot Spice", "Cream Cheese", "Walnut"]
  },
  {
    id: 4,
    name: "Mousse Cake Matcha",
    description: "Light and airy matcha mousse cake with green tea flavor and delicate texture",
    price: "7.50",
    size: "slice",
    category: "Ready",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    flavors: ["Matcha", "Vanilla", "White Chocolate"]
  },
  {
    id: 5,
    name: "Classic Cheesecake",
    description: "Creamy New York style cheesecake with graham cracker crust",
    price: "6.25",
    size: "slice",
    category: "Ready",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    flavors: ["Vanilla Cheesecake", "Graham Cracker"]
  },
  {
    id: 6,
    name: "Chocolate Top Mousse",
    description: "Decadent chocolate mousse topped with chocolate ganache and berries",
    price: "7.25",
    size: "individual",
    category: "Ready",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    flavors: ["Chocolate Mousse", "Dark Chocolate", "Berry"]
  },
  {
    id: 7,
    name: "Custom Birthday Cake",
    description: "Personalized birthday cake with custom design, colors, and message",
    price: "45.00",
    size: "8-inch",
    category: "Custom",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    flavors: ["Any Flavor", "Custom Design", "Personal Message"]
  },
  {
    id: 8,
    name: "Wedding Cake (2-Tier)",
    description: "Elegant two-tier wedding cake with floral decorations and custom flavors",
    price: "150.00",
    size: "2-tier",
    category: "Custom",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    flavors: ["Vanilla", "Chocolate", "Strawberry", "Custom"]
  },
  {
    id: 9,
    name: "Theme Cake",
    description: "Custom themed cake for special occasions with 3D decorations",
    price: "65.00",
    size: "10-inch",
    category: "Custom",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    flavors: ["Custom Theme", "3D Design", "Any Flavor"]
  }
]);

// SEO
useHead({
  title: 'Custom & Ready-Made Cakes - Bakery House',
  meta: [
    {
      name: 'description',
      content: 'Discover our delicious selection of ready-made cakes and custom cake designs. From birthday celebrations to wedding centerpieces - we create sweet memories.'
    },
    {
      property: 'og:title',
      content: 'Delicious Cakes - Bakery House | Custom & Ready-Made'
    },
    {
      property: 'og:description',
      content: 'Beautiful custom cakes and ready-made desserts for every occasion. Professional decoration, multiple flavors, and personalized designs available.'
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