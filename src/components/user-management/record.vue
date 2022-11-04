<template>
  <div>
    <div class="record">
      <el-table :data="tableData" :cell-style="center" :header-cell-style="center" @row-click="choose">
        <el-table-column prop="title" label="收集标题" width="180"></el-table-column>
        <el-table-column prop="author" label="收集者" width="180"></el-table-column>
        <el-table-column prop="status" label="收集状态" width="180">
          <template slot-scope="scope"><i :class="getStatus(scope.row.dueDate)"></i>
            <span v-html="'\u00a0'"></span>
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column prop="count" label="提交次数" width="180"></el-table-column>
        <el-table-column prop="dueDate" label="截止时间" width="180"></el-table-column>
        <el-table-column prop="opt" label="操作">
          <el-button size="medium" type="text">分享</el-button>
          <el-button size="medium" type="text">结束收集</el-button>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
        style="margin-top: 8px"
        background
        layout="prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {goto} from '@/api/util'
import {getList} from '@/api/request'

export default {
  data() {
    return {
      tableData: [],
      total: 0,

    }
  },

  methods: {
    goto,
    choose(value) {
      let id = value.id
      if (id == null) {
        id = 0
      }
      goto('/user/' + id + '/details')
    },
    center() {
      return 'text-align:center'
    },
    getStatus(status) {
      if (new Date(status).getDay() > new Date().getDay())
        return 'el-icon-loading'
      else return 'el-icon-success'
    },
  },

  created() {
    getList(1).then(res => {
      res = res.data.data
      this.tableData = res.components
      this.total = res.total
      let index = 1;
      this.tableData.forEach(t => {
        t.dueDate = new Date(t.dueDate).toLocaleDateString()
        t.count = index++;
      })
    });
  }
}
</script>
<style lang="css" scoped>
.record {
  height: calc(100vh - 100px);
  overflow: auto;
}
</style>
