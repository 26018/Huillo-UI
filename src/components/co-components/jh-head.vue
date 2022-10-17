<template>
  <div>
    <div>
      <co-card class="head">
        <template v-slot:title>
          <el-input class="input"
                    v-model="params.title"></el-input>
        </template>
        <template v-slot:options> </template>
        <template v-slot:content>
          <div class="row">
            <el-input v-model="params.author"
                      class="author"
                      placeholder="请填写">
              <template slot="prepend">收集人:</template>
            </el-input>

            <div class="dates">
              <el-date-picker class="date-start"
                              v-model="params.startDate"
                              type="date"
                              placeholder="开始日期"> </el-date-picker>
              <div style="color: black; display: flex; align-items: center; justify-content: center; width: 40px">-</div>
              <el-date-picker class="date-end"
                              v-model="params.dueDate"
                              type="date"
                              placeholder="截止日期">
              </el-date-picker>
            </div>
          </div>
          <div class="tip">填写详细说明</div>
          <el-input type="textarea"
                    v-model="params.detail"></el-input>
        </template>
      </co-card>
    </div>
  </div>
</template>

<script>
import CoCard from './co-card.vue'
import { getFeature } from '@/api/util'
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
  components: { CoCard },
  created() {
    this.params.start = new Date()
    this.params.end = getFeature(7)
  },
}
</script>
<style lang="css" scoped>
@import url('@/common/style/co-item.css');

.input >>> * {
  font-size: 32px;
  border: 0px;
  outline: none;
  background-color: transparent;
}

.row {
  display: flex;
}
.row :deep(*) {
  /* border: 1px solid red; */
}

.author >>> .el-input__inner {
  outline: none;
  border: 0px;
  padding: 8px;
  min-width: 150px;
}
.author >>> .el-input-group__prepend {
  background-color: transparent;
  border: 0px;
  padding: 0px;
  font-size: 16px;
}

.dates {
  display: flex;
  /* border: 1px solid red; */
  /* flex-wrap: wrap; */
}
.date-start,
.date-end {
  max-width: 150px;
}
.tip {
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  user-select: none;
  color: rgb(144, 147, 153);
}
</style>
