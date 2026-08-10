import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { sortByCreatedAtDesc } from "../../shared-configs/sort-utils.js";

export const useProducts = () => {
  // Check if Firestore is available
  const checkFirestore = (db) => {
    if (!db) {
      console.error(
        "PUBLIC: Firestore is not available from useClientFirebase",
      );
      throw new Error(
        "PUBLIC: Firestore is not available. Please enable Firestore in Firebase Console.",
      );
    }
    console.log("✅ PUBLIC: Firestore is available:", !!db);
  };

  // Products CRUD (Read-only for public)
  const getProducts = async () => {
    try {
      const { db } = useClientFirebase();
      checkFirestore(db);

      const querySnapshot = await getDocs(collection(db, "bakeryItems"));

      return sortByCreatedAtDesc(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
    } catch (error) {
      console.error("PUBLIC: Error getting products:", error);
      throw error;
    }
  };

  const getProductsByCategory = async (category) => {
    try {
      const { db } = useClientFirebase();
      checkFirestore(db);
      const q = query(
        collection(db, "bakeryItems"),
        where("category", "==", category),
      );
      const querySnapshot = await getDocs(q);
      return sortByCreatedAtDesc(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    } catch (error) {
      console.error("PUBLIC: Error getting products by category:", error);
      throw error;
    }
  };

  const getProductsByBakeryType = async (typeName) => {
    try {
      const { db } = useClientFirebase();
      checkFirestore(db);

      const q = query(
        collection(db, "bakeryItems"),
        where("type", "==", typeName),
      );

      const querySnapshot = await getDocs(q);

      return sortByCreatedAtDesc(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
    } catch (error) {
      console.error("PUBLIC: Error getting products by bakery type:", error);
      throw error;
    }
  };

  const getProductsFilteredByBakeryTypes = async () => {
    try {
      const { db } = useClientFirebase();
      checkFirestore(db);

      // First get all bakery types
      const bakeryTypesSnapshot = await getDocs(collection(db, "bakeryTypes"));
      const bakeryTypes = bakeryTypesSnapshot.docs.map(
        (doc) => doc.data().name,
      );

      if (bakeryTypes.length === 0) {
        return [];
      }

      // Then get products that match any of the bakery types
      const q = query(
        collection(db, "bakeryItems"),
        where("type", "in", bakeryTypes),
      );
      const querySnapshot = await getDocs(q);
      return sortByCreatedAtDesc(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    } catch (error) {
      console.error(
        "PUBLIC: Error getting products filtered by bakery types:",
        error,
      );
      throw error;
    }
  };

  const getProductsByCakeAndBakeryTypes = async () => {
    try {
      const { db } = useClientFirebase();
      checkFirestore(db);

      // Get all products
      const allProductsSnapshot = await getDocs(collection(db, "bakeryItems"));
      const allProducts = allProductsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Get bakery types from bakeryTypes collection
      const bakeryTypesSnapshot = await getDocs(collection(db, "bakeryTypes"));
      const bakeryTypes = bakeryTypesSnapshot.docs.map(
        (doc) => doc.data().name,
      );

      // Filter products that are either 'cake' type OR match bakery types
      const filteredProducts = allProducts.filter((product) => {
        const productType = product.type?.toLowerCase();
        return (
          productType === "cake" ||
          bakeryTypes.some(
            (bakeryType) => bakeryType.toLowerCase() === productType,
          )
        );
      });

      return sortByCreatedAtDesc(filteredProducts);
    } catch (error) {
      console.error(
        "PUBLIC: Error getting products by cake and bakery types:",
        error,
      );
      throw error;
    }
  };

  const getProductById = async (id) => {
    try {
      const { db } = useClientFirebase();
      checkFirestore(db);
      const docRef = doc(db, "bakeryItems", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error("PUBLIC: Error getting product:", error);
      throw error;
    }
  };

  // Categories CRUD (Read-only for public)
  const getCategories = async () => {
    try {
      const { db } = useClientFirebase();
      checkFirestore(db);
      const querySnapshot = await getDocs(collection(db, "categories"));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("PUBLIC: Error getting categories:", error);
      throw error;
    }
  };

  const getCategoryById = async (id) => {
    try {
      const { db } = useClientFirebase();
      checkFirestore(db);
      const docRef = doc(db, "categories", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Category not found");
      }
    } catch (error) {
      console.error("PUBLIC: Error getting category:", error);
      throw error;
    }
  };

  // Get featured products (products marked as featured)
  const getFeaturedProducts = async () => {
    try {
      const { db } = useClientFirebase();
      checkFirestore(db);
      const q = query(
        collection(db, "bakeryItems"),
        where("featured", "==", true),
      );
      const querySnapshot = await getDocs(q);
      return sortByCreatedAtDesc(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    } catch (error) {
      console.error("PUBLIC: Error getting featured products:", error);
      throw error;
    }
  };

  // Real-time listeners
  const subscribeToProducts = (callback, category = null) => {
    const { db } = useClientFirebase();
    if (!db) return () => {};

    let q = collection(db, "bakeryItems");

    if (category) {
      q = query(q, where("category", "==", category));
    }

    return onSnapshot(q, (querySnapshot) => {
      const products = sortByCreatedAtDesc(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
      callback(products);
    });
  };

  const subscribeToCategories = (callback) => {
    const { db } = useClientFirebase();
    if (!db) return () => {};

    const q = collection(db, "categories");

    return onSnapshot(q, (querySnapshot) => {
      const categories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(categories);
    });
  };

  return {
    // Products
    getProducts,
    getProductsByCategory,
    getProductsByBakeryType,
    getProductsFilteredByBakeryTypes,
    getProductsByCakeAndBakeryTypes,
    getProductById,
    getFeaturedProducts,

    // Categories
    getCategories,
    getCategoryById,

    // Real-time subscriptions
    subscribeToProducts,
    subscribeToCategories,
  };
};
