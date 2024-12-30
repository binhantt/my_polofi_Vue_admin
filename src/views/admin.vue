<template>
    <master-layout>
        <div class="container has-background-white	">
            <div class="has-background-success mt-3 py-3">
                <h1 class="has-text-white px-3">Home</h1>
            </div>
        </div>
    </master-layout>
</template>
<script>
import MasterLayout from '../components/Layout/masterLayout.vue';

export default {
    name: "admin",
    components: {
        MasterLayout
    }
}
</script>