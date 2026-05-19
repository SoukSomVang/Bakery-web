<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-16">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-300 rounded w-1/4 mb-8"></div>
        <div class="h-96 bg-gray-300 rounded mb-8"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-300 rounded"></div>
          <div class="h-4 bg-gray-300 rounded"></div>
          <div class="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container mx-auto px-4 py-16">
      <div class="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold text-red-800 mb-4">{{ t('news.error') }}</h2>
        <p class="text-red-600 mb-6">{{ error }}</p>
        <button
          @click="navigateTo('/')"
          class="bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-lg transition-colors"
        >
          {{ t('news.backToHome') }}
        </button>
      </div>
    </div>

    <!-- News Content -->
    <article v-else-if="newsItem" class="container mx-auto px-4 py-16">
      <!-- Article Header -->
      <header class="mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {{ currentLocale.value === 'en' && newsItem.titleEn ? newsItem.titleEn : newsItem.title }}
        </h1>

        <!-- Meta Information -->
        <div class="flex flex-wrap items-center gap-4 text-gray-600">
          <div v-if="newsItem.publishedAt" class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <time :datetime="formatDate(newsItem.publishedAt)">
              {{ formatDate(newsItem.publishedAt) }}
            </time>
          </div>

          <div v-if="newsItem.author" class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span>{{ newsItem.author }}</span>
          </div>

          <div v-if="newsItem.category" class="flex items-center">
            <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {{ newsItem.category }}
            </span>
          </div>
        </div>
      </header>

      <!-- Featured Image -->
      <div v-if="newsItem.imageUrl || (newsItem.images && newsItem.images.length > 0)" class="mb-8">
        <!-- Single Image -->
        <img
          v-if="!newsItem.images || newsItem.images.length === 1"
          :src="newsItem.imageUrl || newsItem.images[0]"
          :alt="currentLocale.value === 'en' && newsItem.titleEn ? newsItem.titleEn : newsItem.title"
          class="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-xl"
        />

        <!-- Multiple Images Gallery -->
        <div v-else class="space-y-4">
          <!-- Main/Featured Image -->
          <img
            :src="newsItem.images[0]"
            :alt="currentLocale.value === 'en' && newsItem.titleEn ? newsItem.titleEn : newsItem.title"
            class="w-full h-auto max-h-[800px] object-cover rounded-lg shadow-xl"
          />

          <!-- Additional Images Grid (shows first 2, +N overlay on the 2nd if more) -->
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="(image, index) in newsItem.images.slice(1, 3)"
              :key="index"
              class="relative cursor-pointer group"
              @click="index === 1 && hiddenImageCount > 0 ? openGalleryModal() : openImageModal(image)"
            >
              <img
                :src="image"
                :alt="`${currentLocale.value === 'en' && newsItem.titleEn ? newsItem.titleEn : newsItem.title} - Image ${index + 2}`"
                class="w-full h-[350px] object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
              />

              <!-- "+N more" overlay on the second tile when extra images exist -->
              <div
                v-if="index === 1 && hiddenImageCount > 0"
                class="absolute inset-0 bg-black/60 group-hover:bg-black/70 rounded-lg flex flex-col items-center justify-center text-white transition-colors"
              >
                <span class="text-5xl font-bold leading-none">+{{ hiddenImageCount }}</span>
                <span class="mt-2 text-sm font-medium uppercase tracking-wider">
                  {{ t('news.viewAll') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Article Content -->
      <div class="prose prose-lg max-w-none">
        <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div class="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {{ currentLocale.value === 'en' && newsItem.contentEn ? newsItem.contentEn : newsItem.content }}
          </div>
        </div>

        <!-- Tags -->
        <div v-if="newsItem.tags && newsItem.tags.length > 0" class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ t('news.tags') }}</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in newsItem.tags"
              :key="tag"
              class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <button
          @click="goBack"
          class="inline-flex items-center text-red-800 hover:text-red-900 font-semibold transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          {{ t('news.backToNews') }}
        </button>
      </div>
    </article>

    <!-- Gallery Modal (all images in a grid) -->
    <div
      v-if="showGalleryModal"
      class="fixed inset-0 bg-black/95 z-40 overflow-y-auto"
      @click.self="closeGalleryModal"
    >
      <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6 sticky top-0 bg-black/95 py-3">
          <h3 class="text-white text-xl font-bold">
            {{ t('news.allImages') }}
            <span class="text-gray-400 font-normal">({{ newsItem?.images?.length || 0 }})</span>
          </h3>
          <button
            @click="closeGalleryModal"
            class="text-white hover:text-gray-300 transition-colors"
            :aria-label="t('news.backToNews')"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <img
            v-for="(image, index) in newsItem?.images || []"
            :key="index"
            :src="image"
            :alt="`Image ${index + 1}`"
            class="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            loading="lazy"
            @click="openImageModal(image)"
          />
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div
      v-if="showImageModal"
      class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      @click="closeImageModal"
    >
      <div class="relative max-w-7xl max-h-full">
        <button
          @click="closeImageModal"
          class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <img
          :src="selectedImage"
          alt="Full size"
          class="max-w-full max-h-[90vh] object-contain rounded-lg"
          @click.stop
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { currentLocale, t } = useTranslation()

