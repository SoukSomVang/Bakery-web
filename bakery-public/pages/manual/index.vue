<template>
  <div class="min-h-screen bg-white">
    <!-- PDF-Style Header -->
    <div class="bg-white border-b-2 border-gray-200 print:border-black">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <!-- Manual Title -->
        <div class="text-center mb-6">
          <h2 class="text-lg">{{ t('manual.title') }}</h2>
        </div>

        <!-- Search Controls (minimal design) -->
        <div
          class="flex flex-col md:flex-row justify-center items-center gap-3 mb-4"
        >
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('manual.searchPlaceholder')"
            class="px-4 py-2 border border-gray-300 rounded text-sm w-full h-[38px] md:w-64 focus:ring-2 focus:ring-red-800 focus:border-red-800"
          />
          <select
            v-model="selectedType"
            class="px-4 py-2 border border-gray-300 rounded text-sm w-full h-[38px] md:w-auto focus:ring-2 focus:ring-red-800 focus:border-red-800"
          >
            <option value="">{{ t('manual.allTypes') }}</option>
            <option
              v-for="typeName in bakeryTypeNames"
              :key="typeName"
              :value="typeName"
            >
              {{ capitalizeFirst(typeName) }}
            </option>
          </select>
          <button
            @click="clearFilter"
            class="w-full md:w-auto px-4 py-2 bg-red-800 text-white h-[38px] rounded text-sm hover:bg-red-700"
          >
            {{ t('manual.clear') }}
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-6">
      <!-- Error Message -->
      <div
        v-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center"
      >
        <div class="mb-3">{{ error }}</div>
        <button
          @click="fetchData"
          :disabled="loading"
          class="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {{ loading ? t('common.retrying') : t('common.tryAgain') }}
        </button>
      </div>

      <!-- No Items Message -->
      <div
        v-if="!loading && !error && filteredItems.length === 0"
        class="text-center py-12"
      >
        <div class="text-gray-500 text-lg">{{ t('manual.noItemsFound') }}</div>
      </div>

      <!-- PDF-Style Table -->
      <div
        v-else-if="!loading && filteredItems.length > 0"
        class="bg-white border-2 border-gray-300 overflow-x-auto"
      >
        <table class="min-w-full text-sm border-collapse">
          <!-- Table Header -->
          <thead>
            <tr class="bg-red-800 text-white">
              <th
                class="border border-gray-300 px-2 py-3 text-center text-xs font-bold text-nowrap"
              >
                <p class="px-4">{{ t('manual.table.no') }}</p>
              </th>
              <th
                class="border border-gray-300 px-2 py-3 text-center text-xs font-bold text-nowrap"
              >
                <p class="px-4">{{ t('manual.table.items') }}</p>
              </th>
              <th
                class="border border-gray-300 px-2 py-3 text-center text-xs font-bold text-nowrap"
              >
                <p class="px-4">{{ t('manual.table.image') }}</p>
              </th>
              <th
                class="border border-gray-300 px-2 py-3 text-center text-xs font-bold text-nowrap"
              >
                <p class="px-4">{{ t('manual.table.shelfLife') }}</p>
              </th>
              <th
                class="border border-gray-300 px-2 py-3 text-center text-xs font-bold text-nowrap"
              >
                <p class="px-4">{{ t('manual.table.reheatForCustomer') }}</p>
              </th>
              <th
                class="border border-gray-300 px-2 py-3 text-center text-xs font-bold text-nowrap"
              >
                <p class="px-4">{{ t('manual.table.reheatTime') }}</p>
              </th>
              <th
                class="border border-gray-300 px-2 py-3 text-center text-xs font-bold text-nowrap"
              >
                <p class="px-4">{{ t('manual.table.storageAfterClosing') }}</p>
              </th>
              <th
                class="border border-gray-300 px-2 py-3 text-center text-xs font-bold text-nowrap"
              >
                <p class="px-4">{{ t('manual.table.displayMethod') }}</p>
              </th>
              <th
                class="border border-gray-300 px-2 py-3 text-center text-xs font-bold text-nowrap"
              >
                <p class="px-4">{{ t('manual.table.precautions') }}</p>
              </th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody>
            <tr
              v-for="(item, index) in paginatedItems"
              :key="item.id"
              class="border-b border-gray-300 hover:bg-gray-50"
            >
              <!-- Row Number -->
              <td
                class="border border-gray-300 px-2 py-4 text-center font-bold"
              >
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>

              <!-- Item Name -->
              <td class="border border-gray-300 px-3 py-4">
                <div class="font-medium text-gray-900 px-2">
                  {{ item.name }}
                </div>
              </td>

              <!-- Image -->
              <td class="border border-gray-300 px-3 py-4 text-center">
                <div
                  class="w-16 h-16 px-2"
                  style="width: 4rem !important; height: 4rem !important"
                >
                  <img
                    :src="getProductImageWithFallback(item)"
                    :alt="item.name"
                    class="object-cover rounded-lg shadow-sm"
                    @error="handleImageError($event, item)"
                    loading="lazy"
                    style="width: 4rem !important; height: 4rem !important"
                  />
                </div>
              </td>

              <!-- Shelf Life -->
              <td class="border border-gray-300 px-2 py-4 text-center">
                <div class="font-bold text-lg px-2">
                  {{ item.shelf_life_days || item.shelfLife || 7 }}
                </div>
                <div class="text-xs text-gray-600 px-2">days</div>
              </td>

              <!-- Can Reheat -->
              <td class="border border-gray-300 px-2 py-4 text-center">
                <div class="flex justify-center mb-2 px-2">
                  <div
                    v-if="item.can_reheat"
                    class="w-12 h-12 rounded flex items-center justify-center"
                  >
                    <img
                      src="/assets/images/icons/oven.png"
                      alt="Can reheat"
                      class="w-8 h-8"
                    />
                  </div>
                  <div
                    v-else
                    class="w-12 h-12 rounded flex items-center justify-center"
                  >
                    <img
                      src="/assets/images/icons/no-heat.png"
                      alt="Cannot reheat"
                      class="w-8 h-8"
                    />
                  </div>
                </div>
                <div
                  v-if="item.can_reheat && item.reheat_temperature"
                  class="text-xs"
                >
                  {{ item.reheat_temperature }}°C
                </div>
              </td>

              <!-- Reheat Time -->
              <td class="border border-gray-300 px-2 py-4 text-center">
                <div
                  v-if="item.can_reheat"
                  class="flex items-center justify-center gap-1"
                >
                  <div
                    class="w-12 h-12 rounded-full flex items-center justify-center"
                  >
                    <img
                      src="/assets/images/icons/clock.png"
                      alt="Reheat time"
                      class="w-8 h-8"
                    />
                  </div>
                  <div class="text-xs">
                    {{ item.reheat_time_min || 5 }} -
                    {{ item.reheat_time_max || 7 }} min
                  </div>
                </div>
                <div v-else class="text-gray-400">-</div>
              </td>

              <!-- Storage Method -->
              <td class="border border-gray-300 px-2 py-4 text-center">
                <div class="flex justify-center gap-1 flex-nowrap px-2">
                  <!-- Cold Storage Icon -->
                  <div
                    v-if="hasStorageMethod(item, 'store_in_refrigerator')"
                    class="w-8 h-8 rounded flex items-center justify-center"
                    title="Cold Storage"
                  >
                    <img
                      src="/assets/images/icons/fridge.png"
                      alt="Cold storage"
                      class="w-8 h-8"
                    />
                  </div>
                  <!-- Cold Temperature Icon -->
                  <div
                    v-if="hasStorageMethod(item, 'store_at_cold_temperature')"
                    class="w-8 h-8 rounded flex items-center justify-center"
                    title="Cool Temperature"
                  >
                    <img
                      src="/assets/images/icons/temperature.png"
                      alt="Cool temperature"
                      class="w-8 h-8"
                    />
                  </div>
                  <!-- Box Storage Icon -->
                  <div
                    v-if="hasStorageMethod(item, 'store_in_box')"
                    class="w-8 h-8 rounded flex items-center justify-center"
                    title="Store in Box"
                  >
                    <img
                      src="/assets/images/icons/lunch-box.png"
                      alt="Store in box"
                      class="w-8 h-8"
                    />
                  </div>
                  <!-- Airtight Storage Icon -->
                  <div
                    v-if="hasStorageMethod(item, 'keep_airtight')"
                    class="w-8 h-8 rounded flex items-center justify-center"
                    title="Keep Airtight"
                  >
                    <img
                      src="/assets/images/icons/air-sensitive.png"
                      alt="Keep airtight"
                      class="w-8 h-8"
                    />
                  </div>
                  <!-- Cake Display Case Storage -->
                  <div
                    v-if="hasStorageMethod(item, 'store_in_cake_display_case')"
                    class="w-8 h-8 rounded flex items-center justify-center"
                    title="Store in Cake Display Case"
                  >
                    <img
                      src="/assets/images/icons/cake-case.jpg"
                      alt="Store in cake display case"
                      class="w-8 h-8"
                    />
                  </div>
                </div>
              </td>

              <!-- Display Method -->
              <td class="border border-gray-300 px-2 py-4 text-center">
                <div class="flex justify-center gap-1 flex-nowrap px-2">
                  <!-- Bakery Display Case -->
                  <div
                    v-if="
                      hasDisplayMethod(item, 'arrange_in_bakery_display_case')
                    "
                    class="w-8 h-8 rounded flex items-center justify-center"
                    title="Bakery Display Case"
                  >
                    <img
                      src="/assets/images/icons/bakery-case.jpg"
                      alt="Bakery display case"
                      class="w-8 h-8"
                    />
                  </div>
                  <!-- Cake Display Case -->
                  <div
                    v-if="
                      hasDisplayMethod(item, 'arrange_in_cake_display_case')
                    "
                    class="w-8 h-8 rounded flex items-center justify-center"
                    title="Cake Display Case"
                  >
                    <img
                      src="/assets/images/icons/cake-case.jpg"
                      alt="Cake display case"
                      class="w-8 h-8"
                    />
                  </div>
                  <!-- Glass Dome -->
                  <div
                    v-if="hasDisplayMethod(item, 'arrange_in_glass_dome')"
                    class="w-8 h-8 rounded flex items-center justify-center"
                    title="Glass Dome"
                  >
                    <img
                      src="/assets/images/icons/cover.png"
                      alt="Glass dome"
                      class="w-8 h-8"
                    />
                  </div>
                </div>
              </td>

              <!-- Precautions -->
              <td class="border border-gray-300 px-2 py-4 text-center">
                <div class="flex justify-center gap-1 flex-nowrap px-2">
                  <!-- General Warning -->
                  <div
                    class="w-8 h-8 rounded flex items-center justify-center"
                    title="Handle with Care"
                  >
                    <img
                      src="/assets/images/icons/warning.png"
                      alt="Handle with care"
                      class="w-8 h-8"
                    />
                  </div>
                  <!-- Avoid Moisture -->
                  <div
                    v-if="item.avoid_moisture"
                    class="w-8 h-8 rounded flex items-center justify-center"
                    title="Avoid Moisture"
                  >
                    <img
                      src="/assets/images/icons/drop.png"
                      alt="Avoid moisture"
                      class="w-8 h-8"
                    />
                  </div>
                  <!-- Avoid Sunlight -->
                  <div
                    v-if="item.avoid_sunlight"
                    class="w-8 h-8 rounded flex items-center justify-center"
                    title="Avoid Sunlight"
                  >
                    <img
                      src="/assets/images/icons/sun.png"
                      alt="Avoid sunlight"
                      class="w-8 h-8"
                    />
                  </div>
                  <!-- Temperature Sensitive -->
                  <div
                    v-if="item.temperature_sensitive"
                    class="w-8 h-8 rounded flex items-center justify-center"
                    title="Temperature Sensitive"
                  >
                    <img
                      src="/assets/images/icons/humidity-sensor.png"
                      alt="Temperature sensitive"
                      class="w-8 h-8"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Icon Legend -->
      <div
        v-if="!loading && filteredItems.length > 0"
        class="mt-8 border-t pt-6"
      >
        <h3 class="text-lg font-bold text-gray-800 mb-4 text-center">
          {{ t('manual.legend.title') }}
        </h3>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <!-- Reheating Icons -->
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-700">
              {{ t('manual.legend.reheat.title') }}
            </h4>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/oven.png"
                  alt="Can reheat"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.reheat.canReheat') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/no-heat.png"
                  alt="Cannot reheat"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.reheat.cannotReheat') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <img
                  src="/assets/images/icons/clock.png"
                  alt="Reheat time"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.reheat.reheatTime') }}</span>
            </div>
          </div>

          <!-- Storage Icons -->
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-700">{{ t('manual.legend.storage.title') }}</h4>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/fridge.png"
                  alt="Store in refrigerator"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.storage.refrigerator') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/temperature.png"
                  alt="Store at cold temperature"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.storage.coldTemperature') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/lunch-box.png"
                  alt="Store in box"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.storage.storeInBox') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/air-sensitive.png"
                  alt="Keep airtight"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.storage.keepAirtight') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/cake-case.jpg"
                  alt="Store in cake display case"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.storage.cakeDisplayCase') }}</span>
            </div>
          </div>

          <!-- Display Icons -->
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-700">{{ t('manual.legend.display.title') }}</h4>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/bakery-case.jpg"
                  alt="Arrange in bakery display case"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.display.bakeryCase') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/cake-case.jpg"
                  alt="Arrange in cake display case"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.display.cakeCase') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/cover.png"
                  alt="Arrange in glass dome"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.display.glassDome') }}</span>
            </div>
          </div>

          <!-- Precaution Icons -->
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-700">
              {{ t('manual.legend.precautions.title') }}
            </h4>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/drop.png"
                  alt="Avoid moisture"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.precautions.avoidMoisture') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/sun.png"
                  alt="Avoid sunlight"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.precautions.avoidSunlight') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/humidity-sensor.png"
                  alt="Temperature sensitive"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.precautions.temperatureSensitive') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img
                  src="/assets/images/icons/warning.png"
                  alt="Handle with care"
                  class="w-8 h-8"
                />
              </div>
              <span>{{ t('manual.legend.precautions.handleWithCare') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Advanced Pagination -->
      <div v-if="filteredItems.length > 0 && !loading" class="mt-12">
        <!-- Main Pagination with Items Per Page -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <!-- Pagination Info Display -->
          <div class="text-sm text-gray-600">
            {{ t('manual.pagination.showing', { start: startItem, end: endItem, total: filteredItems.length }) }}
          </div>

          <!-- Pagination Controls -->
          <div class="flex items-center space-x-2">
            <!-- First Page -->
            <button
              @click="goToFirstPage"
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
              @click="prevPage"
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
                @click="goToPage(page)"
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
              @click="nextPage"
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
              @click="goToLastPage"
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
            <span class="text-sm text-gray-600">{{ t('manual.pagination.itemsPerPage') }}</span>
            <select
              v-model="itemsPerPage"
              @change="changeItemsPerPage(itemsPerPage)"
              class="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-red-800 focus:border-red-800"
            >
              <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { describeError } from "../../../shared-configs/error-utils.js"

// Translation composable
const { t, locale: currentLocale } = useTranslation()

// Client-only Firebase initialization.
// Errors propagate to fetchData so the page can show them instead of
// silently rendering an empty "no items found" table.
const getProductsByCakeAndBakeryTypes = async () => {
  // Only fetch on client side
  if (!import.meta.client) {
    return [];
  }

  const { getProductsByCakeAndBakeryTypes: fetchProducts } = useProducts();
  return await fetchProducts();
};

function capitalizeFirst(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// State
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const selectedType = ref("");

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);
const itemsPerPageOptions = [10, 20, 50];

// Data
const bakeryItems = ref([]);

// Fetch data
const fetchData = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Get both cake and bakery type products
    const products = await getProductsByCakeAndBakeryTypes();
    bakeryItems.value = products || [];
  } catch (err) {
    console.error("Error fetching bakery items:", err);
    console.error("Error code:", err.code);
    error.value = `${t('products.loadFailed')}: ${describeError(err)}`;
    bakeryItems.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed properties
const bakeryTypeNames = computed(() => {
  const types = new Set();
  bakeryItems.value.forEach((item) => {
    if (item.type) types.add(item.type);
  });
  return Array.from(types).sort();
});

const filteredItems = computed(() => {
  let items = bakeryItems.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter(
      (item) =>
        item.name?.toLowerCase().includes(query) ||
        item.type?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
    );
  }

  // Filter by type
  if (selectedType.value) {
    if (selectedType.value === "cake") {
      items = items.filter((item) => item.type?.toLowerCase() === "cake");
    } else {
      items = items.filter((item) => item.type === selectedType.value);
    }
  }

  return items;
});

// Pagination computed properties
const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage.value);
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredItems.value.slice(start, end);
});

