<template>
    <div>
        <div class="group">
            <div class="group-row-title">群组信息
                <el-popconfirm
                    confirm-button-text='关闭'
                    cancel-button-text='已了解'
                    :title="'创建群组可以在群组内发布收集，通知群友,有利于集中管理和发布信息'">
                    <span slot="reference"><el-icon class="el-icon-question"></el-icon></span>
                </el-popconfirm>
                <span @click="open"></span>
            </div>



            <div style="padding: 8px; border-radius: 8px;">
                <div class="groups">我的群组</div>
                <div class="group-card-container">
                    <group-card v-for="i in 15" :data="{title:'测试群组',member:i}"/>
                </div>
            </div>
            <div class="group-row-title">新建群组</div>
            <div class="group-create">群组名称:</div>
            <el-input placeholder="群组名称"></el-input>
            <div class="group-create">人数上限:</div>
            <el-input placeholder="上限"></el-input>
            <el-button type="primary" size="medium"
                       style="margin-top: 8px;
                        margin-bottom: 4px;">创建
            </el-button>
        </div>
    </div>
</template>

<script>
import GroupCard from "@/components/group-card";

export default {
    name: "group",
    components: {GroupCard},
    data() {
        return {
            showTip: false,
        }
    },
    methods: {

    }
}
</script>

<style scoped>
@import "@/common/style/views/group.css";
</style>