const goBack = () => {
  if (import.meta.client && window.history.length > 1) {
    router.back()
  } else {
    router.push('/news')
  }
}

const newsItem = ref(null)
const loading = ref(true)
const error = ref(null)
const showImageModal = ref(false)
const selectedImage = ref(null)
const showGalleryModal = ref(false)

// Count of additional images beyond the 2 shown in the preview grid (images[1] + images[2]).
// images[0] is the main featured image, so additional = images.length - 1, preview shows 2 of them.
const hiddenImageCount = computed(() => {
  const total = newsItem.value?.images?.length || 0
  return total > 3 ? total - 3 : 0
})

// Image modal functions
const openImageModal = (image) => {
  selectedImage.value = image
  showImageModal.value = true
}

const closeImageModal = () => {
  showImageModal.value = false
  selectedImage.value = null
}

const openGalleryModal = () => {
  showGalleryModal.value = true
}

const closeGalleryModal = () => {
  showGalleryModal.value = false
}

// Get news composable (client-side only)
let getNewsById
if (import.meta.client) {
  const { getNewsById: fetchNews } = useNews()
  getNewsById = fetchNews
} else {
  getNewsById = async () => null
}

// Format date helper
const formatDate = (date) => {
  if (!date) return ''
  const d = date.toDate ? date.toDate() : new Date(date)
  return d.toLocaleDateString(currentLocale.value === 'en' ? 'en-US' : 'lo-LA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Load news data
onMounted(async () => {
  try {
    const newsId = route.params.id
    if (!newsId) {
      throw new Error('News ID is required')
    }

    if (import.meta.client) {
      newsItem.value = await getNewsById(newsId)

      if (!newsItem.value) {
        throw new Error('News not found')
      }

      // Update meta tags for SEO
      const title = currentLocale.value === 'en' && newsItem.value.titleEn
        ? newsItem.value.titleEn
        : newsItem.value.title

      const description = currentLocale.value === 'en' && newsItem.value.summaryEn
        ? newsItem.value.summaryEn
        : newsItem.value.summary || newsItem.value.content?.substring(0, 160)

      useSeoMeta({
        title: `${title} - BakeryHouse`,
        ogTitle: title,
        description: description,
        ogDescription: description,
        ogImage: newsItem.value.imageUrl || '/api/placeholder/1200/630',
        twitterCard: 'summary_large_image',
      })
    }
  } catch (err) {
    console.error('Failed to load news:', err)
    error.value = err.message || 'Failed to load news article'
  } finally {
    loading.value = false
  }
})
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
