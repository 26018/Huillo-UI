<template>
    <div>
        <div class="user">
            <div class="user-header">
                <div v-for="(menu,index) in menus" @click="userNavClick(menu)" :id="'userNav:'+menu.name"
                     :style="menu.style">
                    {{ menu.name }}
                </div>
            </div>
            <div class="user_view" :style="{height:viewHeight(isMobile() ? 50:0)}">
                <router-view name="user_view"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import {goto, isMobile, viewHeight} from '@/api/util'
import CoIcon from "@/components/co-icon";

export default {
    components: {CoIcon},
    data() {
        return {
            menus: [
                {name: "返回创建", path: "/create", style: {'color': 'gray'}, dontChange: true},
                {name: '收集记录', path: '/manager/record'},
                {name: '提交记录', path: '/manager/commit-record'},
                {name: '我的群组', path: '/manager/group'},
                {name: '回收空间', path: '/manager/recycle'},
            ],
        }
    },

    methods: {
        isMobile,
        viewHeight,
        exit() {
            localStorage.removeItem('token')
            goto('/')
        },

        userNavClick(clickMenu) {
            this.menus.forEach(menu => {
                let dom = document.getElementById('userNav:' + menu.name)
                if (menu.name == clickMenu.name) {
                    dom.style.color = '#409EFF';
                } else if (!menu.dontChange) {
                    dom.style.color = 'black'
                }
            })
            goto(clickMenu.path)
        },

        // 加载当前路由导航的颜色
        currentNav() {
            let path = this.$route.path
            this.menus.forEach(menu => {
                if (path.startsWith(menu.path)){
                    menu.style = {
                        'color': '#409EFF',
                    }
                }
            })
        }
    },
    created() {
        this.currentNav();
    }
}
</script>
<style lang="css" scoped>
@import "@/common/style/templates/manager/user.css";
</style>
