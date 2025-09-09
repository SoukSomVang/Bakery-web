<template>
  <div class="bg-gray-800 text-white w-64 min-h-screen p-4">
    <div class="mb-8">
      <h2 class="text-2xl font-bold">Bakery Admin</h2>
    </div>
    
    <nav class="space-y-2">
      <NuxtLink to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>
        Dashboard
      </NuxtLink>
      
      <NuxtLink to="/bakery-items" class="nav-link" :class="{ 'active': $route.path.startsWith('/bakery-items') }">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
        </svg>
        Bakery Items
      </NuxtLink>
      
      <NuxtLink to="/storage" class="nav-link" :class="{ 'active': $route.path.startsWith('/storage') }">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
          <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"></path>
        </svg>
        Storage Data
      </NuxtLink>
      
      <NuxtLink to="/branches" class="nav-link" :class="{ 'active': $route.path.startsWith('/branches') }">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
        </svg>
        Branches
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
</style>