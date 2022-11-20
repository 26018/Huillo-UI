<template>
  <div>
    <div class="templates">
      <h1>去创建一个新的模板</h1>
      <h3>历史模板</h3>
      <div style="border:0px solid red;width:100%;display:flex;flex-wrap:wrap">
        <div v-for="(i,index) in 9"
             class="card"
             :key="index"
             @click="choose">
          <div>
            <h4>青年大学习模板</h4>
            <p>请尽快上交青年大学习截图，辛苦各位！</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goto } from '@/api/util'
export default {
  data() {
    return {}
  },

  components: {},

  computed: {},

  methods: {
    goto,
    choose() {
      goto('/create')
    },
  },
}
</script>
<style lang="css" scoped>
.templates {
  /* border: 1px solid red; */
  /* display: flex;
    flex-wrap: wrap; */
}
.card {
  background-color: slategray;
  border-radius: 8px;
  width: 300px;
  display: flex;
  box-sizing: border-box;
  padding: 8px;
  margin: 20px;
}
.card:hover {
  scale: 1.1;
  transition-duration: 500ms;
}
</style>
