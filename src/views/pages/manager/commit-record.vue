<template>
    <div>
        <div class="record" v-show="tableData.length != 0"
             :style="{height:viewHeight(isMobile()?50:0),overflow:'auto'}">

            <!--PC端页面-->
            <pc-view>
                <el-table
                    :height="viewHeight(isMobile()?100:50)"
                    :data="tableData"
                    size="tableSize"
                    :cell-style="cellStyle"
                    show-overflow-tooltip="true"
                    :header-cell-style="{'text-align': 'center'}"
                    @cell-click="choose">
                    <el-table-column prop="title" :width="tableCellSpace" fixed label="收集标题"></el-table-column>
                    <el-table-column prop="author" :width="tableCellSpace" label="收集人"></el-table-column>
                    <el-table-column prop="status" :width="tableCellSpace" label="收集状态">
                        <template slot-scope="scope">
                            <i :class="getStatus(scope.row.endTime)"></i>
                            <span v-html="'\u00a0'"></SPAN>
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="commitTimes" :width="tableCellSpace" label="提交次数"></el-table-column>
                    <el-table-column prop="endTime" :width="tableCellSpace" label="截止时间">
                        <template slot-scope="scope">
                            {{ DateFormatter(scope.row.endTime, '/') }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="opt" :width="tableCellSpace" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="shareQuestionnaire(scope.row.id)" size="medium" type="text">分享
                            </el-button>
                            <el-button style="color: red" size="medium" type="text"
                                       @click="closeQuestionnaire(scope.row.id)">结束收集
                            </el-button>
                            <el-button type="text" style="color: seagreen"
                                       @click="deleteQuestionnaire(scope.row.id)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    class="page"
                    background
                    :pager-count="pageCount"
                    :small="isMobile()"
                    @current-change="pageChange"
                    :current-page.sync="Number.parseInt(currentPage)"
                    layout="prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </pc-view>

            <!--移动端页面-->
            <mobile-view>
                <div class="mobileView"
                     :style="{height: viewHeight(50)}"
                     :infinite-scroll-disabled="loading"
                     infinite-scroll-distance="50"
                     v-infinite-scroll="load">
                    <div v-for="ques in tableData">
                        <questionnaire-record-card
                            :data="ques" @share="shareQuestionnaire(ques.id)"
                            @close="closeQuestionnaire(ques.id)"
                            @delete="deleteQuestionnaire(ques.id)"
                            @detail="choose(ques,{label:'收集标题'})"
                        ></questionnaire-record-card>
                    </div>
                    <el-backtop :right="20" :bottom="20" target=".mobileView" class="backUP">UP</el-backtop>
                </div>
                <co-text simple style="width: 100%;height: 50px;text-align: center" size="medium" v-if="loading">加载中...
                </co-text>
            </mobile-view>

        </div>
        <!--空记录-->
        <el-empty v-if="tableData.length === 0" description="暂无记录"></el-empty>
        <!--分享问卷dialog-->
        <el-dialog append-to-body title="分享" :visible.sync="shareDialogVisible">
            <div>
                <el-image :src="imageUrl"></el-image>
            </div>
            <div>
                <div v-show="shareUrl" style="margin: 4px 0">链接：<a :href='shareUrl'>{{ shareUrl }}</a></div>
                <el-button type="text">保存二维码</el-button>
                <el-button type="text" @click="copyUrl(shareUrl)">复制分享链接</el-button>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="shareDialogVisible = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="shareDialogVisible = false">确 定</el-button>
                </span>
        </el-dialog>

    </div>
</template>

<script>
import {isMobile, viewHeight} from '@/api/util'
import {DateFormatter} from "@/api/time";
import {closeQuestionnaire, getImage, getList, shareQuestionnairePath} from '@/api/request'
import CoText from "@/components/co-text";
import QuestionnaireRecordCard from "@/components/questionnaire-record-card";
import PcView from "@/components/pc-view";
import MobileView from "@/components/mobile-view";

export default {
    components: {MobileView, PcView, QuestionnaireRecordCard, CoText},
    data() {
        return {
            loading: false,
            tableData: [],
            total: 0,
            // 当前页码
            currentPage: 1,
            // 分页页码个数
            pageCount: 5,
            tableCellSpace: '160', //列宽度
            tableSize: '', // 表格大小 mini | medium
            shareDialogVisible: false,
            shareUrl: "http://192.168.3.235:8080/submit/3748",
            imageUrl: "https://picx.zhimg.com/v2-44d0a8b5d70eabe6f621931da7b0c87e_xl.jpg?source=32738c0c"
        }
    },

    methods: {
        load() {
            this.loading = true;
            this.currentPage++;
            setTimeout(() => {
                getList(this.currentPage).then(res => {
                    res = res.data.data
                    this.tableData = this.tableData.concat(res.components)
                    this.total = res.total
                    this.loading = false;
                    console.log(this.tableData.length)
                });
            }, 0)
        },
        isMobile,
        viewHeight,
        DateFormatter,
        getUrl(id, size) {
            getImage(id, size).then(res => {
                let blob = new Blob([res.data], {type: "image/Png"});
                this.imageUrl = window.URL.createObjectURL(blob);
            });
        },
        copyUrl(url) {
            if (navigator.clipboard === undefined) {
                this.$message.info("浏览器不支持")
                return
            }
            navigator.clipboard.writeText(url)
            this.$message.success("复制成功");
        },
        shareQuestionnaire(id) {
            this.shareDialogVisible = true
            this.getUrl(id, 100)
            shareQuestionnairePath(id).then(res => {
                this.shareUrl = res.data.data;
            });
        },
        deleteQuestionnaire(id) {
            this.$message.info("todo 还没写");
        },
        closeQuestionnaire(id) {
            this.$confirm('此操作将结束此收集, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                closeQuestionnaire(id).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success("操作成功");
                        location.reload()
                    } else {
                        this.$message.error(res.data.data);
                    }
                })

            }).catch(() => {
                this.$message.info("已取消")
            });
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
                path: '/manager/record/details/' + id,
            })
        },
        getStatus(status) {
            let startTime = new Date();
            let endTime = new Date(Date.parse(status));
            if (startTime < endTime)
                return 'el-icon-loading'
            else return 'el-icon-success'
        },
        pageChange(pageNumber) {
            localStorage.setItem("currentPage", pageNumber);
            getList(pageNumber).then(res => {
                res = res.data.data
                // this.tableData = res.components
                this.tableData = this.tableData.concat(res.components)
                this.total = res.total
                console.log(this.tableData.length)
            });
        }
    },

    created: function () {
        // 加载上次停留的页面(pageNumber)
        this.currentPage = localStorage.getItem("currentPage");
        this.currentPage = 1;
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
            console.log(this.tableData)
        });

    }
}
</script>
<style lang="css" scoped>

.record {
    width: 100%;
    box-sizing: border-box;
    position: relative;
}

.mobileView {
    overflow: auto;
}

.backUP {
    background-color: rgb(242, 245, 246);
    box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 6px;
    text-align: center;
    line-height: 40px;
    border-radius: 8px;
    color: rgb(25, 137, 250);
}

.page {
    height: 50px;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: white;
}

@media screen and (max-width: 600px) {


}

</style>
