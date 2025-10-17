<template>
  <div class="language-switcher">
    <select
      v-model="currentLocale"
      @change="handleLocaleChange"
      class="px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none cursor-pointer text-sm font-medium"
    >
      <option
        v-for="locale in availableLocales"
        :key="locale.code"
        :value="locale.code"
      >
        {{ locale.flag }} {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
const { currentLocale, availableLocales, switchLocale } = useTranslation()

const handleLocaleChange = (event) => {
  switchLocale(event.target.value)
}
</script>

<style scoped>
.language-switcher {
  display: inline-block;
}

select {
  appearance: auto;
  -webkit-appearance: auto;
  -moz-appearance: auto;
}
</style>
