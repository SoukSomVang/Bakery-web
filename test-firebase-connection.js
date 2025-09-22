// Test Firebase connection directly
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA-mTuHs5LPPthtSn5jFOe0hOQVpBI1Sj0",
  authDomain: "bakery-house-f7e32.firebaseapp.com",
  projectId: "bakery-house-f7e32",
  storageBucket: "bakery-house-f7e32.appspot.com",
  messagingSenderId: "617557360769",
  appId: "1:617557360769:web:b47a7378ac07ae9e940d80",
  measurementId: "G-SN3VG7L5XX"
};

async function testFirestore() {
  try {
    console.log('🔧 Initializing Firebase app...');
    const app = initializeApp(firebaseConfig);

    console.log('🔧 Getting Firestore instance...');
    const db = getFirestore(app);

    console.log('🔧 Testing read operation...');
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    console.log('✅ Read operation successful. Documents found:', snapshot.size);

    console.log('🔧 Testing write operation...');
    const docRef = await addDoc(collection(db, 'test'), {
      message: 'Hello from test script',
      timestamp: new Date()
    });
    console.log('✅ Write operation successful. Document ID:', docRef.id);

    console.log('🎉 All tests passed! Firestore is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);

    if (error.code === 'failed-precondition') {
      console.log('\n💡 This error usually means:');
      console.log('   - Firestore is in Datastore mode (need Native mode)');
      console.log('   - Or Firestore is not enabled in Firebase Console');
    }

    if (error.code === 'permission-denied') {
      console.log('\n💡 This error usually means:');
      console.log('   - Firestore security rules are blocking the operation');
      console.log('   - Authentication is required but not provided');
    }
  }
}

testFirestore();