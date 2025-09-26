<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
    <p class="mt-4 text-gray-700">Welcome to the bakery admin panel!</p>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-6 rounded-lg shadow border">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-full">
            <i class="mdi mdi-store w-6 h-6 text-blue-600"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-800">Bakeries</h3>
            <p class="text-2xl font-bold text-blue-600">
              {{ bakeryStore.bakeries.length }}
            </p>
          </div>
        </div>
        <NuxtLink
          to="/bakeries"
          class="text-sm text-blue-600 hover:underline mt-2 inline-block"
          >Manage</NuxtLink
        >
      </div>

      <div class="bg-white p-6 rounded-lg shadow border">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-full">
            <i class="mdi mdi-package-variant w-6 h-6 text-green-600"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-800">Items</h3>
            <p class="text-2xl font-bold text-green-600">
              {{ bakeryStore.bakeryItems.length }}
            </p>
          </div>
        </div>
        <NuxtLink
          to="/bakery-items"
          class="text-sm text-green-600 hover:underline mt-2 inline-block"
          >Manage</NuxtLink
        >
      </div>

      <div class="bg-white p-6 rounded-lg shadow border">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-full">
            <i class="mdi mdi-office-building w-6 h-6 text-purple-600"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-800">Branches</h3>
            <p class="text-2xl font-bold text-purple-600">
              {{ bakeryStore.branches.length }}
            </p>
          </div>
        </div>
        <NuxtLink
          to="/branches"
          class="text-sm text-purple-600 hover:underline mt-2 inline-block"
          >Manage</NuxtLink
        >
      </div>

      <div class="bg-white p-6 rounded-lg shadow border">
        <div class="flex items-center">
          <div class="p-2 bg-orange-100 rounded-full">
            <i class="mdi mdi-tag w-6 h-6 text-orange-600"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-800">Types</h3>
            <p class="text-2xl font-bold text-orange-600">
              {{ bakeryStore.bakeryTypes.length }}
            </p>
          </div>
        </div>
        <NuxtLink
          to="/bakery-types"
          class="text-sm text-orange-600 hover:underline mt-2 inline-block"
          >Manage</NuxtLink
        >
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
      <div class="flex flex-wrap gap-4">
        <NuxtLink
          to="/bakeries/create"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <i class="mdi mdi-plus"></i>
          <p>Add Bakery</p>
        </NuxtLink>
        <NuxtLink
          to="/bakery-items/create"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <i class="mdi mdi-plus"></i>
          <p>Add Item</p>
        </NuxtLink>
        <NuxtLink
          to="/branches/create"
          class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <i class="mdi mdi-plus"></i>
          <p>Add Branch</p>
        </NuxtLink>
        <NuxtLink
          to="/bakery-types"
          class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors flex items-center gap-2"
        >
          <i class="mdi mdi-plus"></i>
          <p>Add Type</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const bakeryStore = useBakeryStore();

// Load all data on component mount
onMounted(async () => {
  try {
    await Promise.all([
      bakeryStore.fetchBakeries(),
      bakeryStore.fetchBakeryItems(),
      bakeryStore.fetchBranches(),
      bakeryStore.fetchBakeryTypes(),
    ]);
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
  }
});

// Meta tags
useSeoMeta({
  title: "Dashboard - Admin Panel",
  description: "Bakery admin dashboard with overview statistics",
});
</script>
