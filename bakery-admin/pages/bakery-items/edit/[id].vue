<template>
  <div>
    <AdminHeader 
      :title="`Edit: ${item?.name || 'Loading...'}`" 
      subtitle="Update bakery item information"
    />
    
    <div class="p-6">
      <div v-if="!item && !loading" class="text-center py-12">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Item not found</h3>
        <p class="text-gray-500 mb-4">The bakery item you're looking for doesn't exist.</p>
        <NuxtLink to="/bakery-items" class="btn-primary">Back to Items</NuxtLink>
      </div>

      <div v-else-if="item" class="max-w-2xl mx-auto">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Basic Information -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              
              <div>
                <label class="form-label">Type *</label>
                <select v-model="form.type" class="form-input" required>
                  <option value="">Select a type</option>
                  <option v-for="type in bakeryTypes" :key="type" :value="type">{{ type }}</option>
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
              
              <div>
                <label class="form-label">Stock Quantity</label>
                <input
                  v-model.number="form.stock"
                  type="number"
                  min="0"
                  class="form-input"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div class="mt-4">
              <label class="form-label">Description</label>
              <textarea
                v-model="form.description"
                class="form-input"
                rows="3"
                placeholder="Describe your bakery item..."
              ></textarea>
            </div>
          </div>

          <!-- Image URL -->
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

          <!-- Additional Details -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form-label">Ingredients</label>
                <textarea
                  v-model="form.ingredients"
                  class="form-input"
                  rows="3"
                  placeholder="List main ingredients..."
                ></textarea>
              </div>
              
              <div>
                <label class="form-label">Allergens</label>
                <textarea
                  v-model="form.allergens"
                  class="form-input"
                  rows="3"
                  placeholder="List allergens (nuts, gluten, dairy, etc.)..."
                ></textarea>
              </div>
              
              <div>
                <label class="form-label">Preparation Time (minutes)</label>
                <input
                  v-model.number="form.preparationTime"
                  type="number"
                  min="0"
                  class="form-input"
                  placeholder="30"
                />
              </div>
              
              <div>
                <label class="form-label">Shelf Life (days)</label>
                <input
                  v-model.number="form.shelfLife"
                  type="number"
                  min="0"
                  class="form-input"
                  placeholder="3"
                />
              </div>
            </div>
            
            <div class="mt-4 flex items-center space-x-6">
              <label class="flex items-center">
                <input v-model="form.isVegan" type="checkbox" class="mr-2" />
                <span class="text-sm">Vegan</span>
              </label>
              <label class="flex items-center">
                <input v-model="form.isGlutenFree" type="checkbox" class="mr-2" />
                <span class="text-sm">Gluten Free</span>
              </label>
              <label class="flex items-center">
                <input v-model="form.isAvailable" type="checkbox" class="mr-2" />
                <span class="text-sm">Available</span>
              </label>
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
              {{ loading ? 'Updating...' : 'Update Item' }}
            </button>
          </div>
        </form>
      </div>
      
      <!-- Loading State -->
      <div v-else-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const bakeryStore = useBakeryStore()
const { bakeryTypes, loading, error } = storeToRefs(bakeryStore)

const id = route.params.id

// State
const item = ref(null)
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
const loadItem = async () => {
  await bakeryStore.fetchBakeryItems()
  item.value = bakeryStore.getBakeryItemById(id)

  if (item.value) {
    // Populate form with existing data
    Object.keys(form.value).forEach(key => {
      if (item.value[key] !== undefined) {
        form.value[key] = item.value[key]
      }
    })
    // Set up initial image preview
    if (form.value.imageUrl) {
      updateImagePreview()
    }
  }
}

const updateImagePreview = () => {
  if (form.value.imageUrl) {
    // Test if the image URL is valid
    const img = new Image()
    img.onload = () => {
      imagePreview.value = form.value.imageUrl
      imageError.value = false
    }
    img.onerror = () => {
      imagePreview.value = null
      imageError.value = true
    }
    img.src = form.value.imageUrl
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
    // Update the bakery item directly with the URL
    await bakeryStore.updateBakeryItem(id, form.value)

    // Redirect to items list
    router.push('/bakery-items')
  } catch (err) {
    console.error('Failed to update item:', err)
  }
}

// Load item on mount
onMounted(() => {
  loadItem()
})
</script>