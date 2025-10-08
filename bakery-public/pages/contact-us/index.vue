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
                  <p class="text-gray-600">+856 20 522 212 14</p>
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
                  <p class="text-gray-600">bakeryhouse@gmail.com</p>
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
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">BakeryHouse</h3>
                  <p class="text-gray-600">Nongnieng Road, Ban Nongnieng</p>
                  <p class="text-gray-600">Saysettha District, Vientiane Capital</p>
                  <p class="text-gray-600">Laos</p>
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
                    <a href="https://wa.me/8562055221214" class="text-red-600 hover:text-red-800 transition-colors" target="_blank">
                      <img :src="WhatsappIcon" alt="FaceBook icon" class="w-5 h-5">
                    </a>
                    <a href="https://www.tiktok.com/@bakeryhouse78?_t=ZS-90NpDLS35HD&_r=1" class="text-red-600 hover:text-red-800 transition-colors" target="_blank">
                      <img :src="TikTokIcon" alt="FaceBook icon" class="w-5 h-5">
                    </a>
                    <a href="#" class="text-red-600 hover:text-red-800 transition-colors" target="_blank">
                      <img :src="FacebookIcon" alt="FaceBook icon" class="w-5 h-5">
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
                :src="BackgrounImage" 
                alt="Bakery House Interior" 
                class="w-full h-96 object-cover rounded-lg shadow-lg"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-xl font-semibold">BakeryHouse</h3>
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
                    <p class="text-gray-600">Nongnieng Road, Ban Nongnieng</p>
                    <p class="text-gray-600">Saysettha District, Vientiane Capital</p>
                  </div>
                </div>

                <!-- Business Hours -->
                <!-- <div class="flex items-start space-x-3">
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
                </div> -->
              </div>

              <!-- Get Directions Button -->
              <div class="pt-4">
                <a :href="LOCATION" target="_blank">
                  <button class="w-full bg-red-900 hover:bg-red-950 text-white px-6 py-3 rounded-md font-semibold transition-colors flex items-center justify-center space-x-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                    </svg>
                    <span>Get Directions</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import BackgrounImage from "@/assets/images/contact-place.jpeg";
import WhatsappIcon from "@/assets/images/icons/whatsapp_red_color.png";
import TikTokIcon from "@/assets/images/icons/tik-tok-red-color.png";
import FacebookIcon from "@/assets/images/icons/facebook-app-red-color.png";

const LOCATION = "https://maps.app.goo.gl/wHpTRKX8xvqQYYpd6"
// Meta tags for SEO
useHead({
  title: 'Contact Us - BakeryHouse | Get In Touch',
  meta: [
    {
      name: 'description',
      content: 'Contact BakeryHouse for custom orders, inquiries, or feedback. Visit our locations or send us a message - we\'d love to hear from you!'
    },
    {
      property: 'og:title',
      content: 'Contact BakeryHouse - Fresh Baked Goods & Custom Orders'
    },
    {
      property: 'og:description',
      content: 'Get in touch with BakeryHouse for the freshest baked goods, custom orders, and catering services. Multiple locations to serve you better.'
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