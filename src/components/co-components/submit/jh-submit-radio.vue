<template>
  <div>
    <div class="radio">
      <co-card>
        <template v-slot:header>
          <div class="submit-title">{{ params.title }}</div>
          <div class="operation-frame">
            <div style="float: right;color: red;user-select: none" v-if="!params.required">
              *
            </div>
          </div>
        </template>

        <template v-slot:content>
          <div class="submit-description-title">{{ params.description }}</div>
          <el-radio-group v-model="params.answer">
            <div v-for="(option,index) in params.options" :key="index">
              <el-radio v-model="params.answer" :key="index" :label="option.id">
                {{ option.value }}
              </el-radio>
            </div>
          </el-radio-group>
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
        title: '新选项' + length,
      })
    },
  },

}
</script>
<style lang="css" scoped>
.radio {
}

:deep(.el-radio) {
  margin-top: 10px;
}

.submit-description-title {
  color: gray;
}

.submit-description-content {
  background-color: #e8ecef;
  padding: 10px;
  border-radius: 4px;
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
