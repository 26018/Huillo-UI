<template>
    <div>
        <div class="template-details">
            <el-button type="text" @click="goBack">返回</el-button>
        </div>
        <div class="container">


            <div>
                <h4>文件收集</h4>
                <div>这是一些详细描述</div>
            </div>

            <div>
                <h4>已提交人数</h4>
                <div>5</div>
            </div>

            <div>
                <h4>总人数</h4>
                <div>42</div>
            </div>
        </div>

        <div class="container">
            <div style="width: 80%">
                <h4 style="width: 100%;text-align: center">已提交名单 | 未提交名单</h4>
                <div>测试人1</div>
                <div>测试人2</div>
                <div>测试人3</div>
                <div>测试人4</div>
                <div>测试人5</div>

            </div>
        </div>
    </div>
</template>

<script>
import {pullData} from "@/api/request";

export default {
    data() {
        return {
            params: {}
        }
    },

    components: {},

    computed: {},

    methods: {
        goBack() {
            this.$router.go(-1)
        },
    },
    created() {
        let id = this.$route.query.id
        pullData(id).then(res => {
            this.params = res.data.data
        })
    }
}
</script>

<style lang="css" scoped>
.template-details {
}

.container {
    display: flex;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    /*border: 1px solid red;*/
}

.container > div {
    margin: 10px;
    background-color: ghostwhite;
    border: 0;
    border-radius: 10px;
    padding: 10px 20px;
    box-sizing: border-box;
}

</style>
