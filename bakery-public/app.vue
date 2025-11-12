<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Global error handler for iOS debugging
if (import.meta.client) {
  // Catch and log all errors
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error)
    console.error('Error message:', event.message)
    console.error('Error filename:', event.filename)
    console.error('Error line:', event.lineno)
  })

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
  })

  console.log('🚀 App initialized on client')
  console.log('User Agent:', navigator.userAgent)
  console.log('Platform:', navigator.platform)
}
</script>
