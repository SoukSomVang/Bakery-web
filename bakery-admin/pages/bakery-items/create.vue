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

          <!-- Image Upload -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Product Image</h3>
            
            <div class="space-y-4">
              <div>
                <label class="form-label">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="form-input"
                />
              </div>
              
              <!-- Image Preview -->
              <div v-if="imagePreview" class="mt-4">
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
            <button type="submit" class="btn-primary" :disabled="loading || uploading">
              {{ loading || uploading ? 'Creating...' : 'Create Item' }}
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
const { uploadImage } = useFirebase()
const { bakeryTypes, loading, error } = storeToRefs(bakeryStore)

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

const imageFile = ref(null)
const imagePreview = ref(null)
const uploading = ref(false)

// Methods
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  imageFile.value = null
  imagePreview.value = null
  form.value.imageUrl = ''
}

const submitForm = async () => {
  try {
    // Upload image first if provided
    if (imageFile.value) {
      uploading.value = true
      const imageUrl = await uploadImage(imageFile.value, 'bakery-items')
      form.value.imageUrl = imageUrl
      uploading.value = false
    }

    // Create the bakery item
    await bakeryStore.addBakeryItem(form.value)
    
    // Redirect to items list
    router.push('/bakery-items')
  } catch (err) {
    console.error('Failed to create item:', err)
  }
}

// Load data on mount
onMounted(() => {
  if (bakeryTypes.value.length === 0) {
    bakeryStore.fetchBakeryItems()
  }
})
</script>