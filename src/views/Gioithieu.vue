<template>
    <MasterLayout>
        <div class="container has-background-white w-full relative">
            <div class="has-background-success mt-3 py-3">
                <h1 class="has-text-white px-3">Giới thiệu</h1>
            </div>
            <div class="px-3 py-3">
                <button class="button has-background-success ">Thêm</button>
            </div>
            <div class="px-3 py-3 relative">
                <table_font>
                    <cols>
                        <th class="w-full">ID</th>
                        <th class="w-full">Name</th>
                        <th class="w-full">Thao tác</th>
                    </cols>
                    <cols v-for="(ele, index) in store.data" :key="index">
                        <rows>{{ ele.id }}</rows>
                        <rows>{{ ele.name }}</rows>
                        <rows>
                            <div class="w-full flex gap-3">
                                <button @click="openModal(ele)" class="thaotac button is-link">Sửa</button>
                                <button @click="deleteButton(index, ele.id)" class="button is-danger">Xóa</button>
                            </div>
                        </rows>
                    </cols>
                </table_font>
            </div>
        </div>
          <modal v-if="open " title="Sửa Giới Thiệu" namebutton="Sửa" @click="updated(selectedEle.id)"  :modal_body="' flex flex-col p-3 gap-3'" @close="close" :modal_open="'absolute  flex justify-center bg-white'" >
            <input type="text" @click.stop v-model="selectedEle.name" class="w-full h-10 border-2 border-gray-300 rounded-md">
            <input type="text" @click.stop v-model="selectedEle.bio" class="w-full h-10 border-2 border-gray-300 rounded-md">
        </modal>
    </MasterLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import MasterLayout from '../components/Layout/masterLayout.vue';
import { Product } from '../store/product';
import { cols, modal, rows, table_font } from '../components/base';
import axios from 'axios';

export default {
    name: "Gioithieu",
    components: {
        MasterLayout,
        table_font,
        cols,
        rows,
        modal,
    },
    setup() {
        const store = Product();
        const open = ref(false);
        const selectedEle = ref({ name: "", bio: "" });
        const api = async () => {
            await store.get();
            console.log('Fetched data:', store.data);
        };
        const deleteButton = async (index, id) => {
            store.data.splice(index, 1);
            await store.deleteId(id);
        };
        const openModal =  (ele) => {
            selectedEle.value = { ...ele }; 
            open.value = true;
        };

        const updated = async (id ) => {
        try {
         await store.editProduct(id , selectedEle.value);
         await store.get();
            open.value = false;
        } catch (error) {
            console.log(error);
        }
           
        };

        // Đóng modal
        const close = () => {
            open.value = false;
        };

        onMounted(() => {
            api();
        });

        return {
            store,
            open,
            selectedEle,
            openModal,
            updated,
            close,
            deleteButton,
        };
    },
};
</script>
