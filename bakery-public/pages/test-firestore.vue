<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Firestore Connection Test</h1>

      <!-- Connection Status -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Connection Status</h2>
        <div v-if="connectionStatus === 'testing'" class="text-yellow-600">
          🔄 Testing connection...
        </div>
        <div v-else-if="connectionStatus === 'success'" class="text-green-600">
          ✅ Firestore connected successfully!
        </div>
        <div v-else-if="connectionStatus === 'error'" class="text-red-600">
          ❌ Connection failed: {{ connectionError }}
        </div>
      </div>

      <!-- Test Categories -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Test: Create Category</h2>
        <div class="flex gap-4 mb-4">
          <input
            v-model="testCategory.name"
            placeholder="Category Name"
            class="flex-1 border rounded-lg px-4 py-2"
          />
          <input
            v-model="testCategory.price"
            placeholder="Price"
            type="number"
            class="border rounded-lg px-4 py-2"
          />
          <button
            @click="createTestCategory"
            :disabled="creating"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {{ creating ? 'Creating...' : 'Create' }}
          </button>
        </div>
        <div v-if="createResult" class="mt-4">
          <div v-if="createResult.success" class="text-green-600">
            ✅ Category created successfully! ID: {{ createResult.id }}
          </div>
          <div v-else class="text-red-600">
            ❌ Failed to create category: {{ createResult.error }}
          </div>
        </div>
      </div>

      <!-- Existing Categories -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Existing Categories</h2>
        <button
          @click="fetchCategories"
          :disabled="fetching"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 mb-4"
        >
          {{ fetching ? 'Fetching...' : 'Fetch Categories' }}
        </button>

        <div v-if="categories.length > 0">
          <div v-for="category in categories" :key="category.id" class="border-b py-2">
            <strong>{{ category.name }}</strong> - {{ category.price }} KIP
            <small class="text-gray-500 ml-2">ID: {{ category.id }}</small>
          </div>
        </div>
        <div v-else-if="fetchAttempted" class="text-gray-500">
          No categories found. Try creating one above.
        </div>
      </div>

      <!-- Test Products -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Test: Create Product</h2>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <input
            v-model="testProduct.name"
            placeholder="Product Name"
            class="border rounded-lg px-4 py-2"
          />
          <input
            v-model="testProduct.category"
            placeholder="Category (e.g., Breads)"
            class="border rounded-lg px-4 py-2"
          />
          <input
            v-model="testProduct.price"
            placeholder="Price"
            type="number"
            class="border rounded-lg px-4 py-2"
          />
          <input
            v-model="testProduct.image"
            placeholder="Image URL"
            class="border rounded-lg px-4 py-2"
          />
        </div>
        <textarea
          v-model="testProduct.description"
          placeholder="Description"
          class="w-full border rounded-lg px-4 py-2 mb-4"
          rows="3"
        ></textarea>
        <button
          @click="createTestProduct"
          :disabled="creatingProduct"
          class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {{ creatingProduct ? 'Creating...' : 'Create Product' }}
        </button>

        <div v-if="productResult" class="mt-4">
          <div v-if="productResult.success" class="text-green-600">
            ✅ Product created successfully! ID: {{ productResult.id }}
          </div>
          <div v-else class="text-red-600">
            ❌ Failed to create product: {{ productResult.error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, addDoc, getDocs } from 'firebase/firestore'

const { $db } = useNuxtApp()

// Connection test
const connectionStatus = ref('testing')
const connectionError = ref('')

// Test data
const testCategory = ref({
  name: 'Test Croissant',
  price: 15000
})

const testProduct = ref({
  name: 'Chocolate Croissant',
  category: 'Pastries',
  price: 12000,
  description: 'Delicious chocolate-filled croissant',
  image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop'
})

// State
const creating = ref(false)
const creatingProduct = ref(false)
const fetching = ref(false)
const createResult = ref(null)
const productResult = ref(null)
const categories = ref([])
const fetchAttempted = ref(false)

// Test connection
const testConnection = async () => {
  try {
    connectionStatus.value = 'testing'

    // Try to get the categories collection (this will test the connection)
    const categoriesRef = collection($db, 'categories')
    await getDocs(categoriesRef)

    connectionStatus.value = 'success'
  } catch (error) {
    connectionStatus.value = 'error'
    connectionError.value = error.message
    console.error('Firestore connection test failed:', error)
  }
}

// Create test category
const createTestCategory = async () => {
  try {
    creating.value = true
    createResult.value = null

    const docRef = await addDoc(collection($db, 'categories'), {
      name: testCategory.value.name,
      price: testCategory.value.price,
      description: 'Test category created from diagnostic page',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
      slug: testCategory.value.name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date()
    })

    createResult.value = { success: true, id: docRef.id }

    // Clear form
    testCategory.value = { name: '', price: 0 }

  } catch (error) {
    createResult.value = { success: false, error: error.message }
    console.error('Error creating category:', error)
  } finally {
    creating.value = false
  }
}

// Create test product
const createTestProduct = async () => {
  try {
    creatingProduct.value = true
    productResult.value = null

    const docRef = await addDoc(collection($db, 'products'), {
      name: testProduct.value.name,
      category: testProduct.value.category,
      price: testProduct.value.price,
      description: testProduct.value.description,
      image: testProduct.value.image,
      featured: false,
      createdAt: new Date()
    })

    productResult.value = { success: true, id: docRef.id }

    // Clear form
    testProduct.value = {
      name: '',
      category: '',
      price: 0,
      description: '',
      image: ''
    }

  } catch (error) {
    productResult.value = { success: false, error: error.message }
    console.error('Error creating product:', error)
  } finally {
    creatingProduct.value = false
  }
}

// Fetch categories
const fetchCategories = async () => {
  try {
    fetching.value = true
    fetchAttempted.value = true

    const querySnapshot = await getDocs(collection($db, 'categories'))
    categories.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

  } catch (error) {
    console.error('Error fetching categories:', error)
  } finally {
    fetching.value = false
  }
}

// Test connection on mount
onMounted(() => {
  testConnection()
})

// SEO
useHead({
  title: 'Firestore Connection Test'
})
</script>