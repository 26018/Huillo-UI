<template>
    <div>
       <co-header></co-header>
        <div class="submit" :style="{height:viewHeight(0)}">
            <div v-for="(component, index) in templateData" :key="index">
                <components :ref="'jh' + index" :is="component.componentName" :idx="index" :params="component"
                            :key="index"></components>
            </div>
            <div class="submitBtn">
                <el-button @click="submitCollect" size="medium" type="primary">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import coCard from '@/components/co-card.vue'
import jhHead from '@/components/submit/jh-submit-head.vue'
import jhFile from '@/components/submit/jh-submit-file.vue'
import jhInput from '@/components/submit/jh-submit-input.vue'
import jhRadio from '@/components/submit/jh-submit-radio.vue'
import jhMulti from '@/components/submit/jh-submit-multi.vue'
import {pullData, QuestionList} from '@/api/request'
import {viewHeight} from "@/api/util";
import CoHeader from "@/components/co-header";

export default {
    data() {
        return {
            templateData: [],
        }
    },

    components: {
        CoHeader,
        jhHead, jhFile, coCard, jhInput, jhRadio, jhMulti,
    },

    computed: {},

    methods: {
        viewHeight,
        submitCollect() {
            this.$message.info("问卷已截止收集")
        },
    },
    created() {
        // TODO 获取服务器数据，动态生成页面
        let id = this.$route.params.id
        pullData(id).then((res) => {
            let dataList = res.data.data.components
            let result = []
            dataList.forEach((data) => {
                if (data.options != null) {
                    data.options = JSON.parse(data.options)
                }
                result.push(data)
            })
            this.templateData = result
            console.log(this.templateData)
        })
    },
}
</script>
<style lang="css" scoped>

.submit {
    width: 60%;
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    overflow: auto;
}

.submitBtn {
    /*border: 1px solid rebeccapurple;*/
    margin: 0 auto;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media screen and (max-width: 600px) {
    .submit {
        width: 100%;
        background-color: white;
        overflow: auto;
    }

    .submitBtn {
        /*border: 1px solid rebeccapurple;*/
        margin: 0 auto;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

</style>
