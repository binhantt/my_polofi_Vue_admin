<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
                Đăng nhập admin
            </h1>
            <fornt 
                :attribute="'space-y-4'"
                @submit.prevent="handleLogin"
            >
                <FormInput
                    v-model="formData.email"
                    label="Tài khoản"
                    type="email" 
                    placeholder="Nhập email của bạn"
                />
                <FormInput
                    v-model="formData.password"
                    label="Mật khẩu"
                    type="password"
                    placeholder="Nhập mật khẩu"
                />
                <div v-if="loginMessage" 
                    :class="[
                        'p-3 rounded text-sm',
                        loginMessageClass
                    ]"
                >
                    {{ loginMessage }}
                </div>
                <button
                    @click="handleLogin"
                    type="button"
                    :class="[
                        'w-full py-2 px-4 rounded',
                        'bg-blue-600 hover:bg-blue-700',
                        'text-white font-medium',
                        'transition duration-200',
                        {'opacity-75 cursor-not-allowed': isLoading}
                    ]"
                    :disabled="isLoading"
                >
                    {{ isLoading ? 'Đang xử lý...' : 'Đăng nhập' }}
                </button>
                <div class="mt-4 relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                    </div>
                </div>
                <button
                    type="button"
                    @click="handleGoogleLogin" 
                    class="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 rounded border border-gray-300 bg-white hover:bg-gray-50 transition duration-200"
                >
                    <img src="https://www.google.com/favicon.ico" alt="Google" class="w-5 h-5">
                    <span class="text-gray-700">Đăng nhập với Google</span>
                </button>
            </fornt>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { FormInput } from '../components/base';
import fornt from '../components/base/fornt.vue';

export default {
    name: "Login",
    components: {
        FormInput,
        fornt
    },
    data() {
        return {
            formData: {
                email: '',
                password: ''
            },
            isLoading: false,
            loginMessage: '',
            loginMessageClass: '',
        };
    },
    methods: {
        async handleLogin() {
            this.isLoading = true;
            this.loginMessage = '';
            
            try {
                const response = await axios.post("http://localhost:8001/api/v1/admin/login", {
                    email: this.formData.email,
                    password: this.formData.password,
                });
                
                if (response.data.success) {
                    this.loginMessage = 'Đăng nhập thành công!';
                    this.loginMessageClass = 'bg-green-100 text-green-800';
                    
                }
            } catch (error) {
                this.loginMessage = error.response?.data?.message || 'Đã xảy ra lỗi khi đăng nhập';
                this.loginMessageClass = 'bg-red-100 text-red-800';
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>