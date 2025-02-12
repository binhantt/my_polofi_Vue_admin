<template>
    <aside class="menu  ">
        <p class="menu-label"> Danh sach </p>
  <ul class="menu-list has-background-success ">
    <li><router-link to="/admin" class="has-background-success has-text-white-bis">Trang Chủ</router-link>  </li>
    <li><router-link to="/admin/gioi-thieu"  class="has-background-success	has-text-white-bis">Giới thiệu  </router-link></li>
    <li><a class="has-background-success	has-text-white-bis">Liên hệ   </a></li>
    <li><router-link to="/admin/ngon-ngu" class="has-background-success	has-text-white-bis">Ngôn ngữ đã học </router-link></li>
  </ul>
    </aside>
</template>
<script>
export default {
    name: "sibar"
}
</script>