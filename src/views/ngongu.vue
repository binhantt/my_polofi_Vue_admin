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
                <div class="flex gap-3">
                    <button @click="beforePage(currentPage)" :disabled="currentPage === 1">Trang trước</button>
                    <div class="flex justify-center gap-3">
                        <div v-for="(i, index) in buttonpage(totalPages ,currentPage)" :key="index" class="flex gap-3 justify-between items-center">
                            <div>
                                <button @click="prevPage(i)" :class="{'text-blue-500': currentPage == i} ">{{ i }}</button>
                            </div>
                        </div>
                    </div>
                    <button :disabled="currentPage === 1" @click="nextPage(currentPage)">Trang sau</button>
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
import { ref, onMounted } from 'vue';
import MasterLayout from '../components/Layout/masterLayout.vue';
import { ngonngu } from '../store/ngonngu';
import { cols, modal, rows, table_font } from '../components/base';
import { useRoute } from 'vue-router';

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
        const selectedEle = ref({ name: "", bio: "" });
        const isEditOpen = ref(false);
        const isCreateOpen = ref(false);
        const itemsPerPage = ref(3);
        const items = ref([]);
        const currentPage = router.query.page ?? 1;
        const totalPages = ref() ; 
        const fetchData = async () => {
            await store.get();
            totalPages.value = Math.ceil(store.data.length / itemsPerPage.value);
            items.value = store.data.slice((currentPage - 1) * itemsPerPage.value, currentPage * itemsPerPage.value);
        };
        const buttonpage = (totalPages ,currentPage) => {
            const pageafter = [];
            const pagebefore = [];
            const pagecurrent = [];
            for (let i = 1; i <= totalPages; i++) {
                if (i <= currentPage ) {
                    pageafter.push(i);
                    if (pageafter.length > 3) {
                        pageafter.shift();
                        console.log(pageafter);
                    }
                }else{
                    pagebefore.push(i);
                    if (pagebefore.length > 2) {
                        pagebefore.pop();
                        console.log(pagebefore);
                    }
                }
            }
            return [...pageafter ,...pagebefore ,...pagecurrent ];
        };
        const prevPage = (id) => {
            window.location.href = `http://localhost:5173/admin/ngon-ngu?page=${id}`;
        };

        const nextPage = (id) => {
            const nowid = parseInt(id) + 1;
            if(nowid > totalPages.value) {
                return;
            }
            window.location.href = `http://localhost:5173/admin/ngon-ngu?page=${nowid}`;
        };

        const beforePage = (id) => {
            const nowid = parseInt(id) - 1;
            if(nowid < 1) {
                return;
            }
            window.location.href = `http://localhost:5173/admin/ngon-ngu?page=${nowid}`;
        };

        const deleteButton = async (index, id) => {
            store.data.splice(index, 1);
            await store.deleteId(id);
        };

        const openEditModal = (ele) => {
            if (isCreateOpen.value) return;
            selectedEle.value = { ...ele };
            isEditOpen.value = true;
        };

        const openCreateModal = () => {
            if (isEditOpen.value) return;
            selectedEle.value = { name: "", bio: "" };
            isCreateOpen.value = true;
        };

        const updateItem = async (id) => {
            await store.editProduct(id, selectedEle.value);
            await store.get();
            isEditOpen.value = false;
        };

        const createItem = async () => {
            try {
                await store.addProduct(selectedEle.value);
                await store.get();
                closeModal();
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
            items,
            itemsPerPage,
            prevPage,
            beforePage,
            buttonpage
        };
    },
};
</script>