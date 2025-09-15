<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-4xl font-bold text-blue-600 mb-6">Simple Admin Page</h1>
    
    <div class="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Basic Information</h2>
      <p class="text-gray-600 mb-4">This is a simplified admin page to test if the system is working.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-blue-100 p-4 rounded">
          <h3 class="font-semibold text-blue-800">Total Items</h3>
          <p class="text-2xl font-bold text-blue-900">{{ itemCount }}</p>
        </div>
        <div class="bg-green-100 p-4 rounded">
          <h3 class="font-semibold text-green-800">Status</h3>
          <p class="text-green-700">{{ loading ? 'Loading...' : 'Ready' }}</p>
        </div>
        <div class="bg-purple-100 p-4 rounded">
          <h3 class="font-semibold text-purple-800">Test</h3>
          <p class="text-purple-700">Working ✓</p>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Navigation Links</h3>
      <div class="space-y-2">
        <NuxtLink to="/" class="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center">
          Main Dashboard
        </NuxtLink>
        <NuxtLink to="/bakeries" class="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center">
          Bakeries Management
        </NuxtLink>
        <NuxtLink to="/bakery-items" class="block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-center">
          Bakery Items
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBakeryStore } from '~/stores/bakery'

// Simple reactive data
const itemCount = ref(0)
const loading = ref(true)

// Try to use the store safely
onMounted(async () => {
  try {
    const bakeryStore = useBakeryStore()
    await bakeryStore.fetchBakeryItems()
    itemCount.value = bakeryStore.bakeryItems?.length || 0
    loading.value = false
    console.log('Store loaded successfully:', bakeryStore.bakeryItems)
  } catch (error) {
    console.error('Error loading store:', error)
    loading.value = false
    itemCount.value = 'Error'
  }
})

// Meta tags
useSeoMeta({
  title: 'Simple Admin - Test Page',
  description: 'Simple admin page for testing'
})
</script>