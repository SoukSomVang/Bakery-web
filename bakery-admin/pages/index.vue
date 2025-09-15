<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
    <p class="mt-4 text-gray-700">Welcome to the bakery admin panel!</p>
    
    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white p-6 rounded-lg shadow border">
        <h3 class="text-lg font-semibold text-gray-800">Bakeries</h3>
        <p class="text-2xl font-bold text-blue-600">0</p>
        <NuxtLink to="/bakeries" class="text-sm text-blue-600 hover:underline">Manage</NuxtLink>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow border">
        <h3 class="text-lg font-semibold text-gray-800">Items</h3>
        <p class="text-2xl font-bold text-green-600">0</p>
        <NuxtLink to="/bakery-items" class="text-sm text-green-600 hover:underline">Manage</NuxtLink>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow border">
        <h3 class="text-lg font-semibold text-gray-800">Branches</h3>
        <p class="text-2xl font-bold text-purple-600">0</p>
        <NuxtLink to="/branches" class="text-sm text-purple-600 hover:underline">Manage</NuxtLink>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
      <div class="flex flex-wrap gap-4">
        <NuxtLink 
          to="/bakeries/create" 
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add Bakery
        </NuxtLink>
        <NuxtLink 
          to="/bakery-items/create" 
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Add Item
        </NuxtLink>
        <NuxtLink 
          to="/branches/create" 
          class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
        >
          Add Branch
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
console.log('Dashboard page loaded')
</script>