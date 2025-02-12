import axios from 'axios';
import { defineStore } from 'pinia';

export const Product = defineStore('product', {
  state: () => ({
    count: 0,
    data: null,
  }),

  actions: {
    async get() {
       const req =  await axios.get('http://localhost:8001/api/v1/admin/gioithieu');
        this.data = req.data;
        console.log('API call response:', this.data);      
    },
     async deleteId(id) {
      try {
        await axios.delete(`http://localhost:8001/api/v1/admin/gioithieu/xoa/${id}`);
        console.log('Item deleted:', id);
      } catch (error) {
        console.error('Có lỗi khi xóa dữ liệu:', error);
      }
    },
    async  editProduct(id , data) {
      try {
        await axios.put(`http://localhost:8001/api/v1/admin/gioithieu/sua/${id}`, data);
        console.log('Item updated:', id);
      } catch (error) {
        console.error('Có lỗi khi cập nhật dữ liệu:', error);
      }
    },
  }
});
 