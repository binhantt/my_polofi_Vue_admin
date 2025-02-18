import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/admin",
        name: "adimn",
        component: () => import("../views/admin.vue")
    },
    {
        path: "/admin/gioi-thieu",
        name: "adimn gioi thieu",
        component: () => import("../views/Gioithieu.vue"),
    }, 
    {
        path: "/admin/ngon-ngu",
        name: "adimn ngon ngu",
        component: () => import("../views/Ngonngu.vue"),
    }, 
    {
        path: "/", 
        name: "Login" , 
        component: () => import("../views/Login.vue"),
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;