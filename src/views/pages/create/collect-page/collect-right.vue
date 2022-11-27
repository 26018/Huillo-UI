<template>
  <div>
    <div class="  font-text">
      <h3>我的模板</h3>
      <div class="card"
           v-for="(it,index) in 15"
           :key="index">
        <h4>青年大学习模板</h4>
        <p>请尽快上交青年大学习截图，辛苦各位！</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  components: {},

  computed: {},

  methods: {},
}
</script>
<style lang="css" scoped>
@import url('@/common/style/font.css');

.items-container {
  width: 100%;
  position: sticky;
}
h3 {
  height: 50px;
  margin-top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  overflow: hidden !important;
  width: 100%;
}
.card {
  width: 80%;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(104, 105, 155, 0.3),
    0 0 40px rgba(104, 105, 155, 0.1) inset;
}
.card:hover > h4 {
  user-select: none;
  cursor: pointer;
  color: #bf242a;
  transition-duration: 200ms;
}
</style>
