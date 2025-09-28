<template>
  <div class="min-h-screen p-8 bg-gray-50">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Firebase Connection Test</h1>

      <div class="bg-white p-6 rounded-lg shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">🔥 Firebase Status</h2>
        <div class="space-y-2">
          <p><strong>Database Available:</strong> {{ dbStatus }}</p>
          <p><strong>Loading:</strong> {{ loading }}</p>
          <p><strong>Error:</strong> {{ error || 'None' }}</p>
          <p><strong>Products Count:</strong> {{ allProducts.length }}</p>
          <p><strong>Bakery Types Count:</strong> {{ allBakeryTypes.length }}</p>
        </div>

        <button @click="testConnection" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Test Firebase Connection
        </button>
      </div>

      <div class="bg-white p-6 rounded-lg shadow mb-6" v-if="allBakeryTypes.length > 0">
        <h2 class="text-xl font-semibold mb-4">🏷️ Bakery Types</h2>
        <div class="space-y-2">
          <div v-for="type in allBakeryTypes" :key="type.id" class="p-2 bg-gray-50 rounded">
            <strong>{{ type.name }}</strong> (ID: {{ type.id }})
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow" v-if="allProducts.length > 0">
        <h2 class="text-xl font-semibold mb-4">📦 All Products</h2>
        <div class="space-y-4">
          <div v-for="product in allProducts" :key="product.id" class="border p-4 rounded">
            <h3 class="font-semibold">{{ product.name }}</h3>
            <p class="text-gray-600">{{ product.description }}</p>
            <p class="text-red-600 font-semibold">{{ product.price }} KIP</p>
            <p class="text-sm text-gray-500">Type: "{{ product.type }}"</p>
          </div>
        </div>
      </div>

      <div class="bg-gray-800 text-white p-6 rounded-lg shadow mt-6">
        <h2 class="text-xl font-semibold mb-4">🐛 Console Logs</h2>
        <div class="space-y-1">
          <div v-for="(log, index) in logs" :key="index" class="text-sm">
            {{ log }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Use client-only wrapper for Firebase composable
let getProducts, getProductsFilteredByBakeryTypes;

if (import.meta.client) {
  const { getProducts: getProductsFunc, getProductsFilteredByBakeryTypes: getFilteredFunc } = useProducts();
  getProducts = getProductsFunc;
  getProductsFilteredByBakeryTypes = getFilteredFunc;
} else {
  // Server-side fallback
  getProducts = async () => [];
  getProductsFilteredByBakeryTypes = async () => [];
}

// State
const loading = ref(false)
const error = ref(null)
const dbStatus = ref('Unknown')
const allProducts = ref([])
const allBakeryTypes = ref([])
const logs = ref([])

const addLog = (message) => {
  logs.value.push(`[${new Date().toLocaleTimeString()}] ${message}`)
  console.log(message)
}

const testConnection = async () => {
  // Only test connection on client side
  if (!import.meta.client) {
    return;
  }

  try {
    loading.value = true
    error.value = null
    logs.value = []
    allProducts.value = []
    allBakeryTypes.value = []

    addLog('🔄 Testing Firebase connection...')

    // Test direct Firebase connection
    const { db } = useClientFirebase()
    if (!db) {
      throw new Error('Database not available from useClientFirebase')
    }

    dbStatus.value = 'Connected'
    addLog('✅ Firebase database connection successful')

    // Test getting all products
    try {
      addLog('🔍 Testing getProducts()...')
      allProducts.value = await getProducts()
      addLog(`✅ Products loaded: ${allProducts.value.length}`)
    } catch (err) {
      addLog(`❌ getProducts() failed: ${err.message}`)
    }

    // Test getting bakery types directly
    try {
      addLog('🔍 Testing bakery types query...')
      const { getDocs, collection } = await import('firebase/firestore')
      const typesSnapshot = await getDocs(collection(db, 'bakeryTypes'))
      allBakeryTypes.value = typesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      addLog(`✅ Bakery types loaded: ${allBakeryTypes.value.length}`)
      addLog(`Types found: ${allBakeryTypes.value.map(t => t.name).join(', ')}`)
    } catch (err) {
      addLog(`❌ Bakery types failed: ${err.message}`)
    }

    // Test filtered products
    try {
      addLog('🔍 Testing getProductsFilteredByBakeryTypes()...')
      const filteredProducts = await getProductsFilteredByBakeryTypes()
      addLog(`✅ Filtered products: ${filteredProducts.length}`)
    } catch (err) {
      addLog(`❌ Filtered products failed: ${err.message}`)
    }

  } catch (err) {
    addLog(`❌ Connection test failed: ${err.message}`)
    error.value = err.message
    dbStatus.value = 'Failed'
  } finally {
    loading.value = false
  }
}

// Auto-run test on mount
onMounted(() => {
  if (import.meta.client) {
    testConnection()
  }
})
</script>