<template>
    <aside class="menu">
        <div class="menu-header">
            <h1 class="title">MDB</h1>
        </div>
        <ul class="menu-list">
            <li v-for="(item, index) in menuItems" :key="index">
                <router-link :to="item.path" class="menu-item">
                    {{ item.name }}
                    <span class="icon">
                        <i class="fas fa-chevron-down"></i>
                    </span>
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script>
import { ref } from 'vue'

export default {
    name: "sibar",
    setup() {
        const menuItems = ref([
            {
                name: 'Giới thiệu',
                path: '/admin/gioi-thieu'
            },
            {
                name: 'Ngôn ngữ',
                path: '/admin/ngon-ngu'
            },
            {
                name: 'MDB Pro',
                path: '/admin/mdb-pro'
            },
            {
                name: 'CLI & hosting',
                path: '/admin/cli-hosting'
            },
            {
                name: 'Layout',
                path: '/admin/layout'
            },
            {
                name: 'Content & styles',
                path: '/admin/content-styles'
            },
            {
                name: 'Navigation',
                path: '/admin/navigation'
            }
        ])

        return {
            menuItems
        }
    }
}
</script>
