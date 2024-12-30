import axios from 'axios';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    data: null,
  }),

  actions: {
    async get() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/gioithieu');
        this.data = response.data;
        console.log('API call response:', response.data); 
      } catch (error) {
        console.error('API call error:', error);
      }
    }
  }
});
