<template>
    <div>
        <navbar/>
        <div class="is-flex">
            <Sibar style="height: 89vh;" class="has-background-success column is-one-fifth"/>
            <slot></slot>
        </div>
    </div>
</template> 
<script>
import navbar from './navbar.vue';
import Sibar from './sibar.vue';
import { useCounterStore } from '../../store/User';
import { onMounted } from 'vue';
export default {
    name:"masterLayout",   
    components:{
        navbar, 
        Sibar
    },
    setup(){
        const store = useCounterStore();
        const api = async () => {
            await store.get(); 
        };
        onMounted(() => {
            api();
        });
        return{
           api,
        }
    }
}
</script>