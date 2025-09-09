<template>
  <div>
    <AdminHeader 
      title="Dashboard" 
      subtitle="Overview of your bakery management system"
      :loading="loading"
      @refresh="refreshData"
    />
    
    <div class="p-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Items</p>
              <p class="text-2xl font-bold text-gray-900">{{ bakeryItems.length }}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Storage Records</p>
              <p class="text-2xl font-bold text-gray-900">{{ storageData.length }}</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
                <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Branches</p>
              <p class="text-2xl font-bold text-gray-900">{{ branches.length }}</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-full">
              <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Item Types</p>
              <p class="text-2xl font-bold text-gray-900">{{ bakeryTypes.length }}</p>
            </div>
            <div class="p-3 bg-yellow-100 rounded-full">
              <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Items by Type Chart -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Items by Type</h3>
          <div class="space-y-3">
            <div v-for="type in bakeryTypes" :key="type" class="flex items-center justify-between">
              <span class="text-sm text-gray-600">{{ type }}</span>
              <span class="text-sm font-medium text-gray-900">{{ getItemCountByType(type) }}</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <NuxtLink to="/bakery-items/create" class="block w-full btn-primary text-center">
              Add New Bakery Item
            </NuxtLink>
            <NuxtLink to="/storage/create" class="block w-full btn-secondary text-center">
              Add Storage Record
            </NuxtLink>
            <NuxtLink to="/branches/create" class="block w-full btn-success text-center">
              Add New Branch
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Recent Items -->
      <div class="mt-8">
        <div class="card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Recent Items</h3>
            <NuxtLink to="/bakery-items" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </NuxtLink>
          </div>
          
          <div v-if="recentItems.length > 0" class="overflow-x-auto">
            <table class="min-w-full table-auto">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-2 px-4 font-medium text-gray-700">Name</th>
                  <th class="text-left py-2 px-4 font-medium text-gray-700">Type</th>
                  <th class="text-left py-2 px-4 font-medium text-gray-700">Price</th>
                  <th class="text-left py-2 px-4 font-medium text-gray-700">Created</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in recentItems" :key="item.id" class="border-b hover:bg-gray-50">
                  <td class="py-2 px-4">{{ item.name }}</td>
                  <td class="py-2 px-4">
                    <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {{ item.type }}
                    </span>
                  </td>
                  <td class="py-2 px-4">${{ item.price }}</td>
                  <td class="py-2 px-4 text-sm text-gray-500">
                    {{ formatDate(item.createdAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div v-else class="text-center py-8 text-gray-500">
            No items found. <NuxtLink to="/bakery-items/create" class="text-blue-600">Add your first item</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const bakeryStore = useBakeryStore()
const { bakeryItems, storageData, branches, bakeryTypes, loading } = storeToRefs(bakeryStore)

// Computed properties
const recentItems = computed(() => {
  return bakeryItems.value
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
})

// Methods
const getItemCountByType = (type) => {
  return bakeryItems.value.filter(item => item.type === type).length
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const refreshData = async () => {
  await Promise.all([
    bakeryStore.fetchBakeryItems(),
    bakeryStore.fetchStorageData(), 
    bakeryStore.fetchBranches()
  ])
}

// Load data on mount
onMounted(() => {
  refreshData()
})
</script>