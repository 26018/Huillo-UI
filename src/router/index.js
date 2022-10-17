import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        components: { main_view: () => import('@/views/Home') },
        redirect: 'index',
        children: [
            { path: 'index', components: { content: () => import('@/views/Test') } },
            { path: 'create', components: { content: () => import('@/views/CreateTemplate') } },
        ],
    },
    {
        path: '/user',
        components: { main_view: () => import('@/views/User') },
        redirect: '/user/record',
        children: [
            {
                path: 'record',
                components: {
                    user_view: () => import('@/components/user-management/record'),
                },
            },
            {
                path: 'templates',
                components: {
                    user_view: () => import('@/components/user-management/templates'),
                },
            },
            {
                path: 'mytemplates',
                components: {
                    user_view: () => import('@/components/user-management/my-template'),
                },
            },
            {
                path: 'recycle',
                components: {
                    user_view: () => import('@/components/user-management/recycle'),
                },
            },

            {
                path: ':id/details',
                components: {
                    user_view: () => import('@/components/user-management/template-details'),
                },
            },
        ],
    },
    {
        path: '/submit',
        components: {
            main_view: () => import('@/views/Submit'),
        },
    },
    {
        path: '/login',
        components: {
            main_view: () => import('@/views/Login'),
        },
    },
    {
        path: '/register',
        components: {
            main_view: () => import('@/views/Register'),
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
