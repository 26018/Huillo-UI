<template>
  <div>
    <div class="radio">
      <co-card>
        <template v-slot:header>
          <el-input v-model="params.title"></el-input>
          <div class="operation-frame" v-if="getMode()">
            <el-checkbox v-model="params.optional">选填</el-checkbox>
            <i class="el-icon-sort move" title="点击拖动排序"></i>
            <i class="el-icon-circle-close" @click="closeComponent(params)"></i>
          </div>
        </template>

        <el-input v-model="params.details" placeholder="添加选项描述"></el-input>
        <template v-slot:content>
          <div v-for="(option,index) in params.options" :key="index">
            <el-radio v-model="params.answer" :key="index" :label="option.id">
              <el-input class="option" v-model="option.value"></el-input>
            </el-radio>
          </div>
          <el-button @click="addOption" size="small">新增选项</el-button>
        </template>
      </co-card>
    </div>
  </div>
</template>

<script>
import coCard from '../co-card.vue'
import {closeComponent} from '@/api/util'

export default {
  components: {coCard},
  props: {
    params: {
      optional: Boolean, // 选填
      mode: String // 模式 [ 创建模式(create) | 提交模式(submit) ]
    }
  },
  data() {
    return {}
  },

  computed: {
    observerParams() {
      return JSON.stringify(this.params)
    },
  },
  watch: {
    observerParams(n, o) {
      console.log(JSON.parse(n).data, JSON.parse(o).data)
    },
  },

  methods: {
    getMode() {
      return this.params.mode == 'create'
    },
    closeComponent,
    addOption() {
      let options = this.params.options
      let length = 0
      if (options == undefined) {
        this.params.options = []
      }
      length = this.params.options.length + 1
      this.params.options.push({
        id: length,
        value: '新选项' + length,
      })
    },
  },

}
</script>
<style lang="css" scoped>
.radio {
}


:deep(.el-input) {
  border: 0px;
}

:deep(.el-input__inner) {
  border: 0px;
  padding-left: 0;
}

.option >>> .el-input__inner {
  border: 0px;
}
</style>
