<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div class="mb-8">
        <h2 class="text-2xl font-bold">Bakery Admin</h2>
      </div>

      <nav class="space-y-2">
        <NuxtLink
          to="/"
          class="nav-link"
          :class="{ active: $route.path === '/' }"
        >
          <i class="mdi mdi-view-dashboard w-5 h-5"></i>
          Dashboard
        </NuxtLink>

        <NuxtLink
          to="/bakery-items"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/bakery-items') }"
        >
          <i class="mdi mdi-food-croissant w-5 h-5"></i>
          Bakery Items
        </NuxtLink>

        <!-- <NuxtLink
          to="/storage"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/storage') }"
        >
          <i class="mdi mdi-database w-5 h-5"></i>
          Storage Data
        </NuxtLink> -->

        <NuxtLink
          to="/branches"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/branches') }"
        >
          <i class="mdi mdi-source-branch w-5 h-5"></i>
          Branches
        </NuxtLink>

        <!-- <NuxtLink
          to="/bakeries"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/bakeries') }"
        >
          <i class="mdi mdi-store w-5 h-5"></i>
          Bakeries
        </NuxtLink> -->

        <NuxtLink
          to="/bakery-types"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/bakery-types') }"
        >
          <i class="mdi mdi-tag w-5 h-5"></i>
          Bakery Types
        </NuxtLink>

        <NuxtLink
          to="/news"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/news') }"
        >
          <i class="mdi mdi-newspaper w-5 h-5"></i>
          News
        </NuxtLink>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Main Page Content -->
      <main class="flex-1">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
// Meta tags for admin panel
useSeoMeta({
  title: "Bakery Admin Panel",
  ogTitle: "Bakery Admin Panel",
  description:
    "Admin panel for managing bakery items, storage data, and branches.",
  ogDescription:
    "Admin panel for managing bakery items, storage data, and branches.",
});

// Add MDI CSS and admin icon styles
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css'
    }
  ]
});
</script>

<style scoped>
.nav-link {
  @apply flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors;
}

.nav-link.active {
  @apply bg-blue-600 hover:bg-blue-700;
}
</style>
