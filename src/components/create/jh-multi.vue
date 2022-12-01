<template>
    <div>
        <div class="multi">
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
                    <el-checkbox-group v-model="params.answer">
                        <div class="checkbox-container" v-for="(option,index) in params.options">
                            <el-checkbox :key="index" :label="option">
                                <el-input v-model="params.options[index]"></el-input>
                            </el-checkbox>
                            <el-button @click="removeOption(params.options,params.answer,option)" type="text">
                                <i class="el-icon-close"></i>
                            </el-button>
                        </div>
                    </el-checkbox-group>
                    <el-button @click="addOption(params.options)" size="small">新增选项</el-button>
                </template>
            </co-card>
        </div>
    </div>
</template>

<script>
import CoCard from '../co-card.vue'
import {addOption, closeComponent, removeOption, updateTemplate} from '@/api/util'

export default {
    data() {
        return {}
    },
    props: {
        params: {

        },
    },
    components: {CoCard},
    methods: {
        closeComponent,
        addOption,
        removeOption,
    },
    created() {

    }
}
</script>
<style lang="css" scoped>
@import "@/common/style/components/create/create-multi.css";
</style>
