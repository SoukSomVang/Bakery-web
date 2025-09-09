<template>
  <div>
    <AdminHeader 
      title="Add Storage Record" 
      subtitle="Track inventory and storage data"
    />
    
    <div class="p-6">
      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Basic Information -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Item Information</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form-label">Item Name *</label>
                <input
                  v-model="form.itemName"
                  type="text"
                  class="form-input"
                  placeholder="e.g., Flour, Sugar, Eggs"
                  required
                />
              </div>
              
              <div>
                <label class="form-label">Type *</label>
                <select v-model="form.type" class="form-input" required>
                  <option value="">Select a type</option>
                  <option value="Ingredient">Ingredient</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Finished Product">Finished Product</option>
                  <option value="Raw Material">Raw Material</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label class="form-label">Quantity *</label>
                <input
                  v-model.number="form.quantity"
                  type="number"
                  step="0.01"
                  min="0"
                  class="form-input"
                  placeholder="0"
                  required
                />
              </div>
              
              <div>
                <label class="form-label">Unit *</label>
                <select v-model="form.unit" class="form-input" required>
                  <option value="">Select unit</option>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                  <option value="lb">Pound (lb)</option>
                  <option value="oz">Ounce (oz)</option>
                  <option value="l">Liter (l)</option>
                  <option value="ml">Milliliter (ml)</option>
                  <option value="pcs">Pieces (pcs)</option>
                  <option value="boxes">Boxes</option>
                  <option value="bags">Bags</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div class="mt-4">
              <label class="form-label">Description</label>
              <textarea
                v-model="form.description"
                class="form-input"
                rows="3"
                placeholder="Additional details about the item..."
              ></textarea>
            </div>
          </div>

          <!-- Storage Details -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Storage Details</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form-label">Storage Location</label>
                <input
                  v-model="form.location"
                  type="text"
                  class="form-input"
                  placeholder="e.g., Warehouse A, Shelf 1, Freezer"
                />
              </div>
              
              <div>
                <label class="form-label">Status *</label>
                <select v-model="form.status" class="form-input" required>
                  <option value="">Select status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Expired">Expired</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>
              
              <div>
                <label class="form-label">Minimum Stock Level</label>
                <input
                  v-model.number="form.minStockLevel"
                  type="number"
                  min="0"
                  class="form-input"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label class="form-label">Maximum Stock Level</label>
                <input
                  v-model.number="form.maxStockLevel"
                  type="number"
                  min="0"
                  class="form-input"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label class="form-label">Cost per Unit</label>
                <input
                  v-model.number="form.costPerUnit"
                  type="number"
                  step="0.01"
                  min="0"
                  class="form-input"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label class="form-label">Supplier</label>
                <input
                  v-model="form.supplier"
                  type="text"
                  class="form-input"
                  placeholder="Supplier name"
                />
              </div>
            </div>
          </div>

          <!-- Dates -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Important Dates</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form-label">Purchase Date</label>
                <input
                  v-model="form.purchaseDate"
                  type="date"
                  class="form-input"
                />
              </div>
              
              <div>
                <label class="form-label">Expiry Date</label>
                <input
                  v-model="form.expiryDate"
                  type="date"
                  class="form-input"
                />
              </div>
              
              <div>
                <label class="form-label">Last Inventory Check</label>
                <input
                  v-model="form.lastInventoryCheck"
                  type="date"
                  class="form-input"
                />
              </div>
            </div>
          </div>

          <!-- Additional Information -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            
            <div class="space-y-4">
              <div>
                <label class="form-label">Storage Conditions</label>
                <textarea
                  v-model="form.storageConditions"
                  class="form-input"
                  rows="2"
                  placeholder="Temperature, humidity, special requirements..."
                ></textarea>
              </div>
              
              <div>
                <label class="form-label">Notes</label>
                <textarea
                  v-model="form.notes"
                  class="form-input"
                  rows="3"
                  placeholder="Additional notes or comments..."
                ></textarea>
              </div>
            </div>
            
            <div class="mt-4 flex items-center space-x-6">
              <label class="flex items-center">
                <input v-model="form.isPerishable" type="checkbox" class="mr-2" />
                <span class="text-sm">Perishable Item</span>
              </label>
              <label class="flex items-center">
                <input v-model="form.requiresRefrigeration" type="checkbox" class="mr-2" />
                <span class="text-sm">Requires Refrigeration</span>
              </label>
              <label class="flex items-center">
                <input v-model="form.isActive" type="checkbox" class="mr-2" />
                <span class="text-sm">Active Record</span>
              </label>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ error }}
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3">
            <NuxtLink to="/storage" class="btn-secondary">Cancel</NuxtLink>
            <button type="submit" class="btn-primary" :disabled="loading">
              {{ loading ? 'Creating...' : 'Create Record' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const bakeryStore = useBakeryStore()
const { loading, error } = storeToRefs(bakeryStore)

// Form state
const form = ref({
  itemName: '',
  type: '',
  description: '',
  quantity: '',
  unit: '',
  location: '',
  status: '',
  minStockLevel: '',
  maxStockLevel: '',
  costPerUnit: '',
  supplier: '',
  purchaseDate: '',
  expiryDate: '',
  lastInventoryCheck: '',
  storageConditions: '',
  notes: '',
  isPerishable: false,
  requiresRefrigeration: false,
  isActive: true
})

// Methods
const submitForm = async () => {
  try {
    await bakeryStore.addStorageData(form.value)
    router.push('/storage')
  } catch (err) {
    console.error('Failed to create storage record:', err)
  }
}
</script>