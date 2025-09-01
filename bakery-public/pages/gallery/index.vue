<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center h-[50vh]"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3')`,
      }"
    >
      <div class="absolute inset-0 bg-black/60"></div>
      <div class="relative z-10 h-full flex items-center justify-center px-4">
        <div class="text-center text-white">
          <h1 class="text-5xl lg:text-6xl font-bold mb-4 italic" style="font-family: 'Brush Script MT', cursive;">
            Our Gallery
          </h1>
          <p class="text-xl lg:text-2xl">A visual journey through our delicious creations</p>
        </div>
      </div>
    </section>

    <!-- Gallery Filter -->
    <section class="py-8 bg-white border-b">
      <div class="container mx-auto px-4">
        <div class="flex justify-center">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-6 py-2 rounded-full font-semibold transition-colors',
                selectedCategory === category
                  ? 'bg-red-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="image in filteredImages"
            :key="image.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            @click="openLightbox(image)"
          >
            <div class="relative overflow-hidden">
              <img
                :src="image.thumbnail"
                :alt="image.title"
                class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm5 3a1 1 0 000 2h4a1 1 0 100-2H8z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ image.title }}</h3>
              <p class="text-sm text-gray-600">{{ image.description }}</p>
              <div class="mt-2">
                <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                  {{ image.category }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-12" v-if="hasMoreImages">
          <button 
            @click="loadMoreImages"
            class="bg-red-900 hover:bg-red-950 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Load More Images
          </button>
        </div>
      </div>
    </section>

    <!-- Behind the Scenes -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-6">Behind the Scenes</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Take a peek into our bakery kitchen and see the passion and craftsmanship that goes into every item we create.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="scene in behindScenes"
            :key="scene.id"
            class="relative group cursor-pointer"
            @click="openLightbox(scene)"
          >
            <img
              :src="scene.thumbnail"
              :alt="scene.title"
              class="w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-lg font-semibold">{{ scene.title }}</h3>
                <p class="text-sm opacity-90">{{ scene.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Customer Favorites -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-6">Customer Favorites</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            See what our customers are raving about! These are some of our most popular items.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="favorite in customerFavorites"
            :key="favorite.id"
            class="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              :src="favorite.image"
              :alt="favorite.name"
              class="w-full h-56 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-2">{{ favorite.name }}</h3>
              <p class="text-gray-600 mb-4">{{ favorite.description }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="flex text-yellow-400">
                    <svg v-for="star in 5" :key="star" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-600">{{ favorite.rating }}</span>
                </div>
                <span class="text-lg font-bold text-red-600">${{ favorite.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <div v-if="lightboxImage" @click="closeLightbox" class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div class="relative max-w-4xl max-h-full">
        <button @click="closeLightbox" class="absolute -top-12 right-0 text-white hover:text-gray-300">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
        <img
          :src="lightboxImage.fullSize"
          :alt="lightboxImage.title"
          class="max-w-full max-h-full object-contain rounded-lg"
          @click.stop
        />
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg p-6 text-white">
          <h3 class="text-xl font-bold mb-2">{{ lightboxImage.title }}</h3>
          <p class="text-gray-200">{{ lightboxImage.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const selectedCategory = ref('All');
const lightboxImage = ref(null);
const hasMoreImages = ref(true);

const categories = ['All', 'Breads', 'Cakes', 'Pastries', 'Cookies', 'Behind Scenes'];

const galleryImages = ref([
  {
    id: 1,
    title: "Fresh Sourdough Loaves",
    description: "Our signature sourdough bread with perfect crust",
    category: "Breads",
    thumbnail: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=800&fit=crop"
  },
  {
    id: 2,
    title: "Chocolate Birthday Cake",
    description: "Multi-layer chocolate cake with buttercream frosting",
    category: "Cakes",
    thumbnail: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=800&fit=crop"
  },
  {
    id: 3,
    title: "Buttery Croissants",
    description: "Traditional French croissants baked to golden perfection",
    category: "Pastries",
    thumbnail: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&h=800&fit=crop"
  },
  {
    id: 4,
    title: "Chocolate Chip Cookies",
    description: "Classic chocolate chip cookies with premium chocolate",
    category: "Cookies",
    thumbnail: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&h=800&fit=crop"
  },
  {
    id: 5,
    title: "Wedding Cake Masterpiece",
    description: "Three-tier wedding cake with floral decorations",
    category: "Cakes",
    thumbnail: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=800&fit=crop"
  },
  {
    id: 6,
    title: "Artisan Bread Collection",
    description: "Variety of our handcrafted artisan breads",
    category: "Breads",
    thumbnail: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=1200&h=800&fit=crop"
  },
  {
    id: 7,
    title: "Cream Puffs Display",
    description: "Elegant cream puffs filled with vanilla custard",
    category: "Pastries",
    thumbnail: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=1200&h=800&fit=crop"
  },
  {
    id: 8,
    title: "Colorful Macarons",
    description: "Assorted French macarons in vibrant colors",
    category: "Cookies",
    thumbnail: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&h=800&fit=crop"
  }
]);

const behindScenes = ref([
  {
    id: 101,
    title: "Early Morning Prep",
    description: "Our bakers start at 4 AM",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
    category: "Behind Scenes"
  },
  {
    id: 102,
    title: "Dough Preparation",
    description: "Hand-kneading traditional bread dough",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
    category: "Behind Scenes"
  },
  {
    id: 103,
    title: "Cake Decoration",
    description: "Artistic cake decoration in progress",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
    category: "Behind Scenes"
  },
  {
    id: 104,
    title: "Wood-Fired Oven",
    description: "Traditional stone oven for perfect baking",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
    category: "Behind Scenes"
  }
]);

const customerFavorites = ref([
  {
    id: 201,
    name: "Ham & Cheese Croissant",
    description: "Our bestselling breakfast pastry",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    rating: "4.9",
    price: "4.50"
  },
  {
    id: 202,
    name: "Chocolate Lava Cake",
    description: "Rich, decadent dessert favorite",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    rating: "4.8",
    price: "6.99"
  },
  {
    id: 203,
    name: "Sourdough Bread",
    description: "Traditional artisan bread",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    rating: "4.9",
    price: "4.50"
  }
]);

// Computed property for filtered images
const filteredImages = computed(() => {
  if (selectedCategory.value === 'All') {
    return [...galleryImages.value, ...behindScenes.value];
  }
  if (selectedCategory.value === 'Behind Scenes') {
    return behindScenes.value;
  }
  return galleryImages.value.filter(image => image.category === selectedCategory.value);
});

// Methods
const openLightbox = (image) => {
  lightboxImage.value = image;
};

const closeLightbox = () => {
  lightboxImage.value = null;
};

const loadMoreImages = () => {
  // Simulate loading more images
  hasMoreImages.value = false;
};

// Handle keyboard events for lightbox
onMounted(() => {
  const handleKeydown = (e) => {
    if (e.key === 'Escape' && lightboxImage.value) {
      closeLightbox();
    }
  };
  document.addEventListener('keydown', handleKeydown);
  
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown);
  });
});

// SEO
useHead({
  title: 'Gallery - Bakery House | Our Delicious Creations',
  meta: [
    {
      name: 'description',
      content: 'Browse our gallery of fresh baked goods including breads, cakes, pastries, and cookies. See behind-the-scenes shots of our baking process and customer favorites.'
    },
    {
      property: 'og:title',
      content: 'Bakery House Gallery - Fresh Baked Goods & Behind the Scenes'
    },
    {
      property: 'og:description',
      content: 'Explore our visual collection of artisan breads, custom cakes, French pastries, and handcrafted cookies. See the passion behind every creation.'
    }
  ]
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* Smooth transitions */
button {
  transition: all 0.3s ease;
}

/* Custom scrollbar for body when lightbox is open */
body.lightbox-open {
  overflow: hidden;
}

/* Lightbox animation */
.lightbox-enter-active, .lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from, .lightbox-leave-to {
  opacity: 0;
}
</style>