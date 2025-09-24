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
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            ></path>
          </svg>
          Dashboard
        </NuxtLink>

        <NuxtLink
          to="/bakery-items"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/bakery-items') }"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
            ></path>
          </svg>
          Bakery Items
        </NuxtLink>

        <NuxtLink
          to="/storage"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/storage') }"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
            <path
              fill-rule="evenodd"
              d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Storage Data
        </NuxtLink>

        <NuxtLink
          to="/branches"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/branches') }"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Branches
        </NuxtLink>

        <NuxtLink
          to="/bakeries"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/bakeries') }"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
            ></path>
          </svg>
          Bakeries
        </NuxtLink>

        <NuxtLink
          to="/bakery-types"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/bakery-types') }"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            ></path>
          </svg>
          Bakery Types
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
</script>

<style scoped>
.nav-link {
  @apply flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors;
}

.nav-link.active {
  @apply bg-blue-600 hover:bg-blue-700;
}
</style>
