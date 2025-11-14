<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    <!-- Image Skeleton -->
    <div class="h-64 bg-gray-300"></div>

    <!-- Content Skeleton -->
    <div class="p-6">
      <!-- Title -->
      <div class="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>

      <!-- Description lines -->
      <div class="space-y-2 mb-4">
        <div class="h-4 bg-gray-200 rounded"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      <!-- Contact info -->
      <div class="space-y-2 mb-4">
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>

      <!-- Operating hours -->
      <div class="h-4 bg-gray-200 rounded w-4/5 mb-4"></div>

      <!-- Manager -->
      <div class="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>

      <!-- Button -->
      <div class="h-12 bg-gray-300 rounded-lg"></div>
    </div>
  </div>
</template>

<script setup>
// No props needed for basic skeleton
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
