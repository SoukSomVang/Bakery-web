// Shared types for the Bakery Web application

export interface BakeryProduct {
  id?: string;
  name: string;
  type: string;
  description?: string;
  price: number;
  stock?: number;
  ingredients?: string;
  allergens?: string;
  preparationTime?: number;
  shelfLife?: number;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isAvailable?: boolean;
  imageUrl?: string;

  // New storage and handling fields
  shelf_life_days: number;
  can_reheat: boolean;
  reheat_temperature?: number; // in Celsius
  reheat_time_min?: number;    // minimum reheating time in minutes
  reheat_time_max?: number;    // maximum reheating time in minutes

  storage_method: StorageMethod;
  display_method: DisplayMethod;

  // Storage requirements
  avoid_sunlight: boolean;
  avoid_moisture: boolean;
  requires_air_tight: boolean;
  temperature_sensitive: boolean;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type StorageMethod =
  | "ເກັບໄວ້ອຸນຫະພູມເຢັນ"      // store at cold temperature
  | "ເກັບເຂົ້າກຸ່ອງ"           // store in box
  | "ບໍ່ໃຫ້ອາກາດເຂົ້າ"         // don't let air in
  | "ເກັບໄວ້ໃນຕູ້ເຢັນ"         // store in refrigerator
  | "ຈັດເກັບ/ຈັດວາງໃນຕູ້ເຄັກ";  // store/arrange in cake display case

export type DisplayMethod =
  | "ຈັດວາງໄວ້ຕູ້ເບເກີຣີ"        // arrange in bakery display case
  | "ຈັດວາງໄວ້ໃນໂຄມແກ້ວ"       // arrange in glass dome
  | "ຈັດເກັບ/ຈັດວາງໃນຕູ້ເຄັກ";   // store/arrange in cake display case

// Storage method options for forms
export const STORAGE_METHODS: { value: StorageMethod; label: string; english: string }[] = [
  {
    value: "ເກັບໄວ້ອຸນຫະພູມເຢັນ",
    label: "ເກັບໄວ້ອຸນຫະພູມເຢັນ",
    english: "Store at cold temperature"
  },
  {
    value: "ເກັບເຂົ້າກຸ່ອງ",
    label: "ເກັບເຂົ້າກຸ່ອງ",
    english: "Store in box"
  },
  {
    value: "ບໍ່ໃຫ້ອາກາດເຂົ້າ",
    label: "ບໍ່ໃຫ້ອາກາດເຂົ້າ",
    english: "Don't let air in"
  },
  {
    value: "ເກັບໄວ້ໃນຕູ້ເຢັນ",
    label: "ເກັບໄວ້ໃນຕູ້ເຢັນ",
    english: "Store in refrigerator"
  },
  {
    value: "ຈັດເກັບ/ຈັດວາງໃນຕູ້ເຄັກ",
    label: "ຈັດເກັບ/ຈັດວາງໃນຕູ້ເຄັກ",
    english: "Store/arrange in cake display case"
  }
];

// Display method options for forms
export const DISPLAY_METHODS: { value: DisplayMethod; label: string; english: string }[] = [
  {
    value: "ຈັດວາງໄວ້ຕູ້ເບເກີຣີ",
    label: "ຈັດວາງໄວ້ຕູ້ເບເກີຣີ",
    english: "Arrange in bakery display case"
  },
  {
    value: "ຈັດວາງໄວ້ໃນໂຄມແກ້ວ",
    label: "ຈັດວາງໄວ້ໃນໂຄມແກ້ວ",
    english: "Arrange in glass dome"
  },
  {
    value: "ຈັດເກັບ/ຈັດວາງໃນຕູ້ເຄັກ",
    label: "ຈັດເກັບ/ຈັດວາງໃນຕູ້ເຄັກ",
    english: "Store/arrange in cake display case"
  }
];

// Other existing types
export interface BakeryType {
  id?: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Branch {
  id?: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  manager?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Bakery {
  id?: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StorageData {
  id?: string;
  name: string;
  location: string;
  capacity: number;
  currentStock: number;
  temperature?: number;
  humidity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}