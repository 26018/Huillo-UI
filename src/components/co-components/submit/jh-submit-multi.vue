<template>
  <div>
    <div class="multi">
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
          <el-checkbox-group v-model="params.answer">
            <div v-for="(option,index) in params.options" :key="index">
              <el-checkbox :label="option.value"></el-checkbox>
            </div>
          </el-checkbox-group>
        </template>

      </co-card>
    </div>
  </div>
</template>

<script>
import CoCard from '../co-card.vue'
import {closeComponent} from '@/api/util'

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
      optional: Boolean, // 选填
      mode: String // 模式 [ 创建模式(create) | 提交模式(submit) ]
    },
  },
  components: {CoCard},

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
    getMode() {
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
        title: '新选项' + length,
      })
    },

  },
  created() {
    console.log("VVVV")
    console.log(this.params)
    this.params.answer = ""
    this.params.answer = []
  }
}
</script>
<style lang="css" scoped>
>>> .el-input {
  border: 0px;
}

>>> .el-checkbox {
  margin-top: 10px;
}


.submit-description-content {
  background-color: #e8ecef;
  padding: 10px;
  border-radius: 4px;
}

>>> .el-input__inner {
  border: 0px;
  padding-left: 0;
}
</style>
