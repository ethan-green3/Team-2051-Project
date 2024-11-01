// src/stores/productStore.js
import { reactive } from 'vue';

export const productStore = reactive({
  products: [
    // Sample products for testing purposes
    { name: 'Universal Protein', category: 'Universal', price: 29.99, description: 'High-quality protein', itemCode: 'UP123', stockSize: 50, storeAvailability: 'Available', productPhotos: '' },
    { name: 'Repp BCAA', category: 'Repp Sports', price: 19.99, description: 'BCAA for muscle recovery', itemCode: 'RB456', stockSize: 30, storeAvailability: 'Available', productPhotos: '' },
    // Add more products as needed
  ],
});
