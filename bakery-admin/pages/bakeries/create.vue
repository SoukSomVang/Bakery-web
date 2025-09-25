<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4">
          <NuxtLink 
            to="/bakeries" 
            class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <i class="mdi mdi-arrow-left w-6 h-6"></i>
          </NuxtLink>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Create New Bakery</h1>
            <p class="mt-2 text-gray-600">Add a new bakery location to your system</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white shadow-lg rounded-lg">
        <form @submit.prevent="submitForm" class="p-6 space-y-6">
          <!-- Error Message -->
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ error }}
          </div>

          <!-- Success Message -->
          <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {{ success }}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Information -->
            <div class="md:col-span-2">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            </div>

            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Bakery Name *
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter bakery name"
              />
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                id="description"
                v-model="form.description"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description"
              />
            </div>

            <!-- Location Information -->
            <div class="md:col-span-2">
              <h3 class="text-lg font-medium text-gray-900 mb-4 mt-6">Location Information</h3>
            </div>

            <!-- Address -->
            <div class="md:col-span-2">
              <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                id="address"
                v-model="form.address"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter street address"
              />
            </div>

            <!-- City -->
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                id="city"
                v-model="form.city"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter city"
              />
            </div>

            <!-- Country -->
            <div>
              <label for="country" class="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <input
                id="country"
                v-model="form.country"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter country"
              />
            </div>

            <!-- Contact Information -->
            <div class="md:col-span-2">
              <h3 class="text-lg font-medium text-gray-900 mb-4 mt-6">Contact Information</h3>
            </div>

            <!-- Phone -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
              />
            </div>

            <!-- Additional Information -->
            <div class="md:col-span-2">
              <h3 class="text-lg font-medium text-gray-900 mb-4 mt-6">Additional Information</h3>
            </div>

            <!-- Operating Hours -->
            <div>
              <label for="operatingHours" class="block text-sm font-medium text-gray-700 mb-2">
                Operating Hours
              </label>
              <input
                id="operatingHours"
                v-model="form.operatingHours"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Mon-Fri: 8AM-6PM, Sat-Sun: 9AM-5PM"
              />
            </div>

            <!-- Manager Name -->
            <div>
              <label for="managerName" class="block text-sm font-medium text-gray-700 mb-2">
                Manager Name
              </label>
              <input
                id="managerName"
                v-model="form.managerName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter manager's name"
              />
            </div>

            <!-- Image Upload -->
            <div class="md:col-span-2">
              <label for="image" class="block text-sm font-medium text-gray-700 mb-2">
                Bakery Image
              </label>
              <div class="flex items-center space-x-4">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div v-if="imagePreview" class="mt-4">
                <img :src="convertGoogleDriveUrl(imagePreview)" alt="Preview" class="w-32 h-32 object-cover rounded-lg" />
              </div>
            </div>

            <!-- Status -->
            <div class="md:col-span-2">
              <div class="flex items-center">
                <input
                  id="isActive"
                  v-model="form.isActive"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="isActive" class="ml-2 block text-sm text-gray-900">
                  Bakery is currently active
                </label>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <NuxtLink 
              to="/bakeries"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors duration-200"
            >
              Cancel
            </NuxtLink>
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg v-if="loading" class="animate-spin h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Creating...' : 'Create Bakery' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBakeryStore } from '~/stores/bakery'

const router = useRouter()
const bakeryStore = useBakeryStore()
const { convertGoogleDriveUrl } = useGoogleDrive()

// Form state
const form = reactive({
  name: '',
  description: '',
  address: '',
  city: '',
  country: '',
  phone: '',
  email: '',
  operatingHours: '',
  managerName: '',
  image: '',
  isActive: true
})

// Component state
const loading = ref(false)
const error = ref('')
const success = ref('')
const imageFile = ref(null)
const imagePreview = ref('')

// Handle image upload
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

// Submit form
const submitForm = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    // Upload image if selected
    if (imageFile.value) {
      const { uploadImage } = useFirebase()
      form.image = await uploadImage(imageFile.value, 'bakeries')
    }

    // Add bakery
    await bakeryStore.addBakery(form)
    
    success.value = 'Bakery created successfully!'
    
    // Redirect to bakeries list after a short delay
    setTimeout(() => {
      router.push('/bakeries')
    }, 1500)
    
  } catch (err) {
    error.value = err.message || 'Failed to create bakery. Please try again.'
  } finally {
    loading.value = false
  }
}

// Meta tags
useSeoMeta({
  title: 'Create Bakery - Admin Panel',
  description: 'Create a new bakery location'
})
</script>