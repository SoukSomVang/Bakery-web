<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Bakeries Management</h1>
            <p class="mt-2 text-gray-600">Manage your bakery locations and information</p>
          </div>
          <NuxtLink 
            to="/bakeries/create" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add New Bakery
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

      <!-- Bakeries List -->
      <div v-else class="bg-white shadow-lg rounded-lg overflow-hidden">
        <div v-if="bakeryStore.bakeries.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No Bakeries Found</h3>
          <p class="text-gray-500 mb-4">Get started by creating your first bakery location.</p>
          <NuxtLink 
            to="/bakeries/create" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
          >
            Create Bakery
          </NuxtLink>
        </div>

        <div v-else>
          <!-- Table Header -->
          <div class="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div class="grid grid-cols-6 gap-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div class="col-span-2">Bakery Info</div>
              <div>Location</div>
              <div>Contact</div>
              <div>Status</div>
              <div class="text-right">Actions</div>
            </div>
          </div>

          <!-- Table Body -->
          <div class="divide-y divide-gray-200">
            <div 
              v-for="bakery in bakeryStore.bakeries" 
              :key="bakery.id" 
              class="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div class="grid grid-cols-6 gap-4 items-center">
                <!-- Bakery Info -->
                <div class="col-span-2">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-12 w-12">
                      <img 
                        v-if="bakery.image" 
                        :src="bakery.image" 
                        :alt="bakery.name"
                        class="h-12 w-12 rounded-full object-cover"
                      />
                      <div 
                        v-else 
                        class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center"
                      >
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ bakery.name }}</div>
                      <div class="text-sm text-gray-500">{{ bakery.description || 'No description' }}</div>
                    </div>
                  </div>
                </div>

                <!-- Location -->
                <div class="text-sm text-gray-900">
                  <div>{{ bakery.address }}</div>
                  <div class="text-gray-500">{{ bakery.city }}, {{ bakery.country }}</div>
                </div>

                <!-- Contact -->
                <div class="text-sm text-gray-900">
                  <div>{{ bakery.phone || 'N/A' }}</div>
                  <div class="text-gray-500">{{ bakery.email || 'N/A' }}</div>
                </div>

                <!-- Status -->
                <div>
                  <span 
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      bakery.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ bakery.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </div>

                <!-- Actions -->
                <div class="text-right">
                  <div class="flex justify-end space-x-2">
                    <NuxtLink 
                      :to="`/bakeries/edit/${bakery.id}`"
                      class="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Edit
                    </NuxtLink>
                    <button 
                      @click="confirmDelete(bakery)"
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
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-2">Delete Bakery</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Are you sure you want to delete "{{ bakeryToDelete?.name }}"? This action cannot be undone.
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
                @click="deleteBakery"
                class="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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
const bakeryToDelete = ref(null)

// Fetch bakeries on component mount
onMounted(async () => {
  await bakeryStore.fetchBakeries()
})

// Delete confirmation
const confirmDelete = (bakery) => {
  bakeryToDelete.value = bakery
  showDeleteModal.value = true
}

// Delete bakery
const deleteBakery = async () => {
  if (bakeryToDelete.value) {
    try {
      await bakeryStore.deleteBakery(bakeryToDelete.value.id)
      showDeleteModal.value = false
      bakeryToDelete.value = null
    } catch (error) {
      console.error('Failed to delete bakery:', error)
    }
  }
}

// Meta tags
useSeoMeta({
  title: 'Bakeries Management - Admin Panel',
  description: 'Manage bakery locations and information'
})
</script>