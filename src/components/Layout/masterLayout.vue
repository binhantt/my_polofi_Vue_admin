<template>
    <div class="layout">
        <navbar/>
        <div class="content">
            <div class="sidebar">
                <sidebar/>
            </div>
            <main class="main">
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script>
import navbar from './navbar.vue';
import sidebar from './sidebar.vue';

export default {
    name: "masterLayout",
    components: {
        navbar,
        sidebar
    }
}
</script>

<style scoped>
.layout {
    min-height: 100vh;
}

.content {
    display: flex;
    height: calc(100vh - 57px);
}

.sidebar {
    width: 280px;
    border-right: 1px solid #eee;
}

.main {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
}
</style>