<template>
    <div>
        <div class="group">
            <div class="group-title">群组信息</div>
            <div style="
                    padding: 8px;
                    background-color: gray;
                    border-radius: 8px;">
                <div class="groups">我的群组</div>
                <div style="display: flex;justify-content: space-between;border: 1px solid red">
                    <div v-for="it in 16" class="group-card">
                        <div class="group-title">测试群组</div>
                        <div class="row">
                            <div>成员</div>
                            <div class="group-member">{{ it }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="group-title">新建群组</div>
            <div class="group-create">群组名称</div>
            <el-input placeholder="群组名称"></el-input>
            <div class="group-create">人数上限</div>
            <el-input placeholder="上限"></el-input>
            <el-button type="primary" size="medium" style="margin-top: 8px">创建</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "group"
}
</script>

<style scoped>
@import "@/common/style/views/group.css";
</style>