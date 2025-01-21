<template>
    <MasterLayout>
        <div class="container has-background-white	">
            <div class="has-background-success mt-3 py-3">
                <h1 class="has-text-white px-3 ">Giới thiệu</h1>
            </div>
            <div class="px-3 py-3">
                <button class="button has-background-success">Them</button>
            </div>
            <div class="px-3 py-3  relative">
                <table_font>
                    <cols>
                        <th class="w-full"> id</th>
                        <th class="w-full"> name </th>
                        <th class="w-full"> thao tac</th>
                    </cols>
                    <cols v-for="(ele, index ) in store.data" :key="index">
                        <rows> {{ ele.id }}</rows>
                        <rows> {{ ele.name }}</rows>
                        <rows> 
                           <div class="w-full flex    gap-3">
                            <button @click="openModal()" :id="'edit-'+ele.id"  class=" thaotac button is-link">Sửa</button>
                            <button @click="deleteButton(index,ele.id)" :id="ele.id" class="button is-danger">Xóa</button>
                           </div>
                        </rows>
                    </cols>
                </table_font>
                <div class=""  v-for="(ele, index ) in store.data" :key="index">
                    <modal  title="SUa Gioi Thieu  " namebutton="Sua" :modal_open="'edit-'+ele.id + ' '+ 'hidden absolute w-full h-full bg-white thao-tac btn-close     ' "   @close="close()"  >
                        <input type="text ">
                    </modal>
                </div>
            </div>
        </div>
    </MasterLayout>
</template>
<script>
import { onMounted } from 'vue';
import MasterLayout from '../components/Layout/masterLayout.vue';
import { Product } from '../store/product';
import { cols, modal, rows, table_font } from '../components/base';
import axios from 'axios';
import $ from 'jquery';
import modaljs from '../util/modal';
export default {
    name: "Gioithieu",
    components: {
        MasterLayout,
        table_font,
        cols,
        rows , 
        modal , 
    },
    methods: {
        openModal() {
            modaljs();
        },
        close(){
            modaljs(); 
        }
    },
    setup() {
        const store = Product();
        const api = async () => {
            await store.get();
            console.log('Fetched data:', store.data);
        };
         const deleteButton =  async (index ,id)=>{
            store.data.splice(index, 1);
           await store.deleteId(id )
            
        }
        onMounted(() => {
            api();
        });
        return {
            store,
            deleteButton
        }
    },

    
    
}
</script>