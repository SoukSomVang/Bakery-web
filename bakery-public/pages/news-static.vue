<template>
  <div class="min-h-screen bg-gray-50">
    <!-- News Content -->
    <article class="container mx-auto px-4 py-16">
      <!-- Article Header -->
      <header class="mb-8 scroll-section opacity-0 translate-y-10 transition-all duration-700">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          New Product Launch: Artisan Sourdough Collection
        </h1>

        <!-- Meta Information -->
        <div class="flex flex-wrap items-center gap-4 text-gray-600">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <time>January 15, 2024</time>
          </div>

          <div class="flex items-center">
            <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              Product Launch
            </span>
          </div>
        </div>
      </header>

      <!-- Featured Images -->
      <div class="mb-8 scroll-section opacity-0 translate-y-10 transition-all duration-700">
        <!-- Main/Featured Image -->
        <img
          :src="news1"
          alt="New Product Launch: Artisan Sourdough Collection"
          class="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-xl mb-6"
        />

        <!-- Additional Images Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <img
            :src="news2"
            alt="Artisan Sourdough - Image 2"
            class="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          />
          <img
            :src="news3"
            alt="Artisan Sourdough - Image 3"
            class="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          />
        </div>
      </div>

      <!-- Article Content -->
      <div class="prose prose-lg max-w-none scroll-section opacity-0 translate-y-10 transition-all duration-700">
        <div class="rounded-lg mb-8">
          <div class="text-gray-700 leading-relaxed whitespace-pre-wrap">We're thrilled to announce the launch of our new Artisan Sourdough Collection, a carefully curated selection of handcrafted breads that celebrate the ancient art of sourdough baking.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Our master bakers have spent years perfecting the art of sourdough fermentation, creating a starter culture that has been lovingly maintained and nurtured to develop complex flavors and perfect texture.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Each loaf undergoes a slow fermentation process that can take up to 48 hours, allowing the natural yeasts and bacteria to develop the signature tangy flavor and chewy texture that sourdough lovers cherish.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Our commitment to quality begins with sourcing the finest organic flour from local mills, ensuring that every ingredient meets our exacting standards.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. The Artisan Sourdough Collection features five distinct varieties, each with its own unique character and flavor profile.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. Stop by any of our locations to experience the difference that traditional craftsmanship makes. Our team is ready to help you discover your new favorite bread.</div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <button
          @click="$router.push('/')"
          class="inline-flex items-center text-red-800 hover:text-red-900 font-semibold transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Home
        </button>
      </div>
    </article>
  </div>
</template>

<script setup>
import news1 from "@/assets/images/news1.jpeg";
import news2 from "@/assets/images/news2.jpeg";
import news3 from "@/assets/images/news3.jpeg";

// Scroll animations
const { observeAllSections } = useScrollAnimation()

onMounted(() => {
  if (import.meta.client) {
    observeAllSections()
  }
})

// Meta tags for SEO
useSeoMeta({
  title: "New Product Launch: Artisan Sourdough Collection - BakeryHouse",
  ogTitle: "New Product Launch: Artisan Sourdough Collection - BakeryHouse",
  description:
    "Discover our new line of artisan sourdough breads, crafted with traditional techniques and premium ingredients.",
  ogDescription:
    "Discover our new line of artisan sourdough breads, crafted with traditional techniques and premium ingredients.",
  ogImage: "/api/placeholder/1200/630",
  twitterCard: "summary_large_image",
});
</script>

<style scoped>
.prose {
  max-width: 100%;
}

.prose img {
  border-radius: 0.5rem;
  margin: 2rem 0;
}

.prose h1,
.prose h2,
.prose h3 {
  color: #1f2937;
  font-weight: 700;
}

.prose p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.prose a {
  color: #991b1b;
  text-decoration: underline;
}

.prose a:hover {
  color: #7f1d1d;
}
</style>
