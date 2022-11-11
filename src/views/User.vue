<template>
    <div>
        <div class="user">

            <div class="mobileHeader">
                <el-dropdown>
                    <span class="el-dropdown-link">
                    菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div style="display: flex;align-items: center;justify-content: center;width: 100%;border: 0px solid red;">当前菜单项</div>
                <div style="margin-left: auto;
                display: flex;
                align-items: center;
                margin-right: 10px;" @click="goto('/create')">Huillo
                </div>
            </div>

            <div class="left-bar">
                <div @click="goto('/create')"
                     class="index">Huillo
                </div>
                <div v-for="(i, index) in menus"
                     :id="'nav' + index"
                     :key="index"
                     @click="chooseItem(i.path, index)">{{ i.name }}
                </div>
                <div class="exit">
                    <div>退出登录</DIV>
                </div>
            </div>
            <div class="user-content">
                <router-view name="user_view"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import {goto} from '@/api/util'

export default {
    data() {
        return {
            menus: [
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
                    name: '回收空间',
                    path: '/user/recycle',
                },
            ],
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: ''
        }
    },
    computed: {},
    mounted() {
        let page = '/user/record'
        // document.getElementById('nav' + index).style.backgroundColor = 'rgb(225,226,231)'
        goto(page)
    },
    methods: {
        goto,
        chooseItem(val, index) {
            let length = this.menus.length
            // for (let idx = 0; idx < length; idx++) {
            //   if (idx == index) {
            //     localStorage.setItem('currentNavIndex', index)
            //     localStorage.setItem('currentNavPath', val)
            //     document.getElementById('nav' + idx).style.backgroundColor =
            //       'rgb(225,226,231)';
            //     document.getElementById("nav" + idx).style.color = "rgb(29,99,255)";
            //   } else {
            //     document.getElementById('nav' + idx).style.backgroundColor = 'rgb(238,239,241)';
            //     document.getElementById("nav" + idx).style.color = "black";
            //   }
            // }
            goto(val)
        },
        exit() {
            localStorage.removeItem('token')
            goto('/')
        },
    },
}
</script>
<style lang="css" scoped>
.index {
    background-color: rgb(29, 99, 255);
    color: white;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.user {
    display: flex;
    height: 100%;

}

.left-bar {
    width: 10%;
    height: 100%;
    font-size: 0.8rem;
    user-select: none;
    background-color: rgb(238, 239, 241);
    position: relative;
}

.left-bar > div {
    width: 80%;
    height: 40px;
    margin: 10px auto;
    border-radius: 4px;
}

.left-bar > *:hover {
    background-color: rgb(225, 226, 231);
    color: rgb(29, 99, 255);
    cursor: pointer;
}

.left-bar > * {
    font-weight: 500;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.index:hover {
    transform: scale(1.1);
    transition: all 0.5s;
    background-color: rgb(29, 99, 255);
    color: white;
}

.exit {
    position: absolute;
    color: white;
    font-family: sans-serif;
    bottom: 0px;
    width: 100% !important;
}

.exit > div {
    width: 80%;
    background-color: rgb(245, 108, 108);
    height: 40px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.exit > div:hover {
    color: white;
    transition: 0.5s;
    transform: scale(1.01);
}

.user-content {
    width: 100%;
    overflow: auto;
    /*box-sizing: border-box;*/
}

.mobileHeader {
    display: none;
}

@media screen and (max-width: 992px) {
    .left-bar {
        width: 20%;
        height: 100%;
        font-size: 0.8rem;
        user-select: none;
        background-color: rgb(238, 239, 241);
        position: relative;
        display: none;
    }

    .mobileHeader {
        display: flex;
        /*border: 1px solid red;*/
        width: 100%;
        height: 50px;
    }

    .mobileHeader >>> .el-dropdown {
        /*border: 1px solid red;*/
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
    }

    .user {
        display: flex;
        height: 100%;
        flex-direction: column;
    }
}
</style>
