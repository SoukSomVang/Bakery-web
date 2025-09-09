<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <AdminSidebar />
    
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
  title: 'Bakery Admin Panel',
  ogTitle: 'Bakery Admin Panel',
  description: 'Admin panel for managing bakery items, storage data, and branches.',
  ogDescription: 'Admin panel for managing bakery items, storage data, and branches.',
})
</script>