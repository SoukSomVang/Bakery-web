<template>
  <div v-if="totalItems > 0" class="mt-8">
    <!-- Main Pagination with Items Per Page -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <!-- Pagination Info Display -->
      <div class="text-sm text-gray-600">
        Showing {{ startItem }}-{{ endItem }} of {{ totalItems }} {{ itemLabel }}
      </div>

      <!-- Pagination Controls -->
      <div v-if="totalPages >= 1" class="flex items-center space-x-2">
        <!-- First Page -->
        <button
          @click="$emit('goToFirstPage')"
          :disabled="currentPage === 1"
          :class="[
            'px-3 py-2 rounded-lg font-medium transition-colors border',
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
          </svg>
        </button>

        <!-- Previous -->
        <button
          @click="$emit('prevPage')"
          :disabled="currentPage === 1"
          :class="[
            'px-3 py-2 rounded-lg font-medium transition-colors border',
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <!-- Page Numbers -->
        <div class="flex space-x-1 mx-4">
          <!-- Show ellipsis if needed -->
          <span v-if="visiblePages[0] > 1" class="px-3 py-2 text-gray-500 font-medium">...</span>

          <button
            v-for="page in visiblePages"
            :key="page"
            @click="$emit('goToPage', page)"
            :class="[
              'min-w-[44px] px-3 py-2 rounded-lg font-medium transition-colors border text-center',
              currentPage === page
                ? 'bg-red-600 text-white border-red-600 shadow-md'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
            ]"
          >
            {{ page }}
          </button>

          <!-- Show ellipsis if needed -->
          <span v-if="visiblePages[visiblePages.length - 1] < totalPages" class="px-3 py-2 text-gray-500 font-medium">...</span>
        </div>

        <!-- Next -->
        <button
          @click="$emit('nextPage')"
          :disabled="currentPage === totalPages"
          :class="[
            'px-3 py-2 rounded-lg font-medium transition-colors border',
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- Last Page -->
        <button
          @click="$emit('goToLastPage')"
          :disabled="currentPage === totalPages"
          :class="[
            'px-3 py-2 rounded-lg font-medium transition-colors border',
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <!-- Items Per Page Selector -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">Items per page:</span>
        <select
          :value="itemsPerPage"
          @change="$emit('changeItemsPerPage', Number($event.target.value))"
          class="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [12, 24, 48]
  },
  itemLabel: {
    type: String,
    default: 'items'
  }
})

defineEmits(['goToFirstPage', 'prevPage', 'nextPage', 'goToLastPage', 'goToPage', 'changeItemsPerPage'])

// Computed properties
const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

const startItem = computed(() => {
  return props.totalItems > 0 ? (props.currentPage - 1) * props.itemsPerPage + 1 : 0
})

const endItem = computed(() => {
  const end = props.currentPage * props.itemsPerPage
  return Math.min(end, props.totalItems)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = props.currentPage
  const delta = 2

  let start = Math.max(1, current - delta)
  let end = Math.min(total, current + delta)

  if (current <= delta) {
    end = Math.min(total, 2 * delta + 1)
  }
  if (current + delta >= total) {
    start = Math.max(1, total - 2 * delta)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
</script>