// Test Firebase Storage connection
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA-mTuHs5LPPthtSn5jFOe0hOQVpBI1Sj0",
  authDomain: "bakery-house-f7e32.firebaseapp.com",
  projectId: "bakery-house-f7e32",
  storageBucket: "bakery-house-f7e32.appspot.com",
  messagingSenderId: "617557360769",
  appId: "1:617557360769:web:b47a7378ac07ae9e940d80",
  measurementId: "G-SN3VG7L5XX"
};

async function testStorage() {
  try {
    console.log('🔧 Initializing Firebase app...');
    const app = initializeApp(firebaseConfig);

    console.log('🔧 Getting Storage instance...');
    const storage = getStorage(app);

    console.log('📁 Storage bucket:', storage.app.options.storageBucket);

    // Create a test file
    const testData = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in bytes
    const testRef = ref(storage, 'test/hello.txt');

    console.log('🔧 Testing upload to storage...');
    const snapshot = await uploadBytes(testRef, testData);
    console.log('✅ Upload successful! Path:', snapshot.ref.fullPath);

    console.log('🔧 Getting download URL...');
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('✅ Download URL generated:', downloadURL);

    console.log('🎉 Storage test passed! Firebase Storage is working correctly.');

  } catch (error) {
    console.error('❌ Storage test failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);

    if (error.code === 'storage/unknown') {
      console.log('\n💡 This error usually means:');
      console.log('   - Firebase Storage is not enabled in Firebase Console');
      console.log('   - Or storage bucket does not exist');
    }

    if (error.code === 'storage/unauthorized') {
      console.log('\n💡 This error usually means:');
      console.log('   - Storage security rules are blocking the operation');
      console.log('   - Authentication is required');
    }
  }
}

testStorage();