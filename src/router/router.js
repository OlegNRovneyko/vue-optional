import { createRouter, createWebHistory } from 'vue-router';
//import Dashboard from '../pages/dashboard/index.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/dashboard',
            name: 'dashboard',
            //component: Dashboard,
            component: () => import('@/pages/dashboard/index.vue'),
        },
        {
            path: '/posts',
            name: 'posts.index',
            component: () => import('@/pages/posts/index.vue'),
        },
    ],
});

export default router;