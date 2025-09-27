<template>
  <div>
    <AdminHeader
      title="Edit Branch"
      subtitle="Update branch information"
    />

    <div class="p-6">
      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Branch Information -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Branch Information</h3>

            <div class="space-y-4">
              <div>
                <label class="form-label">Branch Name *</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  placeholder="e.g., Downtown Branch, Mall Location"
                  required
                />
              </div>

              <div>
                <label class="form-label">Location URL</label>
                <input
                  v-model="form.locationUrl"
                  type="url"
                  class="form-input"
                  placeholder="https://maps.google.com/..."
                />
                <p class="text-sm text-gray-500 mt-1">Enter the Google Maps or location URL for this branch (optional)</p>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ error }}
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3">
            <NuxtLink to="/branches" class="btn-secondary">Cancel</NuxtLink>
            <button type="submit" class="btn-primary" :disabled="loading">
              {{ loading ? 'Updating...' : 'Update Branch' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const bakeryStore = useBakeryStore()
const { loading, error } = storeToRefs(bakeryStore)

// Get branch ID from route params
const branchId = route.params.id

// Form state
const form = ref({
  name: '',
  locationUrl: ''
})

// Load branch data
const loadBranch = async () => {
  try {
    // First ensure branches are loaded
    if (bakeryStore.branches.length === 0) {
      await bakeryStore.fetchBranches()
    }

    // Get branch from store
    const branch = bakeryStore.getBranchById(branchId)
    if (branch) {
      form.value = {
        name: branch.name || '',
        locationUrl: branch.locationUrl || ''
      }
    } else {
      // Branch not found, redirect back
      router.push('/branches')
    }
  } catch (err) {
    console.error('Failed to load branch:', err)
    bakeryStore.setError('Failed to load branch data')
  }
}

// Methods
const submitForm = async () => {
  try {
    await bakeryStore.updateBranch(branchId, form.value)
    router.push('/branches')
  } catch (err) {
    console.error('Failed to update branch:', err)
  }
}

// Load data on mount
onMounted(() => {
  loadBranch()
})
</script>