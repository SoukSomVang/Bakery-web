<template>
  <div>
    <AdminHeader 
      title="Add New Bakery Item" 
      subtitle="Create a new product for your bakery"
    />
    
    <div class="p-6">
      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Basic Information -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Item Information</h3>

            <div class="space-y-4">
              <div>
                <label class="form-label">Item Name *</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  placeholder="e.g., Chocolate Croissant"
                  required
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Type *</label>
                  <select v-model="form.type" class="form-input" required>
                    <option value="">Select a type</option>
                    <option v-for="type in bakeryTypeNames" :key="type" :value="type">{{ type }}</option>
                  </select>
                </div>

                <div>
                  <label class="form-label">Price *</label>
                  <input
                    v-model.number="form.price"
                    type="number"
                    step="0.01"
                    min="0"
                    class="form-input"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label class="form-label">Description</label>
                <textarea
                  v-model="form.description"
                  class="form-input"
                  rows="4"
                  placeholder="Describe your bakery item..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Product Image -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Product Image</h3>

            <div class="space-y-4">
              <div>
                <label class="form-label">Image URL</label>
                <input
                  v-model="form.imageUrl"
                  type="url"
                  class="form-input"
                  placeholder="https://example.com/image.jpg"
                  @input="updateImagePreview"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Use image URLs from Google Drive, Imgur, Unsplash, or any public image hosting service
                </p>
              </div>

              <!-- Quick Examples -->
              <div class="space-y-2">
                <p class="text-sm font-medium text-gray-700">Quick Examples:</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <button
                    type="button"
                    @click="setExampleImage('https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop')"
                    class="text-xs text-blue-600 hover:text-blue-800 text-left"
                  >
                    🥐 Croissant (Unsplash)
                  </button>
                  <button
                    type="button"
                    @click="setExampleImage('https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop')"
                    class="text-xs text-blue-600 hover:text-blue-800 text-left"
                  >
                    🍞 Bread (Unsplash)
                  </button>
                  <button
                    type="button"
                    @click="setExampleImage('https://picsum.photos/400/300')"
                    class="text-xs text-blue-600 hover:text-blue-800 text-left"
                  >
                    🎲 Random Image
                  </button>
                  <button
                    type="button"
                    @click="setExampleImage('https://via.placeholder.com/400x300/FFB6C1/000000?text=Bakery+Item')"
                    class="text-xs text-blue-600 hover:text-blue-800 text-left"
                  >
                    📷 Placeholder
                  </button>
                </div>
              </div>

              <!-- Image Preview -->
              <div v-if="form.imageUrl && imagePreview" class="mt-4">
                <p class="text-sm text-gray-600 mb-2">Preview:</p>
                <div class="relative inline-block">
                  <img :src="imagePreview" alt="Preview" class="w-32 h-32 object-cover rounded-lg border" />
                  <button
                    @click="removeImage"
                    type="button"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>

              <!-- Image Load Error -->
              <div v-if="form.imageUrl && imageError" class="mt-2">
                <p class="text-sm text-red-600">⚠️ Unable to load image. Please check the URL.</p>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ error }}
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3">
            <NuxtLink to="/bakery-items" class="btn-secondary">Cancel</NuxtLink>
            <button type="submit" class="btn-primary" :disabled="loading">
              {{ loading ? 'Creating...' : 'Create Item' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const bakeryStore = useBakeryStore()
const { bakeryTypeNames, loading, error } = storeToRefs(bakeryStore)

// Form state
const form = ref({
  name: '',
  type: '',
  description: '',
  price: '',
  stock: 0,
  ingredients: '',
  allergens: '',
  preparationTime: '',
  shelfLife: '',
  isVegan: false,
  isGlutenFree: false,
  isAvailable: true,
  imageUrl: ''
})

const imagePreview = ref(null)
const imageError = ref(false)

// Methods
// Convert Google Drive sharing URLs to direct image URLs
const convertGoogleDriveUrl = (url) => {
  if (!url) return url

  // Handle sharing URLs (view and edit)
  const shareMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/)
  if (shareMatch) {
    const fileId = shareMatch[1]
    return `https://drive.google.com/uc?export=view&id=${fileId}`
  }

  // Already a direct uc URL, return as is
  return url
}

const updateImagePreview = () => {
  if (form.value.imageUrl) {
    // Convert Google Drive URL if needed
    const convertedUrl = convertGoogleDriveUrl(form.value.imageUrl)

    // Test if the image URL is valid
    const img = new Image()
    img.onload = () => {
      imagePreview.value = convertedUrl
      imageError.value = false
    }
    img.onerror = () => {
      imagePreview.value = null
      imageError.value = true
    }
    img.src = convertedUrl
  } else {
    imagePreview.value = null
    imageError.value = false
  }
}

const setExampleImage = (url) => {
  form.value.imageUrl = url
  updateImagePreview()
}

const removeImage = () => {
  form.value.imageUrl = ''
  imagePreview.value = null
  imageError.value = false
}

const submitForm = async () => {
  try {
    // Convert Google Drive URL before saving to database
    const itemData = { ...form.value }
    if (itemData.imageUrl) {
      itemData.imageUrl = convertGoogleDriveUrl(itemData.imageUrl)
    }

    // Create the bakery item with converted URL
    await bakeryStore.addBakeryItem(itemData)

    // Redirect to items list
    router.push('/bakery-items')
  } catch (err) {
    console.error('Failed to create item:', err)
  }
}

// Load data on mount
onMounted(() => {
  if (bakeryTypeNames.value.length === 0) {
    bakeryStore.fetchBakeryTypes()
  }
})
</script>