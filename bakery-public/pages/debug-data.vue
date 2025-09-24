<template>
  <div class="min-h-screen p-8 bg-gray-50">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-center">Data Debug Dashboard</h1>

      <!-- Firebase Connection Status -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">🔥 Firebase Status</h2>
          <div class="space-y-2">
            <p><strong>Database Available:</strong> {{ dbStatus }}</p>
            <p><strong>Loading:</strong> {{ loading }}</p>
            <p><strong>Error:</strong> {{ error || 'None' }}</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">📊 Collections Info</h2>
          <div class="space-y-2">
            <p><strong>Products:</strong> {{ allProducts.length }}</p>
            <p><strong>Bakery Types:</strong> {{ allBakeryTypes.length }}</p>
            <p><strong>Filtered Products:</strong> {{ filteredProducts.length }}</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">🔍 Query Tests</h2>
          <div class="space-y-2">
            <button @click="testAllQueries" class="bg-blue-500 text-white px-4 py-2 rounded text-sm">
              Run All Tests
            </button>
            <button @click="testCaseInsensitive" class="bg-green-500 text-white px-4 py-2 rounded text-sm">
              Test Case Issues
            </button>
          </div>
        </div>
      </div>

      <!-- Bakery Types Display -->
      <div class="bg-white p-6 rounded-lg shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">🏷️ Bakery Types in Database</h2>
        <div v-if="allBakeryTypes.length === 0" class="text-gray-500">
          No bakery types found
        </div>
        <div v-else class="space-y-2">
          <div v-for="type in allBakeryTypes" :key="type.id"
               class="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <strong>{{ type.name }}</strong>
              <span class="text-sm text-gray-500 ml-2">(ID: {{ type.id }})</span>
            </div>
            <div class="text-sm">
              <span class="bg-blue-100 px-2 py-1 rounded">{{ type.name?.length }} chars</span>
            </div>
          </div>
        </div>
      </div>

      <!-- All Products Display -->
      <div class="bg-white p-6 rounded-lg shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">📦 All Products in Database</h2>
        <div v-if="allProducts.length === 0" class="text-gray-500">
          No products found
        </div>
        <div v-else class="space-y-4">
          <div v-for="product in allProducts" :key="product.id"
               class="border p-4 rounded-lg">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <h3 class="font-semibold text-lg">{{ product.name }}</h3>
                <p class="text-gray-600">{{ product.description }}</p>
                <p class="text-red-600 font-semibold">{{ product.price }} KIP</p>
              </div>
              <div class="space-y-2 text-sm">
                <p><strong>Type:</strong> "{{ product.type }}" ({{ typeof product.type }})</p>
                <p><strong>Category:</strong> "{{ product.category }}" ({{ typeof product.category }})</p>
                <p><strong>ID:</strong> {{ product.id }}</p>
                <div class="flex flex-wrap gap-2 mt-2">
                  <span class="bg-blue-100 px-2 py-1 rounded">
                    Type: "{{ product.type }}"
                  </span>
                  <span v-if="product.category" class="bg-green-100 px-2 py-1 rounded">
                    Category: "{{ product.category }}"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtered Products Display -->
      <div class="bg-white p-6 rounded-lg shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">🔍 Filtered Products (Matching Bakery Types)</h2>
        <div v-if="filteredProducts.length === 0" class="text-red-500">
          ❌ No products match any bakery types!
        </div>
        <div v-else class="space-y-4">
          <div v-for="product in filteredProducts" :key="product.id"
               class="border-2 border-green-200 p-4 rounded-lg bg-green-50">
            <h3 class="font-semibold text-lg">{{ product.name }}</h3>
            <p><strong>Type:</strong> "{{ product.type }}"</p>
          </div>
        </div>
      </div>

      <!-- Debug Output -->
      <div class="bg-gray-800 text-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">🐛 Debug Output</h2>
        <pre class="text-sm overflow-auto">{{ JSON.stringify(debugInfo, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getProducts, getProductsFilteredByBakeryTypes } = useProducts()

// State
const loading = ref(true)
const error = ref(null)
const dbStatus = ref('Unknown')
const allProducts = ref([])
const allBakeryTypes = ref([])
const filteredProducts = ref([])
const debugInfo = ref({})

// Test all queries
const testAllQueries = async () => {
  try {
    loading.value = true
    error.value = null
    debugInfo.value = {}

    // Test database connection
    const nuxtApp = useNuxtApp()
    dbStatus.value = nuxtApp.$db ? 'Connected' : 'Not Connected'
    debugInfo.value.nuxtApp = !!nuxtApp
    debugInfo.value.database = !!nuxtApp.$db

    if (!nuxtApp.$db) {
      throw new Error('Database not available in Nuxt context')
    }

    // Test getting all products
    try {
      console.log('🔍 Testing all products query...')
      allProducts.value = await getProducts()
      debugInfo.value.allProductsCount = allProducts.value.length
      console.log('✅ All products:', allProducts.value.length)
    } catch (err) {
      console.error('❌ All products failed:', err)
      debugInfo.value.allProductsError = err.message
    }

    // Test getting bakery types
    try {
      console.log('🔍 Testing bakery types query...')
      const { getDocs, collection } = await import('firebase/firestore')
      const typesSnapshot = await getDocs(collection(nuxtApp.$db, 'bakeryTypes'))
      allBakeryTypes.value = typesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      debugInfo.value.bakeryTypesCount = allBakeryTypes.value.length
      debugInfo.value.bakeryTypeNames = allBakeryTypes.value.map(t => t.name)
      console.log('✅ Bakery types:', allBakeryTypes.value.length)
    } catch (err) {
      console.error('❌ Bakery types failed:', err)
      debugInfo.value.bakeryTypesError = err.message
    }

    // Test filtered products
    try {
      console.log('🔍 Testing filtered products query...')
      filteredProducts.value = await getProductsFilteredByBakeryTypes()
      debugInfo.value.filteredProductsCount = filteredProducts.value.length
      console.log('✅ Filtered products:', filteredProducts.value.length)
    } catch (err) {
      console.error('❌ Filtered products failed:', err)
      debugInfo.value.filteredProductsError = err.message
    }

    // Debug type matching
    debugInfo.value.typeMatching = {}
    allBakeryTypes.value.forEach(type => {
      const matchingProducts = allProducts.value.filter(p => p.type === type.name)
      debugInfo.value.typeMatching[type.name] = {
        expectedType: type.name,
        matchingProducts: matchingProducts.length,
        productTypes: allProducts.value.map(p => p.type).filter(Boolean)
      }
    })

  } catch (err) {
    console.error('❌ Test failed:', err)
    error.value = err.message
    debugInfo.value.generalError = err.message
  } finally {
    loading.value = false
  }
}

// Test case sensitivity issues
const testCaseInsensitive = async () => {
  console.log('🔍 Testing case sensitivity...')

  const typeVariations = ['cake', 'Cake', 'CAKE']
  const results = {}

  typeVariations.forEach(variation => {
    const matches = allProducts.value.filter(p =>
      p.type?.toLowerCase() === variation.toLowerCase()
    )
    results[variation] = matches.length
    console.log(`"${variation}" matches:`, matches.length)
  })

  debugInfo.value.caseSensitivityTest = results
}

// Auto-run tests on mount
onMounted(() => {
  testAllQueries()
})
</script>