<template>
    <div style="background-color: rgb(243,246,249)">
        <div class="submit">
            <div v-for="(component, index) in templateData"
                 :key="index">
                <components :ref="'jh' + index" :is="component.componentName" :idx="index" :params="component"
                            :key="index"></components>
            </div>

        </div>
        <div class="submitBtn">
            <el-button @click="submitCollect" style="width: 30%;height: 40px" type="primary">提交</el-button>
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

export default {
    data() {
        return {
            templateData: [],
        }
    },

    components: {
        jhHead, jhFile, coCard, jhInput, jhRadio, jhMulti,
    },

    computed: {},

    methods: {
        submitCollect() {
            alert('截止了')
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
            console.log("Test here!")
        })

        // QuestionList().then(res=>{
        //     console.log("List:")
        //     console.log(res.data)
        // });
    },
}
</script>
<style lang="css" scoped>
.item {
    border-bottom: 2px dashed rgb(238, 238, 238);
}

img {
    width: 100px;
}

/*-----------------------------*/

h3 {
    height: 50px;
    margin-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    color: rgb(36, 37, 37);
}


/*.items {*/
/*    display: grid;*/
/*    grid-gap: 10px;*/
/*    grid-template-columns: repeat(auto-fill, 100px);*/
/*    justify-content: space-around;*/
/*}*/

.item-choice {
    background-color: #e8ecef;
    color: black;
    /*width: 100px;*/
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    user-select: none;
    cursor: pointer;
}

.item-choice > * {
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-choice:hover {
    color: dodgerblue;
    transition-duration: 200ms;
}

.addComponent {
    display: none;
}

>>> .el-dialog {
    width: 100%;
    height: 80%;
    margin: 0;
    position: absolute;
    bottom: 0px;
}

>>> .el-dialog__body {
    position: absolute;
    left: 0;
    top: 54px;
    bottom: 0;
    right: 0;
    padding: 0;
    overflow: auto;
}

@media screen and (max-width: 992px) {
    .addComponent {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 60px;
    }

    .addComponent >>> .el-button {
        background-color: #409EFF;
        color: white;
    }

    .items {
        display: grid;
        gap: 16px;
        padding: 0 8px;
        grid-template-columns: repeat(auto-fit,minmax(100px,2fr));
        justify-content: space-between;
    }
}

</style>
