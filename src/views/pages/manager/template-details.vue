<template>
    <div>
        <div class="template-details">

            <div class="main-container">
                <div>
                    <div class="row">
                        <div style="font-size: 24px">文件收集</div>
                        <div>状态：收集中</div>
                    </div>
                    <el-input class="lowText" type="textarea" disabled v-model="desc"></el-input>
                </div>

                <div>
                    <div class="row tip-card-title">
                        <div>收集用时</div>
                        <div>12天5小时</div>
                    </div>

                    <el-divider></el-divider>

                    <div class="row">
                        <div>开始时间:2022-09-28</div>
                        <div>结束时间:2022-10-22</div>
                    </div>
                </div>

                <div>
                    <div class="row tip-card-title">
                        <div>提交总数</div>
                        <div>47</div>
                    </div>

                    <el-divider></el-divider>

                    <div class="row">
                        <div class="submit-member">
                            <div>实名提交</div>
                            <div>5</div>
                        </div>
                        <div class="submit-member">
                            <div>匿名提交</div>
                            <div>42</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="row">
                        <div>提交者名单</div>
                        <el-button type="text">一键通知未提交</el-button>
                    </div>
                    <el-select clearable style="width: 100%;" v-model="filterRuleValue" placeholder="筛选规则">
                        <el-option
                            v-for="item in filterRule"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>

                    <el-table :data="tableData" size="mini" style="margin-top: 4px;width: 100%">
                        <el-table-column fixed type="selection"></el-table-column>
                        <el-table-column
                            fixed
                            prop="name"
                            label="姓名"
                            width="100">
                        </el-table-column>
                        <el-table-column

                            prop="date"
                            label="提交日期"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                    </el-table>

                    <div class="row opt-button">
                        <el-button type="text">导出为Excel</el-button>
                        <el-button type="text">一键下载表中文件</el-button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {pullData} from "@/api/request";

export default {
    data() {
        return {
            params: {},
            checkList: [],
            tableData: [{
                name: '王小虎',
                date: '2016-05-02',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            filterRule: [{label: '已提交', value: '1'}, {label: '未提交', value: '2'}],
            filterRuleValue: '',
            desc: "这是一些详细描述"
        }
    },

    methods: {},
    created() {
        let id = this.$route.query.id
        pullData(id).then(res => {
            this.params = res.data.data
        })
    }
}
</script>

<style lang="css" scoped>
@import "@/common/style/views/template-details.css";

</style>
