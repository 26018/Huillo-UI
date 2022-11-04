<template>
  <div>
    <div class="multi">
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
          <el-checkbox-group v-model="params.answer">
            <div v-for="(option,index) in params.options" :key="index">
              <el-checkbox :label="option.id">
                <el-input v-model="option.value"></el-input>
              </el-checkbox>
            </div>
          </el-checkbox-group>

          <el-button @click="addOption" size="small">新增选项</el-button>
        </template>
      </co-card>
    </div>
  </div>
</template>

<script>
import CoCard from '../co-card.vue'
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
      answer: Array,
      details: String,
      deleted: false,
      optional:Boolean, // 选填
      mode:String // 模式 [ 创建模式(create) | 提交模式(submit) ]
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
    getMode(){
      return this.params.mode == 'create';
    },
    closeComponent,
    addOption() {
      let options = this.params.options
      let length = 1
      console.log("MMMM")
      console.log(options)
      if (options == undefined || options == null) {
        this.params.options = []
      }

      length = this.params.options.length + 1
      this.params.options.push({
        id: length,
        value: '新选项' + length,
      })
    },

  },
  created() {
    console.log(this.params)
    this.params.answer = []
  }
}
</script>
<style lang="css" scoped>
:deep(.el-input) {
  border: 0px;
}
:deep(.el-input__inner) {
  border: 0px;
  padding-left: 0;
}
</style>
