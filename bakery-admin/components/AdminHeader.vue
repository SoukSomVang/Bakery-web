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
          <i class="mdi mdi-refresh w-4 h-4 mr-2" :class="{ 'animate-spin': loading }"></i>
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