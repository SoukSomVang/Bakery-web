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

        <!-- Image URLs - Dynamic -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium text-gray-700">
              Images (Enter Image URLs)
            </label>
            <button
              type="button"
              @click="addImageUrl"
              class="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add Image
            </button>
          </div>

          <!-- Dynamic Image URL Inputs -->
          <div
            v-for="(imageUrl, index) in imageUrls"
            :key="index"
            class="border border-gray-200 rounded-lg p-4 relative"
          >
            <div class="flex items-center justify-between mb-2">
              <label :for="`imageUrl${index}`" class="block text-xs font-medium text-gray-600">
                Image URL {{ index + 1 }}
                <span v-if="index === 0" class="text-red-500">*</span>
              </label>
              <button
                v-if="imageUrls.length > 1"
                type="button"
                @click="removeImageUrl(index)"
                class="text-red-600 hover:text-red-800 transition-colors"
                :title="`Remove image ${index + 1}`"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
            <input
              :id="`imageUrl${index}`"
              v-model="imageUrls[index]"
              type="url"
              :required="index === 0"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="`https://example.com/image${index + 1}.jpg`"
            />
            <!-- Image Preview -->
            <div v-if="imageUrls[index]" class="mt-2 relative">
              <img
                :src="imageUrls[index]"
                :alt="`Preview ${index + 1}`"
                class="w-full h-48 object-cover rounded-lg"
                @error="handleImageError($event, index)"
              />
            </div>
          </div>

          <p class="text-xs text-gray-500 mt-2">
            At least one image is required. Click "Add Image" to add more images.
          </p>
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
  author: '',
  category: '',
  isPublished: false
})

const tagsInput = ref('')
const imageUrls = ref(['']) // Start with one empty image URL
const loading = ref(false)
const error = ref(null)

// Add a new image URL field
const addImageUrl = () => {
  imageUrls.value.push('')
}

// Remove an image URL field
const removeImageUrl = (index) => {
  if (imageUrls.value.length > 1) {
    imageUrls.value.splice(index, 1)
  }
}

// Handle image URL errors
const handleImageError = (event, index) => {
  console.error(`Image ${index + 1} failed to load`)
  event.target.style.display = 'none'
}

// Submit form
const handleSubmit = async () => {
  loading.value = true
  error.value = null

  try {
    // Collect and filter valid image URLs
    const validImageUrls = imageUrls.value.filter(url => url && url.trim() !== '')

    if (validImageUrls.length === 0) {
      error.value = 'At least one image URL is required'
      loading.value = false
      return
    }

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
      images: validImageUrls,
      imageUrl: validImageUrls[0], // Set first image as main image
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
