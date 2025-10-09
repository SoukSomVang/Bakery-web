# 🌐 Translation System Guide

## Overview

This guide explains how to use the translation system in the Bakery Public website.

## 📁 Files Structure

```
bakery-public/
├── locales/
│   ├── en.json          # English translations
│   └── lo.json          # Lao translations
├── composables/
│   └── useTranslation.js  # Translation composable
└── components/
    └── LanguageSwitcher.vue  # Language switcher component
```

## 🚀 Quick Start

### 1. Import the Translation Composable

```vue
<script setup>
const { t, currentLocale, switchLocale } = useTranslation()
</script>
```

### 2. Use Translations in Template

```vue
<template>
  <div>
    <h1>{{ t('manual.title') }}</h1>
    <p>{{ t('common.search') }}</p>
  </div>
</template>
```

### 3. Add Language Switcher

```vue
<template>
  <div>
    <LanguageSwitcher />
  </div>
</template>
```

## 📖 Translation Functions

### `t(key, params)`

Translate a key with optional parameters.

**Basic Usage:**
```javascript
t('manual.title')  // "Product Manual & Guidelines" (EN) or "ຄູ່ມືສິນຄ້າ ແລະ ຄຳແນະນຳ" (LO)
```

**With Parameters:**
```javascript
t('common.showingResults', { start: 1, end: 10, total: 50 })
// EN: "Showing 1-10 of 50 items"
// LO: "ສະແດງ 1-10 ຈາກທັງໝົດ 50 ລາຍການ"
```

### `switchLocale(locale)`

Switch the current language.

```javascript
switchLocale('en')  // Switch to English
switchLocale('lo')  // Switch to Lao
```

### `currentLocale`

Get the current locale code.

```javascript
console.log(currentLocale.value)  // 'en' or 'lo'
```

### `isLao` / `isEnglish`

Computed properties to check current language.

```vue
<template>
  <div v-if="isLao">ລາວ</div>
  <div v-if="isEnglish">English</div>
</template>

<script setup>
const { isLao, isEnglish } = useTranslation()
</script>
```

## 📝 Example: Update Manual Page

### Before (Hardcoded):
```vue
<h2 class="text-lg">Product Manual & Guidelines</h2>
<input placeholder="ຄົ້ນຫາສິນຄ້າ / Search products..." />
```

### After (Translated):
```vue
<script setup>
const { t, isLao } = useTranslation()
</script>

<template>
  <h2 class="text-lg">{{ t('manual.title') }}</h2>
  <input :placeholder="isLao ? 'ຄົ້ນຫາສິນຄ້າ...' : 'Search products...'" />

  <!-- Or use both languages -->
  <input :placeholder="`${t('manual.searchPlaceholder', { lo: true })} / ${t('manual.searchPlaceholder')}`" />
</template>
```

## 📋 Complete Example: Manual Page

```vue
<template>
  <div class="min-h-screen bg-white">
    <!-- Header with Language Switcher -->
    <div class="flex justify-between items-center p-4">
      <h1>{{ t('manual.title') }}</h1>
      <LanguageSwitcher />
    </div>

    <!-- Search -->
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="t('manual.searchPlaceholder')"
    />

    <!-- Type Filter -->
    <select v-model="selectedType">
      <option value="">{{ t('manual.allTypes') }}</option>
    </select>

    <!-- Clear Button -->
    <button @click="clearFilter">
      {{ t('common.clear') }}
    </button>

    <!-- Table Headers -->
    <table>
      <thead>
        <tr>
          <th>{{ t('manual.table.no') }}</th>
          <th>{{ t('manual.table.items') }}</th>
          <th>{{ t('manual.table.image') }}</th>
          <th>{{ t('manual.table.shelfLife') }}</th>
          <th>{{ t('manual.table.canReheat') }}</th>
          <th>{{ t('manual.table.reheatTime') }}</th>
          <th>{{ t('manual.table.storageAfterClosing') }}</th>
          <th>{{ t('manual.table.displayMethod') }}</th>
          <th>{{ t('manual.table.precautions') }}</th>
        </tr>
      </thead>
      <tbody>
        <!-- Table body -->
      </tbody>
    </table>

    <!-- Pagination Info -->
    <div class="text-sm text-gray-600">
      {{ t('common.showingResults', {
        start: startItem,
        end: endItem,
        total: filteredItems.length
      }) }}
    </div>

    <!-- Items Per Page -->
    <span class="text-sm">{{ t('common.itemsPerPage') }}:</span>
  </div>
</template>

<script setup>
const { t } = useTranslation()

const searchQuery = ref('')
const selectedType = ref('')
const filteredItems = ref([])

const startItem = computed(() => 1)
const endItem = computed(() => 10)

const clearFilter = () => {
  searchQuery.value = ''
  selectedType.value = ''
}
</script>
```

## 📚 Adding New Translations

### 1. Add to English (en.json)
```json
{
  "products": {
    "newKey": "New Product"
  }
}
```

### 2. Add to Lao (lo.json)
```json
{
  "products": {
    "newKey": "ສິນຄ້າໃໝ່"
  }
}
```

### 3. Use in Template
```vue
<template>
  <p>{{ t('products.newKey') }}</p>
</template>
```

## 🎨 Bilingual Display

For bilingual labels (Lao / English):

```vue
<template>
  <!-- Method 1: Hardcoded bilingual -->
  <p>ຄົ້ນຫາ / Search</p>

  <!-- Method 2: Dynamic based on locale -->
  <p>{{ isLao ? 'ຄົ້ນຫາ' : 'Search' }}</p>

  <!-- Method 3: Show both always -->
  <p>{{ t('common.search') }} / {{ t('common.search', { locale: 'en' }) }}</p>
</template>
```

## 💡 Tips

1. **Nested Keys**: Use dot notation for nested translations
   ```javascript
   t('manual.table.no')  // Access nested keys
   ```

2. **Parameters**: Use `{param}` in translation strings
   ```json
   {
     "greeting": "Hello, {name}!"
   }
   ```
   ```javascript
   t('greeting', { name: 'John' })  // "Hello, John!"
   ```

3. **Fallback**: If a key is not found, it falls back to English, then returns the key itself

4. **localStorage**: The selected language is saved to localStorage and persists across sessions

## 🔍 Debugging

Check current locale:
```javascript
console.log(currentLocale.value)
```

Check translation value:
```javascript
console.log(t('manual.title'))
```

List all available locales:
```javascript
console.log(availableLocales)
```

## 📊 Available Translation Keys

### Common
- `common.search`
- `common.clear`
- `common.loading`
- `common.noResults`
- `common.showingResults`
- `common.itemsPerPage`

### Navigation
- `nav.home`
- `nav.products`
- `nav.aboutUs`
- `nav.contactUs`
- `nav.manual`
- `nav.gallery`
- `nav.branches`

### Manual Page
- `manual.title`
- `manual.searchPlaceholder`
- `manual.allTypes`
- `manual.noItems`
- `manual.iconLegend`
- `manual.table.*` (all table headers)
- `manual.legends.*` (all icon legends)
- `manual.units.*` (days, min, celsius)

### Products
- `products.cakes`
- `products.breads`
- `products.pastries`
- `products.cookies`
- `products.allProducts`
- `products.freshBaked`

## 🎯 Next Steps

1. Add `<LanguageSwitcher />` to your layout or header
2. Replace hardcoded text with `t()` function calls
3. Add more translation keys as needed
4. Test both English and Lao versions

---

**Happy translating! 🌐**
