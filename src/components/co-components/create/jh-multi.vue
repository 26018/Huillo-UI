<template>
  <div>
    <div class="multi">
      <co-card>
        <template v-slot:header>
          <el-input v-model="params.title"></el-input>
          <div class="operation-frame">
            <el-checkbox v-model="params.required">选填</el-checkbox>
            <i class="el-icon-sort move" title="点击拖动排序"></i>
            <i class="el-icon-circle-close" @click="closeComponent(params)"></i>
          </div>
        </template>

        <template v-slot:content>
          <el-input v-model="params.description" placeholder="添加选项描述"></el-input>
          <el-checkbox-group v-model="params.answer">
            <div v-for="(option,index) in params.options" :key="index">
              <el-checkbox :label="option.id">
                <el-input v-model="option.value"></el-input>
              </el-checkbox>
              <i @click="removeOption(params.options,params.answer,option.value)" class="el-icon-close remove"></i>
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
      required: Boolean,// 选填
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
    closeComponent,

    addOption() {
      // todo id根据length来确定有bug
      let options = this.params.options
      if (options === undefined || options == null) {
        this.params.options = []
      }
      this.params.options.push({
        id: Date.now(),
        value: '新选项',
      })
      console.log("options:", this.params.options)
    },

    removeOption(options, answers, targetName) {
      // 根据下标删除有bug
      // option的id是options数组的下标
      // splice删除后，options下表变化，但option的id却没有变
      // @old options.splice(targetId-1, 1);

      let length = options.length;
      for (let index = 0; index < length; index++) {
        if (options[index].value == targetName) {
          // Tip 删除在answer列表中废弃的答案
          let ansLength = answers.length;
          for (let ansIndex = 0; ansIndex < ansLength; ansIndex++) {
            if (answers[ansIndex] == options[index].id) {
              answers.splice(ansIndex, 1);
              break;
            }
          }
          options.splice(index, 1);
          break;
        }
      }
    }

  },
  created() {
    console.log(this.params)
    this.params.answer = []
  }
}
</script>
<style lang="css" scoped>
>>> .el-input {
  border: 0px;
}

>>> .el-input__inner {
  border: 0px;
  padding-left: 0;
}

>>> .el-checkbox > * {
  /*border: 1px solid red;*/
}

.remove {
  /*margin-left: 60px;*/
  /*border: 1px solid red;*/
  /*display: none;*/
}

</style>