// Computed for pagination display info
const startItem = computed(() => {
  return filteredItems.value.length > 0 ? (currentPage.value - 1) * itemsPerPage.value + 1 : 0;
});

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return Math.min(end, filteredItems.value.length);
});

// Generate visible page numbers for pagination
const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2;

  let start = Math.max(1, current - delta);
  let end = Math.min(total, current + delta);

  if (current <= delta) {
    end = Math.min(total, 2 * delta + 1);
  }
  if (current + delta >= total) {
    start = Math.max(1, total - 2 * delta);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Methods
const clearFilter = () => {
  searchQuery.value = "";
  selectedType.value = "";
  currentPage.value = 1;
};

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const goToFirstPage = () => {
  currentPage.value = 1;
};

const goToLastPage = () => {
  currentPage.value = totalPages.value;
};

const changeItemsPerPage = (newItemsPerPage) => {
  itemsPerPage.value = newItemsPerPage;
  currentPage.value = 1;
};

// Helper function to get default bakery image
const getDefaultBakeryImage = () => {
  return "/assets/images/default-bakery.jpg";
};

// Helper function to generate fallback image based on product type
const generateFallbackImage = (item) => {
  if (!item) return getDefaultBakeryImage();

  const itemType = item.type?.toLowerCase() || "";
  const itemName = item.name?.toLowerCase() || "";

  // Try to match with specific bakery item types
  if (itemType.includes("cake") || itemName.includes("cake")) {
    return "/assets/images/fallback-cake.jpg";
  } else if (itemType.includes("bread") || itemName.includes("bread")) {
    return "/assets/images/fallback-bread.jpg";
  } else if (itemType.includes("pastry") || itemName.includes("pastry")) {
    return "/assets/images/fallback-pastry.jpg";
  } else if (itemType.includes("cookie") || itemName.includes("cookie")) {
    return "/assets/images/fallback-cookie.jpg";
  }

  // Default fallback
  return getDefaultBakeryImage();
};

// Helper function to check if item has specific storage method
const hasStorageMethod = (item, method) => {
  if (!item || !item.storage_methods || !Array.isArray(item.storage_methods))
    return false;
  return item.storage_methods.includes(method);
};

// Helper function to check if item has specific display method
const hasDisplayMethod = (item, method) => {
  if (!item || !item.display_methods || !Array.isArray(item.display_methods))
    return false;
  return item.display_methods.includes(method);
};

// Enhanced function that always returns an image (never null)
const getProductImageWithFallback = (item) => {
  if (!item) return getDefaultBakeryImage();

  // First try the main imageUrl
  if (item.imageUrl && item.imageUrl.trim()) {
    return item.imageUrl;
  }

  // Try images array if available
  if (item.images && Array.isArray(item.images) && item.images.length > 0) {
    const validImage = item.images.find((img) => img && img.trim());
    if (validImage) return validImage;
  }

  // Generate specific fallback image from local assets based on product type and name
  return generateFallbackImage(item);
};

// Handle image error by trying fallback
const handleImageError = (event, item) => {
  const img = event.target;

  // If the current image fails and it's not already the default, try the default bakery image
  if (!img.src.includes("default-bakery.jpg")) {
    img.src = getDefaultBakeryImage();
  } else {
    // If even the default fails, hide the image container and show a text placeholder
    img.style.display = "none";
    const container = img.parentElement;
    if (container && !container.querySelector(".text-placeholder")) {
      const placeholder = document.createElement("div");
      placeholder.className =
        "text-placeholder w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500";
      placeholder.textContent = item.name?.substring(0, 8) || "Bakery";
      container.appendChild(placeholder);
    }
  }
};

// Watch for search changes and reset pagination
watch([searchQuery, selectedType], () => {
  currentPage.value = 1;
});

// Load data on mount (client-side only)
onMounted(() => {
  if (import.meta.client) {
    fetchData();
  }
});

// SEO
useHead({
  title: "Product Manual - BakeryHouse | Complete Product Guide",
  meta: [
    {
      name: "description",
      content:
        "Comprehensive manual with detailed information about all our bakery products including storage, reheating instructions, and specifications.",
    },
  ],
});
</script>

<style scoped>
/* PDF-Style Manual Layout */
table {
  border-collapse: collapse;
  font-family: "Noto Sans Lao", "Arial", sans-serif;
}

/* Header styling matching PDF */
th {
  background-color: #dc2626 !important;
  color: white !important;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #6b7280;
  padding: 8px 4px;
  font-size: 11px;
  line-height: 1.2;
}

/* Cell styling */
td {
  border: 1px solid #6b7280;
  padding: 8px 4px;
  vertical-align: middle;
  text-align: center;
  font-size: 12px;
}

/* Row number column */
td:first-child {
  font-weight: bold;
  background-color: #f9fafb;
}

/* Product name column - left aligned */
td:nth-child(2) {
  text-align: left;
  font-weight: 500;
}

/* Icon containers */
.icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  font-size: 14px;
}

/* Responsive table */
@media (max-width: 1024px) {
  table {
    font-size: 10px;
  }

  th,
  td {
    padding: 6px 2px;
  }

  .icon-container {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  table {
    font-size: 9px;
  }

  th,
  td {
    padding: 4px 1px;
  }

  .icon-container {
    width: 18px;
    height: 18px;
    font-size: 10px;
  }
}

/* Print styles */
@media print {
  .max-w-7xl {
    max-width: none;
  }

  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Ensure header backgrounds print */
  th {
    background-color: #dc2626 !important;
    color: white !important;
  }

  /* Hide search and pagination when printing */
  .no-print {
    display: none !important;
  }

  /* Page breaks */
  table {
    page-break-inside: auto;
  }

  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }

  thead {
    display: table-header-group;
  }
}

/* Button styles */
button {
  /* No transitions */
}

/* Logo styling */
h1 {
  font-family: "Brush Script MT", "cursive", "Arial", sans-serif;
}

/* Legend grid responsive */
.grid {
  display: grid;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
