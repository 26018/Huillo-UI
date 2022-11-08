<template>
  <div>
    <div class="user">
      <div class="left-bar">
        <div @click="goto('/create')"
             class="index">Huillo</div>
        <div v-for="(i, index) in menus"
             :id="'nav' + index"
             :key="index"

             @click="chooseItem(i.path, index)">{{ i.name }}</div>
        <div class="exit">
          <el-button @click="exit"
                     type="danger">退出登录</el-button>
        </div>
      </div>
      <div class="user-content">
        <router-view name="user_view"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { goto } from '@/api/util'
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
    let index = 0
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
  background-color: rgb(29,99,255);
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
  background-color: rgb(238,239,241);
  border-right: 2px solid gainsboro;
  position: relative;
}
.left-bar>div{
  /*border: 1px solid red;*/
  width: 80%;
  margin: 10px auto;
  border-radius: 4px;
}
.left-bar > *:hover {
  background-color: rgb(225,226,231);
  color: rgb(29,99,255);
  cursor: pointer;
}
.left-bar > * {
  /* border: 1px solid red; */
  font-weight: 500;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.index:hover{
  color: white;
  background-color: rgb(29,99,255);
}

.exit {
  position: absolute;
  width: 100%;
  bottom: 0px;
}
.exit:hover {
  background-color: transparent !important;
}
.user-content {
  width: 90%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px;
}
</style>
