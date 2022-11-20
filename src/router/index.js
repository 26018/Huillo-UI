import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        components: {main_view: () => import('@/components/templates/Home')},
        redirect: 'index',
        children: [
            {path: 'index', components: {content: () => import('@/views')}},
            {path: 'create', components: {content: () => import('@/views/pages/create/create')}},
        ],
    },
    {
        path: '/manager',
        components: {main_view: () => import('@/components/templates/User')},
        redirect: '/manager/record',
        children: [
            {
                path: 'record',
                components: {
                    user_view: () => import('@/views/pages/manager/record'),
                },
            },
            {
                path: 'templates',
                components: {
                    user_view: () => import('@/views/pages/manager/templates'),
                },
            },
            {
                path: 'mytemplates',
                components: {
                    user_view: () => import('@/views/pages/manager/my-template'),
                },
            },
            {
                path: 'recycle',
                components: {
                    user_view: () => import('@/views/pages/manager/recycle'),
                },
            },

            {
                path: 'details',
                components: {
                    user_view: () => import('@/views/pages/manager/template-details'),
                },
            },
            {
                path: 'group',
                components: {
                    user_view: () => import('@/views/pages/manager/group'),
                },
            },
            {
                path: 'mail',
                components: {
                    user_view: () => import('@/views/pages/manager/mail')
                }
            }
        ],
    },
    {
        path: '/submit/:id',
        components: {
            main_view: () => import('@/views/pages/submit/Submit'),
        },
    },
    {
        path: '/login',
        components: {
            main_view: () => import('@/views/user/Login'),
        },
    },
    {
        path: '/register',
        components: {
            main_view: () => import('@/views/user/Register'),
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
