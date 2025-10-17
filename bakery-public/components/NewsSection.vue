<template>
  <section id="news" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">{{ t('news.title') }}</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t('news.subtitle') }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid md:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="animate-pulse">
          <div class="bg-gray-300 h-48 rounded-lg mb-4"></div>
          <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-300 rounded w-full mb-2"></div>
          <div class="h-3 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- No News State -->
      <div v-else-if="!newsItems || newsItems.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
        </svg>
        <p class="text-gray-500 text-lg">{{ t('news.noNews') }}</p>
      </div>

      <!-- News Grid -->
      <div v-else class="grid md:grid-cols-3 gap-8">
        <article
          v-for="news in newsItems"
          :key="news.id"
          class="group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer"
          @click="goToNewsDetail(news.id)"
        >
          <!-- Image -->
          <div class="relative h-48 bg-gray-200 overflow-hidden">
            <img
              v-if="news.imageUrl || (news.images && news.images[0])"
              :src="news.imageUrl || news.images[0]"
              :alt="currentLocale === 'en' && news.titleEn ? news.titleEn : news.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
              <svg class="w-16 h-16 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
            </div>

            <!-- Category Badge -->
            <div v-if="news.category" class="absolute top-4 right-4">
              <span class="bg-red-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {{ news.category }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Title -->
            <h3 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-800 transition-colors">
              {{ currentLocale === 'en' && news.titleEn ? news.titleEn : news.title }}
            </h3>

            <!-- Summary -->
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ currentLocale === 'en' && news.summaryEn ? news.summaryEn : (news.summary || news.content?.substring(0, 120) + '...') }}
            </p>

            <!-- Meta Info -->
            <div class="flex items-center justify-between text-sm text-gray-500">
              <div v-if="news.publishedAt" class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>{{ formatDate(news.publishedAt) }}</span>
              </div>

              <div class="flex items-center text-red-600 group-hover:text-red-700 font-medium">
                <span class="mr-1">{{ t('news.readMore') }}</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { locale: currentLocale, t } = useTranslation()

const newsItems = ref([])
const loading = ref(true)
const error = ref(null)

// Get news composable (client-side only)
let getLatestNews
if (import.meta.client) {
  const { getLatestNews: fetchLatestNews } = useNews()
  getLatestNews = fetchLatestNews
} else {
  getLatestNews = async () => []
}

// Format date helper
const formatDate = (date) => {
  if (!date) return ''
  const d = date.toDate ? date.toDate() : new Date(date)
  return d.toLocaleDateString(currentLocale.value === 'en' ? 'en-US' : 'lo-LA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Navigate to news detail
const goToNewsDetail = (id) => {
  navigateTo(`/news/${id}`)
}

// Load latest news
onMounted(async () => {
  try {
    if (import.meta.client) {
      newsItems.value = await getLatestNews(3)
      console.log('✅ HOME: Latest news loaded:', newsItems.value.length)
    }
  } catch (err) {
    console.error('Failed to load news:', err)
    error.value = 'Failed to load news articles'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
