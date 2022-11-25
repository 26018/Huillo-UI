<template>
    <div>
        <div class="login" :style="{height:viewHeight(0)}">
            <div class="container">
                <h2>欢迎加入Huillo</h2>
                <el-input placeholder="邮箱"></el-input>
                <div style="display: flex"><el-input placeholder="验证码"></el-input>
                <span>&nbsp;</span>
                    <el-button>获取</el-button>
                </div>
                <el-input placeholder="密码"></el-input>
                <el-button type="primary">立即注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {viewHeight} from "@/api/util";

export default {
    data() {
        return {}
    },

    components: {},

    computed: {},

    methods: {
        viewHeight,
    },
    created() {
        // localStorage.setItem('token', 125)
    },
}
</script>
<style lang="css" scoped>
.login {
    /*border: 1px solid rebeccapurple;*/
    display: flex;
    justify-content: center;
    align-items: center;
    /*background-image: url('@/assets/bc.jpg');*/
    background-size: cover;
}

.container {
    width: 300px;
    height: 300px;
    box-shadow: 0px 0px 2px 0px #888888;
    backdrop-filter: blur(800px);
    box-sizing: border-box;
    /*margin-top: calc(50% - 150px);*/
    padding: 20px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    justify-content: space-around;
}

</style>
