<template>
  <div class="bg-gray-800 text-white w-64 min-h-screen p-4">
    <div class="mb-8">
      <h2 class="text-2xl font-bold">Bakery Admin</h2>
    </div>
    
    <nav class="space-y-2">
      <NuxtLink to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">
        <i class="mdi mdi-view-dashboard text-lg"></i>
        Dashboard
      </NuxtLink>
      
      <NuxtLink to="/bakery-items" class="nav-link" :class="{ 'active': $route.path.startsWith('/bakery-items') }">
        <i class="mdi mdi-food-croissant text-lg"></i>
        Bakery Items
      </NuxtLink>
      
      <NuxtLink to="/storage" class="nav-link" :class="{ 'active': $route.path.startsWith('/storage') }">
        <i class="mdi mdi-database text-lg"></i>
        Storage Data
      </NuxtLink>
      
      <NuxtLink to="/branches" class="nav-link" :class="{ 'active': $route.path.startsWith('/branches') }">
        <i class="mdi mdi-source-branch text-lg"></i>
        Branches
      </NuxtLink>
      
      <NuxtLink to="/bakeries" class="nav-link" :class="{ 'active': $route.path.startsWith('/bakeries') }">
        <i class="mdi mdi-store text-lg"></i>
        Bakeries
      </NuxtLink>

      <NuxtLink to="/bakery-types" class="nav-link" :class="{ 'active': $route.path.startsWith('/bakery-types') }">
        <i class="mdi mdi-tag text-lg"></i>
        Bakery Types
      </NuxtLink>
    </nav>
  </div>
</template>

<style scoped>
.nav-link {
  @apply flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors;
}

.nav-link.active {
  @apply bg-blue-600 hover:bg-blue-700;
}

/* Ensure MDI icons are properly aligned */
.nav-link i {
  width: 1.25rem;
  height: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
</style>