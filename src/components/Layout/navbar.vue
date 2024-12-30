<template>
    <div class=" is-fluid">
        <div class="py-3 px-2 has-background-success is-flex  is-justify-content-space-between">
            <div class="is-flex is-align-items-center">
                <figure class="image image is-48x48">
                    <img :src="logo" class="w-5" />
                </figure>
                <h1 class="title is-5"> BinhAnTT </h1>
            </div>
            <div class="is-flex is-align-items-center" style="gap: 0.5rem;">
                <p class="has-text-white-bis">Admin</p>
                <figure class="image is-48x48 is-flex is-align-items-center">
                    <img class="is-rounded" src="https://bulma.io/assets/images/placeholders/128x128.png" />

                </figure>
            </div>
        </div>
    </div>
</template>
<script>
import logo from '../../assets/logo.png';
export default {
    name: "navbar",
    data() {
        return {
            logo: logo
        }
    }
}
</script>