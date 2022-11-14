<template>
    <div>
        <div class="user">
            <div class="mobileHeader">
                <ul>
                    <li class="dropdown">
                        <div @click="navClick()" class="dropbtn">我的</div>
                        <div class="dropdown-content" v-show="showList">
                            <div v-for="menu in menus" @click="gotoXX(menu.path)">{{ menu.name }}</div>
                        </div>
                    </li>
                </ul>
                <div @click="goto('/create')"
                     style="display: flex;align-items: center;
                     margin-left: auto;padding-right: 20px">Huillo
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
import CoIcon from "@/components/co-components/co-icon";

export default {
    components: {CoIcon},
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

            showList: false,

        }
    },
    computed: {},
    mounted() {
        let page = '/user/record'
        // document.getElementById('nav' + index).style.backgroundColor = 'rgb(225,226,231)'
        goto(page)
        // this.showList = true
        console.log(this.showList)
    },
    methods: {
        navClick() {
            this.showList = !this.showList;
            console.log(this.showList)
        },
        goto,
        gotoXX(path) {
            this.showList = false;
            goto(path);
        },
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

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
}

li {
    float: left;
}

li div, .dropbtn {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}


li.dropdown {
    display: inline-block;
}

.dropdown-content {

    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 999;
}

.dropdown-content div {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    /*z-index: 999;*/
}

.dropdown-content div:hover {
    background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
    display: block;
}

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
    /*height: 100%;*/
    /*border: 1px solid red;*/
    /*position: relative;*/
    /*overflow: hidden;*/
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
    height: 80%;
    /*border: 1px solid red;*/
}

.mobileHeader {
    display: none;
}

@media screen and (max-width: 992px) {
    .left-bar {
        display: none;
    }

    .mobileHeader {
        display: flex;
        width: 100%;
        height: 50px;
        /*position: sticky;*/
        top: 0;
        z-index: 999;
    }

    .user {
        display: flex;
        /*height: 100%;*/
        width: 100%;
        /*overflow: hidden;*/
        flex-direction: column;
        /*border: 1px brown solid;*/
    }
}
</style>
