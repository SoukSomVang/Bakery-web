<template>
  <div class="min-h-screen bg-gray-50">
    <!-- News Content -->
    <article class="container mx-auto px-4 py-16">
      <!-- Article Header -->
      <header class="mb-8 scroll-section opacity-0 translate-y-10 transition-all duration-700">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Building Our Dream Bakery: Construction Update
        </h1>

        <!-- Meta Information -->
        <div class="flex flex-wrap items-center gap-4 text-gray-600">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <time>January 2025</time>
          </div>

          <div class="flex items-center">
            <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              Construction Update
            </span>
          </div>
        </div>
      </header>

      <!-- Featured Images -->
      <div class="mb-8 scroll-section opacity-0 translate-y-10 transition-all duration-700">
        <!-- Main/Featured Image -->
        <img
          :src="news1"
          alt="Building Our Dream Bakery - Construction Progress"
          class="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-xl mb-6"
        />

        <!-- Additional Images Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <img
            :src="news2"
            alt="Construction Site - Interior Work"
            class="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          />
          <img
            :src="news3"
            alt="Construction Site - Equipment Installation"
            class="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          />
        </div>
      </div>

      <!-- Article Content -->
      <div class="prose prose-lg max-w-none scroll-section opacity-0 translate-y-10 transition-all duration-700">
        <div class="rounded-lg mb-8">
          <div class="text-gray-700 leading-relaxed whitespace-pre-wrap">We're excited to share the latest progress on our brand new bakery location! Our construction team has been working tirelessly to bring our vision to life, and we couldn't be more thrilled with how everything is coming together.

The foundation has been laid, and the main structure is now complete. We're currently in the exciting phase of interior construction, where you can really start to see the space taking shape. Our dedicated team is installing state-of-the-art baking equipment that will allow us to serve you the freshest, highest-quality products.

The design of our new facility reflects our commitment to both tradition and innovation. We've created a modern, efficient workspace for our bakers while maintaining the warm, welcoming atmosphere that our customers love. The spacious customer area will feature comfortable seating and large windows that let you watch our bakers at work.

We're installing custom-built ovens that will give our bread that perfect crust and tender interior. The dough preparation area is being equipped with professional mixers and proofing chambers to ensure consistency and quality in every batch. Every detail has been carefully planned to create the perfect environment for crafting exceptional baked goods.

Our location was chosen specifically for its accessibility and visibility. Situated in a prime area with ample parking, the new bakery will be easy to find and convenient for both our regular customers and new visitors. We're committed to becoming a cornerstone of the community.

The grand opening is approaching quickly! We can't wait to welcome you to our new home and share the fruits of our labor. Stay tuned for more updates as we move closer to opening day. Follow us on social media to be the first to know when we'll be ready to serve you in our beautiful new space!</div>
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
  title: "Building Our Dream Bakery: Construction Update - BakeryHouse",
  ogTitle: "Building Our Dream Bakery: Construction Update - BakeryHouse",
  description:
    "Follow our construction progress as we build our brand new bakery location with state-of-the-art equipment and modern facilities.",
  ogDescription:
    "Follow our construction progress as we build our brand new bakery location with state-of-the-art equipment and modern facilities.",
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
