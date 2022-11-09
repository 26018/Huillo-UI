<template>
  <div>
    <div class="template-details">
      <el-button type="text" @click="goBack">返回</el-button>
    </div>
    <div>{{params}}</div>

  </div>
</template>

<script>
import {pullData} from "@/api/request";

export default {
  data() {
    return {
      params:{}
    }
  },

  components: {},

  computed: {},

  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
  created() {
    let id = this.$route.params.id
    // console.log(id)
    pullData(id).then(res=>{
      this.params = res.data.data
    })
  }
}
</script>

<style lang="css" scoped>
.template-details {
}
</style>
