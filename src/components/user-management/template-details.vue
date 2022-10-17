<template>
  <div>
    <div class="template-details">
      <el-button type="text"
                 @click="goBack">返回</el-button>
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

  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="css" scoped>
.template-details {
}
</style>
