<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
          <NuxtLink to="/news" class="text-gray-600 hover:text-gray-900">
            <i class="mdi mdi-arrow-left text-2xl"></i>
          </NuxtLink>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Create News Article</h1>
            <p class="mt-1 text-gray-600">Add a new news article or announcement</p>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {{ error }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-md p-6 space-y-6">
        <!-- Title (Lao) -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
            Title (Lao) <span class="text-red-500">*</span>
          </label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter news title in Lao"
          />
        </div>

        <!-- Title (English) -->
        <div>
          <label for="titleEn" class="block text-sm font-medium text-gray-700 mb-2">
            Title (English)
          </label>
          <input
            id="titleEn"
            v-model="form.titleEn"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter news title in English"
          />
        </div>

        <!-- Summary (Lao) -->
        <div>
          <label for="summary" class="block text-sm font-medium text-gray-700 mb-2">
            Summary (Lao)
          </label>
          <textarea
            id="summary"
            v-model="form.summary"
            rows="2"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief summary in Lao"
          ></textarea>
        </div>

        <!-- Summary (English) -->
        <div>
          <label for="summaryEn" class="block text-sm font-medium text-gray-700 mb-2">
            Summary (English)
          </label>
          <textarea
            id="summaryEn"
            v-model="form.summaryEn"
            rows="2"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief summary in English"
          ></textarea>
        </div>

        <!-- Content (Lao) -->
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
            Content (Lao) <span class="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            v-model="form.content"
            rows="8"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter full content in Lao"
          ></textarea>
        </div>

        <!-- Content (English) -->
        <div>
          <label for="contentEn" class="block text-sm font-medium text-gray-700 mb-2">
            Content (English)
          </label>
          <textarea
            id="contentEn"
            v-model="form.contentEn"
            rows="8"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter full content in English"
          ></textarea>
        </div>

        <!-- Image URLs -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Images (Enter Image URLs)
          </label>

          <!-- Image URL 1 -->
          <div>
            <label for="imageUrl1" class="block text-xs font-medium text-gray-600 mb-1">
              Image URL 1 <span class="text-red-500">*</span>
            </label>
            <input
              id="imageUrl1"
              v-model="form.imageUrl1"
              type="url"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image1.jpg"
            />
            <img
              v-if="form.imageUrl1"
              :src="form.imageUrl1"
              alt="Preview 1"
              class="mt-2 w-full h-48 object-cover rounded-lg"
              @error="handleImageError($event, 1)"
            />
          </div>

          <!-- Image URL 2 -->
          <div>
            <label for="imageUrl2" class="block text-xs font-medium text-gray-600 mb-1">
              Image URL 2
            </label>
            <input
              id="imageUrl2"
              v-model="form.imageUrl2"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image2.jpg"
            />
            <img
              v-if="form.imageUrl2"
              :src="form.imageUrl2"
              alt="Preview 2"
              class="mt-2 w-full h-48 object-cover rounded-lg"
              @error="handleImageError($event, 2)"
            />
          </div>

          <!-- Image URL 3 -->
          <div>
            <label for="imageUrl3" class="block text-xs font-medium text-gray-600 mb-1">
              Image URL 3
            </label>
            <input
              id="imageUrl3"
              v-model="form.imageUrl3"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image3.jpg"
            />
            <img
              v-if="form.imageUrl3"
              :src="form.imageUrl3"
              alt="Preview 3"
              class="mt-2 w-full h-48 object-cover rounded-lg"
              @error="handleImageError($event, 3)"
            />
          </div>
        </div>

        <!-- Author -->
        <div>
          <label for="author" class="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <input
            id="author"
            v-model="form.author"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Author name"
          />
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            id="category"
            v-model="form.category"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Announcement, Product, Event"
          />
        </div>

        <!-- Tags -->
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            id="tags"
            v-model="tagsInput"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter tags separated by commas (e.g., bakery, new product, promotion)"
          />
          <p class="mt-1 text-sm text-gray-500">Separate multiple tags with commas</p>
        </div>

        <!-- Published Status -->
        <div class="flex items-center">
          <input
            id="isPublished"
            v-model="form.isPublished"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="isPublished" class="ml-2 block text-sm text-gray-900">
            Publish immediately
          </label>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4 pt-6 border-t">
          <NuxtLink
            to="/news"
            class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </NuxtLink>
          <button
            type="submit"
            :disabled="loading"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span v-if="loading" class="animate-spin">⏳</span>
            {{ loading ? 'Creating...' : 'Create News Article' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useBakeryStore } from '~/stores/bakery'

const bakeryStore = useBakeryStore()

const form = ref({
  title: '',
  titleEn: '',
  content: '',
  contentEn: '',
  summary: '',
  summaryEn: '',
  imageUrl1: '',
  imageUrl2: '',
  imageUrl3: '',
  author: '',
  category: '',
  isPublished: false
})

const tagsInput = ref('')
const loading = ref(false)
const error = ref(null)

// Handle image URL errors
const handleImageError = (event, imageNumber) => {
  console.error(`Image ${imageNumber} failed to load`)
  event.target.style.display = 'none'
}

// Submit form
const handleSubmit = async () => {
  loading.value = true
  error.value = null

  try {
    // Collect image URLs into array
    const imageUrls = [
      form.value.imageUrl1,
      form.value.imageUrl2,
      form.value.imageUrl3
    ].filter(url => url && url.trim() !== '')

    // Process tags
    const tags = tagsInput.value
      ? tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag)
      : []

    // Prepare news data
    const newsData = {
      title: form.value.title,
      titleEn: form.value.titleEn,
      content: form.value.content,
      contentEn: form.value.contentEn,
      summary: form.value.summary,
      summaryEn: form.value.summaryEn,
      author: form.value.author,
      category: form.value.category,
      isPublished: form.value.isPublished,
      images: imageUrls,
      imageUrl: imageUrls[0] || null, // Set first image as main image
      tags
    }

    // Add news
    await bakeryStore.addNews(newsData)

    // Redirect to news list
    await navigateTo('/news')
  } catch (err) {
    console.error('Error creating news:', err)
    error.value = 'Failed to create news article. Please try again.'
  } finally {
    loading.value = false
  }
}

// Meta tags
useSeoMeta({
  title: 'Create News Article - Admin Panel',
  description: 'Create a new news article or announcement'
})
</script>
