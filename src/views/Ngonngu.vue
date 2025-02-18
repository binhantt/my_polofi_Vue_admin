<template>
    <MasterLayout>
        <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-xl font-semibold">Quản lý ngôn ngữ</h1>
                <button @click="openCreateModal" 
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Thêm mới
                </button>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hình ảnh</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="(ele, index) in items" :key="index">
                            <td class="px-6 py-4 whitespace-nowrap">{{ ele.id }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ ele.title }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <img :src="ele.icon_url" class="w-10 h-10 object-cover rounded">
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex gap-2">
                                    <button @click="openEditModal(ele)" 
                                        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                        Sửa
                                    </button>
                                    <button @click="deleteButton(index, ele.id)" 
                                        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="flex justify-center items-center gap-4 mt-6">
                <button 
                    @click="beforePage(currentPage)" 
                    :disabled="currentPage === 1"
                    class="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                    Trang trước
                </button>
                
                <div class="flex gap-2">
                    <button 
                        v-for="(i, index) in page" 
                        :key="index"
                        @click="prevPage(i)"
                        class="px-3 py-1 rounded-lg"
                        :class="currentPage == i ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'"
                    >
                        {{ i }}
                    </button>
                </div>

                <button 
                    @click="nextPage(currentPage)"
                    :disabled="currentPage === totalPages"
                    class="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                    Trang sau
                </button>
            </div>
        </div>
              <!-- Modal Thêm -->
        <Modal 
            v-if="isCreateOpen" 
            title="Thêm ngôn ngữ"
            @close="closeModal"
            :model="selectedEle"
        >
            <div class="p-6 space-y-4">
                <form-input
                    v-model="selectedEle.title"
                    label="Tên ngôn ngữ"
                    placeholder="Nhập tên ngôn ngữ"
                    class="w-full"
                />
                <form-input
                    v-model="selectedEle.icon_url"
                    label="Icon URL"
                    placeholder="Nhập đường dẫn icon"
                    class="w-full"
                />
                <input type="file" @change="handleFileChange" class="w-full">
                <div class="flex justify-end mt-6">
                    <button
                        @click.stop="createItem"
                        class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Thêm mới
                    </button>
                </div>
            </div>
        </Modal>

        <!-- Modal Sửa -->
        <Modal 
            v-if="isEditOpen" 
            title="Sửa ngôn ngữ"
            @close="closeModal"
            :model="selectedEle"
        >
            <div class="p-6 space-y-4">
                <form-input
                    v-model="selectedEle.title"
                    label="Tên ngôn ngữ"
                    placeholder="Nhập tên ngôn ngữ"
                    class="w-full"
                />
                <form-input
                    v-model="selectedEle.icon_url"
                    label="Icon URL" 
                    placeholder="Nhập đường dẫn icon"
                    class="w-full"
                />
                <div class="flex justify-end mt-6">
                    <button
                        @click.stop="updateItem(selectedEle.id)"
                        class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
        </Modal>
      
    </MasterLayout>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import MasterLayout from '../components/Layout/masterLayout.vue';
import { ngonngu } from '../store/ngonngu';
import { cols, modal, rows, table_font } from '../components/base';
import { useRoute, useRouter } from 'vue-router';
import FormInput from '../components/base/FormInput.vue';
import Modal from '../components/base/modal.vue';

export default {
    name: "Ngonngu",
    components: {
        MasterLayout,
        table_font,
        cols,
        rows,
        Modal,
        FormInput,
        Modal
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = ngonngu();
        const selectedEle = ref({ 
            title: "",
            icon_url: ""
        });
        const isEditOpen = ref(false);
        const isCreateOpen = ref(false);
        const itemsPerPage = ref(3);
        const items = ref([]);
        const page = ref([])
        const searchText = ref("");
        const currentPage = ref(parseInt(route.query.page) || 1);
        const totalPages = ref();
        const totalItems = ref(0);

        const updatePageData = () => {
            if (!store.data) return;           
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;      
            items.value = store.data.slice(start, end);
            totalPages.value = Math.ceil(store.data.length / itemsPerPage.value);
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
            try {
                console.log(id)
                await store.deleteId(id);

                // Tải lại dữ liệu sau khi xóa
                await fetchData(currentPage.value);
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
            }
        };

        const openEditModal = (ele) => {
            if (isCreateOpen.value) return;
            selectedEle.value = { ...ele };
            isEditOpen.value = true;
        };

        const openCreateModal = () => {
            if (isEditOpen.value) return;
            selectedEle.value = { 
                title: "",
                icon_url: ""
            };
            isCreateOpen.value = true;
        };

        const updateItem = async (id) => {
            try {
                await store.editProduct(id, selectedEle.value);
                // Tải lại dữ liệu sau khi cập nhật
                await fetchData(currentPage.value);
                isEditOpen.value = false;
            } catch (error) {
                console.error("Lỗi khi cập nhật:", error);
            }
        };

        const createItem = async () => {
            try {
                await store.addProduct(selectedEle.value);
                // Tải lại dữ liệu sau khi thêm
                await fetchData(currentPage.value);
                closeModal();
            } catch (error) {
                console.error("Lỗi khi thêm:", error);
            }
        };

        const closeModal = () => {
            isEditOpen.value = false;
            isCreateOpen.value = false;
        };

        const onItemsPerPageChange = async () => {
            // Reset về trang 1 khi thay đổi số items/trang
            currentPage.value = 1;
            await fetchData(1);
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
            totalItems,
            onItemsPerPageChange,
        };
    },
};
</script>