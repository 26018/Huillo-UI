<template>
    <div>
        <div class="head">
            <co-card>
                <template v-slot:header>
                    <div class="create-header">
                        <el-input class="create-title" clearable v-model="params.title"/>
                        <el-date-picker class="date-end"  value-format="yyyy-MM-dd" v-model="params.endTime" placeholder="截止日期"/>
                    </div>
                </template>
                <template v-slot:content>
                    <div class="mobile">
                        <div class="row-container">
                            <co-tip>收集人:</co-tip>
                            <el-input v-model="params.author" clearable placeholder="默认为问卷发布人">
                            </el-input>
                        </div>
                        <div class="row-container">
                            <co-tip>结束时间:</co-tip>
                            <el-date-picker class="self"  value-format="yyyy-MM-dd" v-model="params.endTime"></el-date-picker>
                        </div>
                        <co-tip>简要说明:</co-tip>
                        <el-input type="textarea" v-model="params.description" :autosize="{ minRows: 2}"/>

                    </div>

                    <div class="pc">
                        <el-input v-model="params.author" clearable class="author" placeholder="请填写">
                            <template slot="prepend">收集人:</template>
                        </el-input>
                        <div class="row-container">
                            <co-tip>详细说明:</co-tip>
                            <el-select v-model="params.editorValue" class="create-editor-select"
                                       placeholder="切换编辑器">
                                <el-option v-for="editorOption in editorOptions" :key="editorOption"
                                           :label="editorOption" :value="editorOption"></el-option>
                            </el-select>
                        </div>

                        <el-input type="textarea" v-show="textEditor" v-model="params.description"
                                  :autosize="{ minRows: 2}"/>
                        <mavon-editor :boxShadow="false" v-show="!textEditor" v-model="params.description">
                        </mavon-editor>
                    </div>
                </template>
            </co-card>
        </div>
    </div>
</template>

<script>
import CoCard from '../co-card.vue'
import {getFeature} from '@/api/time'
import CoTip from "@/components/co-tip";
import CoIcon from "@/components/co-icon";

export default {
    props: {
        params: {
            editorValue: String,
        }
    },
    data() {
        return {
            editorOptions: ["MD编辑器", "纯文本编辑器"],
        }
    },
    computed: {
        textEditor() {
            return this.params.editorValue === '纯文本编辑器'
        }
    },

    methods: {},
    components: {CoIcon, CoTip, CoCard},
    created() {
        this.params.startTime = new Date();
        this.params.endTime = getFeature(7)
    },
}
</script>
<style lang="css" scoped>
@import "@/common/style/components/create/create-head.css";

</style>
