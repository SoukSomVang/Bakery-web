<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-cover bg-center"
      :style="{ backgroundImage: `url('${backgroundImage}')` }"
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-red-900/40"
      ></div>

      <!-- Content -->
      <div
        class="relative z-10 flex items-center min-h-[80vh] px-4 md:px-8 py-12 md:py-20"
      >
        <div class="container mx-auto">
          <div class="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <!-- Left Content -->
            <div class="space-y-6 order-2 lg:order-1 text-center lg:text-left">
              <div
                class="border-l-4 border-white lg:pl-8 pl-4 animate-fade-in-up"
                style="animation-delay: 0.4s"
              >
                <h2
                  class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white"
                >
                  Service Since<br />
                  <span class="text-4xl sm:text-5xl lg:text-6xl"
                    >10/10/2024</span
                  >
                </h2>
              </div>

              <div
                class="border-l-4 border-white lg:pl-8 pl-4 animate-fade-in-up"
                style="animation-delay: 0.6s"
              >
                <h3
                  class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200"
                >
                  BakeryHouse
                </h3>
              </div>

              <div
                class="pl-4 lg:pl-8 animate-fade-in-up"
                style="animation-delay: 0.8s"
              >
                <button
                  class="bg-red-900 hover:bg-red-950 text-white px-6 md:px-10 py-3 md:py-4 rounded-md font-semibold transition-colors w-full sm:w-auto"
                >
                  Contact Us
                </button>
              </div>
            </div>

            <!-- Right Content - Stylized Logo -->
            <div class="flex justify-center lg:justify-end order-1 lg:order-2">
              <div class="animate-fade-in-right" style="animation-delay: 0.8s">
                <img
                  :src="Logo"
                  alt="logo"
                  class="w-48 sm:w-64 md:w-72 lg:w-80 h-auto mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-12 md:py-16 bg-white">
      <div class="container mx-auto px-4 md:px-6">
        <div class="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <h2
              class="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left"
            >
              Our Story
            </h2>
            <p
              class="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base text-justify"
            >
              BakeryHouse ຖືກສ້າງຕັ້ງຂຶ້ນມາບົນພື້ນຖານຄວາມໝຸ່ງໝັ້ນ ແລະ ວິໃສທັດທີ່ຢາກໃຫ້ປະເທດລາວໄດ້ມີແບຣນເຂົ້າໝົມປັງທີ່ເປັນຂອງຄົນລາວເອງ. ດ້ວຍຄວາມຕັ້ງໃຈທີ່ຈະເຂົ້າມາມີສ່ວນຮ່ວມການແຂ່ງຂັນ ແລະ ມີສ່ວນຮ່ວມໃນຕະຫຼາດເຂົ້າໝົມປັງທັງພາຍໃນແລະ ພາຍນອກປະເທດລາວ, ນອກຈາກນີ້ທາງບໍລິສັດເຮົາກໍໄດ້ມີມາດຕະຖານໂຮງງານຜະລິດທີ່ໄດ້ຮັບການອານຸມັດຈາກ ອຢ ຫຼື (ກົມອາຫານ ແລະ ການຢາ) ທີ່ຈະສ້າງຄວາມເຊື່ອໝັ້ນໃຫ້ແກ່ຜູ້ບໍລິໂພກທຸກປະເພດ, ທຸກໄວຍິງໄປກວ່ານັ້ນທາງບໍລິສັດ BakeryHouse ຍັງຮ່ວມມືກັບອົງກອນ GMP ເພື່ອທີ່ຈະຍົກລະດັບໂຮງງານຜະລິດເຂົ້າໝົມປັງຂອງບໍລິສັດ BakeryHouse ຂອງພວກເຮົາກ້າວໄປສູ່ລະດັບສາກົນ.
            </p>
            <div class="flex justify-center md:justify-start">
              <div
                class="bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold text-sm sm:text-base"
              >
                Service Since 10/10/2024
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <img
              :src="CeoImage"
              alt="Baker at work"
              class="rounded-lg shadow-lg w-full h-auto object-cover"
            />
            <img
              :src="CookingImage"
              alt="Fresh bread"
              class="rounded-lg shadow-lg mt-4 sm:mt-8 w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Branches Section -->
    <section class="py-12 md:py-16 bg-gray-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-8 text-gray-800 underline">
          Branches
        </h2>

        <!-- Loading -->
        <div v-if="branchesLoading" class="text-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"
          ></div>
        </div>

        <!-- Branches List -->
        <div
          v-else-if="branches.length > 0"
          class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
        >
          <div
            v-for="branch in branches"
            :key="branch.id"
            class="text-center bg-white rounded-md p-4 shadow hover:shadow-md transition"
          >
            <h3
              @click="handleLocationClick(branch)"
              class="text-base sm:text-lg font-medium text-red-700 underline cursor-pointer hover:text-red-900 transition-colors"
            >
              {{ branch.name }}
            </h3>
          </div>
        </div>

        <!-- Empty -->
        <div v-else class="text-gray-500 text-sm sm:text-base">
          No branches available at the moment.
        </div>
      </div>
    </section>

    <!-- Location Dialog -->
    <div
      v-if="showLocationDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm sm:max-w-md w-full">
        <div class="text-center">
          <svg
            class="w-14 h-14 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            Location Not Available
          </h3>
          <p class="text-gray-600 mb-6 text-sm sm:text-base">
            Branch does not have location data
          </p>
          <button
            @click="closeDialog"
            class="bg-red-900 hover:bg-red-950 text-white px-5 sm:px-6 py-2 rounded-md font-semibold transition-colors text-sm sm:text-base"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFirebase } from "~/composables/useFirebase";
import backgroundImage from "@/assets/images/background.jpeg";
import Logo from "@/assets/images/logo/white-logo.png";
import CeoImage from "@/assets/images/ceo-image.jpeg";
import CookingImage from "@/assets/images/about-us.jpeg";

const { getBranches } = useFirebase();

// Branch locations data
const branches = ref([]);
const branchesLoading = ref(true);
const showLocationDialog = ref(false);
const selectedBranch = ref(null);

// Handle location button click
const handleLocationClick = (branch) => {
  if (branch.locationUrl && branch.locationUrl.trim()) {
    // Open location URL in new tab
    window.open(branch.locationUrl, "_blank");
  } else {
    // Show dialog for missing location
    selectedBranch.value = branch;
    showLocationDialog.value = true;
  }
};

// Close dialog
const closeDialog = () => {
  showLocationDialog.value = false;
  selectedBranch.value = null;
};

// Load branch locations
onMounted(async () => {
  try {
    branches.value = await getBranches();
  } catch (error) {
    console.error("Failed to load branches:", error);
  } finally {
    branchesLoading.value = false;
  }
});

// Meta tags for SEO
useHead({
  title: "About Us - BakeryHouse | Artisan Baking Since 2024",
  meta: [
    {
      name: "description",
      content:
        "Learn about BakeryHouse - our story, values, team, and locations. Crafting exceptional baked goods with passion and tradition since 2024.",
    },
    {
      property: "og:title",
      content: "About BakeryHouse - Artisan Baking & Fresh Pastries",
    },
    {
      property: "og:description",
      content:
        "Discover our commitment to quality baking, meet our talented team, and find our locations across the city.",
    },
  ],
});
</script>

<style scoped>
/* Additional custom styles if needed */
.container {
  max-width: 1200px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out forwards;
  opacity: 0;
}
</style>
