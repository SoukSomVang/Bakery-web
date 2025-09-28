<template>
  <div class="min-h-screen bg-white">
    <!-- PDF-Style Header -->
    <div class="bg-white border-b-2 border-gray-200 print:border-black">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <!-- Manual Title -->
        <div class="text-center mb-6">
          <h2 class="text-lg">Product Manual & Guidelines</h2>
        </div>

        <!-- Search Controls (minimal design) -->
        <div class="flex justify-center mb-4">
          <div class="flex gap-4 items-center">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ຄົ້ນຫາສິນຄ້າ / Search products..."
              class="px-4 py-2 border border-gray-300 rounded text-sm w-64 focus:ring-2 focus:ring-red-800 focus:border-red-800"
            />
            <select v-model="selectedType" class="px-4 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-800 focus:border-red-800">
              <option value="">All Types</option>
              <option v-for="typeName in bakeryTypeNames" :key="typeName" :value="typeName">{{ typeName }}</option>
            </select>
            <button @click="clearFilter" class="px-4 py-2 bg-red-800 text-white rounded text-sm hover:bg-red-700">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-6">
      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
        {{ error }}
      </div>

      <!-- No Items Message -->
      <div v-if="!loading && filteredItems.length === 0" class="text-center py-12">
        <div class="text-gray-500 text-lg">No items found</div>
      </div>

      <!-- PDF-Style Table -->
      <div v-else-if="!loading && filteredItems.length > 0" class="bg-white border-2 border-gray-300">
        <table class="w-full text-sm border-collapse">
          <!-- Table Header -->
          <thead>
            <tr class="bg-red-800 text-white">
              <th class="border border-gray-300 px-2 py-3 text-center text-xs font-bold">ລຳດັບ<br>NO.</th>
              <th class="border border-gray-300 px-2 py-3 text-center text-xs font-bold">ລາຍການ<br>ITEMS</th>
              <th class="border border-gray-300 px-2 py-3 text-center text-xs font-bold">ຮູບສິນຄ້າ<br>IMAGE</th>
              <th class="border border-gray-300 px-2 py-3 text-center text-xs font-bold">ອາຍຸການເກັບ<br>SHELF LIFE</th>
              <th class="border border-gray-300 px-2 py-3 text-center text-xs font-bold">ສາມາດອຸ່ນໃຫ້ລູກຄ້າ<br>REHEAT FOR CUSTOMER</th>
              <th class="border border-gray-300 px-2 py-3 text-center text-xs font-bold">ເວລາໃນການອຸ່ນ<br>REHEAT TIME</th>
              <th class="border border-gray-300 px-2 py-3 text-center text-xs font-bold">ການຈັດເກັບເວລາປິດຮ້ານ<br>STORAGE AFTER CLOSING</th>
              <th class="border border-gray-300 px-2 py-3 text-center text-xs font-bold">ການຈັດວາງຂາຍ<br>DISPLAY METHOD</th>
              <th class="border border-gray-300 px-2 py-3 text-center text-xs font-bold">ຂໍ້ຄວນລະວັງ<br>PRECAUTIONS</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody>
            <tr v-for="(item, index) in paginatedItems" :key="item.id" class="border-b border-gray-300 hover:bg-gray-50">
              <!-- Row Number -->
              <td class="border border-gray-300 px-2 py-4 text-center font-bold">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>

              <!-- Item Name -->
              <td class="border border-gray-300 px-3 py-4">
                <div class="font-medium text-gray-900">{{ item.name }}</div>
              </td>

              <!-- Image -->
              <td class="border border-gray-300 px-2 py-4 text-center">
                <div class="w-16 h-16 mx-auto">
                  <img
                    :src="getProductImageWithFallback(item)"
                    :alt="item.name"
                    class="w-full h-full object-cover rounded-lg shadow-sm"
                    @error="handleImageError($event, item)"
                    loading="lazy"
                  />
                </div>
              </td>

              <!-- Shelf Life -->
              <td class="border border-gray-300 px-2 py-4 text-center">
                <div class="font-bold text-lg">{{ item.shelf_life_days || 7 }}</div>
                <div class="text-xs text-gray-600">days</div>
              </td>

              <!-- Can Reheat -->
              <td class="border border-gray-300 px-2 py-4 text-center">
                <div class="flex justify-center mb-2">
                  <div v-if="item.can_reheat" class="w-12 h-12 rounded flex items-center justify-center">
                    <img src="/assets/images/icons/oven.png" alt="Can reheat" class="w-8 h-8" />
                  </div>
                  <div v-else class="w-12 h-12 rounded flex items-center justify-center">
                    <img src="/assets/images/icons/no-heat.png" alt="Cannot reheat" class="w-8 h-8" />
                  </div>
                </div>
                <div v-if="item.can_reheat && item.reheat_temperature" class="text-xs">
                  {{ item.reheat_temperature }}°C
                </div>
              </td>

              <!-- Reheat Time -->
              <td class="border border-gray-300 px-2 py-4 text-center">
                <div v-if="item.can_reheat" class="flex items-center justify-center gap-1">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center">
                    <img src="/assets/images/icons/clock.png" alt="Reheat time" class="w-8 h-8" />
                  </div>
                  <div class="text-xs">
                    {{ item.reheat_time_min || 5 }} - {{ item.reheat_time_max || 7 }} min
                  </div>
                </div>
                <div v-else class="text-gray-400">-</div>
              </td>

              <!-- Storage Method -->
              <td class="border border-gray-300 px-2 py-4 text-center">
                <div class="flex justify-center gap-1 flex-wrap">
                  <!-- Cold Storage Icon -->
                  <div v-if="needsColdStorage(item)" class="w-8 h-8 rounded flex items-center justify-center" title="Cold Storage">
                    <img src="/assets/images/icons/fridge.png" alt="Cold storage" class="w-8 h-8" />
                  </div>
                  <!-- Room Temperature Icon -->
                  <div v-else class="w-8 h-8 rounded flex items-center justify-center" title="Room Temperature">
                    <img src="/assets/images/icons/room-temp.png" alt="Room temperature" class="w-8 h-8" />
                  </div>
                  <!-- Box Storage Icon -->
                  <div class="w-8 h-8 rounded flex items-center justify-center" title="Store in Box">
                    <img src="/assets/images/icons/package.png" alt="Store in box" class="w-8 h-8" />
                  </div>
                </div>
              </td>

              <!-- Display Method -->
              <td class="border border-gray-300 px-2 py-4 text-center">
                <div class="flex justify-center gap-1 flex-wrap">
                  <!-- Bakery Counter -->
                  <div class="w-8 h-8 rounded flex items-center justify-center" title="Bakery Counter">
                    <img src="/assets/images/icons/croissant.png" alt="Bakery counter" class="w-8 h-8" />
                  </div>
                  <!-- Cake Display -->
                  <div v-if="item.type?.toLowerCase().includes('cake') || item.name?.toLowerCase().includes('cake')" class="w-8 h-8 rounded flex items-center justify-center" title="Cake Display">
                    <img src="/assets/images/icons/cake-stand.png" alt="Cake display" class="w-8 h-8" />
                  </div>
                  <!-- Glass Case -->
                  <div class="w-8 h-8 rounded flex items-center justify-center" title="Glass Case">
                    <img src="/assets/images/icons/display-case.png" alt="Glass case" class="w-8 h-8" />
                  </div>
                </div>
              </td>

              <!-- Precautions -->
              <td class="border border-gray-300 px-2 py-4 text-center">
                <div class="flex justify-center gap-1 flex-wrap">
                  <!-- Avoid Moisture -->
                  <div v-if="item.avoid_moisture" class="w-8 h-8 rounded flex items-center justify-center" title="Avoid Moisture">
                    <img src="/assets/images/icons/water-drop.png" alt="Avoid moisture" class="w-8 h-8" />
                  </div>
                  <!-- Avoid Sunlight -->
                  <div v-if="item.avoid_sunlight" class="w-8 h-8 rounded flex items-center justify-center" title="Avoid Sunlight">
                    <img src="/assets/images/icons/sun.png" alt="Avoid sunlight" class="w-8 h-8" />
                  </div>
                  <!-- Temperature Sensitive -->
                  <div v-if="item.temperature_sensitive" class="w-8 h-8 rounded flex items-center justify-center" title="Temperature Sensitive">
                    <img src="/assets/images/icons/thermometer-alert.png" alt="Temperature sensitive" class="w-8 h-8" />
                  </div>
                  <!-- General Warning -->
                  <div class="w-8 h-8 rounded flex items-center justify-center" title="Handle with Care">
                    <img src="/assets/images/icons/alert.png" alt="Handle with care" class="w-8 h-8" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Icon Legend -->
      <div v-if="!loading && filteredItems.length > 0" class="mt-8 border-t pt-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4 text-center">ຄຳອະທິບາຍສັນຍາລັກ / Icon Legend</h3>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <!-- Reheating Icons -->
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-700">ສາມາດອຸ່ນໃຫ້ລູກຄ້າ / Can Reheat:</h4>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img src="/assets/images/icons/oven.png" alt="Can reheat" class="w-8 h-8" />
              </div>
              <span>ສາມາດອຸ່ນໄດ້ / Can reheat</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img src="/assets/images/icons/no-heat.png" alt="Cannot reheat" class="w-8 h-8" />
              </div>
              <span>ບໍ່ສາມາດອຸ່ນ / Cannot reheat</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <img src="/assets/images/icons/clock.png" alt="Reheat time" class="w-8 h-8" />
              </div>
              <span>ເວລາໃນການອຸ່ນ / Reheat time</span>
            </div>
          </div>

          <!-- Storage Icons -->
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-700">ການຈັດເກັບ / Storage:</h4>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img src="/assets/images/icons/fridge.png" alt="Cold storage" class="w-8 h-8" />
              </div>
              <span>ເກັບໃນຕູ້ເຢັນ / Cold storage</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img src="/assets/images/icons/room-temp.png" alt="Room temperature" class="w-8 h-8" />
              </div>
              <span>ອຸນຫະພູມປົກກະຕິ / Room temperature</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img src="/assets/images/icons/package.png" alt="Store in box" class="w-8 h-8" />
              </div>
              <span>ເກັບເຂົ້າກ່ອງ / Store in box</span>
            </div>
          </div>

          <!-- Display Icons -->
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-700">ການຈັດວາງ / Display:</h4>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img src="/assets/images/icons/croissant.png" alt="Bakery counter" class="w-8 h-8" />
              </div>
              <span>ຕູ້ເບເກີຣີ / Bakery counter</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img src="/assets/images/icons/cake-stand.png" alt="Cake display" class="w-8 h-8" />
              </div>
              <span>ຕູ້ເຄັກ / Cake display</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img src="/assets/images/icons/display-case.png" alt="Glass case" class="w-8 h-8" />
              </div>
              <span>ໂຄມແກ້ວ / Glass case</span>
            </div>
          </div>

          <!-- Precaution Icons -->
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-700">ຂໍ້ຄວນລະວັງ / Precautions:</h4>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img src="/assets/images/icons/water-drop.png" alt="Avoid moisture" class="w-8 h-8" />
              </div>
              <span>ບໍ່ໃຫ້ຖືກນ້ຳ / Avoid moisture</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img src="/assets/images/icons/sun.png" alt="Avoid sunlight" class="w-8 h-8" />
              </div>
              <span>ບໍ່ໃຫ້ຖືກແສງແດດ / Avoid sunlight</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img src="/assets/images/icons/thermometer-alert.png" alt="Temperature sensitive" class="w-8 h-8" />
              </div>
              <span>ຄວນລະວັງອຸນຫະພູມ / Temperature sensitive</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded flex items-center justify-center">
                <img src="/assets/images/icons/alert.png" alt="Handle with care" class="w-8 h-8" />
              </div>
              <span>ລະວັງ / Handle with care</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Simple Pagination -->
      <div v-if="!loading && filteredItems.length > 0" class="mt-8 flex justify-center">
        <div class="flex items-center gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          <span class="px-3 py-1 text-sm text-gray-600">
            Page {{ currentPage }} of {{ totalPages }} ({{ filteredItems.length }} items)
          </span>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getProductsByCakeAndBakeryTypes } = useProducts();

