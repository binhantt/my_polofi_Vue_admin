import axios from 'axios';
import { defineStore } from 'pinia';

export const product = defineStore('product', {
  state: () => ({
    count: 0,
    data: [],
  }),

  actions: {
    async get() {
      try {
        const req = await axios.get('http://localhost:8001/api/v1/admin/gioithieu');
        this.data = req.data;
        return this.data;
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        return [];
      }
    },

    async deleteId(id) {
      try {
        await axios.delete(`http://localhost:8001/api/v1/admin/gioithieu/xoa/${id}`);
        // Cập nhật state sau khi xóa
        this.data = this.data.filter(item => item.id !== id);
      } catch (error) {
        console.error('Có lỗi khi xóa dữ liệu:', error);
      }
    },

    async editProduct(id, data) {
      try {
        const response = await axios.put(`http://localhost:8001/api/v1/admin/gioithieu/sua/${id}`, data);
        // Cập nhật state sau khi sửa
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
          this.data[index] = response.data;
        }
      } catch (error) {
        console.error('Có lỗi khi cập nhật dữ liệu:', error);
      }
    },

    async addProduct(data) {
      try {
        const response = await axios.post('http://localhost:8001/api/v1/admin/gioithieu/them', data);
        // Thêm item mới vào state
        this.data.push(response.data);
      } catch (error) {
        console.error('Có lỗi khi thêm dữ liệu:', error);
      }
    }
  }
});
 