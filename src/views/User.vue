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
    document.getElementById('nav' + index).style.borderRight = '4px solid black'
    goto(page)
  },
  methods: {
    goto,
    chooseItem(val, index) {
      let length = this.menus.length
      for (let idx = 0; idx < length; idx++) {
        if (idx == index) {
          localStorage.setItem('currentNavIndex', index)
          localStorage.setItem('currentNavPath', val)
          document.getElementById('nav' + idx).style.borderRight =
            '4px solid black'
        } else {
          document.getElementById('nav' + idx).style.borderRight = '0px'
        }
      }
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
}

.user {
  display: flex;
  height: 100%;
  /* overflow: auto; */
}
.left-bar {
  width: 10%;
  /* border: 1px solid red; */
  height: 100%;
  user-select: none;
  background-color: #80aba9;
  position: relative;
}
.left-bar > *:hover {
  background-color: #38b48b;
  color: azure;
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
