<template>
  <div>
    <div class="record">
      <el-table :data="tableData" size="mini" :cell-style="center" :header-cell-style="center"
                @cell-click="choose">
        <el-table-column prop="title" label="收集标题" :width="tableWidth"></el-table-column>
        <el-table-column prop="author" label="收集者" :width="tableWidth"></el-table-column>
        <el-table-column prop="status" label="收集状态" :width="tableWidth">
          <template slot-scope="scope"><i :class="getStatus(scope.row.dueDate)"></i>
            <span v-html="'\u00a0'"></span>
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column prop="count" label="提交次数" :width="tableWidth"></el-table-column>
        <el-table-column prop="dueDate" label="截止时间" :width="tableWidth"></el-table-column>

        <el-table-column prop="opt" label="操作" :width="tableWidth">
          <template slot-scope="scope">
            <el-button @click="shareQuestionnaire(scope.row.id)" size="medium" type="text">分享</el-button>
            <el-button size="medium" type="text" @click="closeQuestionnaire(scope.row.id)">结束收集</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
        class="page"
        background
        :pager-count="5"
        @current-change="pageChange"
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
      tableWidth: "200%"
    }
  },

  methods: {
    goto,
    shareQuestionnaire(id) {
      // TODO 根据id 返回链接和二维码
    },
    closeQuestionnaire(id) {
      // TODO 根据id 结束问卷的收集状态
    },

    choose(value, column, cell, event) {
      if (column.label != '收集标题')
        return
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
    pageChange(pageNumber) {
      getList(pageNumber).then(res => {
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
    height: calc(100% - 800px);
    width: 100%;
    /*border: 1px solid red;*/
    /*overflow: auto;*/
    display: flex;
    /*display: none;*/
}

@media screen and (max-width: 992px){

    .page{
        /*display: none;*/
        /*position: fixed;*/
        /*bottom: 10px;*/
        /*justify-content: flex-end;*/
    }

}

</style>
