<template>
  <div>
    <AdminHeader 
      title="Add New Branch" 
      subtitle="Create a new bakery branch location"
    />
    
    <div class="p-6">
      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Basic Information -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label class="form-label">Branch Code</label>
                <input
                  v-model="form.branchCode"
                  type="text"
                  class="form-input"
                  placeholder="e.g., DT01, ML02"
                />
              </div>
              
              <div>
                <label class="form-label">Status *</label>
                <select v-model="form.status" class="form-input" required>
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Under Renovation">Under Renovation</option>
                  <option value="Temporary Closed">Temporary Closed</option>
                  <option value="Planning">Planning</option>
                </select>
              </div>
              
              <div>
                <label class="form-label">Opening Date</label>
                <input
                  v-model="form.openingDate"
                  type="date"
                  class="form-input"
                />
              </div>
            </div>
            
            <div class="mt-4">
              <label class="form-label">Description</label>
              <textarea
                v-model="form.description"
                class="form-input"
                rows="3"
                placeholder="Brief description of the branch..."
              ></textarea>
            </div>
          </div>

          <!-- Address Information -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
            
            <div class="space-y-4">
              <div>
                <label class="form-label">Street Address *</label>
                <input
                  v-model="form.address"
                  type="text"
                  class="form-input"
                  placeholder="123 Main Street"
                  required
                />
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="form-label">City *</label>
                  <input
                    v-model="form.city"
                    type="text"
                    class="form-input"
                    placeholder="City name"
                    required
                  />
                </div>
                
                <div>
                  <label class="form-label">State/Province</label>
                  <input
                    v-model="form.state"
                    type="text"
                    class="form-input"
                    placeholder="State or Province"
                  />
                </div>
                
                <div>
                  <label class="form-label">ZIP/Postal Code</label>
                  <input
                    v-model="form.zipCode"
                    type="text"
                    class="form-input"
                    placeholder="12345"
                  />
                </div>
              </div>
              
              <div>
                <label class="form-label">Country *</label>
                <input
                  v-model="form.country"
                  type="text"
                  class="form-input"
                  placeholder="Country name"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form-label">Phone Number</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="form-input"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label class="form-label">Email Address</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  placeholder="branch@bakery.com"
                />
              </div>
              
              <div>
                <label class="form-label">Fax Number</label>
                <input
                  v-model="form.fax"
                  type="tel"
                  class="form-input"
                  placeholder="+1 (555) 123-4568"
                />
              </div>
              
              <div>
                <label class="form-label">Website</label>
                <input
                  v-model="form.website"
                  type="url"
                  class="form-input"
                  placeholder="https://branch.bakery.com"
                />
              </div>
            </div>
          </div>

          <!-- Management Information -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Management Information</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form-label">Manager Name</label>
                <input
                  v-model="form.managerName"
                  type="text"
                  class="form-input"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label class="form-label">Manager Phone</label>
                <input
                  v-model="form.managerPhone"
                  type="tel"
                  class="form-input"
                  placeholder="+1 (555) 987-6543"
                />
              </div>
              
              <div>
                <label class="form-label">Manager Email</label>
                <input
                  v-model="form.managerEmail"
                  type="email"
                  class="form-input"
                  placeholder="manager@bakery.com"
                />
              </div>
              
              <div>
                <label class="form-label">Number of Employees</label>
                <input
                  v-model.number="form.employeeCount"
                  type="number"
                  min="0"
                  class="form-input"
                  placeholder="10"
                />
              </div>
            </div>
          </div>

          <!-- Operating Information -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Operating Information</h3>
            
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Operating Hours</label>
                  <textarea
                    v-model="form.operatingHours"
                    class="form-input"
                    rows="3"
                    placeholder="Mon-Fri: 6:00 AM - 8:00 PM&#10;Sat-Sun: 7:00 AM - 9:00 PM"
                  ></textarea>
                </div>
                
                <div>
                  <label class="form-label">Special Services</label>
                  <textarea
                    v-model="form.specialServices"
                    class="form-input"
                    rows="3"
                    placeholder="Custom cakes, catering, delivery..."
                  ></textarea>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="form-label">Floor Area (sq ft)</label>
                  <input
                    v-model.number="form.floorArea"
                    type="number"
                    min="0"
                    class="form-input"
                    placeholder="1500"
                  />
                </div>
                
                <div>
                  <label class="form-label">Seating Capacity</label>
                  <input
                    v-model.number="form.seatingCapacity"
                    type="number"
                    min="0"
                    class="form-input"
                    placeholder="30"
                  />
                </div>
                
                <div>
                  <label class="form-label">Parking Spaces</label>
                  <input
                    v-model.number="form.parkingSpaces"
                    type="number"
                    min="0"
                    class="form-input"
                    placeholder="20"
                  />
                </div>
              </div>
              
              <div class="flex items-center space-x-6">
                <label class="flex items-center">
                  <input v-model="form.hasDelivery" type="checkbox" class="mr-2" />
                  <span class="text-sm">Delivery Available</span>
                </label>
                <label class="flex items-center">
                  <input v-model="form.hasWifi" type="checkbox" class="mr-2" />
                  <span class="text-sm">WiFi Available</span>
                </label>
                <label class="flex items-center">
                  <input v-model="form.hasParking" type="checkbox" class="mr-2" />
                  <span class="text-sm">Parking Available</span>
                </label>
                <label class="flex items-center">
                  <input v-model="form.isAccessible" type="checkbox" class="mr-2" />
                  <span class="text-sm">Wheelchair Accessible</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Additional Notes -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            
            <div>
              <label class="form-label">Notes</label>
              <textarea
                v-model="form.notes"
                class="form-input"
                rows="4"
                placeholder="Any additional notes or important information about this branch..."
              ></textarea>
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
              {{ loading ? 'Creating...' : 'Create Branch' }}
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
  name: '',
  branchCode: '',
  description: '',
  status: '',
  openingDate: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  phone: '',
  email: '',
  fax: '',
  website: '',
  managerName: '',
  managerPhone: '',
  managerEmail: '',
  employeeCount: '',
  operatingHours: '',
  specialServices: '',
  floorArea: '',
  seatingCapacity: '',
  parkingSpaces: '',
  hasDelivery: false,
  hasWifi: false,
  hasParking: false,
  isAccessible: false,
  notes: ''
})

// Methods
const submitForm = async () => {
  try {
    await bakeryStore.addBranch(form.value)
    router.push('/branches')
  } catch (err) {
    console.error('Failed to create branch:', err)
  }
}
</script>