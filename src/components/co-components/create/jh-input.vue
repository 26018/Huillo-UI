<template>
  <div>
    <div>
      <co-card v-if="!params.deleted">
        <template v-slot:header>
          <el-input class="input line" v-model="params.title"></el-input>
          <div class="operation-frame">
            <el-checkbox v-model="params.required">选填</el-checkbox>
            <i class="el-icon-sort move" title="点击拖动排序"></i>
            <i class="el-icon-circle-close" @click="closeComponent(params)"></i>
          </div>
        </template>
        <template v-slot:content>
          <el-input class="description" v-model="params.description" placeholder="添加选项描述"></el-input>
          <el-input disabled placeholder="此处由提交者填写"></el-input>
        </template>
      </co-card>
    </div>
  </div>
</template>

<script>
import {closeComponent} from '@/api/util'
import CoCard from '../co-card.vue'

export default {
  props: {
    params: {
      title: String,
      need: Boolean,
      options: Array,
      description: String,
      selected: Array,
      required: Boolean // 选填
    },
  },
  data() {
    return {}
  },

  components: {CoCard},

  methods: {
    closeComponent,
  },
}
</script>
<style lang="css" scoped>
@import url('@/common/style/co-item.css');
@import url('@/common/style/font.css');

.input {
}

.input >>> .el-input__inner {
  padding-left: 0;
  border-radius: 0;
  background-color: transparent;
}

.description >>> * {
  padding-left: 0;
}

>>> .el-input {
  border: 0px;
}

>>> .el-input__inner {
  border: 0px;
}
</style>
