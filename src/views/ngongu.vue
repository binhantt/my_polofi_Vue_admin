<template>
    <MasterLayout>
        <div class="container has-background-white w-full relative">
            <div class="has-background-success mt-3 py-3">
                <h1 class="has-text-white px-3">Giới thiệu</h1>
            </div>
            <div class="px-3 py-3">
                <button @click="openCreateModal" class="button has-background-success">Thêm</button>
            </div>
            <div class="px-3 py-3 relative">
                <table_font>
                    <cols>
                        <th class="w-full">ID</th>
                        <th class="w-full">Name</th>
                        <th class="w-full">Anh</th>
                        <th class="w-full">Thao tác</th>
                    </cols>
                    <cols v-for="(ele, index) in items" :key="index">
                        <rows>{{ ele.id }}</rows>
                        <rows>{{ ele.title }}</rows>
                        <rows><img :src="ele.icon_url" width="50"></rows>
                        <rows>
                            <div class="w-full flex gap-3">
                                <button @click="openEditModal(ele)" class="thaotac button is-link">Sửa</button>
                                <button @click="deleteButton(index, ele.id)" class="button is-danger">Xóa</button>
                            </div>
                        </rows>
                    </cols>
                </table_font>
                <div class=" flex gap-3">
                    <button @click="prevPage" :disabled="currentPage === 1">Trang trước</button>
                    <div class="flex justify-center ">
                        <div class=" flex  gap-3 justify-betweenr items-center">
                        <button class=" overscroll-none" @click="nextPage(i)"  v-for="(i, index) in totalPages " :key="index">
                            <span v-if="i < parseInt(currentPage) - 2">
                                {{ i }}
                            </span>
                            <span v-else-if="i == parseInt(currentPage)"
                                :class="{ 'text-red-500': i == currentPage }">{{ i }}</span>
                            <span v-else-if="i < parseInt(currentPage) + 2">{{ i }}</span>
                        </button>

                    </div>
                    </div>
                    <button :disabled="currentPage === totalPages">Trang sau</button>
                </div>

            </div>
        </div>

        <!-- Modal Sửa -->
        <modal v-if="isEditOpen" title="Sửa Giới Thiệu" namebutton="Sửa" @click="updateItem(selectedEle.id)"
            @close="closeModal" :modal_body="'gap-3 flex flex-col justify-center bg-white w-[50%]'">
            <input type="text" v-model="selectedEle.name" @click.stop
                class="w-full h-10 border-2 border-gray-300 rounded-md">
            <input type="text" v-model="selectedEle.bio" @click.stop
                class="w-full h-10 border-2 border-gray-300 rounded-md">
        </modal>

        <!-- Modal Thêm -->
        <modal v-if="isCreateOpen" title="Thêm Giới Thiệu" namebutton="Thêm" @click.stop="createItem"
            @close="closeModal" :modal_body="'gap-3 flex flex-col justify-center bg-white w-[50%]'">
            <input type="text" v-model="selectedEle.name" @click.stop
                class="w-full h-10 border-2 border-gray-300 rounded-md">
            <input type="text" v-model="selectedEle.bio" @click.stop
                class="w-full h-10 border-2 border-gray-300 rounded-md">
        </modal>
    </MasterLayout>
</template>

<script>
import { ref, onMounted, computed, watchEffect } from 'vue';
import MasterLayout from '../components/Layout/masterLayout.vue';
import { ngonngu } from '../store/ngonngu';
import { cols, modal, rows, table_font } from '../components/base';
import axios from 'axios';
import { useRoute } from 'vue-router'

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
        const router = useRoute();
        const store = ngonngu();
        const selectedEle = ref({ name: "", bio: "" }); // Biến chứa thông tin sản phẩm được chọn
        const isEditOpen = ref(false); // Biến kiểm tra xem modal "Sửa" có đang mở không
        const isCreateOpen = ref(false);  // Biến kiểm tra xem modal "Thêm" có đang mở không
        const totalPages = ref(10);
        const currentPage = router.query.page ?? 1;
        console.log("currentPage", currentPage);
        const fetchData = async () => {
            await store.get();

        };
       
        const nextPage = (id) => {
            window.location.href = `http://localhost:5173/admin/ngon-ngu?page=${id}`
        }
        const deleteButton = async (index, id) => {
            store.data.splice(index, 1);
            await store.deleteId(id);
        };

        const openEditModal = (ele) => {
            if (isCreateOpen.value) return; // Không mở nếu modal "Thêm" đang mở
            selectedEle.value = { ...ele };
            isEditOpen.value = true;
        };

        const openCreateModal = () => {
            if (isEditOpen.value) return; // Không mở nếu modal "Sửa" đang mở
            selectedEle.value = { name: "", bio: "" };
            isCreateOpen.value = true;
        };

        const updateItem = async (id) => {
            //console.log(selectedEle.value);
            await store.editProduct(id, selectedEle.value);
            await store.get();
            isEditOpen.value = false;
        };
        const createItem = async () => {
            try {
                await store.addProduct(selectedEle.value);
                await store.get();
                closeModal(); // Đóng modal ngay sau khi thêm
            } catch (error) {
                console.error("Lỗi khi thêm sản phẩm:", error);
            }
        };


        const closeModal = () => {
            isEditOpen.value = false;
            isCreateOpen.value = false;
        };

        onMounted(() => {
            fetchData();

        });

        return {
            store,
            isEditOpen,
            isCreateOpen,
            selectedEle,
            openEditModal,
            openCreateModal,
            updateItem,
            createItem,
            deleteButton,
            closeModal,
            currentPage,
            totalPages,
            nextPage,
        };
    },
};
</script>
