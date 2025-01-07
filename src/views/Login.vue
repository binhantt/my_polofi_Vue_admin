<template>
    <div class="is-flex is-justify-content-center	is-align-items-center " style="height: 100vh; width: 100vw; ">
        <div class="flex justify-center flex-col items-center  w-[25%] h-[50%] rounded-full has-background-success	">
            <div class="flex justif-center font-bold">
                Đăng nhập admin
            </div>
            <fornt :@submit="login" :button="'Đăng nhập'"
                :attribute="'is-four-fifths is-column is-center flex flex-col py-3 gap-3'">
                <inputfornt v-model="e" label="Tài khoản " lable_name="email" type="text" placeholder="Email"
                    attribute1="w-[70%] px-2 py-3" />
                <inputfornt v-model="p" label="Mật khẩu" lable_name="password" type="password" placeholder="Password"
                    attribute1="w-[70%] px-2 py-3" />
                <div v-if="loginMessage" :class="loginMessageClass">
                    {{ loginMessage }}
                </div>
                <button @click="Login()" type="button" class=""> Đăng nhập </button>
            </fornt>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { inputfornt, fornt } from '../components/base';
export default {
    name: "Login",
    components: {
        inputfornt,
        fornt
    },
    data() {
        return {
            e: null,
            p: null,
            isLoading: false,
            loginMessage: '',
            loginMessageClass: '',
        };
    },
    methods: {
        Login() {
           
            axios.get("http://localhost:8001/api/v1/admin/gioithieu", {
                email: this.e,
                password: this.p,
            },
            )

        }
    }

}
</script>