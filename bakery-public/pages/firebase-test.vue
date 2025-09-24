<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Firebase Connection Test</h1>

    <div class="space-y-4">
      <div class="p-4 bg-gray-100 rounded">
        <h3 class="font-semibold">Firebase Status:</h3>
        <p>Database available: {{ dbStatus }}</p>
        <p>Loading: {{ loading }}</p>
        <p>Error: {{ error || 'None' }}</p>
      </div>

      <div class="p-4 bg-gray-100 rounded">
        <h3 class="font-semibold">Test Results:</h3>
        <pre>{{ JSON.stringify(testResults, null, 2) }}</pre>
      </div>

      <div class="p-4 bg-gray-100 rounded">
        <h3 class="font-semibold">Products Count:</h3>
        <p>Total products: {{ allProducts.length }}</p>
        <p>Bakery types: {{ bakeryTypes.length }}</p>
      </div>

      <button @click="testConnection" class="bg-blue-500 text-white px-4 py-2 rounded">
        Test Firebase Connection
      </button>
    </div>
  </div>
</template>

<script setup>
const { getProductsFilteredByBakeryTypes } = useProducts()

const loading = ref(false)
const error = ref(null)
const dbStatus = ref('Unknown')
const testResults = ref({})
const allProducts = ref([])
const bakeryTypes = ref([])

const testConnection = async () => {
  try {
    loading.value = true
    error.value = null

    // Test Nuxt app context
    const nuxtApp = useNuxtApp()
    testResults.value.nuxtApp = !!nuxtApp
    testResults.value.db = !!nuxtApp.$db

    if (nuxtApp.$db) {
      dbStatus.value = 'Available'
      console.log('Database is available, testing queries...')

      // Test the products query
      const products = await getProductsFilteredByBakeryTypes()
      allProducts.value = products
      testResults.value.productsCount = products.length
      console.log('Products fetched:', products.length)

    } else {
      dbStatus.value = 'Not Available'
      error.value = 'Database not found in Nuxt context'
    }

  } catch (err) {
    console.error('Test failed:', err)
    error.value = err.message
    testResults.value.error = err.message
  } finally {
    loading.value = false
  }
}

// Auto-test on mount
onMounted(() => {
  testConnection()
})
</script>