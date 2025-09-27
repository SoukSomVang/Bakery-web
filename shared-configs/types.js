// Shared types for the Bakery Web application

// Storage method options for forms (checkboxes - multiple selection allowed)
export const STORAGE_METHODS = [
  {
    value: "store_at_cold_temperature",
    label: "Store at cold temperature"
  },
  {
    value: "store_in_box",
    label: "Store in box"
  },
  {
    value: "keep_airtight",
    label: "Keep airtight"
  },
  {
    value: "store_in_refrigerator",
    label: "Store in refrigerator"
  },
  {
    value: "store_in_cake_display_case",
    label: "Store in cake display case"
  }
];

// Display method options for forms (checkboxes - multiple selection allowed)
export const DISPLAY_METHODS = [
  {
    value: "arrange_in_bakery_display_case",
    label: "Arrange in bakery display case"
  },
  {
    value: "arrange_in_glass_dome",
    label: "Arrange in glass dome"
  },
  {
    value: "arrange_in_cake_display_case",
    label: "Arrange in cake display case"
  }
];

// Bakery product structure for reference
export const DEFAULT_PRODUCT = {
  name: '',
  type: '',
  description: '',
  price: 0,
  imageUrl: '',

  // New storage and handling fields
  shelf_life_days: 7,
  can_reheat: false,
  reheat_temperature: 150,
  reheat_time_min: null, // Optional - can be null if not provided
  reheat_time_max: null, // Optional - can be null if not provided
  storage_methods: [], // Array of selected storage methods
  display_methods: [], // Array of selected display methods
  avoid_sunlight: false,
  avoid_moisture: false,
  temperature_sensitive: false
};

// Helper function to format reheating time display
export const formatReheatingTime = (min, max) => {
  if (min && max) {
    return `${min}-${max} Min`;
  } else if (min) {
    return `${min} Min`;
  } else if (max) {
    return `${max} Min`;
  }
  return '';
};