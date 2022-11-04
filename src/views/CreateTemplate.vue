<template>
  <div>
    <div class="collect"
         ref="content">
      <div class="left">
        <collect-left :componentList="moduleData" :mostUse="mostUseModuleData"></collect-left>
      </div>
      <div class="mid">
        <collect-mid :templates="templateData"></collect-mid>
      </div>
      <div class="right">
        <collect-right></collect-right>
      </div>
    </div>
  </div>
</template>

<script>
import CollectLeft from '@/components/collect-page/collect-left.vue'
import CollectMid from '@/components/collect-page/collect-mid.vue'
import CollectRight from '@/components/collect-page/collect-right.vue'

export default {
  components: {CollectLeft, CollectMid, CollectRight},
  data() {
    return {
      // module:[],
      // template:[],
      // mostUseModule:[]
    }
  },
  computed: {
    templateData() {
      return this.$store.state.template
    },
    moduleData() {
      return this.$store.state.module
    },
    mostUseModuleData() {
      return this.$store.state.mostUseModule
    },
  },
  created() {
    // this.template = this.templateData();
    // this.module = this.moduleData();
    // this.mostUseModule = this.mostUseModuleData();
  }
}
</script>

<style lang="css" scoped>
.collect {
  display: flex;
  width: 100%;
  height: 100%;
}

.left,
.right {
  flex: 2;
  height: auto;
  background-color: transparent;
  overflow: auto;
}

.mid {
  flex: 6;
  overflow: auto;
}
</style>
