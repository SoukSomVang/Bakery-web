<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">News Management</h1>
            <p class="mt-2 text-gray-600">Manage news articles and announcements</p>
          </div>
          <NuxtLink
            to="/news/create"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
          >
            <i class="mdi mdi-plus w-5 h-5"></i>
            Add News Article
          </NuxtLink>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="bakeryStore.error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {{ bakeryStore.error }}
      </div>

      <!-- Loading State -->
      <div v-if="bakeryStore.loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- News List -->
      <div v-else class="rounded-lg overflow-hidden">
        <div v-if="bakeryStore.news.length === 0" class="text-center py-12 bg-white rounded-lg">
          <i class="mdi mdi-newspaper-variant-outline text-6xl text-gray-300 mx-auto mb-4 block"></i>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No News Articles Found</h3>
          <p class="text-gray-500 mb-4">Get started by creating your first news article.</p>
          <NuxtLink
            to="/news/create"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
          >
            Create News Article
          </NuxtLink>
        </div>

        <div v-else class="bg-white rounded-lg shadow">
          <!-- Table Header -->
          <div class="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div class="grid grid-cols-12 gap-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div class="col-span-4">Title</div>
              <div class="col-span-2">Author</div>
              <div class="col-span-2">Category</div>
              <div class="col-span-2">Status</div>
              <div class="col-span-2 text-right">Actions</div>
            </div>
          </div>

          <!-- Table Body -->
          <div class="divide-y divide-gray-200">
            <div
              v-for="newsItem in bakeryStore.news"
              :key="newsItem.id"
              class="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div class="grid grid-cols-12 gap-4 items-center">
                <!-- Title & Image -->
                <div class="col-span-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-16 w-16">
                      <img
                        v-if="newsItem.imageUrl || (newsItem.images && newsItem.images[0])"
                        :src="newsItem.imageUrl || newsItem.images[0]"
                        :alt="newsItem.title"
                        class="h-16 w-16 rounded-lg object-cover"
                      />
                      <div
                        v-else
                        class="h-16 w-16 rounded-lg bg-blue-100 flex items-center justify-center"
                      >
                        <i class="mdi mdi-newspaper text-2xl text-blue-600"></i>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 line-clamp-2">{{ newsItem.title }}</div>
                      <div v-if="newsItem.summary" class="text-sm text-gray-500 line-clamp-1">{{ newsItem.summary }}</div>
                      <div class="text-xs text-gray-400 mt-1">
                        {{ formatDate(newsItem.createdAt) }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Author -->
                <div class="col-span-2 text-sm text-gray-900">
                  {{ newsItem.author || 'N/A' }}
                </div>

                <!-- Category -->
                <div class="col-span-2">
                  <span
                    v-if="newsItem.category"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800"
                  >
                    {{ newsItem.category }}
                  </span>
                  <span v-else class="text-sm text-gray-400">N/A</span>
                </div>

                <!-- Status -->
                <div class="col-span-2">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      newsItem.isPublished
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    ]"
                  >
                    {{ newsItem.isPublished ? 'Published' : 'Draft' }}
                  </span>
                </div>

                <!-- Actions -->
                <div class="col-span-2 text-right">
                  <div class="flex justify-end space-x-2">
                    <NuxtLink
                      :to="`/news/edit/${newsItem.id}`"
                      class="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Edit
                    </NuxtLink>
                    <button
                      @click="confirmDelete(newsItem)"
                      class="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <i class="mdi mdi-alert-circle-outline h-6 w-6 text-red-600"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-2">Delete News Article</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Are you sure you want to delete "{{ newsToDelete?.title }}"? This action cannot be undone.
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <div class="flex justify-center space-x-4">
              <button
                @click="showDeleteModal = false"
                class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                @click="deleteNews"
                class="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBakeryStore } from '~/stores/bakery'

const bakeryStore = useBakeryStore()
const showDeleteModal = ref(false)
const newsToDelete = ref(null)

// Fetch news on component mount
onMounted(async () => {
  await bakeryStore.fetchNews()
})

// Delete confirmation
const confirmDelete = (newsItem) => {
  newsToDelete.value = newsItem
  showDeleteModal.value = true
}

// Delete news
const deleteNews = async () => {
  if (newsToDelete.value) {
    try {
      await bakeryStore.deleteNews(newsToDelete.value.id)
      showDeleteModal.value = false
      newsToDelete.value = null
    } catch (error) {
      console.error('Failed to delete news:', error)
    }
  }
}

// Format date
const formatDate = (date) => {
  if (!date) return 'N/A'

  // Handle Firestore Timestamp
  if (date.seconds) {
    date = new Date(date.seconds * 1000)
  } else if (!(date instanceof Date)) {
    date = new Date(date)
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Meta tags
useSeoMeta({
  title: 'News Management - Admin Panel',
  description: 'Manage news articles and announcements'
})
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
