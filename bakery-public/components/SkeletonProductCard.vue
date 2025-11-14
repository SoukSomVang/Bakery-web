<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col animate-pulse">
    <!-- Image Skeleton -->
    <div class="w-full h-48 bg-gray-300 flex-shrink-0"></div>

    <!-- Content Skeleton -->
    <div class="p-4 flex flex-col flex-grow">
      <!-- Title -->
      <div class="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>

      <!-- Description lines -->
      <div class="space-y-2 mb-3">
        <div class="h-3 bg-gray-200 rounded"></div>
        <div class="h-3 bg-gray-200 rounded w-5/6"></div>
        <div class="h-3 bg-gray-200 rounded w-4/5"></div>
      </div>
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
