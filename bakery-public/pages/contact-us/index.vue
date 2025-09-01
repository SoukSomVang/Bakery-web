<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Contact Information & Location Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div class="space-y-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <p class="text-gray-600 mb-8 leading-relaxed">
                Ready to satisfy your cravings? Reach out to us through any of the following ways:
              </p>
            </div>

            <!-- Contact Cards -->
            <div class="space-y-6">
              <!-- Phone -->
              <div class="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div class="bg-red-100 p-3 rounded-full">
                  <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">Phone</h3>
                  <p class="text-gray-600">+1 555-555-5556</p>
                  <p class="text-sm text-gray-500 mt-1">Mon-Fri 6:00 AM - 8:00 PM</p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div class="bg-red-100 p-3 rounded-full">
                  <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">Email</h3>
                  <p class="text-gray-600">info@bakeryhouse.com</p>
                  <p class="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              <!-- Address -->
              <div class="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div class="bg-red-100 p-3 rounded-full">
                  <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">Head Office</h3>
                  <p class="text-gray-600">250 Executive Park Blvd, Suite 3400</p>
                  <p class="text-gray-600">San Francisco, CA 94134</p>
                  <p class="text-gray-600">United States</p>
                </div>
              </div>

              <!-- Social Media -->
              <div class="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div class="bg-red-100 p-3 rounded-full">
                  <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-3.22l-3.02 3.02a1 1 0 01-1.56-.8V15H5a2 2 0 01-2-2V5zm6 7a1 1 0 100-2 1 1 0 000 2zm-3 0a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">Follow Us</h3>
                  <div class="flex space-x-4">
                    <a href="#" class="text-red-600 hover:text-red-800 transition-colors">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd"/>
                      </svg>
                    </a>
                    <a href="#" class="text-red-600 hover:text-red-800 transition-colors">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12.017 0H7.982C3.579 0 0 3.579 0 7.982v4.035C0 16.421 3.579 20 7.982 20h4.035C16.421 20 20 16.421 20 12.018V7.982C20 3.579 16.421 0 12.017 0zM18.187 12.018c0 3.408-2.771 6.179-6.179 6.179H7.982c-3.408 0-6.179-2.771-6.179-6.179V7.982c0-3.408 2.771-6.179 6.179-6.179h4.026c3.408 0 6.179 2.771 6.179 6.179v4.036zM10 4.862c-2.832 0-5.138 2.306-5.138 5.138S7.168 15.138 10 15.138s5.138-2.306 5.138-5.138S12.832 4.862 10 4.862zm0 8.464c-1.836 0-3.326-1.49-3.326-3.326S8.164 6.674 10 6.674s3.326 1.49 3.326 3.326S11.836 13.326 10 13.326z" clip-rule="evenodd"/>
                      </svg>
                    </a>
                    <a href="#" class="text-red-600 hover:text-red-800 transition-colors">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.30A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Company Image & Location -->
          <div class="space-y-8">
            <!-- Company Image -->
            <div class="relative">
              <img 
                src="https://media.phillyvoice.com/media/images/Screen_Shot_2021-07-20_at_1.14.40_PM.width-600.png" 
                alt="Bakery House Interior" 
                class="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-xl font-semibold">Bakery House</h3>
                <p class="text-sm opacity-90">Your neighborhood bakery</p>
              </div>
            </div>

            <!-- Location Details -->
            <div class="bg-gray-50 p-8 rounded-lg shadow-lg">
              <h3 class="text-2xl font-bold text-gray-800 mb-6">Our Main Location</h3>
              
              <div class="space-y-4">
                <!-- Address -->
                <div class="flex items-start space-x-3">
                  <div class="bg-red-100 p-2 rounded-full mt-1">
                    <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800">Address</h4>
                    <p class="text-gray-600">250 Executive Park Blvd, Suite 3400</p>
                    <p class="text-gray-600">San Francisco, CA 94134, United States</p>
                  </div>
                </div>

                <!-- Business Hours -->
                <div class="flex items-start space-x-3">
                  <div class="bg-red-100 p-2 rounded-full mt-1">
                    <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800">Business Hours</h4>
                    <div class="text-gray-600 space-y-1">
                      <p>Monday - Friday: 6:00 AM - 8:00 PM</p>
                      <p>Saturday: 7:00 AM - 9:00 PM</p>
                      <p>Sunday: 7:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Get Directions Button -->
              <div class="pt-4">
                <button class="w-full bg-red-900 hover:bg-red-950 text-white px-6 py-3 rounded-md font-semibold transition-colors flex items-center justify-center space-x-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Meta tags for SEO
