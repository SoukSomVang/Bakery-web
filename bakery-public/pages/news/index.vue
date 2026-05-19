<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-16">
      <!-- Page Header -->
      <header class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {{ t('news.title') }}
        </h1>
        <p class="text-lg text-gray-600">{{ t('news.subtitle') }}</p>
      </header>

      <!-- Loading -->
      <div
        v-if="loading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="n in 6"
          :key="n"
          class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          <div class="h-48 bg-gray-300"></div>
          <div class="p-6 space-y-3">
            <div class="h-4 bg-gray-300 rounded w-1/3"></div>
            <div class="h-6 bg-gray-300 rounded w-3/4"></div>
            <div class="h-4 bg-gray-300 rounded"></div>
            <div class="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-8 text-center max-w-2xl mx-auto"
      >
        <h2 class="text-2xl font-bold text-red-800 mb-4">{{ t('news.error') }}</h2>
        <p class="text-red-600 mb-6">{{ error }}</p>
        <button
          @click="loadNews"
          class="bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-lg transition-colors"
        >
          {{ t('common.tryAgain') }}
        </button>
      </div>

      <!-- Empty -->
      <div
        v-else-if="newsList.length === 0"
        class="bg-white rounded-lg shadow-sm p-12 text-center max-w-2xl mx-auto"
      >
        <svg
          class="w-16 h-16 mx-auto text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          ></path>
        </svg>
        <p class="text-gray-600 text-lg">{{ t('news.noNews') }}</p>
      </div>

      <!-- News Grid -->
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="item in visibleNews"
            :key="item.id"
            class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 cursor-pointer flex flex-col"
            @click="$router.push(`/news/${item.id}`)"
          >
            <div class="relative h-48 overflow-hidden bg-gray-100">
              <img
                v-if="item.imageUrl || (item.images && item.images[0])"
                :src="item.imageUrl || item.images[0]"
                :alt="getTitle(item)"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100"
              >
                <svg
                  class="w-16 h-16 text-red-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  ></path>
                </svg>
              </div>
              <span
                v-if="item.category"
                class="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold"
              >
                {{ item.category }}
              </span>
            </div>

            <div class="p-6 flex-1 flex flex-col">
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <time>{{ formatDate(item.publishedAt || item.createdAt) }}</time>
              </div>

              <h2 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {{ getTitle(item) }}
              </h2>

              <p
                v-if="getSummary(item)"
                class="text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1"
              >
                {{ getSummary(item) }}
              </p>

              <div
                class="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors mt-auto"
              >
                <span>{{ t('news.readMore') }}</span>
                <svg
                  class="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </div>
          </article>
        </div>

        <!-- Load More Button -->
        <div v-if="hasMore" class="text-center mt-12">
          <button
            @click="loadMore"
            class="inline-flex items-center bg-red-800 hover:bg-red-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <span>{{ t('news.loadMore') }}</span>
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const PAGE_SIZE = 6

const { currentLocale, t } = useTranslation()

const newsList = ref([])
const visibleCount = ref(PAGE_SIZE)
const loading = ref(true)
const error = ref(null)

const visibleNews = computed(() => newsList.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < newsList.value.length)

const getTitle = (item) =>
  currentLocale.value === 'en' && item.titleEn ? item.titleEn : item.title

const getSummary = (item) => {
  if (currentLocale.value === 'en' && item.summaryEn) return item.summaryEn
  if (item.summary) return item.summary
  const content =
    currentLocale.value === 'en' && item.contentEn ? item.contentEn : item.content
  return content ? content.substring(0, 160) : ''
}

const formatDate = (date) => {
  if (!date) return ''
  const d = date.toDate
    ? date.toDate()
    : new Date(date.seconds ? date.seconds * 1000 : date)
  return d.toLocaleDateString(currentLocale.value === 'en' ? 'en-US' : 'lo-LA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const loadMore = () => {
  visibleCount.value += PAGE_SIZE
}

const loadNews = async () => {
  loading.value = true
  error.value = null
  try {
    const { getNews } = useNews()
    newsList.value = await getNews()
    visibleCount.value = PAGE_SIZE
  } catch (err) {
    console.error('Failed to load news:', err)
    error.value = err.message || 'Failed to load news'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (import.meta.client) {
    loadNews()
  }
})

useSeoMeta({
  title: 'News & Updates - BakeryHouse',
  ogTitle: 'News & Updates - BakeryHouse',
  description:
    'Latest news, announcements, and stories from BakeryHouse in Vientiane, Laos.',
  ogDescription:
    'Latest news, announcements, and stories from BakeryHouse in Vientiane, Laos.',
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
