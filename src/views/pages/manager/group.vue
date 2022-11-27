<template>
    <div>
        <div class="group" :style="{height:viewHeight(isMobile() ? 50:0)}">
            <div class="group-row-title">群组信息
                <el-popconfirm
                    style="color: sandybrown" confirm-button-text='关闭' cancel-button-text='已了解'
                    :title="'创建群组可以在群组内发布收集，通知群友。\n有利于集中管理和发布信息'">
                    <span slot="reference"><el-icon class="el-icon-question"></el-icon></span>
                </el-popconfirm>
            </div>
            <div>
                <div class="groups">我的群组</div>
                <div class="group-card-container">
                    <div v-for="i in 15" @click="detailGroupInfo(i)">
                        <group-card :data="{title:'测试0000000000群组'+i,member:i}"/>
                    </div>
                </div>
            </div>
            <div class="group-row-title">新建群组</div>
            <div class="group-create">群组名称:</div>
            <el-input placeholder="群组名称"></el-input>
            <div class="group-create">人数上限:</div>
            <el-input placeholder="上限"></el-input>
            <el-button type="primary" size="medium" style="margin-top: 8px; margin-bottom: 4px;">创建</el-button>

            <el-dialog title="群组信息" :visible.sync="dialogVisible">
                <div style="font-size: 16px;margin: 8px 0 8px 0;color: rebeccapurple">新项目测试，共{{ dialogGroupInfo }}人</div>
                <el-image :src="require('@/assets/fixyou.png')" :style="{width: '100%'}"></el-image>
                <div class="dialog-operation">
                    <el-button type="text">下载二维码</el-button>
                    <el-button type="text">复制分享链接</el-button>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import GroupCard from "@/components/group-card";
import {isMobile, viewHeight} from "@/api/util";

export default {
    name: "group",
    components: {GroupCard},
    data() {
        return {
            showTip: false,
            dialogVisible: false,
            dialogGroupInfo: {}
        }
    },
    methods: {
        isMobile,
        viewHeight,
        detailGroupInfo(clickInfo) {
            this.dialogVisible = true;
            this.dialogGroupInfo = clickInfo;
        }
    }
}
</script>

<style scoped>
@import "@/common/style/views/group.css";
</style>