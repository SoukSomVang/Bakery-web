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

        <!-- Images Upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Images
          </label>
          <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div class="space-y-1 text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label
                  for="images"
                  class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                >
                  <span>Upload images</span>
                  <input
                    id="images"
                    ref="imageInput"
                    type="file"
                    multiple
                    accept="image/*"
                    class="sr-only"
                    @change="handleImageSelect"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
            </div>
          </div>

          <!-- Image Previews -->
          <div v-if="imagePreviews.length > 0" class="mt-4 grid grid-cols-3 gap-4">
            <div
              v-for="(preview, index) in imagePreviews"
              :key="index"
              class="relative group"
            >
              <img
                :src="preview"
                :alt="`Preview ${index + 1}`"
                class="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                @click="removeImage(index)"
                class="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i class="mdi mdi-close text-sm"></i>
              </button>
            </div>
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
  author: '',
  category: '',
  isPublished: false
})

const tagsInput = ref('')
const imageFiles = ref([])
const imagePreviews = ref([])
const imageInput = ref(null)
const loading = ref(false)
const error = ref(null)

// Handle image selection
const handleImageSelect = (event) => {
  const files = Array.from(event.target.files)

  files.forEach((file) => {
    if (file.type.startsWith('image/')) {
      imageFiles.value.push(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreviews.value.push(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
}

// Remove image
const removeImage = (index) => {
  imageFiles.value.splice(index, 1)
  imagePreviews.value.splice(index, 1)
}

// Submit form
const handleSubmit = async () => {
  loading.value = true
  error.value = null

  try {
    const { uploadMultipleImages } = useFirebase()

    // Upload images
    let imageUrls = []
    if (imageFiles.value.length > 0) {
      imageUrls = await uploadMultipleImages(imageFiles.value, 'news')
    }

    // Process tags
    const tags = tagsInput.value
      ? tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag)
      : []

    // Prepare news data
    const newsData = {
      ...form.value,
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
