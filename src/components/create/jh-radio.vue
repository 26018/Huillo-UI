<template>
    <div>
        <div class="radio">
            <co-card>
                <template v-slot:header>
                    <el-input class="title" v-model="params.title"></el-input>
                    <div class="operation-frame">
                        <el-checkbox v-model="params.optional">选填</el-checkbox>
                        <i class="el-icon-sort move" title="点击拖动排序"></i>
                        <i class="el-icon-circle-close" @click="closeComponent(params)"></i>
                    </div>
                </template>

                <template v-slot:content>
                    <el-input type="textarea" :autosize="{minRows: 1}" class="description" v-model="params.description"
                              placeholder="添加选项描述"></el-input>
                    <el-radio-group v-model="params.answer">
                        <div class="radio-container" v-for="(option,index) in params.options">
                            <el-radio :label="option">
                                <el-input v-model="params.options[index]"></el-input>
                            </el-radio>
                            <el-button type="text" @click="removeOption(params.options,params.answer,option)">
                                <i class="el-icon-close"></i>
                            </el-button>
                        </div>
                    </el-radio-group>
                    <el-button @click="addOption(params.options)" size="small">新增选项</el-button>
                </template>
            </co-card>
        </div>
    </div>
</template>

<script>
import coCard from '../co-card.vue'
import {addOption, closeComponent, removeOption} from '@/api/util'

export default {
    components: {coCard},
    props: {
        params: {

        }
    },
    data() {
        return {}
    },

    computed: {
        // observerParams() {
        //     return JSON.stringify(this.params)
        // },
    },
    watch: {
        observerParams(n, o) {

        },
    },

    methods: {
        closeComponent,
        addOption,
        removeOption,
    },
}
</script>
<style lang="css" scoped>
@import "@/common/style/co-card.css";
@import "@/common/style/components/create/create-radio.css";
</style>
