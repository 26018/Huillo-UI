<template>
  <div>
    <div>
      <co-card class="head">
        <template v-slot:header class="header">
          <el-input class="input" v-model="params.title"></el-input>
          <el-date-picker class="date-end" v-model="params.dueDate" type="date" placeholder="截止日期"></el-date-picker>
        </template>

        <template v-slot:content>
          <div class="row">
            <el-input v-model="params.author" class="author" placeholder="请填写">
              <template slot="prepend">收集人:</template>
            </el-input>

          </div>
          <div class="tip">填写详细说明</div>
          <el-input type="textarea" v-model="params.description" :autosize="{ minRows: 2}"></el-input>
        </template>
      </co-card>
    </div>
  </div>
</template>

<script>
import CoCard from '../co-card.vue'
import {getFeature} from '@/api/util'
import {JhHead} from '@/common/data/ComponentProps'

export default {
  props: {
    params: JhHead(),
  },
  data() {
    return {
      data: {},
    }
  },
  methods: {
    getFeature,
  },
  components: {CoCard},
  created() {
    this.params.dueDate = getFeature(7)
  },
}
</script>
<style lang="css" scoped>
@import url('@/common/style/co-item.css');


.header{
  font-size: 2px;
}

.input >>> * {
  font-size: 32px;
  border: 0px;
  outline: none;
  padding-left: 0;
  border-radius: 0;
  background-color: transparent;
}
.date-end {
  max-width: 180px;
  min-width: 160px;
}

/*设定字体大小，以免被co-card统一限定*/
.date-end:deep(.el-input__inner){
  border: 0;
  padding: 0 40px;
  font-size: 16px ;
  background-color: #e8ecef;
}

.row {
  display: flex;
  /* border: 1px solid red; */
  overflow: hidden;
}

.row :deep(*) {


}

.author:deep(.el-input__inner) {
  outline: none;
  border: 0px;
  padding: 8px;
  background-color: transparent;
  min-width: 150px;
}

.author >>> .el-input-group__prepend {
  background-color: transparent;
  border: 0px;
  padding: 0px;
  font-size: 16px;
}

.tip {
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  user-select: none;
  color: rgb(144, 147, 153);
}
</style>
