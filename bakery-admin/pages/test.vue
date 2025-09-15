<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-red-600">Admin Panel Test</h1>
    <p class="text-lg text-gray-700 mt-4">This is a simple test page to verify the admin panel is working.</p>
    
    <div class="mt-8 p-4 bg-blue-100 rounded-lg">
      <h2 class="text-xl font-semibold text-blue-800">Test Section</h2>
      <p class="text-blue-700 mt-2">If you can see this, the admin panel is working correctly.</p>
    </div>

    <div class="mt-6">
      <NuxtLink to="/" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
        Go to Dashboard
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Simple test page
console.log('Test page loaded successfully')
</script>