<template>
  <Teleport to="body">
    <div 
      v-if="show" 
      class="fixed inset-0 z-50 overflow-y-auto"
      @click.self="closeModal"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      
      <!-- Modal Content -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div 
          class="relative bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ title }}
            </h3>
            <button 
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Modal Body -->
          <div class="p-6">
            <slot>
              <p class="text-gray-600">{{ message }}</p>
            </slot>
          </div>
          
          <!-- Modal Footer -->
          <div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
            <button 
              v-if="showCancel"
              @click="closeModal"
              class="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              {{ cancelText }}
            </button>
            <button 
              @click="confirmAction"
              :class="confirmButtonClass"
              class="px-4 py-2 rounded-md font-medium transition-colors"
            >
              {{ confirmText }}
            </button>
          </div>
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
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info', // success, error, warning, info, confirm
    validator: (value) => ['success', 'error', 'warning', 'info', 'confirm'].includes(value)
  },
  confirmText: {
    type: String,
    default: 'OK'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  showCancel: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'confirm'])

// Computed styles based on modal type
const confirmButtonClass = computed(() => {
  const baseClasses = 'text-white font-medium'
  
  switch (props.type) {
    case 'success':
      return `${baseClasses} bg-green-600 hover:bg-green-700`
    case 'error':
      return `${baseClasses} bg-red-600 hover:bg-red-700`
    case 'warning':
      return `${baseClasses} bg-yellow-600 hover:bg-yellow-700`
    case 'confirm':
      return `${baseClasses} bg-blue-600 hover:bg-blue-700`
    default:
      return `${baseClasses} bg-gray-600 hover:bg-gray-700`
  }
})

// Methods
const closeModal = () => {
  emit('close')
}

const confirmAction = () => {
  emit('confirm')
  if (props.type !== 'confirm') {
    closeModal()
  }
}

// Auto-close for success messages
watchEffect(() => {
  if (props.show && props.type === 'success') {
    setTimeout(() => {
      closeModal()
    }, 3000)
  }
})

// Prevent body scroll when modal is open
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