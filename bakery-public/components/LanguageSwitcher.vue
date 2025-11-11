<template>
  <div class="language-switcher" ref="switcherRef">
    <!-- Selected Language Display -->
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none w-full md:w-auto"
    >
      <img
        :src="selectedLocale.flagImage"
        :alt="`${selectedLocale.name} flag`"
        class="w-6 h-6 rounded-full object-cover border border-gray-200 flex-shrink-0"
      />
      <span class="text-sm font-medium text-gray-700">{{ selectedLocale.name }}</span>
      <svg
        class="w-4 h-4 text-gray-500 transition-transform ml-auto"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <!-- Dropdown Menu with Teleport -->
    <Teleport to="body">
      <Transition name="dropdown">
        <div
          v-if="isOpen"
          ref="dropdownRef"
          :style="dropdownStyle"
          class="fixed bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
        >
          <button
            v-for="locale in availableLocales"
            :key="locale.code"
            @click="handleLocaleChange(locale.code)"
            class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left whitespace-nowrap"
            :class="{ 'bg-red-50': currentLocale.value === locale.code }"
          >
            <img
              :src="locale.flagImage"
              :alt="`${locale.name} flag`"
              class="w-6 h-6 rounded-full object-cover border border-gray-200 flex-shrink-0"
            />
            <span class="text-sm font-medium text-gray-700">{{ locale.name }}</span>
            <svg
              v-if="currentLocale.value === locale.code"
              class="w-4 h-4 text-red-800 ml-auto flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

const { currentLocale, switchLocale } = useTranslation()
const isOpen = ref(false)
const switcherRef = ref(null)
const dropdownRef = ref(null)
const dropdownStyle = ref({})

const availableLocales = [
  {
    code: 'en',
    name: 'English',
    flagImage: '/images/flags/gb.png'
  },
  {
    code: 'lo',
    name: 'ລາວ',
    flagImage: '/images/flags/la.png'
  }
]

const selectedLocale = computed(() => {
  return availableLocales.find(locale => locale.code === currentLocale.value) || availableLocales[0]
})

const calculateDropdownPosition = () => {
  if (!switcherRef.value || !import.meta.client) return

  const rect = switcherRef.value.getBoundingClientRect()
  const isMobile = window.innerWidth < 768

  if (isMobile) {
    // On mobile, full width aligned to container
    dropdownStyle.value = {
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      zIndex: '9999'
    }
  } else {
    // On desktop, align to right edge
    dropdownStyle.value = {
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
      minWidth: '160px',
      zIndex: '9999'
    }
  }
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      calculateDropdownPosition()
    })
  }
}

const handleLocaleChange = (code) => {
  switchLocale(code)
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!switcherRef.value || !dropdownRef.value) return

  const clickedSwitcher = switcherRef.value.contains(event.target)
  const clickedDropdown = dropdownRef.value.contains(event.target)

  if (!clickedSwitcher && !clickedDropdown) {
    isOpen.value = false
  }
}

// Recalculate position on scroll or resize
const handleScroll = () => {
  if (isOpen.value) {
    calculateDropdownPosition()
  }
}

const handleResize = () => {
  if (isOpen.value) {
    calculateDropdownPosition()
  }
}

watch(isOpen, (newValue) => {
  if (newValue) {
    nextTick(() => calculateDropdownPosition())
  }
})

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('scroll', handleScroll, true)
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: block;
  width: 100%;
}

@media (min-width: 768px) {
  .language-switcher {
    display: inline-block;
    width: auto;
  }
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
