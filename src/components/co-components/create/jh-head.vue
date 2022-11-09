<template>
  <div>
    <div>
      <co-card class="head">
        <template v-slot:header class="header">
          <el-input class="create-title" v-model="params.title"/>
          <el-date-picker class="date-end" v-model="params.dueDate" placeholder="截止日期"/>
        </template>
        <template v-slot:content>
          <el-input v-model="params.author" class="author" placeholder="请填写">
            <template slot="prepend">收集人:</template>
          </el-input>
          <div style="width: 100%;height: fit-content;display: flex;border: 0px solid red;align-items: center">
            <co-tip>详细说明</co-tip>
            <el-select v-model="params.editorValue"
                       v-show="bigDevice"
                       class="create-select"
                       placeholder="切换编辑器">
              <el-option v-for="editorOption in editorOptions"
                         :key="editorOption.value"
                         :label="editorOption.value"
                         :value="editorOption.value"></el-option>
            </el-select>
          </div>
          <el-input type="textarea" v-show="params.editorValue != 'MD编辑器' || !bigDevice"
                    v-model="params.description" :autosize="{ minRows: 2}"/>
          <mavon-editor :boxShadow="false" v-model="params.description"
                        v-show="params.editorValue == 'MD编辑器' && bigDevice"></mavon-editor>
        </template>
      </co-card>
    </div>
  </div>
</template>

<script>
import CoCard from '../co-card.vue'
import {getFeature} from '@/api/util'
import {JhHead} from '@/common/data/ComponentProps'
import CoTip from "@/components/co-components/co-tip";

export default {
  props: {
    params: {
      editorValue: "",
    }
  },
  data() {
    return {
      // data: {
      editorOptions: [{
        value: "MD编辑器",
        label: "MD编辑器"
      }, {
        value: "纯文本编辑器",
        label: "纯文本编辑器"
      }],
      // },
      bigDevice: Boolean
    }
  },
  methods: {
    getFeature,
  },
  components: {CoTip, CoCard},
  created() {
    this.params.dueDate = getFeature(7)
    // alert(document.body.clientWidth)
    if (document.body.clientWidth < 1000) {
      this.bigDevice = false;
    }
  },
}
</script>
<style lang="css" scoped>
@import url('@/common/style/co-item.css');

>>>.el-textarea__inner{
  background-color: transparent;
}

>>>.el-input__inner{
  background-color: transparent;
}

.header {
  font-size: 2px;
}

.input {
  border: 0px solid red;
  min-width: 150px;
  height: 60px;
  font-size: 32px;
  outline: none;
}

.input >>> * {
  font-size: 32px;
  border: 0px;
  outline: none;
  padding-left: 0;
  border-radius: 0;
  background-color: transparent;
}

.el-select >>> .el-input__inner {
  border: 0px solid red;
  max-width: 130px;
  min-width: 130px;
}

.date-end {
  /*max-width: 180px;*/
  /*min-width: 160px;*/
}

/*设定字体大小，以免被co-card统一限定*/
.date-end >>> .el-input__inner {
  border: 0;
  padding: 0 40px;
  font-size: 16px;
  max-width: 200px;
  min-width: 180px;
  background-color: #f7fcfe;
}

.author {
  /*border: 1px solid red;*/
}

.author >>> .el-input__inner {
  outline: none;
  border: 0px;
  padding: 0;
  background-color: transparent;
  min-width: 150px;
}

.author >>> .el-input-group__prepend {
  background-color: transparent;
  border: 0px;
  padding: 0px;
  font-size: 16px;
}


</style>
