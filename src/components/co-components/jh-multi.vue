<template>
  <div>
    <div class="multi">
      <co-card>
        <template v-slot:title>
          <el-input v-model="params.title"></el-input>
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
          <el-checkbox-group v-model="params.answer">
            <div v-for="(option,index) in params.options"
                 :key="index">
              <el-checkbox :label="option.id">
                <el-input v-model="option.title"></el-input>
              </el-checkbox>
            </div>
          </el-checkbox-group>

          <el-button @click="addOption"
                     size="small">新增选项</el-button>
        </template>
      </co-card>
    </div>
  </div>
</template>

<script>
import CoCard from './co-card.vue'
import { closeComponent } from '@/api/util'

export default {
  data() {
    return {}
  },
  props: {
    params: {
      title: String,
      need: Boolean,
      options: Array,
      selected: Array,
      correctAnswer: Object,
      details: String,
      deleted: false
    
    },
  },
  components: { CoCard },

  computed: {
    getAtt() {
      return JSON.stringify(this.params)
    },
  },
  watch: {
    getAtt(n, o) {
      console.log(JSON.parse(n).answer, JSON.parse(o).answer)
    },
  },
  methods: {
    closeComponent,
    addOption() {
      let options = this.params.options
      let length = 1
      if (options != undefined) {
        length = options.length + 1
      }
      this.params.options.push({
        id: length,
        title: '新选项' + length,
      })
    },
  },
}
</script>
<style lang="css" scoped>
:deep(.el-input) {
  border: 0px;
}
:deep(.el-input__inner) {
  border: 0px;
}
</style>
