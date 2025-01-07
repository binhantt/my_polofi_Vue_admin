<template>
    <MasterLayout>
        <div class="container has-background-white	">
            <div class="has-background-success mt-3 py-3">
                <h1 class="has-text-white px-3 ">Giới thiệu</h1>
            </div>
            <div class="px-3 py-3">
                <button class="button has-background-success">Them</button>
            </div>
            <div class="px-3 py-3">
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
                           <div class="w-full flex   gap-3">
                            <button class="button is-link">Sửa</button>
                            <button @click="deleteButton(index,ele.id)" :id="ele.id" class="button is-danger">Xóa</button>
                           </div>
                        </rows>
                    </cols>
                </table_font>
            </div>
        </div>

    </MasterLayout>
</template>
<script>
import { onMounted } from 'vue';
import MasterLayout from '../components/Layout/masterLayout.vue';
import { Product } from '../store/product';
import { cols, rows, table_font } from '../components/base';
import axios from 'axios';

export default {
    name: "Gioithieu",
    components: {
        MasterLayout,
        table_font,
        cols,
        rows
    },
    setup() {
        const store = Product();
        const api = async () => {
            await store.get();
            console.log('Fetched data:', store.data);
        };
         const deleteButton =  async (index ,id)=>{
            //xóa không loading
            store.data.splice(index, 1);
            // xóa database 
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