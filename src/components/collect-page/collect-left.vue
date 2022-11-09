<template>
  <div>
    <div class="items-container font-text">
      <h3>基础组件</h3>
      <div class="items">
        <div class="item-choice"
             v-for="(item,index) in componentList"
             :key="index"
             @click="change(item)">{{ item.title }}</div>
      </div>

      <h3>常用组件</h3>
      <div class="items">
        <div v-for="(item, index) in mostUse"
             class="item-choice"
             :key="index"
             @click="change(item)">
<!--          <co-icon :imgSrc="src[index % src.length]"></co-icon>-->
          <span v-html="'\u00a0'"></span>
          {{ item.title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoIcon from '@/components/co-components/co-icon.vue'

export default {
  props: {
    componentList: [],
    mostUse: [],
  },
  data() {
    return {
      src: [require('@/assets/school.png'), require('@/assets/people.png')],
    }
  },

  components: { CoIcon },

  computed: {},

  methods: {
    change(data) {
      console.log(data)
      let idx = this.$store.state.template.length
      data.number = idx
      // 使用JSON是为了拷贝对象，不这样做会导致左边组件和中间组件使用同一个对象而发送数据同步变化
      // 例如：点击左边组件，修改中间刚刚添加的组件值，会发现左边的组件值也同步发生了变化
      // 旧的写法： this.$store.commit('templatePush',data);
      this.$store.commit('templatePush', JSON.parse(JSON.stringify(data)));
    },
  },
}
</script>
<style lang="css" scoped>
h3 {
  height: 50px;
  margin-top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: rgb(36, 37, 37);
}
.items-container {
  width: 100%;
  position: sticky;
}
.items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.item-choice {
  background-color: #e8ecef;
  color: black;
  width: 100px;
  height: 40px;
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
}
.item-choice > * {
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-choice:hover {
  color: dodgerblue;
  transition-duration: 200ms;
}
</style>
