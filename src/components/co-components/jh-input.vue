<template>
  <div>
    <div>
      <co-card v-if="!params.deleted">
        <template v-slot:title>
          <el-input class="input"
                    v-model="params.title"></el-input>
        </template>
        <template v-slot:options>
          <div class="move"
               title="点击移动此组件">拖动</div>
          <el-button type="text"
                     @click="closeComponent(params)">删除</el-button>
          <el-switch v-model="params.need"
                     active-text="必填"
                     active-color="#13ce66"
                     inactive-color="gray"> </el-switch>
        </template>
        <el-input v-model="params.details"
                  placeholder="添加选项描述"></el-input>
        <template v-slot:content>
          <el-input disabled
                    placeholder="此处由提交者填写"></el-input>
        </template>
      </co-card>
    </div>
  </div>
</template>

<script>
import { closeComponent } from '@/api/util'
import CoCard from './co-card.vue'
export default {
  props: {
    params: {
      title: String,
      need: Boolean,
      options: Array,
      details: String,
      selected: Array,
    },
  },
  data() {
    return {}
  },

  components: { CoCard },

  methods: {
    closeComponent,
  },
}
</script>
<style lang="css" scoped>
@import url('@/common/style/co-item.css');
@import url('@/common/style/font.css');
:deep(.el-input) {
  border: 0px;
}
:deep(.el-input__inner) {
  border: 0px;
}
</style>
