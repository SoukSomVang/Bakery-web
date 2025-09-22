// Test the useFirebase composable
import { db } from './shared-configs/firebase-config.js';
import { collection, addDoc } from 'firebase/firestore';

async function testUseFirebase() {
  try {
    console.log('🔧 Testing useFirebase functionality...');
    console.log('📊 Database object:', db ? 'initialized' : 'null');

    if (!db) {
      console.error('❌ Database is null');
      return;
    }

    console.log('🔧 Testing adding a document...');
    const testData = {
      name: 'Test Croissant',
      type: 'Pastries',
      price: 15000,
      description: 'Test item from useFirebase test',
      imageUrl: 'https://via.placeholder.com/400x300?text=Test+Item',
      createdAt: new Date()
    };

    const docRef = await addDoc(collection(db, 'bakeryItems'), testData);
    console.log('✅ Document added successfully! ID:', docRef.id);

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
  }
}

testUseFirebase();