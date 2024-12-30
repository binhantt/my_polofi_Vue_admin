<template>
    <MasterLayout>
        <div class="container has-background-white	">

            <div class="has-background-success mt-3 py-3">
                <h1 class="has-text-white px-3 ">Giới thiệu</h1>
            </div>
            <div class="px-3 py-3">
                <button class="button has-background-success">Them</button>
            </div>
            <div v-if="Array.isArray(store.data) && store.data.length > 0" class="is-flex is-justify-content-center py-4">
                <div v-for="(item, index) in store.data" :key="index" class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img class="" :src="item.image_url" />
                        </figure>
                    </div>
                    <div class="card-content">
                            <div class="media-content">
                            
                                <h1>{{ item.title }}</h1>
                            </div>
                        </div>          
                    </div>
                </div>
            </div>
    
    </MasterLayout>
</template>
<script>
import { onMounted } from 'vue';
import MasterLayout from '../components/Layout/masterLayout.vue';
import { Product } from '../store/product';

export default {
    name: "Gioithieu",
    components: {
        MasterLayout
    },
    setup() {
        const store = Product();
        const api = async () => {
            await store.get();
            console.log('Fetched data:', store.data);
        };
        onMounted(() => {
            api();
        });
        return {
            store,
        }
    },
}
</script>