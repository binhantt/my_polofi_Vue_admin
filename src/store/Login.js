import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // Trạng thái người dùng (ví dụ: null hoặc đối tượng người dùng)
    token: localStorage.getItem('token') || null, // Lưu token từ localStorage
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token); // Lưu token vào localStorage
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token'); // Xóa token khi logout
    },
  },
});
