<template>
  <div class="language-switcher">
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
    >
      <span class="text-lg">{{ currentFlag }}</span>
      <span class="text-sm font-medium">{{ currentLanguageName }}</span>
      <svg
        class="w-4 h-4 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
    >
      <button
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="selectLocale(locale.code)"
        class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
        :class="{ 'bg-red-50': currentLocale === locale.code }"
      >
        <span class="text-xl">{{ locale.flag }}</span>
        <span class="text-sm font-medium">{{ locale.name }}</span>
        <svg
          v-if="currentLocale === locale.code"
          class="w-5 h-5 ml-auto text-red-600"
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
  </div>
</template>

<script setup>
const { currentLocale, availableLocales, switchLocale } = useTranslation()
const isOpen = ref(false)

const currentFlag = computed(() => {
  const locale = availableLocales.find(l => l.code === currentLocale.value)
  return locale ? locale.flag : '🇱🇦'
})

const currentLanguageName = computed(() => {
  const locale = availableLocales.find(l => l.code === currentLocale.value)
  return locale ? locale.name : 'ລາວ'
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLocale = (code) => {
  switchLocale(code)
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.language-switcher')
  if (!dropdown) {
    isOpen.value = false
  }
}

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>

<style scoped>
.language-switcher {
  position: relative;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