// State
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const selectedType = ref('');

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

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
    console.error('Error fetching bakery items:', err);
    error.value = `Failed to load products: ${err.message}`;
    bakeryItems.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed properties
const bakeryTypeNames = computed(() => {
  const types = new Set();
  bakeryItems.value.forEach(item => {
    if (item.type) types.add(item.type);
  });
  return Array.from(types).sort();
});

const filteredItems = computed(() => {
  let items = bakeryItems.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter(item =>
      item.name?.toLowerCase().includes(query) ||
      item.type?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    );
  }

  // Filter by type
  if (selectedType.value) {
    if (selectedType.value === 'cake') {
      items = items.filter(item => item.type?.toLowerCase() === 'cake');
    } else {
      items = items.filter(item => item.type === selectedType.value);
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


// Methods
const clearFilter = () => {
  searchQuery.value = '';
  selectedType.value = '';
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



// Helper function to determine if item needs cold storage
const needsColdStorage = (item) => {
  if (!item) return false;

  // Check if it's a cake or requires cold storage
  const itemType = item.type?.toLowerCase() || '';
  const itemName = item.name?.toLowerCase() || '';

  return itemType.includes('cake') ||
         itemType.includes('cream') ||
         itemName.includes('cake') ||
         itemName.includes('cream') ||
         itemName.includes('mousse') ||
         item.storage_methods?.some(method =>
           method.toLowerCase().includes('cold') ||
           method.toLowerCase().includes('refrigerat') ||
           method.toLowerCase().includes('fridge')
         );
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
    const validImage = item.images.find(img => img && img.trim());
    if (validImage) return validImage;
  }

  // Generate specific fallback image from local assets based on product type and name
  return generateFallbackImage(item);
};

// Get default bakery image for any fallback
const getDefaultBakeryImage = () => {
  return '/assets/images/products/default-bakery.jpg';
};

// Generate fallback image from local assets
const generateFallbackImage = (item) => {
  if (!item) return getDefaultBakeryImage();

  const itemType = item.type?.toLowerCase() || '';
  const itemName = item.name?.toLowerCase() || '';

  // Use local asset images for better performance and consistency
  const imageMap = {
    // Croissants
    'butter croissant': '/assets/images/products/butter-croissant.jpg',
    'ham cheese croissant': '/assets/images/products/ham-cheese-croissant.jpg',
    'almond croissant': '/assets/images/products/almond-croissant.jpg',
    'croissant': '/assets/images/products/croissant-default.jpg',

    // Cakes
    'chocolate cake': '/assets/images/products/chocolate-cake.jpg',
    'chocolate': '/assets/images/products/chocolate-cake.jpg',
    'red velvet': '/assets/images/products/red-velvet-cake.jpg',
    'cheesecake': '/assets/images/products/cheesecake.jpg',
    'cheese cake': '/assets/images/products/cheesecake.jpg',
    'carrot cake': '/assets/images/products/carrot-cake.jpg',

    // Cookies
    'cookie': '/assets/images/products/cookie.jpg',
    'matcha cookie': '/assets/images/products/matcha-cookie.jpg',
    'matcha': '/assets/images/products/matcha-cookie.jpg',

    // Pastries
    'choux cream': '/assets/images/products/choux-cream.jpg',
    'choux': '/assets/images/products/choux-cream.jpg',
    'custard': '/assets/images/products/choux-cream.jpg',
    'egg tart': '/assets/images/products/tart-default.jpg',
    'tart': '/assets/images/products/tart-default.jpg',
    'mousse': '/assets/images/products/chocolate-cake.jpg',

    // Pies
    'coconut pie': '/assets/images/products/coconut-pie.jpg',
    'pie': '/assets/images/products/coconut-pie.jpg',

    // Default categories
    'cake': '/assets/images/products/chocolate-cake.jpg',
    'pastry': '/assets/images/products/pastry.jpg',
    'bread': '/assets/images/products/bread.jpg'
  };

  // Try to match specific product names first
  for (const [key, url] of Object.entries(imageMap)) {
    if (itemName.includes(key.toLowerCase())) {
      return url;
    }
  }

  // Try type matching
  if (itemType.includes('cake') || itemName.includes('cake')) {
    return imageMap['cake'];
  } else if (itemType.includes('cookie') || itemName.includes('cookie')) {
    return imageMap['cookie'];
  } else if (itemType.includes('bread') || itemName.includes('bread')) {
    return imageMap['bread'];
  } else if (itemType.includes('pastry') || itemName.includes('pastry')) {
    return imageMap['pastry'];
  } else if (itemType.includes('croissant') || itemName.includes('croissant')) {
    return imageMap['croissant'];
  }

  // Default fallback
  return getDefaultBakeryImage();
};

// Handle image error by trying fallback
const handleImageError = (event, item) => {
  const img = event.target;

  // If the current image fails and it's not already the default, try the default bakery image
  if (!img.src.includes('default-bakery.jpg')) {
    img.src = getDefaultBakeryImage();
  } else {
    // If even the default fails, hide the image container and show a text placeholder
    img.style.display = 'none';
    const container = img.parentElement;
    if (container && !container.querySelector('.text-placeholder')) {
      const placeholder = document.createElement('div');
      placeholder.className = 'text-placeholder w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500';
      placeholder.textContent = item.name?.substring(0, 8) || 'Bakery';
      container.appendChild(placeholder);
    }
  }
};

// Watch for search changes and reset pagination
watch([searchQuery, selectedType], () => {
  currentPage.value = 1;
});

// Load data on mount
onMounted(() => {
  fetchData();
});

// SEO
useHead({
  title: 'Product Manual - Bakery House | Complete Product Guide',
  meta: [
    {
      name: 'description',
      content: 'Comprehensive manual with detailed information about all our bakery products including storage, reheating instructions, and specifications.'
    }
  ]
});
</script>

<style scoped>
/* PDF-Style Manual Layout */
table {
  border-collapse: collapse;
  font-family: 'Arial', sans-serif;
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

  th, td {
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

  th, td {
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

/* Button transitions */
button {
  transition: all 0.2s ease;
}

/* Logo styling */
h1 {
  font-family: 'Brush Script MT', 'cursive', 'Arial', sans-serif;
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