useHead({
  title: 'Contact Us - Bakery House | Get In Touch',
  meta: [
    {
      name: 'description',
      content: 'Contact Bakery House for custom orders, inquiries, or feedback. Visit our locations or send us a message - we\'d love to hear from you!'
    },
    {
      property: 'og:title',
      content: 'Contact Bakery House - Fresh Baked Goods & Custom Orders'
    },
    {
      property: 'og:description',
      content: 'Get in touch with Bakery House for the freshest baked goods, custom orders, and catering services. Multiple locations to serve you better.'
    }
  ]
})

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref(null)

// Branch data
const branches = ref([
  {
    name: 'Treekoff NornqNieng',
    hours: '6:00 AM - 8:00 PM',
    phone: '+1 555-555-5556',
    specialty: 'Artisan breads, Croissants'
  },
  {
    name: 'Treekoff Dongpalan',
    hours: '6:30 AM - 7:30 PM',
    phone: '+1 555-555-5557',
    specialty: 'Pastries, Coffee pairings'
  },
  {
    name: 'Treekoff Wattainoy',
    hours: '5:30 AM - 9:00 PM',
    phone: '+1 555-555-5558',
    specialty: 'Quick service, Cakes'
  },
  {
    name: 'Treekoff Vatchan',
    hours: '6:00 AM - 8:30 PM',
    phone: '+1 555-555-5559',
    specialty: 'Full menu, Custom orders'
  }
])

// FAQ data
const faqs = ref([
  {
    question: 'What are your opening hours?',
    answer: 'Our opening hours vary by location. Most of our bakeries open early at 5:30-6:30 AM and close between 7:30-9:00 PM. Please check the specific hours for each location above.'
  },
  {
    question: 'Do you take custom orders?',
    answer: 'Yes! We specialize in custom orders for birthdays, weddings, corporate events, and special occasions. Please contact us at least 48 hours in advance for custom cakes and pastries.'
  },
  {
    question: 'Do you offer catering services?',
    answer: 'Absolutely! We provide catering services for events of all sizes. Our catering menu includes fresh pastries, sandwiches, coffee, and custom dessert platters. Contact us to discuss your needs.'
  },
  {
    question: 'Are your products made fresh daily?',
    answer: 'Yes, all our products are baked fresh daily using the finest ingredients. We start baking before dawn to ensure everything is fresh when you visit us.'
  },
  {
    question: 'Do you have gluten-free or vegan options?',
    answer: 'We offer a selection of gluten-free and vegan options. Please ask our staff about available alternatives or contact us in advance for special dietary requirements.'
  },
  {
    question: 'Can I place orders online?',
    answer: 'Currently, we accept orders via phone and in-person. We\'re working on an online ordering system. For now, please call your preferred location or visit us directly.'
  }
])

const openFAQs = ref([])

// Methods
const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = null

  try {
    // Simulate API call - replace with actual Firebase/API integration
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically send the data to Firebase or your backend
    console.log('Form submitted:', form.value)
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
    
    submitMessage.value = {
      type: 'success',
      text: 'Thank you for your message! We\'ll get back to you within 24 hours.'
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    submitMessage.value = {
      type: 'error',
      text: 'There was an error sending your message. Please try again or contact us directly.'
    }
  } finally {
    isSubmitting.value = false
  }
}

const toggleFAQ = (index) => {
  if (openFAQs.value.includes(index)) {
    openFAQs.value = openFAQs.value.filter(i => i !== index)
  } else {
    openFAQs.value.push(index)
  }
}

// Firebase integration example (uncomment to use)
/*
const { $firestore } = useNuxtApp()

const submitToFirebase = async (formData) => {
  try {
    await $firestore.collection('contact-messages').add({
      ...formData,
      timestamp: new Date(),
      status: 'new'
    })
    return { success: true }
  } catch (error) {
    console.error('Firebase error:', error)
    return { success: false, error }
  }
}
*/
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>