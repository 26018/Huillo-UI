<template>
  <div>
    <div class="user">
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
    }
  },

  components: {},

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

.user {
  display: flex;
  height: 100%;
  /* overflow: auto; */
}

.left-bar {
  width: 10%;
  height: 100%;
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
  background-color: rgb(245,108,108);
  height: 40px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.exit > div:hover{
  color: white;
  transition: 0.5s;
  transform: scale(1.01);
}

.user-content {
  width: 90%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px;
}
</style>
