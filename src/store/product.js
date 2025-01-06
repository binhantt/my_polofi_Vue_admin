import axios from 'axios';
import { defineStore } from 'pinia';

export const Product = defineStore('product', {
  state: () => ({
    count: 0,
    data: null,
  }),

  actions: {
    async get() {
        const [response, err] = await axios.get('http://localhost:3000/api/v1/user/sanpham');
        this.data = response.data;
        console.log('API call response:', response.data);      
    }
  }
});
