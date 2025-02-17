<template>
    <MasterLayout>
        <div class="container has-background-white w-full relative">
            <div class="has-background-success mt-3 py-3">
                <h1 class="has-text-white px-3">Ngôn ngữ dã học </h1>
            </div>
            <div class="px-3 py-3 flex  justify-between" >
                <button @click="openCreateModal" class="button has-background-success">Thêm</button>
                <div class="border-2 px-3 py-2">
                    <input type="text" @keydown.enter="searchClick" v-model="searchText">

                </div>
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
                        <div v-for="(i, index) in  page" :key="index" class="flex gap-3 justify-between items-center">
                            <div>
                                <button @click="prevPage(i)" :class="{'text-blue-500': currentPage == i} ">{{ i }}</button>
                            </div>
                        </div>
                    </div>
                    <button :disabled="currentPage === totalPages" @click="nextPage(currentPage)">Trang sau</button>
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
import { ref, onMounted, watch } from 'vue';
import MasterLayout from '../components/Layout/masterLayout.vue';
import { ngonngu } from '../store/ngonngu';
import { cols, modal, rows, table_font } from '../components/base';
import { useRoute, useRouter } from 'vue-router';

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
        const route = useRoute();
        const router = useRouter();
        const store = ngonngu();
        const selectedEle = ref({ name: "", bio: "" });
        const isEditOpen = ref(false);
        const isCreateOpen = ref(false);
        const itemsPerPage = ref(3);
        const items = ref([]);
        const page = ref([])
        const searchText = ref("");
        const currentPage = ref(parseInt(route.query.page) || 1);
        const totalPages = ref();

        const updatePageData = () => {
            totalPages.value = Math.ceil(store.data.length / itemsPerPage.value);
            items.value = store.data.slice((currentPage.value-1) * itemsPerPage.value, currentPage.value * itemsPerPage.value);
            page.value = buttonpage(totalPages.value, currentPage.value);
        };

        const fetchData = async () => {
            await store.get();
            updatePageData();
        };

        watch(() => route.query.page, (newPage) => {
            currentPage.value = parseInt(newPage) || 1;
            updatePageData();
        });

        const buttonpage = (totalPages, currentPage) => {
            const pageafter = [];
            const pagebefore = [];          
            for (let i = 1; i <= totalPages; i++) {
                if(i <= parseInt(currentPage)) {
                    pageafter.push(i);
                    if(pageafter.length > 3) {
                        pageafter.shift();
                    }
                } else {
                    pagebefore.push(i);
                    if(pagebefore.length > 2) {
                        pagebefore.pop();
                    }
                }
            }
            return [...pageafter, ...pagebefore];   
        };

        const prevPage = (id) => {
            const page = parseInt(id);
            if(page > totalPages.value) return;
            router.push({ path: '/admin/ngon-ngu', query: { page }});
        };

        const nextPage = (id) => {
            const page = parseInt(id) + 1;
            if(page > totalPages.value) return;
            router.push({ path: '/admin/ngon-ngu', query: { page }});
        };

        const beforePage = (id) => {
            const page = parseInt(id) - 1;
            if(page < 1) return;
            router.push({ path: '/admin/ngon-ngu', query: { page }});
        };
        const searchClick =  () => {
            console.log(searchText.value)
        }
        const deleteButton = async (index, id) => {
            store.data.splice(index, 1);
            await store.deleteId(id);
            updatePageData();
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
            updatePageData();
            isEditOpen.value = false;
        };

        const createItem = async () => {
            try {
                await store.addProduct(selectedEle.value);
                await store.get();
                updatePageData();
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
            page,
            itemsPerPage,
            prevPage,
            beforePage,
            buttonpage,
        };
    },
};
</script>