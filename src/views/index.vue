<template>
  <div>
    <div class="test">
      <div style="width: 80%">
        <div @click="goto('/create')"
             class="to">现在就去</div>
        <div @click="goto('/submit/3620')"
             class="to">发布测试页</div>
      </div>
    </div>
  </div>
</template>

<script>
import { goto } from '@/api/util'

export default {
  components: {},
  data() {
    return {
      src: require('@/assets/school.png'),
    }
  },
  methods: {
    goto,
  },
  computed: {},
  mounted() {
    let menus = this.$parent.$children[0].menus
    menus.splice(0, menus.length)
    let token = localStorage.getItem('token')
    if (token != null) {
      menus.splice(0, 0, { name: '我的', execute: goto, param: '/manager' })
    } else {
      menus.splice(
        0,
        0,
        { name: '登录', execute: this.goto, param: '/login' },
        { name: '注册', execute: this.goto, param: '/register' }
      )
    }
  },
}
</script>
<style lang="css" scoped>
.test {
  height: 100%;
  display: flex;
  justify-content: center;
  background-image: url('@/assets/back.png');
  background-size: over;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  background-repeat: no-repeat;
}
.code {
  width: 60%;
  height: fit-content;
  font-size: 32px;
  user-select: none;
  display: flex;
  box-sizing: border-box;
  padding-top: 50px;
  color: rgb(29, 29, 31);
  font-family: '微软雅黑';
}
.to {
  width: fit-content;
  font-size: 28px;
  user-select: none;
  cursor: pointer;
  color: dodgerblue;
}
.to:hover {
  transform: scale(1.1);
  transition-duration: 200ms;
}
</style>
