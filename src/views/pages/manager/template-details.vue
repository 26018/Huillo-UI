<template>
    <div>
        <div class="template-details">

            <div class="main-container">
                <div>
                    <h1>文件收集</h1>
                    <h5>这是一些详细描述</h5>
                </div>

                <div class="commit-detail">
                    <div style="font-size: 1.3rem;width: 100%;display: inline-block;font-weight: 500;border: 1px solid red;">提交总数:
                        <h1 style="display: inline-block;margin-left: auto">47</h1>
                    </div>

                    <div style="display: flex;justify-content: space-between;">
                        <div>
                            <h3>实名提交</h3>
                            <h1>5</h1>
                        </div>

                        <div>
                            <h3>匿名提交</h3>
                            <h1>42</h1>
                        </div>
                    </div>
                    <div>

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
