<template>
    <div>
        <div class="record">
            <el-table :height="tableHeight"
                      :data="tableData"
                      size="tableSize"
                      :cell-style="cellStyle"
                      show-overflow-tooltip="true"
                      :header-cell-style="{'text-align': 'center'}"
                      @cell-click="choose">
                <el-table-column prop="title" :width="tableCellSpace" fixed label="问卷标题"></el-table-column>
                <el-table-column prop="author" :width="tableCellSpace" label="收集人"></el-table-column>

                <el-table-column prop="opt" :width="tableCellSpace" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="shareQuestionnaire(scope.row.id)" size="medium" type="text">详细信息</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="page"
                background
                :pager-count="pageCount"
                :small="smallPage"
                @current-change="pageChange"
                :current-page.sync="Number.parseInt(currentPage)"
                layout="prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import {isMobile} from '@/api/util'
import {getList} from '@/api/request'
import {Message} from "element-ui";

export default {
    data() {
        return {
            tableData: [],
            total: 0,
            // 当前页码
            currentPage: 1,
            // 分页页码个数
            pageCount: 5,
            tableCellSpace: '160',
            tableSize: ''
        }
    },

    computed: {
        tableHeight: function () {
            // 根据设备宽度计算不同的高度
            let width = window.innerWidth
            let height = window.innerHeight
            return width < 600 ? (height - 100) + 'px' : (height - 50) + 'px';
        },
        smallPage: function () {
            let width = window.innerWidth
            return width < 600
        }
    },

    methods: {

        // TODO 计算各列宽度

        shareQuestionnaire(id) {
            // TODO 根据id 返回链接和二维码
        },
        closeQuestionnaire(id) {
            // TODO 根据id 结束问卷的收集状态
        },
        // 设置固定列的颜色
        cellStyle({row, column, rowIndex, columnIndex}) {
            if (column.fixed) {
                return 'color: #409EFF;cursor: pointer;text-align: center;'
            }
            return 'text-align: center;'
        },
        // 点击固定列跳转
        choose(value, column, cell, event) {
            if (column.label != '收集标题')
                return
            let id = value.id
            if (id == null) {
                id = 0
            }
            this.$router.push({
                path: '/manager/details',
                query: {
                    id: id
                }
            })
        },
        getStatus(status) {
            if (new Date(status).getDay() > new Date().getDay())
                return 'el-icon-loading'
            else return 'el-icon-success'
        },
        pageChange(pageNumber) {
            localStorage.setItem("currentPage", pageNumber);
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

    created: function () {

        // 加载上次停留的页面(pageNumber)
        this.currentPage = localStorage.getItem("currentPage");
        if (this.currentPage == null) {
            this.currentPage = 1;
        }

        //计算分页页码个数
        if (isMobile()) {
            this.pageCount = 5;
            this.tableSize = 'mini'
        } else {
            this.pageCount = 9;
            this.tableSize = 'medium'
        }

        getList(this.currentPage).then(res => {
            res = res.data.data
            this.tableData = res.components
            this.total = res.total
            let index = 1;
            this.tableData.forEach(t => {
                t.dueDate = new Date(t.dueDate).toLocaleDateString()
                t.count = index++;
            })
        });
        console.log(this.tableData)
    }
}
</script>
<style lang="css" scoped>

.record {
    width: 100%;
    box-sizing: border-box;
    /*padding-left: 8px;*/
}


.page {
    height: 50px;
    display: flex;
    align-items: center;
    /*border: 1px solid red;*/
}


@media screen and (max-width: 600px) {


}

</style>
