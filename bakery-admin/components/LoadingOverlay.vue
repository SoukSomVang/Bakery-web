<template>
  <Teleport to="body">
    <div 
      v-if="show" 
      class="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-8 shadow-xl max-w-sm w-full mx-4">
        <div class="flex items-center space-x-4">
          <!-- Spinner -->
          <div class="flex-shrink-0">
            <i class="mdi mdi-loading animate-spin h-8 w-8 text-blue-600"></i>
          </div>
          
          <!-- Loading Text -->
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
            <p v-if="message" class="text-sm text-gray-600 mt-1">{{ message }}</p>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div v-if="showProgress" class="mt-4">
          <div class="bg-gray-200 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <p class="text-xs text-gray-500 mt-1 text-center">{{ progress }}%</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Loading...'
  },
  message: {
    type: String,
    default: ''
  },
  showProgress: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100
  }
})

// Prevent body scroll when loading is shown
watchEffect(() => {
  if (props.show) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = 'unset'
})
</script>