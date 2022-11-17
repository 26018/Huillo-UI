<template>
    <div>
        <div class="user">
            <div class="user-header">
                <div v-for="menu in menus" @click="goto(menu.path)">
                    {{ menu.name }}
                </div>
            </div>
            <div class="user_view">
                <router-view name="user_view"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import {goto} from '@/api/util'
import CoIcon from "@/components/co-components/co-icon";

export default {
    components: {CoIcon},
    data() {
        return {
            menus: [
                {
                    name:"Huillo",
                    path:"/create"
                },
                {
                    name: '收集记录',
                    path: '/user/record',
                },
                {
                    name: '我的模板',
                    path: '/user/mytemplates',
                },
                {
                    name: '创建收集',
                    path: '/user/templates',
                },
                {
                    name: "我的邮件",
                    path: "/user/mail"
                },
                {
                    name: '回收空间',
                    path: '/user/recycle',
                },
            ],
        }
    },
    methods: {
        goto,
        exit() {
            localStorage.removeItem('token')
            goto('/')
        },
    },
}
</script>
<style lang="css" scoped>
@import "@/common/style/user.css";
</style>
