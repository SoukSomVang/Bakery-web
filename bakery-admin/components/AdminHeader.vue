<template>
  <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">{{ title }}</h1>
        <p v-if="subtitle" class="text-sm text-gray-600">{{ subtitle }}</p>
      </div>
      
      <div class="flex items-center space-x-4">
        <button 
          @click="refreshData" 
          class="btn-secondary text-sm"
          :disabled="loading"
        >
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" :class="{ 'animate-spin': loading }">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
          </svg>
          Refresh
        </button>
        
        <div class="text-sm text-gray-500">
          Last updated: {{ lastUpdated }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['refresh'])

const lastUpdated = ref(new Date().toLocaleString())

const refreshData = () => {
  emit('refresh')
  lastUpdated.value = new Date().toLocaleString()
}

// Update last updated time periodically
onMounted(() => {
  setInterval(() => {
    lastUpdated.value = new Date().toLocaleString()
  }, 60000) // Update every minute
})
</script>